import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
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
  cilTrash,
  cilEnvelopeOpen,
  cilEnvelopeClosed,
} from '@coreui/icons'
import notificationService from '../../../api/notificationService'
import { toast } from 'react-toastify'

const NotificationsIndex = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    loadNotifications()
    const interval = setInterval(loadNotifications, 60000)
    return () => clearInterval(interval)
  }, [])

  const loadNotifications = async () => {
    try {
      const data = await notificationService.getNotifications()
      setNotifications(data)
    } catch (error) {
      console.error('Error cargando notificaciones:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (notif) => {
    if (!notif.persistida) return
    try {
      await notificationService.markAsRead(notif.id)
      loadNotifications()
    } catch (error) {
      toast.error('Error al marcar como leída')
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead()
      toast.success('Todas las notificaciones marcadas como leídas')
      loadNotifications()
    } catch (error) {
      toast.error('Error al marcar todas como leídas')
    }
  }

  const handleDeleteNotif = async (notif) => {
    if (!notif.persistida) return
    try {
      await notificationService.deleteNotification(notif.id)
      toast.success('Notificación eliminada')
      loadNotifications()
    } catch (error) {
      toast.error('Error al eliminar notificación')
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'sanidad':
        return cilMedicalCross
      case 'parto':
        return cilBaby
      case 'secado':
        return cilWarning
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
    if (filterType === 'no_leida') return !n.leida
    return n.type === filterType
  })

  const unreadCount = notifications.filter((n) => !n.leida).length

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="d-flex align-items-center">
              <strong>
                <CIcon icon={cilBell} className="me-2" />
                Notificaciones y Alertas
              </strong>
              {unreadCount > 0 && (
                <CBadge color="danger" className="ms-2" shape="rounded-pill">
                  {unreadCount} sin leer
                </CBadge>
              )}
            </div>
            <div className="d-flex align-items-center gap-2">
              <CIcon icon={cilFilter} size="sm" className="text-muted" />
              <CFormSelect
                size="sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="all">Todas</option>
                <option value="no_leida">No Leídas</option>
                <option value="vencido">Urgentes / Vencidas</option>
                <option value="sanidad">Sanidad</option>
                <option value="parto">Partos</option>
                <option value="secado">Secado</option>
                <option value="inventario">Stock Bajo</option>
              </CFormSelect>
              <CButton color="light" size="sm" onClick={loadNotifications} title="Actualizar">
                ↻
              </CButton>
              {unreadCount > 0 && (
                <CButton
                  color="success"
                  size="sm"
                  className="text-white"
                  onClick={handleMarkAllAsRead}
                  title="Marcar todas como leídas"
                >
                  <CIcon icon={cilEnvelopeOpen} className="me-1" />
                  Marcar todas
                </CButton>
              )}
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
                <table className="table table-hover align-middle text-start">
                  <thead className="table-light">
                    <tr>
                      <th className="text-center" style={{ width: '50px' }}>
                        Tipo
                      </th>
                      <th>Notificación</th>
                      <th className="text-center" style={{ width: '100px' }}>
                        Prioridad
                      </th>
                      <th className="text-end" style={{ width: '150px' }}>
                        Fecha
                      </th>
                      <th className="text-center" style={{ width: '100px' }}>
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotifications.map((note, index) => (
                      <tr
                        key={`${note.type}-${note.id}-${index}`}
                        className={!note.leida ? 'table-light fw-normal' : ''}
                        style={!note.leida ? { borderLeft: '3px solid var(--cui-primary)' } : {}}
                      >
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
                          <div className={`text-dark ${!note.leida ? 'fw-bold' : ''}`}>
                            {!note.leida && (
                              <CIcon
                                icon={cilEnvelopeClosed}
                                size="sm"
                                className="me-1 text-primary"
                              />
                            )}
                            {note.title}
                          </div>
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
                        <td className="text-center">
                          <div className="d-flex gap-1 justify-content-center">
                            {note.persistida && !note.leida && (
                              <CButton
                                color="primary"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(note)}
                                title="Marcar como leída"
                              >
                                <CIcon icon={cilEnvelopeOpen} />
                              </CButton>
                            )}
                            {note.persistida && (
                              <CButton
                                color="danger"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteNotif(note)}
                                title="Eliminar"
                              >
                                <CIcon icon={cilTrash} />
                              </CButton>
                            )}
                          </div>
                        </td>
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
