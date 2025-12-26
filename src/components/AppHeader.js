import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
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
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('light')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

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
          <CNavItem className="me-2 me-md-3">
            <CNavLink
              href="#"
              className="position-relative d-flex align-items-center justify-content-center p-2"
              style={{
                transition: 'all 0.2s ease',
                borderRadius: '8px',
              }}
            >
              <CIcon
                icon={cilBell}
                size="lg"
                style={{
                  color: '#212631',
                  transition: 'all 0.2s ease',
                }}
                className="bell-icon"
              />
              <span
                className="position-absolute badge rounded-pill"
                style={{
                  backgroundColor: '#28a745',
                  fontSize: '0.65rem',
                  padding: '0.25em 0.5em',
                  top: '0',
                  right: '0',
                  transform: 'translate(25%, -25%)',
                }}
              >
                3<span className="visually-hidden">notificaciones sin leer</span>
              </span>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-1 ms-md-2">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
