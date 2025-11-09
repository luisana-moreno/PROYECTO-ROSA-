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

const DeleteInventoryModal = ({
  visible,
  onClose,
  deleteConfirmationInventory,
  setDeleteConfirmationInventory,
  onDelete,
}) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">Eliminar Registro</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>Por favor escriba "confirmar" para eliminar el registro</h6>
        <CFormInput
          placeholder="confirmar"
          className="modal-border"
          value={deleteConfirmationInventory}
          onChange={(e) => setDeleteConfirmationInventory(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover green" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton className="button-no-hover-green" onClick={onDelete}>
          Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteInventoryModal
