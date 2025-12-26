import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useAuth } from '../../context/AuthContext'

// Función para obtener las iniciales del usuario
const getInitials = (name) => {
  if (!name) return 'U'
  const names = name.trim().split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase()
  }
  return name[0].toUpperCase()
}

// Función para generar un color basado en el nombre
const getColorFromName = (name) => {
  if (!name) return '#28a745'
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = hash % 360
  return `hsl(${hue}, 65%, 45%)`
}

const AppHeaderDropdown = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userName = user?.name || 'Usuario'
  const userInitials = getInitials(userName)
  const avatarColor = getColorFromName(userName)

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        className="py-0 pe-0 border-0"
        caret={false}
        style={{
          transition: 'all 0.2s ease',
        }}
      >
        <div
          className="avatar-hover d-flex align-items-center justify-content-center fw-bold text-white"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: avatarColor,
            border: '2px solid #28a745',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          {userInitials}
        </div>
      </CDropdownToggle>
      <CDropdownMenu
        className="pt-0 shadow-lg"
        placement="bottom-end"
        style={{
          minWidth: '220px',
          borderRadius: '8px',
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <CDropdownHeader
          className="fw-semibold text-white"
          style={{
            backgroundColor: '#28a745',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            padding: '0.75rem 1rem',
          }}
        >
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center fw-bold text-white me-2"
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                fontSize: '0.85rem',
              }}
            >
              {userInitials}
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
                {userName}
              </span>
              <small style={{ fontSize: '0.75rem', opacity: 0.9 }}>{user?.email || ''}</small>
            </div>
          </div>
        </CDropdownHeader>
        <CDropdownItem
          onClick={() => navigate('/profile')}
          className="dropdown-item-hover"
          style={{
            padding: '0.5rem 1rem',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
        >
          <CIcon icon={cilUser} className="me-2" style={{ color: '#28a745' }} />
          Perfil
        </CDropdownItem>
        <CDropdownItem
          href="#"
          className="dropdown-item-hover"
          style={{
            padding: '0.5rem 1rem',
            transition: 'all 0.2s ease',
          }}
        >
          <CIcon icon={cilSettings} className="me-2" style={{ color: '#28a745' }} />
          Configuración
        </CDropdownItem>
        <CDropdownDivider style={{ margin: '0.5rem 0' }} />
        <CDropdownItem
          onClick={handleLogout}
          className="dropdown-item-hover"
          style={{
            padding: '0.5rem 1rem',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
        >
          <CIcon icon={cilAccountLogout} className="me-2" style={{ color: '#dc3545' }} />
          Cerrar Sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
