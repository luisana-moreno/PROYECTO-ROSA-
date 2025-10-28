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
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => setVisible(false)}
      className="modern-modal"
    >
      <CModalHeader className="modern-modal-header">
        <CModalTitle className="modern-modal-title">Registro de Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm} roles={roles} />
      </CModalBody>
      <CModalFooter className="modern-modal-footer">
        <CButton className="button-no-hover-green text-white" onClick={handleAddUser}>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddUserModal
