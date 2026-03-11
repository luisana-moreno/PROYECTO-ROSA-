import React from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
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
      toast.error('El correo no puede exceder los 75 caracteres.')
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

  const handleSubmit = (e) => {
    e.preventDefault()
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
      backdrop="static"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Nuevo Usuario</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm} roles={roles} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="success" type="submit">
            <CIcon icon={cilSave} className="me-2" />
            Guardar Usuario
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default AddUserModal
