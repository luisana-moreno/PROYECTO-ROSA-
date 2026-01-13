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

const DeleteCattleModal = ({
  deleteVisible,
  setDeleteVisible,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeleteCattle,
}) => {
  const handleClose = () => {
    setDeleteVisible(false)
    setDeleteConfirmation('')
  }

  return (
    <CModal visible={deleteVisible} onClose={handleClose} backdrop="static" alignment="center">
      <CModalHeader>
        <CModalTitle>
          <CIcon icon={cilWarning} className="me-2" style={{ color: '#e55353' }} />
          Desactivar Bovino
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="danger">
          <strong>¡Advertencia!</strong> Esta acción desactivará al bovino.
          <br />
          El registro no se eliminará permanentemente de la base de datos, pero no aparecerá en la
          lista de activos.
        </CAlert>
        <p className="mb-3">
          Por favor escriba <strong>"confirmar"</strong> para continuar.
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
          onClick={handleDeleteCattle}
          disabled={deleteConfirmation !== 'confirmar'}
          style={{ color: 'white' }}
        >
          <CIcon icon={cilTrash} className="me-2" />
          Desactivar Bovino
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteCattleModal
