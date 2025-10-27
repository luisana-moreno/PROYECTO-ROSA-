import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import AddUserForm from './AddUserForm'

const AddUserModal = ({
  visible,
  setVisible,
  addUserForm,
  setAddUserForm,
  handleAddUser,
  roles,
}) => {
  return (
    <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">Registro de Usuarios</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm} roles={roles} />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={handleAddUser}>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddUserModal
