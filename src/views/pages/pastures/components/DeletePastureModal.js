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
import { cilWarning } from '@coreui/icons'

const DeletePastureModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeletePasture,
}) => {
  return (
    <CModal alignment="center" visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
      <CModalHeader>
        <CModalTitle>
          <CIcon icon={cilWarning} className="me-2" style={{ color: '#dc3545' }} />
          Eliminar Potrero
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="text-center mb-4">
          <CIcon icon={cilWarning} size="4xl" className="text-danger mb-3" />
          <h5>¿Está seguro de realizar esta acción?</h5>
          <p className="text-muted">Esta acción no se puede deshacer.</p>
        </div>

        <CAlert color="warning" className="d-flex align-items-center">
          <div>
            Por seguridad, escriba <strong>"confirmar"</strong> para eliminar el potrero
            permanentemente.
          </div>
        </CAlert>

        <CFormInput
          placeholder="Escriba 'confirmar' aquí..."
          className="text-center"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setDeleteVisible(false)}>
          Cancelar
        </CButton>
        <CButton
          color="danger"
          className="text-white"
          onClick={handleDeletePasture}
          disabled={deleteConfirmation.toLowerCase() !== 'confirmar'}
        >
          Eliminar Potrero
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeletePastureModal
