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
} from '@coreui/react'
import {
  getVacunasProximasReporte,
  getCumplimientoVacunacion,
  getBovinosAtencionRequerida,
} from '../../../../api/sanidadService'
import { useNavigate } from 'react-router-dom'

const ReportesIndex = () => {
  const navigate = useNavigate()
  const [vacunasProximas, setVacunasProximas] = useState([])
  const [cumplimiento, setCumplimiento] = useState([])
  const [bovinosAtencion, setBovinosAtencion] = useState([])
  const [diasFiltro, setDiasFiltro] = useState(30)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReportes()
  }, [diasFiltro])

  const loadReportes = async () => {
    try {
      setLoading(true)
      const [vacunas, cumpl, atencion] = await Promise.all([
        getVacunasProximasReporte(diasFiltro),
        getCumplimientoVacunacion(),
        getBovinosAtencionRequerida(),
      ])

      setVacunasProximas(vacunas)
      setCumplimiento(cumpl)
      setBovinosAtencion(atencion)
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
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Reportes de Sanidad</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis">
                Visualiza estadísticas y reportes del estado sanitario del ganado.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Cumplimiento de Vacunación */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Cumplimiento de Vacunación (Último Año)</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Vacuna</CTableHeaderCell>
                    <CTableHeaderCell>Bovinos Vacunados</CTableHeaderCell>
                    <CTableHeaderCell>Total Bovinos</CTableHeaderCell>
                    <CTableHeaderCell>Cumplimiento</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {cumplimiento.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{item.vacuna}</CTableDataCell>
                      <CTableDataCell>{item.bovinos_vacunados}</CTableDataCell>
                      <CTableDataCell>{item.total_bovinos}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex align-items-center">
                          <div className="progress flex-grow-1 me-2" style={{ height: '20px' }}>
                            <div
                              className={`progress-bar ${
                                item.porcentaje_cumplimiento >= 80
                                  ? 'bg-success'
                                  : item.porcentaje_cumplimiento >= 50
                                    ? 'bg-warning'
                                    : 'bg-danger'
                              }`}
                              style={{ width: `${item.porcentaje_cumplimiento}%` }}
                            >
                              {item.porcentaje_cumplimiento}%
                            </div>
                          </div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              {cumplimiento.length === 0 && (
                <CAlert color="info">No hay datos de cumplimiento disponibles</CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Vacunas Próximas */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Vacunas Próximas</strong>
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
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Bovino</CTableHeaderCell>
                    <CTableHeaderCell>Vacuna</CTableHeaderCell>
                    <CTableHeaderCell>Última Aplicación</CTableHeaderCell>
                    <CTableHeaderCell>Próxima Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Días Restantes</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {vacunasProximas.map((vacuna) => {
                    const diasRestantes = getDiasRestantes(vacuna.ttr_proxfech)
                    return (
                      <CTableRow key={vacuna.ttr_idvacuna}>
                        <CTableDataCell>#{vacuna.numero_bovino}</CTableDataCell>
                        <CTableDataCell>{vacuna.nombre_vacuna}</CTableDataCell>
                        <CTableDataCell>{formatDate(vacuna.ttr_fechaapl)}</CTableDataCell>
                        <CTableDataCell>{formatDate(vacuna.ttr_proxfech)}</CTableDataCell>
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
                <CAlert color="success">No hay vacunas próximas en el período seleccionado</CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Bovinos que Requieren Atención */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Bovinos que Requieren Atención</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped hover responsive>
                <CTableHead>
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
                        <CTableDataCell>#{bovino.ttr_numerobv}</CTableDataCell>
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
                <CAlert color="success">¡Excelente! No hay bovinos pendientes de atención</CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Botones de Acceso Rápido */}
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>Acciones Rápidas</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2 d-md-flex">
                <CButton color="primary" onClick={() => navigate('/sanidad/vacunaciones')}>
                  Ir a Vacunaciones
                </CButton>
                <CButton color="success" onClick={() => navigate('/sanidad/prenez')}>
                  Ir a Gestión de Preñez
                </CButton>
                <CButton color="info" onClick={() => navigate('/sanidad/visitas-veterinarias')}>
                  Ir a Visitas Veterinarias
                </CButton>
                <CButton color="warning" onClick={() => navigate('/sanidad/planes-vacunacion')}>
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
