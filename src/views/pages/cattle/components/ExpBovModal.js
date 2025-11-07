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
import { helpFetch } from 'src/helpper/helpFetch'

const { get } = helpFetch()

const ExpBovModal = ({ expBovVisible, setExpBovVisible, currentCattle }) => {
  const [activeTab, setActiveTab] = useState('infoBasica')
  const [medicalRecords, setMedicalRecords] = useState([])
  const [milkProduction, setMilkProduction] = useState([])
  const [pastureHistory, setPastureHistory] = useState([])

  useEffect(() => {
    if (expBovVisible && currentCattle) {
      // Cargar registros médicos
      get(`regmedicos/bovino/${currentCattle.ttr_idbovino}`)
        .then((data) => {
          setMedicalRecords(data || [])
        })
        .catch((error) => console.error('Error al cargar registros médicos:', error))

      // Cargar producción de leche
      get(`prodleche/bovino/${currentCattle.ttr_idbovino}`)
        .then((data) => {
          setMilkProduction(data || [])
        })
        .catch((error) => console.error('Error al cargar producción de leche:', error))

      // Cargar historial de lotes/potreros
      get(`lotepotreros/bovino/${currentCattle.ttr_idbovino}`)
        .then((data) => {
          setPastureHistory(data || [])
        })
        .catch((error) => console.error('Error al cargar historial de lotes/potreros:', error))
    }
  }, [expBovVisible, currentCattle])

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={expBovVisible}
      onClose={() => setExpBovVisible(false)}
      size="xl"
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
                    <strong>Número de Bovino:</strong> {currentCattle?.ttr_numerobv}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Raza:</strong> {currentCattle?.raza_nombre || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Fecha de Nacimiento:</strong> {formatDate(currentCattle?.ttr_fecnacim)}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Color:</strong> {currentCattle?.color_nombre || 'N/A'}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol md={6}>
                <CListGroup flush>
                  <CListGroupItem>
                    <strong>Peso (kg):</strong> {currentCattle?.ttr_pesokilo}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Etapa:</strong> {currentCattle?.etapa_nombre || 'N/A'}
                  </CListGroupItem>
                  <CListGroupItem>
                    <strong>Estado:</strong> {currentCattle?.estado_nombre || 'N/A'}
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
