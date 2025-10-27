import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import EditUserForm from './EditUserForm'

const EditUserModal = ({
  editVisible,
  setEditVisible,
  currentUser,
  setCurrentUser,
  handleEditUser,
  roles, // Aceptar roles como prop
}) => {
  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={() => setEditVisible(false)}
    >
      <CModalHeader className="modal-module">
        <CModalTitle className="text-white">Editar Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <EditUserForm currentUser={currentUser} setCurrentUser={setCurrentUser} roles={roles} />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={handleEditUser}>
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditUserModal
