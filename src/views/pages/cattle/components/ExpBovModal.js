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
  CCard,
  CCardBody,
  CWidgetStatsF,
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
  cilMedicalCross,
  cilChartLine,
  cilLocationPin,
} from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { pdfService } from '../../../../api/pdfService'
import { helpFetch } from 'src/helpper/helpFetch'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const { get } = helpFetch()

const ExpBovModal = ({ expBovVisible, setExpBovVisible, currentCattle }) => {
  const [activeTab, setActiveTab] = useState('resumen') // Default to summary
  const [milkProduction, setMilkProduction] = useState([])
  const [pastureHistory, setPastureHistory] = useState([])

  // Nuevos estados para Módulos de Sanidad
  const [vacunaciones, setVacunaciones] = useState([])
  const [preneces, setPreneces] = useState([])
  const [visitasVet, setVisitasVet] = useState([])

  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)

  // Helper para edad
  const calculateAge = (dobString) => {
    if (!dobString) return 'N/A'

    // Parsear fecha en formato DD/MM/YYYY
    // Ejemplo: '24/11/2025'
    const parts = dobString.split('/')
    if (parts.length !== 3) return 'N/A'

    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1 // Meses en JS son 0-indexed
    const year = parseInt(parts[2], 10)

    const dob = new Date(year, month, day)
    if (isNaN(dob.getTime())) return 'N/A'

    const today = new Date()
    let years = today.getFullYear() - dob.getFullYear()
    let months = today.getMonth() - dob.getMonth()

    // Ajustar si el mes actual es menor o si es el mismo mes pero el día es menor
    if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
      years--
      months += 12
    }

    // Ajustar meses si el día actual es menor que el día de nacimiento
    if (today.getDate() < dob.getDate()) {
      months--
      if (months < 0) {
        months += 12
        years--
      }
    }

    if (years > 0) return `${years} años, ${months} meses`
    return `${months} meses`
  }

  useEffect(() => {
    const loadCattleDetails = async () => {
      if (expBovVisible && currentCattle && currentCattle.ttrIdbovino) {
        setLoading(true)
        try {
          const id = currentCattle.ttrIdbovino

          // Usamos catch individualmente para que un error 404 (ej: sin historial de leche) no rompa todo el Promise.all
          const [production, history, vacs, pren, visits] = await Promise.all([
            get(`prodleche/bovino/animal/${id}`).catch((err) => {
              console.warn('Info produccion no encontrada o vacia', err)
              return []
            }),
            get(`lotepotreros/bovino/${id}`).catch(() => []),
            get(`sanidad/vacunaciones/bovino/${id}`).catch(() => []),
            get(`sanidad/prenez/bovino/${id}`).catch(() => []),
            get(`sanidad/visitas-veterinarias/bovino-visitas/${id}`).catch(() => []),
          ])

          setMilkProduction(Array.isArray(production) ? production : [])
          setPastureHistory(Array.isArray(history) ? history : [])
          setVacunaciones(Array.isArray(vacs) ? vacs : [])
          setPreneces(Array.isArray(pren) ? pren : [])
          setVisitasVet(Array.isArray(visits) ? visits : [])
        } catch (error) {
          console.error('Error al cargar detalles del bovino:', error)
          toast.error('Ocurrió un error cargando algunos datos del expediente.')
          // No limpiamos todo, dejamos lo que se haya podido cargar o estados previos si es necesario
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
        setActiveTab('resumen')
      }
    }
    loadCattleDetails()
  }, [expBovVisible, currentCattle])

  console.log(currentCattle)

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
    <div className="d-flex justify-content-between border-bottom py-2">
      <span className="text-muted fw-semibold">{label}</span>
      <span className="fw-bold text-dark">{value || 'N/A'}</span>
    </div>
  )

  // Chart Logic
  const milkChartData = {
    labels: Array.isArray(milkProduction)
      ? milkProduction.map((r) => formatDateToDDMMYYYY(r.ttr_fechapro)).reverse()
      : [],
    datasets: [
      {
        label: 'Producción (Litros)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        data: Array.isArray(milkProduction)
          ? milkProduction.map((r) => r.ttr_litrsprd).reverse()
          : [],
      },
    ],
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
      <CModalHeader className="bg-success text-white">
        <CModalTitle className="d-flex align-items-center gap-2">
          <CIcon icon={cilAnimal} size="lg" />
          <span>
            Expediente Bovino #{currentCattle?.ttrNumerobv || currentCattle?.ttr_numerobv}
          </span>
        </CModalTitle>
      </CModalHeader>
      <CModalBody className="bg-light">
        {/* Header Profile Card */}
        <CCard className="mb-4 shadow-sm border-top-success border-top-3">
          <CCardBody>
            <CRow>
              <CCol md={3} className="text-center border-end">
                <div className="display-4 fw-bold text-success">{currentCattle?.ttrNumerobv}</div>
                <div className="text-muted small">Número Identificador</div>
                <CBadge
                  color={currentCattle?.estadoNombre === 'Activo' ? 'success' : 'danger'}
                  className="mt-2"
                >
                  {currentCattle?.estadoNombre || 'Desconocido'}
                </CBadge>
              </CCol>
              <CCol md={9}>
                <CRow>
                  <CCol md={4}>
                    <InfoRow label="Raza" value={currentCattle?.razaNombre} />
                  </CCol>
                  <CCol md={4}>
                    <InfoRow label="Peso" value={`${currentCattle?.ttrPesokilo} Kg`} />
                  </CCol>
                  <CCol md={4}>
                    <InfoRow label="Color" value={currentCattle?.colorNombre} />
                  </CCol>
                  <CCol md={4}>
                    <InfoRow label="Fecha Nac." value={currentCattle?.ttrFecnacim} />
                  </CCol>
                  <CCol md={4}>
                    <InfoRow label="Etapa" value={currentCattle?.etapaNombre} />
                  </CCol>
                  <CCol md={4}>
                    <InfoRow label="Edad" value={calculateAge(currentCattle?.ttrFecnacim)} />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <CNav variant="pills" role="tablist" className="mb-3 bg-white p-2 rounded shadow-sm">
          <CNavItem>
            <CNavLink
              active={activeTab === 'resumen'}
              onClick={() => setActiveTab('resumen')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilInfo} className="me-2" />
              Resumen
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'vacunacion'}
              onClick={() => setActiveTab('vacunacion')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilBeaker} className="me-2" />
              Sanidad
              {vacunaciones.length > 0 && (
                <CBadge color="danger" shape="rounded-pill" className="ms-2">
                  {vacunaciones.length}
                </CBadge>
              )}
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
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'produccionLeche'}
              onClick={() => setActiveTab('produccionLeche')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilChartLine} className="me-2" />
              Producción
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'historialPotreros'}
              onClick={() => setActiveTab('historialPotreros')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilLocationPin} className="me-2" />
              Ubicación
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent className="p-2">
          {/* RESUMEN */}
          <CTabPane role="tabpanel" visible={activeTab === 'resumen'}>
            <CRow className="g-3">
              <CCol md={4}>
                <CWidgetStatsF
                  className="mb-3"
                  color="primary"
                  icon={<CIcon icon={cilChartLine} height={24} />}
                  title="Producción Total"
                  value={`${
                    Array.isArray(milkProduction)
                      ? milkProduction
                          .reduce((acc, curr) => acc + parseFloat(curr.ttr_litrsprd), 0)
                          .toFixed(1)
                      : '0.0'
                  } L`}
                />
              </CCol>
              <CCol md={4}>
                <CWidgetStatsF
                  className="mb-3"
                  color="warning"
                  icon={<CIcon icon={cilBeaker} height={24} />}
                  title="Vacunas"
                  value={`${vacunaciones.length} Registradas`}
                />
              </CCol>
              <CCol md={4}>
                <CWidgetStatsF
                  className="mb-3"
                  color="danger"
                  icon={<CIcon icon={cilHeart} height={24} />}
                  title="Preñeces"
                  value={`${preneces.length} Ciclos`}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6}>
                <CCard>
                  <CCardBody>
                    <h5>Última Ubicación</h5>
                    {pastureHistory.length > 0 ? (
                      <div>
                        <h2 className="text-primary">{pastureHistory[0].ttr_codpotre}</h2>
                        <p className="mb-0">Lote: {pastureHistory[0].tma_nomlote}</p>
                        <small className="text-muted">
                          Desde: {formatDateToDDMMYYYY(pastureHistory[0].ttr_fechaini)}
                        </small>
                      </div>
                    ) : (
                      <p>Sin registros de ubicación.</p>
                    )}
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CTabPane>

          {/* SANIDAD */}
          <CTabPane role="tabpanel" visible={activeTab === 'vacunacion'}>
            <CCard className="shadow-sm">
              <CCardBody>
                <h5>Historial de Vacunación</h5>
                {vacunaciones.length > 0 ? (
                  <CTable hover responsive small>
                    <CTableHead color="light">
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
                          <CTableDataCell className="fw-bold text-primary">
                            {vac.nombre_vacuna}
                          </CTableDataCell>
                          <CTableDataCell>{vac.nombre_plan || 'Extraordinaria'}</CTableDataCell>
                          <CTableDataCell>
                            {vac.ttr_proxfech ? (
                              <CBadge
                                color={new Date(vac.ttr_proxfech) < new Date() ? 'danger' : 'info'}
                              >
                                {formatDateToDDMMYYYY(vac.ttr_proxfech)}
                              </CBadge>
                            ) : (
                              '-'
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                ) : (
                  <CAlert color="info">Sin registros de vacunación.</CAlert>
                )}
                <hr />
                <h5>Visitas Veterinarias</h5>
                {visitasVet.length > 0 ? (
                  <CTable hover responsive small>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>Fecha</CTableHeaderCell>
                        <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                        <CTableHeaderCell>Tratamiento</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {visitasVet.map((v) => (
                        <CTableRow key={v.ttr_idvisbov}>
                          <CTableDataCell>{formatDateToDDMMYYYY(v.fecha_visita)}</CTableDataCell>
                          <CTableDataCell>{v.ttr_diagnos}</CTableDataCell>
                          <CTableDataCell>{v.ttr_tratamie || '-'}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                ) : (
                  <p className="text-muted">No hay visitas recientes.</p>
                )}
              </CCardBody>
            </CCard>
          </CTabPane>

          {/* REPRODUCCION */}
          <CTabPane role="tabpanel" visible={activeTab === 'reproduccion'}>
            <CCard className="shadow-sm">
              <CCardBody>
                {preneces.length > 0 ? (
                  <CTable striped hover responsive>
                    <CTableHead color="light">
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
                          <CTableDataCell className="fw-bold">
                            {formatDateToDDMMYYYY(pren.ttr_fechaestp)}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CBadge
                              color={pren.ttr_estadopre === 'Finalizada' ? 'secondary' : 'success'}
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
                  <CAlert color="success">No hay registros de ciclos reproductivos.</CAlert>
                )}
              </CCardBody>
            </CCard>
          </CTabPane>

          {/* PRODUCCION */}
          <CTabPane role="tabpanel" visible={activeTab === 'produccionLeche'}>
            <CCard className="mb-3 shadow-sm">
              <CCardBody>
                <h5>Curva de Producción</h5>
                {milkProduction.length > 0 ? (
                  <CChartLine
                    data={milkChartData}
                    options={{ maintainAspectRatio: false }}
                    height={300}
                  />
                ) : (
                  <p className="text-muted text-center py-5">
                    No hay suficientes datos para graficar.
                  </p>
                )}
              </CCardBody>
            </CCard>
            <CCard className="shadow-sm">
              <CCardBody>
                <h5>Registros Detallados</h5>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <CTable striped hover small>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Fecha</CTableHeaderCell>
                        <CTableHeaderCell>Litros</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {Array.isArray(milkProduction) &&
                        milkProduction.map((p) => (
                          <CTableRow key={p.ttr_idprodlc}>
                            <CTableDataCell>{formatDateToDDMMYYYY(p.ttr_fechapro)}</CTableDataCell>
                            <CTableDataCell>
                              <strong>{p.ttr_litrsprd} L</strong>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                    </CTableBody>
                  </CTable>
                </div>
              </CCardBody>
            </CCard>
          </CTabPane>

          {/* HISTORIAL UBICACION */}
          <CTabPane role="tabpanel" visible={activeTab === 'historialPotreros'}>
            <CCard className="shadow-sm">
              <CCardBody>
                {pastureHistory.length > 0 ? (
                  <CTable striped hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>Lote</CTableHeaderCell>
                        <CTableHeaderCell>Potrero</CTableHeaderCell>
                        <CTableHeaderCell>Desde</CTableHeaderCell>
                        <CTableHeaderCell>Hasta</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {pastureHistory.map((record) => (
                        <CTableRow key={record.ttr_idbovlotpot}>
                          <CTableDataCell>{record.tma_nomlote || 'N/A'}</CTableDataCell>
                          <CTableDataCell className="fw-bold">
                            {record.ttr_codpotre || 'N/A'}
                          </CTableDataCell>
                          <CTableDataCell>
                            {formatDateToDDMMYYYY(record.ttr_fechaini)}
                          </CTableDataCell>
                          <CTableDataCell>
                            {formatDateToDDMMYYYY(record.ttr_fechafin) || (
                              <CBadge color="success">Actual</CBadge>
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                ) : (
                  <CAlert color="info">No hay historial de movimientos.</CAlert>
                )}
              </CCardBody>
            </CCard>
          </CTabPane>
        </CTabContent>
      </CModalBody>
      <CModalFooter className="bg-white">
        <CButton color="secondary" variant="ghost" onClick={() => setExpBovVisible(false)}>
          Cerrar
        </CButton>

        <CDropdown variant="btn-group" direction="up">
          <CDropdownToggle color="primary">
            <CIcon icon={cilCloudDownload} className="me-2" />
            {exporting ? 'Generando...' : 'Descargar Expediente'}
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => handleExportPdf('completo')}>
              <CIcon icon={cilFile} className="me-2" />
              Completo (PDF)
            </CDropdownItem>
            <CDropdownItem onClick={() => handleExportPdf('sanitario')}>
              <CIcon icon={cilMedicalCross} className="me-2 text-danger" />
              Sanitario (PDF)
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
