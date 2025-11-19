import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
} from '@coreui/react'

const DeleteTipoMantenimientoModal = ({
  visible,
  setVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDelete,
  currentId,
}) => {
  const handleDeleteConfirm = async () => {
    if (deleteConfirmation === 'confirmar') {
      try {
        await handleDelete(currentId)
        setDeleteConfirmation('')
        setVisible(false)
      } catch (error) {
        // El toast ya se maneja en useSettings
      }
    } else {
      // Aquí podrías mostrar un toast o mensaje de error si la confirmación es incorrecta
    }
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static">
      <CModalHeader>
        <CModalTitle>Eliminar Tipo de Mantenimiento</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>Por favor escriba "confirmar" para eliminar el tipo de mantenimiento</h6>
        <CFormInput
          placeholder="confirmar"
          className="modal-border"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancelar
        </CButton>
        <CButton color="danger" onClick={handleDeleteConfirm}>
          Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteTipoMantenimientoModal
