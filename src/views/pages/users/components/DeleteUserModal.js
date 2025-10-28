import React from 'react'
import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

const DeleteUserModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeleteUser,
}) => {
  return (
    <CModal
      visible={deleteVisible}
      onClose={() => setDeleteVisible(false)}
      className="modern-modal"
    >
      <CModalHeader className="modern-modal-header">
        <CModalTitle className="modern-modal-title">Eliminar Usuario</CModalTitle>
      </CModalHeader>
      <CModalBody className="modern-modal-body">
        <h6>Por favor escriba "confirmar" para eliminar el usuario</h6>
        <CFormInput
          placeholder="confirmar"
          className="modal-border"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
        />
      </CModalBody>
      <CModalFooter className="modern-modal-footer">
        <CButton className="button-no-hover green" onClick={() => setDeleteVisible(false)}>
          <h6 className="typography-color">Cancelar</h6>
        </CButton>
        <CButton className="button-no-hover-green" onClick={handleDeleteUser}>
          <h6 className="typography-color">Eliminar</h6>
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteUserModal
