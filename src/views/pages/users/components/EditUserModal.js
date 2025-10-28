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
      className="modern-modal"
    >
      <CModalHeader className="modern-modal-header">
        <CModalTitle className="modern-modal-title">Editar Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <EditUserForm currentUser={currentUser} setCurrentUser={setCurrentUser} roles={roles} />
      </CModalBody>
      <CModalFooter className="modern-modal-footer">
        <CButton className="button-no-hover-green text-white" onClick={handleEditUser}>
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditUserModal
