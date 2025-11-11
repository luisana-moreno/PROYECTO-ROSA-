import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import EditUserForm from './EditUserForm'
import { toast } from 'react-toastify'

const EditUserModal = ({
  editVisible,
  setEditVisible,
  currentUser,
  setCurrentUser,
  handleEditUser,
  roles, // Aceptar roles como prop
}) => {
  const validateForm = () => {
    if (
      !currentUser.nombre ||
      !currentUser.apellido ||
      !currentUser.correo ||
      !currentUser.telefono ||
      !currentUser.idRol
    ) {
      toast.error('Todos los campos obligatorios deben ser llenados.')
      return false
    }

    if (currentUser.nombre.length > 100) {
      toast.error('El nombre no puede exceder los 100 caracteres.')
      return false
    }
    if (currentUser.apellido.length > 100) {
      toast.error('El apellido no puede exceder los 100 caracteres.')
      return false
    }
    if (currentUser.correo.length > 100) {
      toast.error('El correo no puede exceder los 100 caracteres.')
      return false
    }
    if (currentUser.telefono.length !== 11) {
      toast.error('El teléfono debe tener exactamente 11 dígitos.')
      return false
    }
    // La contraseña es opcional en edición, solo validar si se proporciona
    if (currentUser.contrasena && currentUser.contrasena.length > 255) {
      toast.error('La contraseña no puede exceder los 255 caracteres.')
      return false
    }

    return true
  }

  const handleEditUserWithValidation = () => {
    if (validateForm()) {
      handleEditUser()
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={() => setEditVisible(false)}
      className="modern-modal"
    >
      <CModalHeader className="modern-modal-header">
        <CModalTitle className="modern-modal-title">Editar Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <EditUserForm currentUser={currentUser} setCurrentUser={setCurrentUser} roles={roles} />
      </CModalBody>
      <CModalFooter className="modern-modal-footer">
        <CButton
          className="button-no-hover-green text-white"
          onClick={handleEditUserWithValidation}
        >
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditUserModal
