import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownDivider, // Añadido
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
  cilWarning,
  cilMedicalCross,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import notificationService from '../api/notificationService'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('light')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  // Cargar notificaciones
  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await notificationService.getNotifications()
      setNotifications(data)
      setUnreadCount(data.length)
    }

    fetchNotifications()
    // Polling opcional cada 60 segundos
    const interval = setInterval(fetchNotifications, 60000)
    return () => clearInterval(interval)
  }, [])

  const getIconForType = (type) => {
    switch (type) {
      case 'sanidad':
        return cilMedicalCross
      case 'parto':
        return cilBell
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
      default:
        return 'text-info'
    }
  }

  return (
    <CHeader
      position="sticky"
      className="mb-4 p-0"
      ref={headerRef}
      style={{
        background: 'linear-gradient(to right, #ffffff 0%, #f8f9fa 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
      <CContainer className="px-3 px-md-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{
            marginInlineStart: '-8px',
            transition: 'all 0.2s ease',
            padding: '0.5rem',
          }}
          className="header-toggler"
        >
          <CIcon
            icon={cilMenu}
            size="lg"
            style={{
              color: '#212631',
              transition: 'all 0.2s ease',
            }}
            className="menu-icon"
          />
        </CHeaderToggler>
        <CHeaderNav className="ms-auto d-flex align-items-center">
          <CDropdown variant="nav-item" placement="bottom-end" className="me-2 me-md-3">
            <CDropdownToggle caret={false} className="py-0 position-relative">
              <CIcon icon={cilBell} size="lg" style={{ color: '#212631', cursor: 'pointer' }} />
              {unreadCount > 0 && (
                <span
                  className="position-absolute badge rounded-pill"
                  style={{
                    backgroundColor: '#dc3545',
                    fontSize: '0.65rem',
                    padding: '0.25em 0.5em',
                    top: '-5px',
                    right: '-5px',
                  }}
                >
                  {unreadCount}
                  <span className="visually-hidden">notificaciones</span>
                </span>
              )}
            </CDropdownToggle>
            <CDropdownMenu
              className="pt-0"
              style={{ minWidth: '300px', maxHeight: '400px', overflowY: 'auto' }}
            >
              <CDropdownItem className="fw-bold text-center bg-light disabled">
                Notificaciones
              </CDropdownItem>
              {notifications.length === 0 ? (
                <CDropdownItem className="text-center text-muted py-3">
                  No tienes notificaciones pendientes
                </CDropdownItem>
              ) : (
                notifications.map((notif, index) => (
                  <CDropdownItem key={index} href="#">
                    <div className="d-flex align-items-center mb-1">
                      <CIcon
                        icon={getIconForType(notif.type)}
                        className={`me-2 ${getColorForStatus(notif.status)}`}
                      />
                      <strong className="small">{notif.title}</strong>
                    </div>
                    <div
                      className="small text-medium-emphasis text-wrap"
                      style={{ lineHeight: '1.2' }}
                    >
                      {notif.message}
                    </div>
                  </CDropdownItem>
                ))
              )}
              <CDropdownDivider />
              <CDropdownItem
                href="#/notifications"
                className="text-center small fw-bold text-primary py-2"
              >
                Ver todas las notificaciones
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
        <CHeaderNav className="ms-1 ms-md-2">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
