import React from 'react'
import {
  CButton,
  CFormInput,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle } from '@coreui/icons'

const ReactivateEmployeeModal = ({
  reactivateVisible,
  setReactivateVisible,
  reactivateConfirmation,
  setReactivateConfirmation,
  handleReactivateEmployee,
}) => {
  const handleClose = () => {
    setReactivateVisible(false)
    setReactivateConfirmation('')
  }

  return (
    <CModal visible={reactivateVisible} onClose={handleClose} backdrop="static" alignment="center">
      <CModalHeader>
        <CModalTitle>
          <CIcon icon={cilCheckCircle} className="me-2" style={{ color: '#2eb85c' }} />
          Reactivar Empleado
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="success">
          <strong>¡Confirmación!</strong> Esta acción reactivará al empleado.
          <br />
          Volverá a estar disponible en la lista de activos.
        </CAlert>
        <p className="mb-3">
          Por favor escriba <strong>"reactivar"</strong> para confirmar la acción.
        </p>
        <CFormInput
          placeholder="Escriba: reactivar"
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
          onClick={handleReactivateEmployee}
          disabled={reactivateConfirmation.toLowerCase() !== 'reactivar'}
          style={{ color: 'white' }}
        >
          <CIcon icon={cilCheckCircle} className="me-2" />
          Reactivar Empleado
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ReactivateEmployeeModal
