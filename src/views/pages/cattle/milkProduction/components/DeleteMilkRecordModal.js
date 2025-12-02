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

export const DeleteMilkRecordModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeleteRecord,
}) => {
  return (
    <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
      <CModalHeader>
        <CModalTitle>Eliminar Registro</CModalTitle>
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
          Cancelar
        </CButton>
        <CButton className="button-no-hover-green" onClick={handleDeleteRecord}>
          Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
