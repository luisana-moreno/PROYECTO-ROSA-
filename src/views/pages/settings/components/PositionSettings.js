import React, { useState, useEffect } from 'react'
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
import { employeeService } from 'src/api/employeeService'
import { toast } from 'react-toastify' // Importa toast de react-toastify

const PositionSettings = () => {
  const [positions, setPositions] = useState([])
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [newPositionName, setNewPositionName] = useState('')
  const [currentPosition, setCurrentPosition] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  useEffect(() => {
    fetchPositions()
  }, [])

  const fetchPositions = async () => {
    try {
      const data = await employeeService.getAllPositions()
      setPositions(data)
    } catch (error) {
      console.error('Error fetching positions:', error)
      toast.error('Error al cargar cargos')
    }
  }

  const handleAddPosition = async () => {
    try {
      const newPosition = await employeeService.createPosition({ nombre: newPositionName })
      setPositions([...positions, newPosition])
      setNewPositionName('')
      setVisibleAdd(false)
      toast.success('Cargo agregado correctamente')
    } catch (error) {
      console.error('Error adding position:', error)
      toast.error(error.message || 'Error al agregar cargo')
    }
  }

  const handleEditPosition = async () => {
    if (!currentPosition) return
    try {
      const updatedPosition = await employeeService.updatePosition(currentPosition.id, {
        nombre: currentPosition.nombre,
      })
      setPositions(positions.map((p) => (p.id === updatedPosition.id ? updatedPosition : p)))
      setVisibleEdit(false)
      toast.info('Cargo editado correctamente')
    } catch (error) {
      console.error('Error editing position:', error)
      toast.error(error.message || 'Error al editar cargo')
    }
  }

  const handleDeletePosition = async () => {
    if (!currentPosition) return
    if (deleteConfirmation === 'confirmar') {
      try {
        await employeeService.deletePosition(currentPosition.id)
        setPositions(positions.filter((p) => p.id !== currentPosition.id))
        setVisibleDelete(false)
        toast.error('Cargo eliminado correctamente')
      } catch (error) {
        console.error('Error deleting position:', error)
        if (
          error.message &&
          error.message.includes('No se puede eliminar el cargo porque tiene empleados asociados.')
        ) {
          toast.error('No se puede eliminar el cargo porque tiene empleados asociados.')
        } else {
          toast.error(error.message || 'Error al eliminar cargo')
        }
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar')
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Gestión de Cargos de Empleado</strong>
        <CButton className="ms-3" color="success" onClick={() => setVisibleAdd(true)}>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar Cargo
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
            {positions.map((position) => (
              <CTableRow key={position.id}>
                <CTableDataCell>{position.id}</CTableDataCell>
                <CTableDataCell>{position.nombre}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentPosition(position)
                      setVisibleEdit(true)
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setCurrentPosition(position)
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

        {/* Modal para Agregar Cargo */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Agregar Nuevo Cargo</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre del Cargo"
              value={newPositionName}
              onChange={(e) => setNewPositionName(e.target.value)}
              placeholder="Ingrese el nombre del cargo"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancelar
            </CButton>
            <CButton color="success" onClick={handleAddPosition}>
              Agregar
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Editar Cargo */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Editar Cargo</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre del Cargo"
              value={currentPosition ? currentPosition.nombre : ''}
              onChange={(e) => setCurrentPosition({ ...currentPosition, nombre: e.target.value })}
              placeholder="Ingrese el nuevo nombre del cargo"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleEditPosition}>
              Guardar Cambios
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Eliminar Cargo */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirmar Eliminación</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Está seguro de que desea eliminar el cargo{' '}
              <strong>{currentPosition ? currentPosition.nombre : ''}</strong>?
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
            <CButton color="danger" onClick={handleDeletePosition}>
              Eliminar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default PositionSettings
