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
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Control Sanitario de Bovinos</strong>
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
            className="mb-3"
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
            className="mb-3"
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
            className="mb-3"
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
            className="mb-3"
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
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Próxima Visita Veterinaria</strong>
            </CCardHeader>
            <CCardBody>
              {dashboard.proximaVisita ? (
                <CAlert color="info">
                  <strong>Fecha programada:</strong> {formatDate(dashboard.proximaVisita)}
                  <br />
                  <small>
                    {getDiasRestantes(dashboard.proximaVisita) > 0
                      ? `Faltan ${getDiasRestantes(dashboard.proximaVisita)} días`
                      : 'Visita vencida'}
                  </small>
                </CAlert>
              ) : (
                <CAlert color="warning">No hay próxima visita programada</CAlert>
              )}
              <CButton color="primary" onClick={() => navigate('/sanidad/visitas-veterinarias')}>
                Ver Visitas
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Accesos Rápidos */}
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Accesos Rápidos</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2">
                <CButton
                  color="primary"
                  variant="outline"
                  onClick={() => navigate('/sanidad/vacunaciones/nueva')}
                >
                  Registrar Vacunación
                </CButton>
                <CButton
                  color="success"
                  variant="outline"
                  onClick={() => navigate('/sanidad/prenez/nueva')}
                >
                  Registrar Preñez
                </CButton>
                <CButton
                  color="info"
                  variant="outline"
                  onClick={() => navigate('/sanidad/visitas-veterinarias/nueva')}
                >
                  Registrar Visita Veterinaria
                </CButton>
                <CButton
                  color="warning"
                  variant="outline"
                  onClick={() => navigate('/sanidad/reportes')}
                >
                  Ver Reportes
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
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Vacunas Próximas (15 días)</strong>
              </CCardHeader>
              <CCardBody>
                <CListGroup>
                  {vacunasProximas.slice(0, 5).map((vacuna) => (
                    <CListGroupItem
                      key={vacuna.ttr_idvacuna}
                      className="d-flex justify-content-between align-items-center"
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
                      color="primary"
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
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Bovinos que Requieren Atención</strong>
              </CCardHeader>
              <CCardBody>
                <CListGroup>
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
