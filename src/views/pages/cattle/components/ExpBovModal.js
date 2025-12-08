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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilList,
  cilInfo,
  cilCloudDownload,
  cilAnimal,
  cilFile,
  cilBeaker, // Vacunas
  cilHeart, // Preñez
  cilClipboard, // Visita Vet
  cilMedicalCross, // Icono reusado para exportar pdf sanitario
} from '@coreui/icons'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { pdfService } from '../../../../api/pdfService'
import { helpFetch } from 'src/helpper/helpFetch'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const { get } = helpFetch()

const ExpBovModal = ({ expBovVisible, setExpBovVisible, currentCattle }) => {
  const [activeTab, setActiveTab] = useState('infoBasica')
  const [milkProduction, setMilkProduction] = useState([])
  const [pastureHistory, setPastureHistory] = useState([])

  // Nuevos estados para Módulos de Sanidad
  const [vacunaciones, setVacunaciones] = useState([])
  const [preneces, setPreneces] = useState([])
  const [visitasVet, setVisitasVet] = useState([])

  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const loadCattleDetails = async () => {
      if (expBovVisible && currentCattle && currentCattle.ttrIdbovino) {
        setLoading(true)
        try {
          const id = currentCattle.ttrIdbovino

          // Ejecutar peticiones en paralelo para optimizar carga
          // Eliminada la carga de registros medicos legacy
          const [production, history, vacs, pren, visits] = await Promise.all([
            get(`prodleche/bovino/${id}`),
            get(`lotepotreros/bovino/${id}`),
            get(`sanidad/vacunaciones/bovino/${id}`),
            get(`sanidad/prenez/bovino/${id}`),
            get(`sanidad/visitas-veterinarias/bovino-visitas/${id}`).catch(() => []),
          ])

          setMilkProduction(production || [])
          setPastureHistory(history || [])
          setVacunaciones(vacs || [])
          setPreneces(pren || [])
          setVisitasVet(visits || [])
        } catch (error) {
          console.error('Error al cargar detalles del bovino:', error)
          toast.error('Error al cargar detalles completos del bovino.')
          // Limpiar estados en error
          setMilkProduction([])
          setPastureHistory([])
          setVacunaciones([])
          setPreneces([])
          setVisitasVet([])
        } finally {
          setLoading(false)
        }
      } else if (!expBovVisible) {
        // Reset states
        setMilkProduction([])
        setPastureHistory([])
        setVacunaciones([])
        setPreneces([])
        setVisitasVet([])
        setActiveTab('infoBasica')
      }
    }
    loadCattleDetails()
  }, [expBovVisible, currentCattle])

  const handleExportPdf = async (type) => {
    if (!currentCattle || !currentCattle.ttrIdbovino) {
      toast.error('No se ha seleccionado ningún bovino para exportar.')
      return
    }

    setExporting(true)
    try {
      toast.info(
        `Generando Expediente ${type === 'sanitario' ? 'Sanitario' : 'Completo'}, espere...`,
      )

      const responseBlob = await pdfService.exportCattleExpedientPdf(
        currentCattle.ttrIdbovino,
        type,
      )

      const url = window.URL.createObjectURL(responseBlob)
      const link = document.createElement('a')
      link.href = url
      const typeLabel = type === 'sanitario' ? 'SAN' : 'FULL'
      link.setAttribute('download', `Expediente-${typeLabel}-${currentCattle.ttrNumerobv}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success('PDF descargado exitosamente.')
    } catch (error) {
      console.error('Error al exportar PDF:', error)
      toast.error('Error al generar el PDF.')
    } finally {
      setExporting(false)
    }
  }

  const InfoRow = ({ label, value }) => (
    <CRow className="mb-2 py-2 border-bottom">
      <CCol xs={5} className="text-medium-emphasis">
        <strong>{label}</strong>
      </CCol>
      <CCol xs={7}>{value || 'N/A'}</CCol>
    </CRow>
  )

  return (
    <CModal
      alignment="center"
      scrollable
      visible={expBovVisible}
      onClose={() => setExpBovVisible(false)}
      size="xl"
      backdrop="static"
    >
      <CModalHeader style={{ backgroundColor: '#28a745', color: 'white' }}>
        <CModalTitle>
          <CIcon icon={cilAnimal} className="me-2" />
          Expediente Bovino #{currentCattle?.ttrNumerobv || currentCattle?.ttr_numerobv}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CNav variant="tabs" role="tablist" className="mb-3">
          <CNavItem>
            <CNavLink
              active={activeTab === 'infoBasica'}
              onClick={() => setActiveTab('infoBasica')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilInfo} className="me-2" />
              Básica
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'vacunacion'}
              onClick={() => setActiveTab('vacunacion')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilBeaker} className="me-2" />
              Vacunación
              <CBadge color="success" className="ms-1">
                {vacunaciones.length}
              </CBadge>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'reproduccion'}
              onClick={() => setActiveTab('reproduccion')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilHeart} className="me-2" />
              Reproducción
              <CBadge color="danger" className="ms-1">
                {preneces.length}
              </CBadge>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'visitas'}
              onClick={() => setActiveTab('visitas')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilClipboard} className="me-2" />
              Visitas
              <CBadge color="info" className="ms-1">
                {visitasVet.length}
              </CBadge>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'produccionLeche'}
              onClick={() => setActiveTab('produccionLeche')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilList} className="me-2" />
              Producción
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'historialPotreros'}
              onClick={() => setActiveTab('historialPotreros')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilList} className="me-2" />
              Ubicación
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          {/* Tab Información Básica */}
          <CTabPane role="tabpanel" visible={activeTab === 'infoBasica'}>
            <CRow>
              <CCol md={6}>
                <h6 className="text-success mb-3">
                  <strong>Datos Generales</strong>
                </h6>
                <InfoRow label="Número de Bovino" value={currentCattle?.ttrNumerobv} />
                <InfoRow label="Raza" value={currentCattle?.razaNombre} />
                <InfoRow
                  label="Fecha de Nacimiento"
                  value={formatDateToDDMMYYYY(currentCattle?.ttrFecnacim)}
                />
                <InfoRow label="Color" value={currentCattle?.colorNombre} />
              </CCol>
              <CCol md={6}>
                <h6 className="text-success mb-3">
                  <strong>Estado Actual</strong>
                </h6>
                <InfoRow label="Peso (kg)" value={currentCattle?.ttrPesokilo} />
                <InfoRow label="Etapa" value={currentCattle?.etapaNombre} />
                <InfoRow label="Estado" value={currentCattle?.estadoNombre} />
              </CCol>
            </CRow>
          </CTabPane>

          {/* Tab Vacunaciones */}
          <CTabPane role="tabpanel" visible={activeTab === 'vacunacion'}>
            {vacunaciones.length > 0 ? (
              <CTable striped hover responsive small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Vacuna</CTableHeaderCell>
                    <CTableHeaderCell>Plan</CTableHeaderCell>
                    <CTableHeaderCell>Próxima Dosis</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {vacunaciones.map((vac) => (
                    <CTableRow key={vac.ttr_idvacuna}>
                      <CTableDataCell>{formatDateToDDMMYYYY(vac.ttr_fechaapl)}</CTableDataCell>
                      <CTableDataCell>{vac.nombre_vacuna}</CTableDataCell>
                      <CTableDataCell>{vac.nombre_plan || 'Extraordinaria'}</CTableDataCell>
                      <CTableDataCell>
                        {vac.ttr_proxfech ? (
                          <span
                            className={
                              new Date(vac.ttr_proxfech) < new Date() ? 'text-danger fw-bold' : ''
                            }
                          >
                            {formatDateToDDMMYYYY(vac.ttr_proxfech)}
                          </span>
                        ) : (
                          'N/A'
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="success" variant="solid" className="text-white">
                Este bovino no tiene registros de vacunación en el nuevo sistema.
              </CAlert>
            )}
          </CTabPane>

          {/* Tab Reproducción (Preñez) */}
          <CTabPane role="tabpanel" visible={activeTab === 'reproduccion'}>
            {preneces.length > 0 ? (
              <CTable striped hover responsive small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Inicio Gestación</CTableHeaderCell>
                    <CTableHeaderCell>Parto Estimado</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell>Observaciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {preneces.map((pren) => (
                    <CTableRow key={pren.ttr_idprenez}>
                      <CTableDataCell>{formatDateToDDMMYYYY(pren.ttr_fechaini)}</CTableDataCell>
                      <CTableDataCell>
                        <strong>{formatDateToDDMMYYYY(pren.ttr_fechaestp)}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge
                          color={pren.ttr_estadopre === 'Finalizada' ? 'secondary' : 'primary'}
                        >
                          {pren.ttr_estadopre}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{pren.ttr_observa || '-'}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="info">No hay registros de ciclos reproductivos.</CAlert>
            )}
          </CTabPane>

          {/* Tab Visitas Veterinarias */}
          <CTabPane role="tabpanel" visible={activeTab === 'visitas'}>
            {visitasVet.length > 0 ? (
              <CTable striped hover responsive small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Veterinario</CTableHeaderCell>
                    <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                    <CTableHeaderCell>Tratamiento Ind.</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {visitasVet.map((visita) => (
                    <CTableRow key={visita.ttr_idvisbov}>
                      <CTableDataCell>{formatDateToDDMMYYYY(visita.fecha_visita)}</CTableDataCell>
                      <CTableDataCell>{visita.veterinario}</CTableDataCell>
                      <CTableDataCell>{visita.ttr_diagnos}</CTableDataCell>
                      <CTableDataCell>{visita.ttr_tratamie || '-'}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="info">No hay registros de visitas veterinarias específicas.</CAlert>
            )}
          </CTabPane>

          {/* Tab Producción de Leche */}
          <CTabPane role="tabpanel" visible={activeTab === 'produccionLeche'}>
            {milkProduction.length > 0 ? (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Litros Producidos</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {milkProduction.map((record) => (
                    <CTableRow key={record.ttr_idprodlc}>
                      <CTableDataCell>{formatDateToDDMMYYYY(record.ttr_fechapro)}</CTableDataCell>
                      <CTableDataCell>
                        <strong>{record.ttr_litrsprd} L</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="info">
                No hay registros de producción de leche para este bovino.
              </CAlert>
            )}
          </CTabPane>

          {/* Tab Historial Potreros */}
          <CTabPane role="tabpanel" visible={activeTab === 'historialPotreros'}>
            {pastureHistory.length > 0 ? (
              <CTable striped hover responsive>
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
                      <CTableDataCell>{formatDateToDDMMYYYY(record.ttr_fechaini)}</CTableDataCell>
                      <CTableDataCell>{formatDateToDDMMYYYY(record.ttr_fechafin)}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="info">No hay historial de lotes/potreros para este bovino.</CAlert>
            )}
          </CTabPane>
        </CTabContent>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setExpBovVisible(false)}>
          Cerrar
        </CButton>

        <CDropdown variant="btn-group" direction="up">
          <CDropdownToggle color="success" disabled={exporting}>
            <CIcon icon={cilCloudDownload} className="me-2" />
            {exporting ? 'Generando...' : 'Exportar Expediente'}
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => handleExportPdf('completo')}>
              <CIcon icon={cilFile} className="me-2" />
              Expediente Completo
            </CDropdownItem>
            <CDropdownItem onClick={() => handleExportPdf('sanitario')}>
              <CIcon icon={cilMedicalCross} className="me-2 text-danger" />
              Hoja Clínica (Sanitario)
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
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
