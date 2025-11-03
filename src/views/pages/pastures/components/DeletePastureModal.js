import React from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
} from '@coreui/react'

const DeletePastureModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeletePasture,
}) => {
  return (
    <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
      <CModalHeader>
        <CModalTitle>Eliminar Potrero</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>Por favor escriba "confirmar" para eliminar el potrero</h6>
        <CFormInput
          placeholder="confirmar"
          className="modal-border"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover green" onClick={() => setDeleteVisible(false)}>
          Cancelar
        </CButton>
        <CButton className="button-no-hover-green" onClick={handleDeletePasture}>
          Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeletePastureModal
