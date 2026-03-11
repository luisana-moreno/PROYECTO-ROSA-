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
import EditUserForm from './EditUserForm'
import { toast } from 'react-toastify'

const EditUserModal = ({
  editVisible,
  setEditVisible,
  currentUser,
  setCurrentUser,
  handleEditUser,
  roles,
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

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
      backdrop="static"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Editar Usuario</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <EditUserForm currentUser={currentUser} setCurrentUser={setCurrentUser} roles={roles} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="success" type="submit">
            <CIcon icon={cilSave} className="me-2" />
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default EditUserModal
