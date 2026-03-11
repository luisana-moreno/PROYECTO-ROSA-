import React from 'react'
import { CCol, CFormInput, CFormSelect, CFormLabel, CRow, CAlert } from '@coreui/react'

const AddUserForm = ({ addUserForm, setAddUserForm, roles }) => {
  return (
    <div>
      <CAlert color="info" className="mb-4">
        <strong>Información:</strong> Complete todos los campos marcados con (*) para registrar un
        nuevo usuario.
      </CAlert>

      <CRow className="mb-3">
        <CCol md={6}>
          <CFormLabel>Nombre *</CFormLabel>
          <CFormInput
            placeholder="Ingrese el nombre"
            value={addUserForm.nombre}
            onChange={(e) => setAddUserForm({ ...addUserForm, nombre: e.target.value })}
            maxLength={100}
            required
          />
          <small className="text-muted">Máximo 100 caracteres</small>
        </CCol>
        <CCol md={6}>
          <CFormLabel>Apellido *</CFormLabel>
          <CFormInput
            placeholder="Ingrese el apellido"
            value={addUserForm.apellido}
            onChange={(e) => setAddUserForm({ ...addUserForm, apellido: e.target.value })}
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
            value={addUserForm.correo}
            onChange={(e) => setAddUserForm({ ...addUserForm, correo: e.target.value })}
            maxLength={75}
            required
          />
          <small className="text-muted">Máximo 75 caracteres</small>
        </CCol>
        <CCol md={6}>
          <CFormLabel>Teléfono *</CFormLabel>
          <CFormInput
            type="tel"
            placeholder="04121234567"
            value={addUserForm.telefono}
            onChange={(e) => {
              const value = e.target.value
              if (value.length <= 11 && /^\d*$/.test(value)) {
                setAddUserForm({ ...addUserForm, telefono: value })
              }
            }}
            maxLength="11"
            pattern="[0-9]{11}"
            required
          />
          {addUserForm.telefono && addUserForm.telefono.length !== 11 && (
            <small className="text-danger">El teléfono debe tener exactamente 11 dígitos</small>
          )}
          {(!addUserForm.telefono || addUserForm.telefono.length === 11) && (
            <small className="text-muted">Debe tener exactamente 11 dígitos</small>
          )}
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol md={6}>
          <CFormLabel>Rol *</CFormLabel>
          <CFormSelect
            value={addUserForm.idRol}
            onChange={(e) => setAddUserForm({ ...addUserForm, idRol: e.target.value })}
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
          <CFormLabel>Contraseña *</CFormLabel>
          <CFormInput
            type="password"
            placeholder="Ingrese una contraseña segura"
            value={addUserForm.contrasena}
            onChange={(e) => setAddUserForm({ ...addUserForm, contrasena: e.target.value })}
            maxLength={50}
            required
          />
          <small className="text-muted">Máximo 50 caracteres</small>
        </CCol>
      </CRow>
    </div>
  )
}

export default AddUserForm
