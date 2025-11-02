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

const DeleteCattleModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeleteCattle,
}) => {
  return (
    <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
      <CModalHeader>
        <CModalTitle className="typography-color-title">Eliminar Bovino</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>Por favor escriba "confirmar" para eliminar el registro</h6>
        <CFormInput
          placeholder="confirmar"
          className="modal-border"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover green" onClick={() => setDeleteVisible(false)}>
          <h6 className="typography-color">Cancelar</h6>
        </CButton>
        <CButton className="button-no-hover-green" onClick={handleDeleteCattle}>
          <h6 className="typography-color">Eliminar</h6>
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteCattleModal
