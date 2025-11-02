import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import { toast } from 'react-toastify'

const BreedSettings = ({ razas, createRaza, updateRaza, deleteRaza }) => {
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [newRazaName, setNewRazaName] = useState('')
  const [currentRaza, setCurrentRaza] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  const handleAddRaza = async () => {
    try {
      await createRaza(newRazaName)
      setNewRazaName('')
      setVisibleAdd(false)
      toast.success('Raza agregada correctamente')
    } catch (error) {
      toast.error(error.message || 'Error al agregar raza')
    }
  }

  const handleEditRaza = async () => {
    if (!currentRaza) return
    try {
      await updateRaza(currentRaza.tma_idrazab, currentRaza.tma_nomraza)
      setVisibleEdit(false)
      toast.info('Raza editada correctamente')
    } catch (error) {
      toast.error(error.message || 'Error al editar raza')
    }
  }

  const handleDeleteRaza = async () => {
    if (!currentRaza) return
    if (deleteConfirmation === 'confirmar') {
      try {
        await deleteRaza(currentRaza.tma_idrazab)
        setVisibleDelete(false)
        toast.error('Raza eliminada correctamente')
      } catch (error) {
        toast.error(error.message || 'Error al eliminar raza')
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar')
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Gestión de Razas de Bovinos</strong>
        <CButton className="ms-3" color="success" onClick={() => setVisibleAdd(true)}>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar Raza
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {razas.map((raza) => (
              <CTableRow key={raza.tma_idrazab}>
                <CTableDataCell>{raza.tma_idrazab}</CTableDataCell>
                <CTableDataCell>{raza.tma_nomraza}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentRaza(raza)
                      setVisibleEdit(true)
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setCurrentRaza(raza)
                      setDeleteConfirmation('') // Clear previous confirmation
                      setVisibleDelete(true)
                    }}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Modal para Agregar Raza */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Agregar Nueva Raza</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre de la Raza"
              value={newRazaName}
              onChange={(e) => setNewRazaName(e.target.value)}
              placeholder="Ingrese el nombre de la raza"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancelar
            </CButton>
            <CButton color="success" onClick={handleAddRaza}>
              Agregar
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Editar Raza */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Editar Raza</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre de la Raza"
              value={currentRaza ? currentRaza.tma_nomraza : ''}
              onChange={(e) => setCurrentRaza({ ...currentRaza, tma_nomraza: e.target.value })}
              placeholder="Ingrese el nuevo nombre de la raza"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleEditRaza}>
              Guardar Cambios
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Eliminar Raza */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirmar Eliminación</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Está seguro de que desea eliminar la raza{' '}
              <strong>{currentRaza ? currentRaza.tma_nomraza : ''}</strong>?
            </p>
            <CFormInput
              type="text"
              placeholder='Escriba "confirmar" para continuar'
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
              Cancelar
            </CButton>
            <CButton color="danger" onClick={handleDeleteRaza}>
              Eliminar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default BreedSettings
