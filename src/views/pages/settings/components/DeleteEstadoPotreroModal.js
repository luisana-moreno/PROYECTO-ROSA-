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

const DeleteEstadoPotreroModal = ({
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
        await handleDelete(currentId?.tma_idestpo) // Corregido: pasar el ID correcto
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
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Eliminar Estado de Potrero</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>Por favor escriba "confirmar" para eliminar el estado de potrero</h6>
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

export default DeleteEstadoPotreroModal
