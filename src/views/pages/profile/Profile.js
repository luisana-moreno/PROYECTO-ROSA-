import React, { useEffect } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { useState } from 'react'
import ProfileForm from './ProfileForm'
import ChangePasswordForm from './ChangePasswordForm'
import { useProfile } from './useProfile'

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

/**
 * Componente principal de perfil de usuario
 */
const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const { user, loading, error, success, updateProfile, changePassword, clearMessages } =
    useProfile()

  const userInitials = getInitials(user?.name)
  const avatarColor = getColorFromName(user?.name)

  // Limpiar mensajes al cambiar de tab
  useEffect(() => {
    clearMessages()
  }, [activeTab])

  //Obtener el nombre del rol

  const handleUpdateProfile = async (profileData) => {
    return await updateProfile(profileData)
  }

  const handleChangePassword = async (passwordData) => {
    return await changePassword(passwordData)
  }

  console.log(user)

  return (
    <CContainer className="mt-4">
      <CRow className="justify-content-center">
        <CCol lg={10}>
          {/* Header con avatar */}
          <CCard className="mb-4">
            <CCardBody className="text-center py-4">
              <div
                className="d-inline-flex align-items-center justify-content-center fw-bold text-white mb-3"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: avatarColor,
                  border: '4px solid #28a745',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  fontSize: '2.5rem',
                }}
              >
                {userInitials}
              </div>
              <h3 className="mb-1">{user?.name || 'Usuario'}</h3>
              <p className="text-muted mb-0">{user?.email || ''}</p>
              <small className="text-muted">
                {user?.roleName || user?.roleName || 'Rol no especificado'}
              </small>
            </CCardBody>
          </CCard>

          {/* Tabs de navegación */}
          <CCard>
            <CCardBody>
              <CNav variant="tabs" role="tablist">
                <CNavItem>
                  <CNavLink
                    href="#"
                    active={activeTab === 'personal'}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab('personal')
                    }}
                    style={{
                      cursor: 'pointer',
                      color: activeTab === 'personal' ? '#28a745' : '#6c757d',
                      borderColor: activeTab === 'personal' ? '#28a745' : 'transparent',
                    }}
                  >
                    Información Personal
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#"
                    active={activeTab === 'security'}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab('security')
                    }}
                    style={{
                      cursor: 'pointer',
                      color: activeTab === 'security' ? '#28a745' : '#6c757d',
                      borderColor: activeTab === 'security' ? '#28a745' : 'transparent',
                    }}
                  >
                    Seguridad
                  </CNavLink>
                </CNavItem>
              </CNav>

              <CTabContent className="mt-4">
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="personal-tab"
                  visible={activeTab === 'personal'}
                >
                  <ProfileForm
                    user={user}
                    onSave={handleUpdateProfile}
                    loading={loading}
                    error={error}
                    success={success}
                  />
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="security-tab"
                  visible={activeTab === 'security'}
                >
                  <ChangePasswordForm
                    onChangePassword={handleChangePassword}
                    loading={loading}
                    error={error}
                    success={success}
                  />
                </CTabPane>
              </CTabContent>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile
