import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormLabel,
} from '@coreui/react'

const DeleteInventoryModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeleteItem,
  currentRecord,
}) => {
  return (
    <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)} backdrop="static">
      <CModalHeader onClose={() => setDeleteVisible(false)} className="bg-danger text-white">
        <CModalTitle>Eliminar Insumo</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          ¿Estás seguro de que deseas eliminar el insumo{' '}
          <strong>{currentRecord?.ttr_nominsum}</strong>?
        </p>
        <p className="text-danger fw-bold">Esta acción no se puede deshacer.</p>
        <div className="mb-3">
          <CFormLabel htmlFor="deleteConfirmation">
            Escribe <strong>"confirmar"</strong> para continuar:
          </CFormLabel>
          <CFormInput
            type="text"
            id="deleteConfirmation"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder="confirmar"
          />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
          Cancelar
        </CButton>
        <CButton
          color="danger"
          onClick={handleDeleteItem}
          disabled={deleteConfirmation !== 'confirmar'}
        >
          Eliminar Definitivamente
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteInventoryModal
