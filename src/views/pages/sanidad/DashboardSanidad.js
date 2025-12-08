import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsF,
  CAlert,
  CListGroup,
  CListGroupItem,
  CBadge,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMedicalCross, cilWarning, cilCalendar, cilCheckCircle } from '@coreui/icons'
// Usando rutas relativas correctas según structure
import {
  getDashboardSanidad,
  getVacunasProximasReporte,
  getBovinosAtencionRequerida,
} from '../../../api/sanidadService'
import { useNavigate } from 'react-router-dom'

const DashboardSanidad = () => {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState({
    vacunasProximas: 0,
    vacunasVencidas: 0,
    prenecesActivas: 0,
    proximaVisita: null,
    tratamientosProximos: 0,
  })
  const [vacunasProximas, setVacunasProximas] = useState([])
  const [bovinosAtencion, setBovinosAtencion] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      const [dashData, vacunas, atencion] = await Promise.all([
        getDashboardSanidad(),
        getVacunasProximasReporte(15),
        getBovinosAtencionRequerida(),
      ])

      setDashboard(dashData)
      setVacunasProximas(vacunas)
      setBovinosAtencion(atencion)
    } catch (error) {
      console.error('Error al cargar dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No programada'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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
              <h4>Control Sanitario de Bovinos</h4>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis">
                Panel de control para gestión de vacunaciones, preñez, visitas veterinarias y
                reportes sanitarios.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Tarjetas de Resumen */}
      <CRow>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3 shadow-sm"
            color="primary"
            icon={<CIcon icon={cilCalendar} height={24} />}
            title="Vacunas Próximas (15 días)"
            value={dashboard.vacunasProximas}
            onClick={() => navigate('/sanidad/vacunaciones')}
            style={{ cursor: 'pointer' }}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3 shadow-sm"
            color="danger"
            icon={<CIcon icon={cilWarning} height={24} />}
            title="Vacunas Vencidas"
            value={dashboard.vacunasVencidas}
            onClick={() => navigate('/sanidad/vacunaciones')}
            style={{ cursor: 'pointer' }}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3 shadow-sm"
            color="success"
            icon={<CIcon icon={cilCheckCircle} height={24} />}
            title="Preñeces Activas"
            value={dashboard.prenecesActivas}
            onClick={() => navigate('/sanidad/prenez')}
            style={{ cursor: 'pointer' }}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3 shadow-sm"
            color="warning"
            icon={<CIcon icon={cilMedicalCross} height={24} />}
            title="Tratamientos Próximos"
            value={dashboard.tratamientosProximos}
            onClick={() => navigate('/sanidad/prenez')}
            style={{ cursor: 'pointer' }}
          />
        </CCol>
      </CRow>

      {/* Próxima Visita Veterinaria */}
      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader className="bg-light">
              <strong className="text-success">Próxima Visita Veterinaria</strong>
            </CCardHeader>
            <CCardBody>
              {dashboard.proximaVisita ? (
                <CAlert color="info" className="d-flex align-items-center border-0 shadow-sm">
                  <CIcon icon={cilCalendar} className="flex-shrink-0 me-2" width={24} height={24} />
                  <div>
                    <strong>Fecha programada:</strong> {formatDate(dashboard.proximaVisita)}
                    <br />
                    <small>
                      {getDiasRestantes(dashboard.proximaVisita) > 0
                        ? `Faltan ${getDiasRestantes(dashboard.proximaVisita)} días`
                        : 'Visita vencida'}
                    </small>
                  </div>
                </CAlert>
              ) : (
                <CAlert color="warning" className="border-0 shadow-sm">
                  No hay próxima visita programada
                </CAlert>
              )}
              <div className="d-grid mt-3">
                <CButton color="success" onClick={() => navigate('/sanidad/visitas-veterinarias')}>
                  Ver Calendario de Visitas
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Accesos Rápidos */}
        <CCol xs={12} md={6}>
          <CCard className="mb-4 shadow-sm border-0">
            <CCardHeader className="bg-light">
              <strong className="text-success">Accesos Rápidos</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2">
                <CButton
                  color="success"
                  variant="outline"
                  className="text-start"
                  onClick={() => navigate('/sanidad/vacunaciones')}
                >
                  <CIcon icon={cilMedicalCross} className="me-2" />
                  Gestionar Vacunación
                </CButton>
                <CButton
                  color="success"
                  variant="outline"
                  className="text-start"
                  onClick={() => navigate('/sanidad/prenez')}
                >
                  <CIcon icon={cilCheckCircle} className="me-2" />
                  Gestionar Reproducción
                </CButton>
                <CButton
                  color="success"
                  variant="outline"
                  className="text-start"
                  onClick={() => navigate('/sanidad/visitas-veterinarias')}
                >
                  <CIcon icon={cilCalendar} className="me-2" />
                  Agendar Visita Veterinaria
                </CButton>
                <CButton
                  color="warning"
                  variant="outline"
                  className="text-start"
                  onClick={() => navigate('/sanidad/reportes')}
                >
                  <CIcon icon={cilWarning} className="me-2" />
                  Ver Reportes Sanitarios
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Alertas de Vacunas Próximas */}
      {vacunasProximas.length > 0 && (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4 shadow-sm border-0">
              <CCardHeader className="bg-danger text-white">
                <strong className="text-white">Vacunas Próximas (15 días)</strong>
              </CCardHeader>
              <CCardBody>
                <CListGroup flush>
                  {vacunasProximas.slice(0, 5).map((vacuna) => (
                    <CListGroupItem
                      key={vacuna.ttr_idvacuna}
                      className="d-flex justify-content-between align-items-center border-bottom"
                    >
                      <div>
                        <strong>Bovino #{vacuna.numero_bovino}</strong> - {vacuna.nombre_vacuna}
                        <br />
                        <small className="text-medium-emphasis">
                          Próxima fecha: {formatDate(vacuna.ttr_proxfech)}
                        </small>
                      </div>
                      <CBadge
                        color={getDiasRestantes(vacuna.ttr_proxfech) <= 7 ? 'danger' : 'warning'}
                      >
                        {getDiasRestantes(vacuna.ttr_proxfech)} días
                      </CBadge>
                    </CListGroupItem>
                  ))}
                </CListGroup>
                {vacunasProximas.length > 5 && (
                  <div className="mt-3 text-center">
                    <CButton
                      color="danger"
                      variant="ghost"
                      onClick={() => navigate('/sanidad/vacunaciones')}
                    >
                      Ver todas ({vacunasProximas.length})
                    </CButton>
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}

      {/* Bovinos que Requieren Atención */}
      {bovinosAtencion.length > 0 && (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4 shadow-sm border-0">
              <CCardHeader className="bg-warning text-dark">
                <strong>Bovinos que Requieren Atención</strong>
              </CCardHeader>
              <CCardBody>
                <CListGroup flush>
                  {bovinosAtencion.slice(0, 5).map((bovino, index) => (
                    <CListGroupItem
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>Bovino #{bovino.ttr_numerobv}</strong>
                        <br />
                        <small className="text-medium-emphasis">
                          {bovino.motivo}: {bovino.detalle}
                        </small>
                      </div>
                      <CBadge color="danger">{formatDate(bovino.fecha_pendiente)}</CBadge>
                    </CListGroupItem>
                  ))}
                </CListGroup>
                {bovinosAtencion.length > 5 && (
                  <div className="mt-3 text-center">
                    <CButton
                      color="danger"
                      variant="ghost"
                      onClick={() => navigate('/sanidad/reportes/atencion-requerida')}
                    >
                      Ver todos ({bovinosAtencion.length})
                    </CButton>
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default DashboardSanidad
