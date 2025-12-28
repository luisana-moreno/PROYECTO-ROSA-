import React from 'react'
import { CCol, CFormInput, CFormSelect, CFormLabel, CRow, CAlert } from '@coreui/react'
import { useAuth } from 'src/context/AuthContext'

const EditUserForm = ({ currentUser, setCurrentUser, roles }) => {
  const { canChangePassword } = useAuth()

  // Verificar si se puede cambiar la contraseña del usuario actual
  const canEditPassword = currentUser
    ? canChangePassword(currentUser.ttr_idusuar, currentUser.idRol || currentUser.ttr_idrolus)
    : true
  return (
    <div>
      <CAlert color="warning" className="mb-4">
        <strong>Nota:</strong> La contraseña solo se actualizará si ingresa una nueva. Déjela en
        blanco para mantener la actual.
      </CAlert>

      <CRow className="mb-3">
        <CCol md={6}>
          <CFormLabel>Nombre *</CFormLabel>
          <CFormInput
            placeholder="Ingrese el nombre"
            value={currentUser?.nombre || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, nombre: e.target.value })}
            maxLength={100}
            required
          />
          <small className="text-muted">Máximo 100 caracteres</small>
        </CCol>
        <CCol md={6}>
          <CFormLabel>Apellido *</CFormLabel>
          <CFormInput
            placeholder="Ingrese el apellido"
            value={currentUser?.apellido || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, apellido: e.target.value })}
            maxLength={100}
            required
          />
          <small className="text-muted">Máximo 100 caracteres</small>
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={6}>
          <CFormLabel>Correo Electrónico *</CFormLabel>
          <CFormInput
            type="email"
            placeholder="ejemplo@correo.com"
            value={currentUser?.correo || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, correo: e.target.value })}
            maxLength={100}
            required
          />
          <small className="text-muted">Máximo 100 caracteres</small>
        </CCol>
        <CCol md={6}>
          <CFormLabel>Teléfono *</CFormLabel>
          <CFormInput
            type="tel"
            placeholder="04121234567"
            value={currentUser?.telefono || ''}
            onChange={(e) => {
              const value = e.target.value
              if (value.length <= 11 && /^\d*$/.test(value)) {
                setCurrentUser({ ...currentUser, telefono: value })
              }
            }}
            maxLength="11"
            pattern="[0-9]{11}"
            required
          />
          {currentUser?.telefono && currentUser.telefono.length !== 11 && (
            <small className="text-danger">El teléfono debe tener exactamente 11 dígitos</small>
          )}
          {(!currentUser?.telefono || currentUser.telefono.length === 11) && (
            <small className="text-muted">Debe tener exactamente 11 dígitos</small>
          )}
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={6}>
          <CFormLabel>Rol *</CFormLabel>
          <CFormSelect
            value={currentUser?.idRol || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, idRol: e.target.value })}
            required
          >
            <option value="">Seleccione un rol</option>
            {roles.map((role) => (
              <option key={role.tma_idrolus} value={role.tma_idrolus}>
                {role.tma_nomrolu}
              </option>
            ))}
          </CFormSelect>
          <small className="text-muted">Define los permisos del usuario</small>
        </CCol>
        <CCol md={6}>
          <CFormLabel>Nueva Contraseña (opcional)</CFormLabel>
          <CFormInput
            type="password"
            placeholder={
              canEditPassword
                ? 'Dejar en blanco para no cambiar'
                : 'No puede cambiar esta contraseña'
            }
            onChange={(e) => setCurrentUser({ ...currentUser, contrasena: e.target.value })}
            maxLength={255}
            disabled={!canEditPassword}
          />
          {canEditPassword ? (
            <small className="text-muted">Solo si desea cambiarla</small>
          ) : (
            <small className="text-danger">
              Solo el superadmin puede cambiar su propia contraseña
            </small>
          )}
        </CCol>
      </CRow>

      {!canEditPassword && (
        <CAlert color="info" className="mt-3">
          <strong>Información:</strong> Este usuario es un superadmin. Por seguridad, solo puede
          cambiar su propia contraseña.
        </CAlert>
      )}
    </div>
  )
}

export default EditUserForm
