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
import { cilCheckCircle } from '@coreui/icons'

const ReactivateLotModal = ({
  visible,
  onClose,
  confirmationText,
  setConfirmationText,
  onConfirm,
}) => {
  return (
    <CModal visible={visible} onClose={onClose} backdrop="static" alignment="center">
      <CModalHeader>
        <CModalTitle>
          <CIcon icon={cilCheckCircle} className="me-2" style={{ color: '#2eb85c' }} />
          Reactivar Lote
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="success">
          <strong>¡Confirmación!</strong> Esta acción reactivará el lote.
          <br />
          Volverá a estar disponible para asignaciones.
        </CAlert>
        <p className="mb-3">
          Por favor escriba <strong>"reactivar"</strong> para confirmar la acción.
        </p>
        <CFormInput
          placeholder="Escriba: reactivar"
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
          color="success"
          onClick={onConfirm}
          disabled={confirmationText.toLowerCase() !== 'reactivar'}
          style={{ color: 'white' }}
        >
          <CIcon icon={cilCheckCircle} className="me-2" />
          Reactivar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ReactivateLotModal
