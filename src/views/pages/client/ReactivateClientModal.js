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
import { cilCheckCircle, cilReload } from '@coreui/icons'

const ReactivateClientModal = ({
  reactivateVisible,
  setReactivateVisible,
  reactivateConfirmation,
  setReactivateConfirmation,
  handleReactivateClient,
  currentClient,
}) => {
  const handleClose = () => {
    setReactivateVisible(false)
    setReactivateConfirmation('')
  }

  const getClientName = () => {
    if (!currentClient) return ''
    if (currentClient.client_type === 'Person') {
      return `${currentClient.ttr_nombrecl || ''} ${currentClient.ttr_apellido || ''}`.trim()
    }
    return currentClient.ttr_nomcompa || ''
  }

  return (
    <CModal visible={reactivateVisible} onClose={handleClose} backdrop="static" alignment="center">
      <CModalHeader>
        <CModalTitle>
          <CIcon icon={cilReload} className="me-2" style={{ color: '#28a745' }} />
          Reactivar Cliente
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="success">
          <strong>Confirmar reactivación</strong>
          <p className="mb-0 mt-2">
            ¿Está seguro de reactivar al cliente <strong>{getClientName()}</strong>?
          </p>
        </CAlert>
        <p className="mb-3">
          Por favor escriba <strong>"confirmar"</strong> para reactivar el cliente
        </p>
        <CFormInput
          placeholder="Escriba: confirmar"
          value={reactivateConfirmation}
          onChange={(e) => setReactivateConfirmation(e.target.value)}
          autoFocus
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>
          Cancelar
        </CButton>
        <CButton
          color="success"
          onClick={handleReactivateClient}
          disabled={reactivateConfirmation.toLowerCase() !== 'confirmar'}
          className="text-white"
        >
          <CIcon icon={cilCheckCircle} className="me-2" />
          Reactivar Cliente
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ReactivateClientModal
