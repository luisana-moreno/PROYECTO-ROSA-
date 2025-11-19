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

const DeleteClientModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmationClient,
  setDeleteConfirmationClient,
  handleDeleteClient,
}) => {
  return (
    <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)} backdrop="static">
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">Eliminar cliente</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>Por favor escriba "confirmar" para eliminar el cliente</h6>
        <CFormInput
          placeholder="confirmar"
          className="modal-border"
          value={deleteConfirmationClient}
          onChange={(e) => setDeleteConfirmationClient(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green" onClick={() => setDeleteVisible(false)}>
          <h6 className="typography-color">Salir</h6>
        </CButton>
        <CButton className="button-no-hover-green" onClick={handleDeleteClient}>
          <h6 className="typography-color">Eliminar</h6>
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteClientModal
