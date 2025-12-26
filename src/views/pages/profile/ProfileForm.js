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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilX } from '@coreui/icons'

/**
 * Formulario para editar información personal del usuario
 */
const ProfileForm = ({ user, onSave, loading, error, success }) => {
  const [formData, setFormData] = useState({
    nombre: user?.name?.split(' ')[0] || '',
    apellido: user?.name?.split(' ').slice(1).join(' ') || '',
    correo: user?.email || '',
    telefono: user?.telefono || '',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [validationError, setValidationError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setValidationError('')
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones
    if (!formData.nombre || !formData.apellido || !formData.correo) {
      setValidationError('Nombre, apellido y correo son requeridos')
      return
    }

    if (!validateEmail(formData.correo)) {
      setValidationError('Por favor ingresa un correo electrónico válido')
      return
    }

    const success = await onSave(formData)
    if (success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      nombre: user?.name?.split(' ')[0] || '',
      apellido: user?.name?.split(' ').slice(1).join(' ') || '',
      correo: user?.email || '',
      telefono: user?.telefono || '',
    })
    setIsEditing(false)
    setValidationError('')
  }

  return (
    <CCard>
      <CCardHeader className="fw-bold" style={{ backgroundColor: '#28a745', color: 'white' }}>
        Información Personal
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
            <CCol md={6}>
              <CFormLabel htmlFor="nombre">Nombre</CFormLabel>
              <CFormInput
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={!isEditing || loading}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="apellido">Apellido</CFormLabel>
              <CFormInput
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                disabled={!isEditing || loading}
                required
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="correo">Correo Electrónico</CFormLabel>
              <CFormInput
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                disabled={!isEditing || loading}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="telefono">Teléfono</CFormLabel>
              <CFormInput
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={!isEditing || loading}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="rol">Rol</CFormLabel>
              <CFormInput
                type="text"
                id="rol"
                value={user?.roleName || user?.rol_nombre || 'N/A'}
                disabled
                style={{ backgroundColor: '#e9ecef' }}
              />
              <small className="text-muted">El rol no puede ser modificado</small>
            </CCol>
          </CRow>

          <div className="d-flex gap-2">
            {!isEditing ? (
              <CButton color="success" onClick={() => setIsEditing(true)} disabled={loading}>
                Editar Perfil
              </CButton>
            ) : (
              <>
                <CButton type="submit" color="success" disabled={loading}>
                  {loading ? (
                    <>
                      <CSpinner size="sm" className="me-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <CIcon icon={cilSave} className="me-2" />
                      Guardar Cambios
                    </>
                  )}
                </CButton>
                <CButton type="button" color="secondary" onClick={handleCancel} disabled={loading}>
                  <CIcon icon={cilX} className="me-2" />
                  Cancelar
                </CButton>
              </>
            )}
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default ProfileForm
