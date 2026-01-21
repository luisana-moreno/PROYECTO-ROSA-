import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CBadge,
  CButton,
  CSpinner,
  CFormSelect,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilMedicalCross,
  cilWarning,
  cilBaby,
  cilCheckCircle,
  cilFilter,
} from '@coreui/icons'
import notificationService from '../../../api/notificationService'

const NotificationsIndex = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all') // all, sanidad, parto, inventario, vencido

  useEffect(() => {
    loadNotifications()
    // Polling cada 60s
    const interval = setInterval(loadNotifications, 60000)
    return () => clearInterval(interval)
  }, [])

  const loadNotifications = async () => {
    console.log('NotificationsIndex: loadNotifications called')
    try {
      const data = await notificationService.getNotifications()
      console.log('NotificationsIndex: data received', data)
      setNotifications(data)
    } catch (error) {
      console.error('Error cargando notificaciones:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'sanidad':
        return cilMedicalCross
      case 'parto':
        return cilBaby
      case 'inventario':
        return cilWarning
      default:
        return cilBell
    }
  }

  const getColorForStatus = (status) => {
    switch (status) {
      case 'danger':
        return 'text-danger'
      case 'warning':
        return 'text-warning'
      case 'info':
        return 'text-info'
      default:
        return 'text-secondary'
    }
  }

  const getBadgeColor = (status) => {
    switch (status) {
      case 'danger':
        return 'danger'
      case 'warning':
        return 'warning'
      case 'info':
        return 'info'
      default:
        return 'secondary'
    }
  }

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'all') return true
    if (filterType === 'vencido') return n.status === 'danger'
    return n.type === filterType
  })

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  console.log(notifications)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>
              <CIcon icon={cilBell} className="me-2" />
              Notificaciones y Alertas
            </strong>
            <div className="d-flex align-items-center">
              <CIcon icon={cilFilter} size="sm" className="me-2 text-muted" />
              <CFormSelect
                size="sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="all">Todas</option>
                <option value="vencido"> Urgentes / Vencidas</option>
                <option value="sanidad"> Sanidad</option>
                <option value="parto"> Partos</option>
                <option value="inventario"> Stock Bajo</option>
              </CFormSelect>
              <CButton
                color="light"
                size="sm"
                className="ms-2"
                onClick={loadNotifications}
                title="Actualizar"
              >
                ↻
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="text-center p-5">
                <CSpinner color="primary" />
              </div>
            ) : filteredNotifications.length === 0 ? (
              <CAlert color="success" className="text-center m-4">
                <CIcon icon={cilCheckCircle} size="xl" className="mb-2" />
                <br />
                ¡Excelente! No hay notificaciones pendientes con el filtro actual.
              </CAlert>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-striped align-middle text-start">
                  <thead className="table-light">
                    <tr>
                      <th className="text-center" style={{ width: '50px' }}>
                        Tipo
                      </th>
                      <th>Notificación</th>
                      <th className="text-center" style={{ width: '120px' }}>
                        Prioridad
                      </th>
                      <th className="text-end" style={{ width: '150px' }}>
                        Fecha
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotifications.map((note, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          <CBadge
                            color={getBadgeColor(note.status === 'danger' ? 'danger' : 'light')}
                            textColor={note.status === 'danger' ? 'white' : 'dark'}
                            shape="rounded-pill"
                            className="p-2"
                          >
                            <CIcon
                              icon={getIcon(note.type)}
                              size="lg"
                              className={
                                note.status !== 'danger' ? getColorForStatus(note.status) : ''
                              }
                            />
                          </CBadge>
                        </td>
                        <td>
                          <div className="fw-bold text-dark">{note.title}</div>
                          <div className="text-medium-emphasis small">{note.message}</div>
                        </td>
                        <td className="text-center">
                          <CBadge color={getBadgeColor(note.status)}>
                            {note.status === 'danger'
                              ? 'ALTA'
                              : note.status === 'warning'
                                ? 'MEDIA'
                                : 'BAJA'}
                          </CBadge>
                        </td>
                        <td className="text-end text-muted small">{formatDate(note.date_ref)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default NotificationsIndex
