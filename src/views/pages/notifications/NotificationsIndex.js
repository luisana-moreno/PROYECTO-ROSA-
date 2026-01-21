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
    try {
      const data = await notificationService.getNotifications()
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
                <option value="vencido">⚠️ Urgentes / Vencidas</option>
                <option value="sanidad">🏥 Sanidad</option>
                <option value="parto">🤰 Partos</option>
                <option value="inventario">📦 Stock Bajo</option>
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
              <CListGroup>
                {filteredNotifications.map((note, index) => (
                  <CListGroupItem
                    key={index}
                    className={`d-flex align-items-start p-3 ${note.status === 'danger' ? 'list-group-item-danger' : ''}`}
                  >
                    <div className="me-3 mt-1">
                      <CBadge
                        color={getBadgeColor(note.status)}
                        shape="rounded-pill"
                        className="p-2"
                      >
                        <CIcon icon={getIcon(note.type)} size="lg" />
                      </CBadge>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 text-truncate" style={{ maxWidth: '80%' }}>
                          {note.title}
                        </h5>
                        <small className="text-medium-emphasis text-nowrap">
                          {formatDate(note.date_ref)}
                        </small>
                      </div>
                      <p className="mb-1 fw-semibold">{note.message}</p>
                      <small className="text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>
                        {note.type} •{' '}
                        {note.status === 'danger'
                          ? 'Prioridad Alta'
                          : note.status === 'warning'
                            ? 'Prioridad Media'
                            : 'Informativo'}
                      </small>
                    </div>
                  </CListGroupItem>
                ))}
              </CListGroup>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default NotificationsIndex
