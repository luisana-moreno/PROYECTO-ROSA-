import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CAlert,
  CSpinner,
  CInputGroup,
  CInputGroupText,
  CProgress,
  CProgressBar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilLockUnlocked } from '@coreui/icons'

/**
 * Formulario para cambiar la contraseña del usuario
 */
const ChangePasswordForm = ({ onChangePassword, loading, error, success }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [validationError, setValidationError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setValidationError('')
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Calcular fortaleza de la contraseña
  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 20
    if (password.length >= 12) strength += 10
    if (/[a-z]/.test(password)) strength += 20
    if (/[A-Z]/.test(password)) strength += 20
    if (/[0-9]/.test(password)) strength += 15
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 15
    return strength
  }

  const getStrengthColor = (strength) => {
    if (strength < 40) return 'danger'
    if (strength < 70) return 'warning'
    return 'success'
  }

  const getStrengthLabel = (strength) => {
    if (strength < 40) return 'Débil'
    if (strength < 70) return 'Media'
    return 'Fuerte'
  }

  const passwordStrength = calculatePasswordStrength(formData.newPassword)

  const validateForm = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setValidationError('Todos los campos son requeridos')
      return false
    }

    if (formData.newPassword.length < 8) {
      setValidationError('La contraseña debe tener al menos 8 caracteres')
      return false
    }

    if (!/[A-Z]/.test(formData.newPassword)) {
      setValidationError('La contraseña debe contener al menos una letra mayúscula')
      return false
    }

    if (!/[a-z]/.test(formData.newPassword)) {
      setValidationError('La contraseña debe contener al menos una letra minúscula')
      return false
    }

    if (!/[0-9]/.test(formData.newPassword)) {
      setValidationError('La contraseña debe contener al menos un número')
      return false
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)) {
      setValidationError('La contraseña debe contener al menos un carácter especial')
      return false
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError('Las contraseñas no coinciden')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const success = await onChangePassword(formData)
    if (success) {
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    }
  }

  return (
    <CCard>
      <CCardHeader className="fw-bold" style={{ backgroundColor: '#28a745', color: 'white' }}>
        Cambiar Contraseña
      </CCardHeader>
      <CCardBody>
        {validationError && (
          <CAlert color="danger" dismissible onClose={() => setValidationError('')}>
            {validationError}
          </CAlert>
        )}
        {error && (
          <CAlert color="danger" dismissible>
            {error}
          </CAlert>
        )}
        {success && (
          <CAlert color="success" dismissible>
            {success}
          </CAlert>
        )}

        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="currentPassword">Contraseña Actual</CFormLabel>
              <CInputGroup>
                <CFormInput
                  type={showPasswords.current ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <CInputGroupText
                  onClick={() => togglePasswordVisibility('current')}
                  style={{ cursor: 'pointer' }}
                >
                  <CIcon icon={showPasswords.current ? cilLockUnlocked : cilLockLocked} />
                </CInputGroupText>
              </CInputGroup>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="newPassword">Nueva Contraseña</CFormLabel>
              <CInputGroup>
                <CFormInput
                  type={showPasswords.new ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <CInputGroupText
                  onClick={() => togglePasswordVisibility('new')}
                  style={{ cursor: 'pointer' }}
                >
                  <CIcon icon={showPasswords.new ? cilLockUnlocked : cilLockLocked} />
                </CInputGroupText>
              </CInputGroup>
              {formData.newPassword && (
                <div className="mt-2">
                  <small className="text-muted">
                    Fortaleza: <strong>{getStrengthLabel(passwordStrength)}</strong>
                  </small>
                  <CProgress className="mt-1" height={5}>
                    <CProgressBar
                      color={getStrengthColor(passwordStrength)}
                      value={passwordStrength}
                    />
                  </CProgress>
                </div>
              )}
              <small className="text-muted">
                Mínimo 8 caracteres, debe incluir mayúsculas, minúsculas, números y caracteres
                especiales
              </small>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="confirmPassword">Confirmar Nueva Contraseña</CFormLabel>
              <CInputGroup>
                <CFormInput
                  type={showPasswords.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <CInputGroupText
                  onClick={() => togglePasswordVisibility('confirm')}
                  style={{ cursor: 'pointer' }}
                >
                  <CIcon icon={showPasswords.confirm ? cilLockUnlocked : cilLockLocked} />
                </CInputGroupText>
              </CInputGroup>
            </CCol>
          </CRow>

          <CButton type="submit" color="success" disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Cambiando...
              </>
            ) : (
              'Cambiar Contraseña'
            )}
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default ChangePasswordForm
