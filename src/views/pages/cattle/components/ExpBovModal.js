import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CCol,
  CListGroup,
  CListGroupItem,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMedicalCross, cilList, cilInfo } from '@coreui/icons' // Eliminado cilDrop, se usará cilList para Producción de Leche
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { pdfService } from '../../../../api/pdfService' // Importa el nuevo servicio de PDF
import { helpFetch } from 'src/helpper/helpFetch'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const { get } = helpFetch()

const ExpBovModal = ({ expBovVisible, setExpBovVisible, currentCattle }) => {
  const [activeTab, setActiveTab] = useState('infoBasica')
  const [medicalRecords, setMedicalRecords] = useState([])
  const [milkProduction, setMilkProduction] = useState([])
  const [pastureHistory, setPastureHistory] = useState([])

  useEffect(() => {
    const loadCattleDetails = async () => {
      if (expBovVisible && currentCattle && currentCattle.ttrIdbovino) {
        try {
          const [records, production, history] = await Promise.all([
            get(`regmedicos/bovino/${currentCattle.ttrIdbovino}`),
            get(`prodleche/bovino/${currentCattle.ttrIdbovino}`),
            get(`lotepotreros/bovino/${currentCattle.ttrIdbovino}`),
          ])
          setMedicalRecords(records || [])
          setMilkProduction(production || [])
          setPastureHistory(history || [])

          console.log('ExpBovModal (components): currentCattle:', currentCattle)
          console.log('ExpBovModal (components): Registros médicos cargados:', records)
          console.log('ExpBovModal (components): Producción de leche cargada:', production)
          console.log('ExpBovModal (components): Historial de lotes y potreros cargado:', history)
        } catch (error) {
          console.error('Error al cargar detalles del bovino para el expediente:', error)
          toast.error('Error al cargar detalles del bovino.')
          setMedicalRecords([])
          setMilkProduction([])
          setPastureHistory([])
        }
      } else if (!expBovVisible) {
        // Limpiar datos cuando el modal se cierra
        setMedicalRecords([])
        setMilkProduction([])
        setPastureHistory([])
      }
    }
    loadCattleDetails()
  }, [expBovVisible, currentCattle])

  const handleExportPdf = async () => {
    if (!currentCattle || !currentCattle.ttrIdbovino) {
      toast.error('No se ha seleccionado ningún bovino para exportar.')
      return
    }
    try {
      toast.info('Generando PDF, por favor espere...')
      const responseBlob = await pdfService.exportCattleExpedientPdf(currentCattle.ttrIdbovino)
      const url = window.URL.createObjectURL(responseBlob) // Usa responseBlob directamente
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `expediente-bovino-${currentCattle.ttrNumerobv}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('PDF generado y descargado exitosamente.')
      setExpBovVisible(false)
    } catch (error) {
      console.error('Error al exportar PDF:', error)
      toast.error('Error al generar el PDF del expediente.')
    }
  }

  // Usar la función de utilidad formatDateToDDMMYYYY
  const formatDate = (dateString) => {
    return formatDateToDDMMYYYY(dateString) || 'N/A'
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={expBovVisible}
      onClose={() => setExpBovVisible(false)}
      size="xl"
      backdrop="static"
    >
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color-title">
          Expediente del Bovino: {currentCattle?.ttr_numerobv}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CNav variant="tabs" role="tablist" className="mb-3">
          <CNavItem>
            <CNavLink
              active={activeTab === 'infoBasica'}
              onClick={() => setActiveTab('infoBasica')}
            >
              <CIcon icon={cilInfo} className="me-2" />
              Información Básica
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'registrosMedicos'}
              onClick={() => setActiveTab('registrosMedicos')}
            >
              <CIcon icon={cilMedicalCross} className="me-2" />
              Registros Médicos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'produccionLeche'}
              onClick={() => setActiveTab('produccionLeche')}
            >
              <CIcon icon={cilList} className="me-2" /> {/* Usando cilList como fallback */}
              Producción de Leche
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'historialPotreros'}
              onClick={() => setActiveTab('historialPotreros')}
            >
              <CIcon icon={cilList} className="me-2" />
              Historial Lotes/Potreros
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="infoBasica-tab"
            visible={activeTab === 'infoBasica'}
          >
            <CRow>
              <CCol md={6}>
                <CListGroup flush>
                  <CListGroupItem>
                    <strong>Número de Bovino:</strong> {currentCattle?.ttrNumerobv}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Raza:</strong> {currentCattle?.razaNombre || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Fecha de Nacimiento:</strong> {formatDate(currentCattle?.ttrFecnacim)}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Color:</strong> {currentCattle?.colorNombre || 'N/A'}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol md={6}>
                <CListGroup flush>
                  <CListGroupItem>
                    <strong>Peso (kg):</strong> {currentCattle?.ttrPesokilo}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Etapa:</strong> {currentCattle?.etapaNombre || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Estado:</strong> {currentCattle?.estadoNombre || 'N/A'}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
            </CRow>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="registrosMedicos-tab"
            visible={activeTab === 'registrosMedicos'}
          >
            {medicalRecords.length > 0 ? (
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                    <CTableHeaderCell>Tratamiento</CTableHeaderCell>
                    <CTableHeaderCell>Vacuna</CTableHeaderCell>
                    <CTableHeaderCell>Empleado</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {medicalRecords.map((record) => (
                    <CTableRow key={record.ttr_idregmed}>
                      <CTableDataCell>{formatDate(record.ttr_fechareg)}</CTableDataCell>
                      <CTableDataCell>{record.ttr_diagnost}</CTableDataCell>
                      <CTableDataCell>{record.tma_nomtrat || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{record.tma_nomtipv || 'N/A'}</CTableDataCell>
                      <CTableDataCell>
                        {`${record.employee_name || ''} ${record.employee_last_name || ''}`.trim() ||
                          'N/A'}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <p>No hay registros médicos para este bovino.</p>
            )}
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="produccionLeche-tab"
            visible={activeTab === 'produccionLeche'}
          >
            {milkProduction.length > 0 ? (
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Litros Producidos</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {milkProduction.map((record) => (
                    <CTableRow key={record.ttr_idprodlc}>
                      <CTableDataCell>{formatDate(record.ttr_fechapro)}</CTableDataCell>
                      <CTableDataCell>{record.ttr_litrsprd}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <p>No hay registros de producción de leche para este bovino.</p>
            )}
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="historialPotreros-tab"
            visible={activeTab === 'historialPotreros'}
          >
            {pastureHistory.length > 0 ? (
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Lote</CTableHeaderCell>
                    <CTableHeaderCell>Potrero</CTableHeaderCell>
                    <CTableHeaderCell>Fecha Inicio</CTableHeaderCell>
                    <CTableHeaderCell>Fecha Fin</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {pastureHistory.map((record) => (
                    <CTableRow key={record.ttr_idbovlotpot}>
                      <CTableDataCell>{record.tma_nomlote || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{record.ttr_codpotre || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{formatDate(record.ttr_fechaini)}</CTableDataCell>
                      <CTableDataCell>{formatDate(record.ttr_fechafin)}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <p>No hay historial de lotes/potreros para este bovino.</p>
            )}
          </CTabPane>
        </CTabContent>
      </CModalBody>
      <CModalFooter>
        <CButton
          className="button-no-hover-green text-white"
          onClick={() => setExpBovVisible(false)}
        >
          Cerrar
        </CButton>
        <CButton
          color="primary"
          className="button-no-hover-green text-white"
          onClick={handleExportPdf}
        >
          Exportar a PDF
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ExpBovModal.propTypes = {
  expBovVisible: PropTypes.bool.isRequired,
  setExpBovVisible: PropTypes.func.isRequired,
  currentCattle: PropTypes.object,
}

export default ExpBovModal
