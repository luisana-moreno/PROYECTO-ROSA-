import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow } from '@coreui/react'

const AddUserForm = ({ addUserForm, setAddUserForm, roles }) => {
  return (
    <div>
      <CRow className="g-3 mt-2">
        <h4 className="text-green mt-1 me-5">Usuarios Registrados</h4>
        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            placeholder="Nombre"
            aria-label="Nombre"
            value={addUserForm.nombre}
            onChange={(e) => setAddUserForm({ ...addUserForm, nombre: e.target.value })}
          />
          <small className="text-muted">Ingrese el nombre.</small>
        </CCol>
        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            placeholder="Apellido"
            aria-label="Apellido"
            value={addUserForm.apellido}
            onChange={(e) => setAddUserForm({ ...addUserForm, apellido: e.target.value })}
          />
          <small className="text-muted">Ingrese el apellido.</small>
        </CCol>
      </CRow>
      <CRow className="users-las-name g-3 mt-2">
        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            placeholder="Correo"
            aria-label="Correo"
            value={addUserForm.correo}
            onChange={(e) => setAddUserForm({ ...addUserForm, correo: e.target.value })}
          />
          <small className="text-muted">Ingrese el correo.</small>
        </CCol>
        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            type="tel"
            placeholder="Telefono"
            aria-label="Telefono"
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
            <small className="text-danger">El teléfono debe tener exactamente 11 dígitos.</small>
          )}
          <small className="text-muted">Ingrese el telefono (11 dígitos).</small>
        </CCol>
      </CRow>
      <CRow className="g-3 mt-2">
        <CCol md={6}>
          <CFormSelect
            className="modal-name custom-select"
            aria-label="Cargo"
            value={addUserForm.idRol}
            onChange={(e) => setAddUserForm({ ...addUserForm, idRol: e.target.value })}
          >
            <option value="">Seleccione un Cargo</option>
            {roles.map((role) => (
              <option key={role.tma_idrolus} value={role.tma_idrolus}>
                {role.tma_nomrolu}
              </option>
            ))}
          </CFormSelect>
          <small className="text-muted">Seleccione el cargo.</small>
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="password"
            className="modal-name custom-select"
            placeholder="Contraseña"
            aria-label="Contraseña"
            value={addUserForm.contrasena}
            onChange={(e) => setAddUserForm({ ...addUserForm, contrasena: e.target.value })}
          />
          <small className="text-muted">Ingrese la contraseña.</small>
        </CCol>
      </CRow>
    </div>
  )
}

export default AddUserForm
