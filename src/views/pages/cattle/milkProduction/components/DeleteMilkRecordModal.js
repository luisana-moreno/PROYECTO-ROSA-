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
  currentRecord,
}) => {
  return (
    <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
      <CModalHeader>
        <CModalTitle>Eliminar Registro de Producción Individual</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>
          ¿Está seguro que desea eliminar este registro de producción individual del bovino{' '}
          {currentRecord?.bovinoNumero || currentRecord?.bovino_numero}?
        </h6>
        <h6>Por favor escriba "confirmar" para eliminar el registro</h6>
        <CFormInput
          placeholder="confirmar"
          className="modal-border"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
          Cancelar
        </CButton>
        <CButton color="danger" className="text-white" onClick={handleDeleteRecord}>
          Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
