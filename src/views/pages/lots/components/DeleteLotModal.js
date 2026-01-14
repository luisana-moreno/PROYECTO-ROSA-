import React from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning, cilTrash } from '@coreui/icons'

const DeleteLotModal = ({ visible, onClose, confirmationText, setConfirmationText, onConfirm }) => {
  return (
    <CModal visible={visible} onClose={onClose} backdrop="static" alignment="center">
      <CModalHeader>
        <CModalTitle>
          <CIcon icon={cilWarning} className="me-2" style={{ color: '#e55353' }} />
          Desactivar Lote
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="danger">
          <strong>¡Advertencia!</strong> Esta acción desactivará el lote.
          <br />
          El lote dejará de estar disponible para nuevas asignaciones, pero se mantendrá el
          historial.
        </CAlert>
        <p className="mb-3">
          Por favor escriba <strong>"confirmar"</strong> para continuar.
        </p>
        <CFormInput
          placeholder="Escriba: confirmar"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          autoFocus
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton
          color="danger"
          onClick={onConfirm}
          disabled={confirmationText.toLowerCase() !== 'confirmar'}
          style={{ color: 'white' }}
        >
          <CIcon icon={cilTrash} className="me-2" />
          Desactivar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteLotModal
