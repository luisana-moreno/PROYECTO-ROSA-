import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow } from '@coreui/react'

const EditUserForm = ({ currentUser, setCurrentUser, roles }) => {
  return (
    <div>
      <CRow className="g-3 mt-2">
        <h4 className="text-green mt-1 me-5">Editar Datos del Usuario</h4>
        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            placeholder="Nombre"
            aria-label="Nombre"
            value={currentUser?.nombre || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, nombre: e.target.value })}
          />
          <small className="text-muted">Ingrese el primer nombre.</small>
        </CCol>
        <CCol md={6}>
          <CFormInput
            className="modal-name custom-select"
            placeholder="Apellido"
            aria-label="Apellido"
            value={currentUser?.apellido || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, apellido: e.target.value })}
          />
          <small className="text-muted">Ingrese el segundo nombre.</small>
        </CCol>
        <CRow className="users-las-name g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Correo"
              aria-label="Correo"
              value={currentUser?.correo || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, correo: e.target.value })}
            />
            <small className="text-muted">Ingrese el correo.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Telefono"
              aria-label="Telefono"
              value={currentUser?.telefono || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, telefono: e.target.value })}
            />
            <small className="text-muted">Ingrese el telefono.</small>
          </CCol>
        </CRow>
      </CRow>
      <CRow className="g-3 mt-2">
        <CCol md={6}>
          <CFormSelect
            className="modal-name custom-select"
            aria-label="Cargo"
            value={currentUser?.idRol || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, idRol: e.target.value })}
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
            placeholder="Contraseña (opcional)"
            aria-label="Contraseña"
            onChange={(e) => setCurrentUser({ ...currentUser, contrasena: e.target.value })}
          />
          <small className="text-muted">Ingrese la nueva contraseña si desea cambiarla.</small>
        </CCol>
      </CRow>
    </div>
  )
}

export default EditUserForm
