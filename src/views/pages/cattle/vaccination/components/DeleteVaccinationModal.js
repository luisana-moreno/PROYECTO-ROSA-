import React from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
} from '@coreui/react'

const DeleteVaccinationModal = ({
  visible,
  onClose,
  deleteConfirmation,
  setDeleteConfirmation,
  onConfirmDelete,
}) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">Confirmar Eliminación</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>Por favor escriba "confirmar" para eliminar el evento de vacunación:</h6>
        <CFormInput
          placeholder="confirmar"
          className="modal-border"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover green" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton className="button-no-hover-green" color="danger" onClick={onConfirmDelete}>
          Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteVaccinationModal
