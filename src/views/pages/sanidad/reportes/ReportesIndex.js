import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CAlert,
  CButton,
  CFormSelect,
  CProgress,
  CProgressBar,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilWarning,
  cilCheckCircle,
  cilArrowRight,
  cilChartLine,
  cilBell,
  cilMedicalCross,
  cilCalendar,
} from '@coreui/icons'
import {
  getVacunasProximasReporte,
  getCumplimientoVacunacion,
  getBovinosAtencionRequerida,
  getDashboardSanidad,
} from '../../../../api/sanidadService'
import { useNavigate } from 'react-router-dom'

const ReportesIndex = () => {
  const navigate = useNavigate()
  const [vacunasProximas, setVacunasProximas] = useState([])
  const [cumplimiento, setCumplimiento] = useState([])
  const [bovinosAtencion, setBovinosAtencion] = useState([])
  // Estado para dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    vacunasVencidas: 0,
    vacunasProximas: 0,
    prenecesActivas: 0,
    tratamientosProximos: 0,
    proximaVisita: null,
  })

  const [diasFiltro, setDiasFiltro] = useState(30)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReportes()
  }, [diasFiltro])

  const loadReportes = async () => {
    try {
      setLoading(true)
      const [vacunas, cumpl, atencion, stats] = await Promise.all([
        getVacunasProximasReporte(diasFiltro),
        getCumplimientoVacunacion(),
        getBovinosAtencionRequerida(),
        getDashboardSanidad(),
      ])

      setVacunasProximas(vacunas)
      setCumplimiento(cumpl)
      setBovinosAtencion(atencion)
      setDashboardStats(stats)
    } catch (error) {
      console.error('Error al cargar reportes:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('es-ES')
  }

  const getDiasRestantes = (fecha) => {
    if (!fecha) return null
    const hoy = new Date()
    const fechaObj = new Date(fecha)
    const diff = Math.ceil((fechaObj - hoy) / (1000 * 60 * 60 * 24))
    return diff
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader>
              <strong>Reportes de Sanidad e Indicadores Clave</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex align-items-center">
                <CIcon icon={cilChartLine} className="me-3 text-success" size="xl" />
                <p className="text-medium-emphasis mb-0">
                  Visualiza estadísticas detalladas y reportes del estado sanitario del ganado.
                </p>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Widgets de Resumen */}
      <CRow className="mb-4">
        <CCol sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="danger"
            icon={<CIcon icon={cilWarning} height={24} />}
            title="Vacunas Vencidas"
            value={dashboardStats.vacunasVencidas}
            footer={
              <CButton
                color="link"
                className="font-weight-bold text-decoration-none p-0"
                onClick={() => navigate('/sanidad/vacunaciones')}
              >
                Ver pendientes <CIcon icon={cilArrowRight} className="ms-auto" width={16} />
              </CButton>
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            icon={<CIcon icon={cilBell} height={24} />}
            title="Vacunas Próx. (15d)"
            value={dashboardStats.vacunasProximas}
            footer={<span className="text-medium-emphasis small">Programar aplicación</span>}
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="info"
            icon={<CIcon icon={cilMedicalCross} height={24} />}
            title="Preñeces Activas"
            value={dashboardStats.prenecesActivas}
            footer={
              <CButton
                color="link"
                className="font-weight-bold text-decoration-none p-0"
                onClick={() => navigate('/sanidad/prenez')}
              >
                Gestionar <CIcon icon={cilArrowRight} className="ms-auto" width={16} />
              </CButton>
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilCalendar} height={24} />}
            title="Próx. Visita Vet"
            value={dashboardStats.proximaVisita ? formatDate(dashboardStats.proximaVisita) : 'N/A'}
            footer={<span className="text-medium-emphasis small">Agenda veterinaria</span>}
          />
        </CCol>
      </CRow>

      {/* Cumplimiento de Vacunación */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>
                <CIcon icon={cilChartPie} className="me-2" />
                Cumplimiento de Vacunación (Último Año)
              </strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive className="align-middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Vacuna</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Bovinos Vacunados</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Total Bovinos</CTableHeaderCell>
                    <CTableHeaderCell>Cumplimiento</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {cumplimiento.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="fw-bold">{item.vacuna}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {item.bovinos_vacunados}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{item.total_bovinos}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex align-items-center">
                          <CProgress className="flex-grow-1 me-3" height={20}>
                            <CProgressBar
                              value={item.porcentaje_cumplimiento}
                              color={
                                item.porcentaje_cumplimiento >= 80
                                  ? 'success'
                                  : item.porcentaje_cumplimiento >= 50
                                    ? 'warning'
                                    : 'danger'
                              }
                            >
                              {item.porcentaje_cumplimiento}%
                            </CProgressBar>
                          </CProgress>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              {cumplimiento.length === 0 && (
                <CAlert color="info" className="border-0 shadow-sm">
                  No hay datos de cumplimiento disponibles para mostrar.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Vacunas Próximas */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>
                <CIcon icon={cilWarning} className="me-2" />
                Alertas de Vacunación
              </strong>
              <div>
                <CFormSelect
                  size="sm"
                  value={diasFiltro}
                  onChange={(e) => setDiasFiltro(parseInt(e.target.value))}
                  style={{ width: 'auto', display: 'inline-block' }}
                >
                  <option value="7">Próximos 7 días</option>
                  <option value="15">Próximos 15 días</option>
                  <option value="30">Próximos 30 días</option>
                  <option value="60">Próximos 60 días</option>
                </CFormSelect>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive className="align-middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Bovino</CTableHeaderCell>
                    <CTableHeaderCell>Vacuna</CTableHeaderCell>
                    <CTableHeaderCell>Última Aplicación</CTableHeaderCell>
                    <CTableHeaderCell>Próxima Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {vacunasProximas.map((vacuna) => {
                    const diasRestantes = getDiasRestantes(vacuna.ttr_proxfech)
                    return (
                      <CTableRow key={vacuna.ttr_idvacuna}>
                        <CTableDataCell className="fw-semibold">
                          #{vacuna.numero_bovino}
                        </CTableDataCell>
                        <CTableDataCell>{vacuna.nombre_vacuna}</CTableDataCell>
                        <CTableDataCell>{formatDate(vacuna.ttr_fechaapl)}</CTableDataCell>
                        <CTableDataCell className="fw-bold">
                          {formatDate(vacuna.ttr_proxfech)}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            color={
                              diasRestantes < 0
                                ? 'danger'
                                : diasRestantes <= 7
                                  ? 'warning'
                                  : 'success'
                            }
                          >
                            {diasRestantes < 0
                              ? 'Vencida'
                              : diasRestantes === 0
                                ? 'Hoy'
                                : `${diasRestantes} días`}
                          </CBadge>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>

              {vacunasProximas.length === 0 && (
                <CAlert color="success" className="border-0 shadow-sm">
                  <CIcon icon={cilCheckCircle} className="me-2" />
                  No hay vacunas pendientes para el período seleccionado.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Bovinos que Requieren Atención */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader>
              <strong>Bovinos que Requieren Atención Inmediata</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive className="align-middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Bovino</CTableHeaderCell>
                    <CTableHeaderCell>Motivo</CTableHeaderCell>
                    <CTableHeaderCell>Detalle</CTableHeaderCell>
                    <CTableHeaderCell>Fecha Pendiente</CTableHeaderCell>
                    <CTableHeaderCell>Prioridad</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {bovinosAtencion.map((bovino, index) => {
                    const diasAtrasado = Math.abs(getDiasRestantes(bovino.fecha_pendiente))
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell className="fw-bold">#{bovino.ttr_numerobv}</CTableDataCell>
                        <CTableDataCell>{bovino.motivo}</CTableDataCell>
                        <CTableDataCell>{bovino.detalle}</CTableDataCell>
                        <CTableDataCell>{formatDate(bovino.fecha_pendiente)}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            color={
                              diasAtrasado > 30 ? 'danger' : diasAtrasado > 7 ? 'warning' : 'info'
                            }
                          >
                            {diasAtrasado > 30 ? 'Alta' : diasAtrasado > 7 ? 'Media' : 'Baja'}
                          </CBadge>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>

              {bovinosAtencion.length === 0 && (
                <CAlert color="success" className="border-0 shadow-sm">
                  <CIcon icon={cilCheckCircle} className="me-2" />
                  ¡Excelente! No hay bovinos con atención pendiente.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Botones de Acceso Rápido */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader className="bg-light">
              <strong className="text-success">Acciones Rápidas</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <CButton
                  color="success"
                  variant="outline"
                  onClick={() => navigate('/sanidad/vacunaciones')}
                >
                  Ir a Vacunaciones
                </CButton>
                <CButton
                  color="success"
                  variant="outline"
                  onClick={() => navigate('/sanidad/prenez')}
                >
                  Ir a Gestión de Preñez
                </CButton>
                <CButton
                  color="success"
                  variant="outline"
                  onClick={() => navigate('/sanidad/visitas-veterinarias')}
                >
                  Ir a Visitas Veterinarias
                </CButton>
                <CButton
                  color="warning"
                  variant="outline"
                  onClick={() => navigate('/sanidad/planes-vacunacion')}
                >
                  Ir a Planes de Vacunación
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ReportesIndex
