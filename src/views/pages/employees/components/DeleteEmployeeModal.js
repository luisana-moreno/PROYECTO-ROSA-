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
          Eliminar Empleado
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="danger">
          <strong>¡Advertencia!</strong> Esta acción no se puede deshacer.
        </CAlert>
        <p className="mb-3">
          Por favor escriba <strong>"confirmar"</strong> para eliminar el empleado
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
          Eliminar Empleado
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteEmployeeModal
