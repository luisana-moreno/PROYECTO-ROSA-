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

const StateSettings = ({ estados, createEstado, updateEstado, deleteEstado }) => {
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [newStateName, setNewStateName] = useState('')
  const [currentState, setCurrentState] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  const handleAddEstado = async () => {
    try {
      const newEstado = await createEstado({ nombre: newStateName })
      setNewStateName('')
      setVisibleAdd(false)
      toast.success('Estado agregado correctamente')
    } catch (error) {
      console.error('Error adding estado:', error)
      toast.error(error.message || 'Error al agregar estado')
    }
  }

  const handleEditEstado = async () => {
    if (!currentState) return
    try {
      const updatedEstado = await updateEstado(currentState.tmaIdestbo, {
        nombre: currentState.tmaNomestb,
      })
      setVisibleEdit(false)
      toast.info('Estado editado correctamente')
    } catch (error) {
      console.error('Error editing estado:', error)
      toast.error(error.message || 'Error al editar estado')
    }
  }

  const handleDeleteEstado = async () => {
    if (!currentState) return
    if (deleteConfirmation === 'confirmar') {
      try {
        await deleteEstado(currentState.tmaIdestbo)
        setVisibleDelete(false)
        toast.error('Estado eliminado correctamente')
      } catch (error) {
        console.error('Error deleting estado:', error)
        toast.error(error.message || 'Error al eliminar estado')
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar')
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Gestión de Estados de Bovinos</strong>
        <CButton className="ms-3" color="success" onClick={() => setVisibleAdd(true)}>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar Estado
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
            {estados.map((estado) => (
              <CTableRow key={estado.tmaIdestbo}>
                <CTableDataCell>{estado.tmaIdestbo}</CTableDataCell>
                <CTableDataCell>{estado.tmaNomestb}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentState(estado)
                      setVisibleEdit(true)
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setCurrentState(estado)
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

        {/* Modal para Agregar Estado */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Agregar Nuevo Estado</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre del Estado"
              value={newStateName}
              onChange={(e) => setNewStateName(e.target.value)}
              placeholder="Ingrese el nombre del estado"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancelar
            </CButton>
            <CButton color="success" onClick={handleAddEstado}>
              Agregar
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Editar Estado */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Editar Estado</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre del Estado"
              value={currentState ? currentState.tmaNomestb : ''}
              onChange={(e) => setCurrentState({ ...currentState, tmaNomestb: e.target.value })}
              placeholder="Ingrese el nuevo nombre del estado"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleEditEstado}>
              Guardar Cambios
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Eliminar Estado */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirmar Eliminación</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Está seguro de que desea eliminar el estado{' '}
              <strong>{currentState ? currentState.tmaNomestb : ''}</strong>?
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
            <CButton color="danger" onClick={handleDeleteEstado}>
              Eliminar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default StateSettings
