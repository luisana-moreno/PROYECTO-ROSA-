import React from 'react'
import {
  CButton,
  CFormInput,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'

const DeleteEmployeeModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeleteEmployee,
}) => {
  return (
    <CModal
      visible={deleteVisible}
      onClose={() => setDeleteVisible(false)}
      className="modern-modal"
      backdrop="static"
    >
      <CModalHeader className="modern-modal-header">
        <CModalTitle className="modern-modal-title">Eliminar Empleado</CModalTitle>
      </CModalHeader>

      <CModalBody className="modern-modal-body">
        <h6>Por favor escriba "confirmar" para eliminar el empleado</h6>
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

        <CButton className="button-no-hover-green" onClick={handleDeleteEmployee}>
          <h6 className="typography-color">Eliminar</h6>
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteEmployeeModal
