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
import { cilWarning, cilTrash } from '@coreui/icons'

const DeleteEmployeeModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeleteEmployee,
}) => {
  const handleClose = () => {
    setDeleteVisible(false)
    setDeleteConfirmation('')
  }

  return (
    <CModal visible={deleteVisible} onClose={handleClose} backdrop="static" alignment="center">
      <CModalHeader>
        <CModalTitle>
          <CIcon icon={cilWarning} className="me-2" style={{ color: '#dc3545' }} />
          Desactivar Empleado
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="warning">
          <strong>¡Atención!</strong> Esta acción marcará al empleado como <strong>INACTIVO</strong>
          .
          <br />
          Sus registros históricos (asistencia, pagos) se conservarán.
        </CAlert>
        <p className="mb-3">
          Por favor escriba <strong>"confirmar"</strong> para desactivar al empleado.
        </p>
        <CFormInput
          placeholder="Escriba: confirmar"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
          autoFocus
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>
          Cancelar
        </CButton>
        <CButton
          color="danger"
          onClick={handleDeleteEmployee}
          disabled={deleteConfirmation.toLowerCase() !== 'confirmar'}
        >
          <CIcon icon={cilTrash} className="me-2" />
          Desactivar Empleado
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteEmployeeModal
