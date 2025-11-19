import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import AddUserForm from './AddUserForm'
import { toast } from 'react-toastify'

const AddUserModal = ({
  visible,
  setVisible,
  addUserForm,
  setAddUserForm,
  handleAddUser,
  roles,
}) => {
  const validateForm = () => {
    if (
      !addUserForm.nombre ||
      !addUserForm.apellido ||
      !addUserForm.correo ||
      !addUserForm.telefono ||
      !addUserForm.idRol ||
      !addUserForm.contrasena
    ) {
      toast.error('Todos los campos obligatorios deben ser llenados.')
      return false
    }

    if (addUserForm.nombre.length > 100) {
      toast.error('El nombre no puede exceder los 100 caracteres.')
      return false
    }
    if (addUserForm.apellido.length > 100) {
      toast.error('El apellido no puede exceder los 100 caracteres.')
      return false
    }
    if (addUserForm.correo.length > 75) {
      toast.error('El correo no puede exceder los 100 caracteres.')
      return false
    }
    if (addUserForm.telefono.length !== 11) {
      toast.error('El teléfono debe tener exactamente 11 dígitos.')
      return false
    }
    if (addUserForm.contrasena.length > 50) {
      toast.error('La contraseña no puede exceder los 50 caracteres.')
      return false
    }

    return true
  }

  const handleAddUserWithValidation = () => {
    if (validateForm()) {
      handleAddUser()
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => setVisible(false)}
      className="modern-modal"
      backdrop="static"
    >
      <CModalHeader className="modern-modal-header">
        <CModalTitle className="modern-modal-title">Registro de Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm} roles={roles} />
      </CModalBody>
      <CModalFooter className="modern-modal-footer">
        <CButton className="button-no-hover-green text-white" onClick={handleAddUserWithValidation}>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddUserModal
