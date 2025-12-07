import React from 'react'
import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning, cilTrash } from '@coreui/icons'

const DeleteClientModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmationClient,
  setDeleteConfirmationClient,
  handleDeleteClient,
}) => {
  const handleClose = () => {
    setDeleteVisible(false)
    setDeleteConfirmationClient('')
  }

  return (
    <CModal visible={deleteVisible} onClose={handleClose} backdrop="static" alignment="center">
      <CModalHeader>
        <CModalTitle>
          <CIcon icon={cilWarning} className="me-2" style={{ color: '#dc3545' }} />
          Eliminar Cliente
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="danger">
          <strong>¡Advertencia!</strong> Esta acción no se puede deshacer.
        </CAlert>
        <p className="mb-3">
          Por favor escriba <strong>"confirmar"</strong> para eliminar el cliente
        </p>
        <CFormInput
          placeholder="Escriba: confirmar"
          value={deleteConfirmationClient}
          onChange={(e) => setDeleteConfirmationClient(e.target.value)}
          autoFocus
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>
          Cancelar
        </CButton>
        <CButton
          color="danger"
          onClick={handleDeleteClient}
          disabled={deleteConfirmationClient.toLowerCase() !== 'confirmar'}
        >
          <CIcon icon={cilTrash} className="me-2" />
          Eliminar Cliente
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteClientModal
