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

const ColorSettings = ({ colores, createColor, updateColor, deleteColor }) => {
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [newColorName, setNewColorName] = useState('')
  const [currentColor, setCurrentColor] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  const handleAddColor = async () => {
    try {
      await createColor(newColorName)
      setNewColorName('')
      setVisibleAdd(false)
      toast.success('Color agregado correctamente')
    } catch (error) {
      toast.error(error.message || 'Error al agregar color')
    }
  }

  const handleEditColor = async () => {
    if (!currentColor) return
    try {
      await updateColor(currentColor.tmaIdcolbo, currentColor.tmaNomcolb)
      setVisibleEdit(false)
      toast.info('Color editado correctamente')
    } catch (error) {
      toast.error(error.message || 'Error al editar color')
    }
  }

  const handleDeleteColor = async () => {
    if (!currentColor) return
    if (deleteConfirmation === 'confirmar') {
      try {
        await deleteColor(currentColor.tmaIdcolbo)
        setVisibleDelete(false)
        toast.error('Color eliminado correctamente')
      } catch (error) {
        toast.error(error.message || 'Error al eliminar color')
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar')
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Gestión de Colores de Bovinos</strong>
        <CButton className="ms-3" color="success" onClick={() => setVisibleAdd(true)}>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar Color
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
            {colores.map((color) => (
              <CTableRow key={color.tmaIdcolbo}>
                <CTableDataCell>{color.tmaIdcolbo}</CTableDataCell>
                <CTableDataCell>{color.tmaNomcolb}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentColor(color)
                      setVisibleEdit(true)
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setCurrentColor(color)
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

        {/* Modal para Agregar Color */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Agregar Nuevo Color</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre del Color"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="Ingrese el nombre del color"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancelar
            </CButton>
            <CButton color="success" onClick={handleAddColor}>
              Agregar
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Editar Color */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Editar Color</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre del Color"
              value={currentColor ? currentColor.tmaNomcolb : ''}
              onChange={(e) => setCurrentColor({ ...currentColor, tmaNomcolb: e.target.value })}
              placeholder="Ingrese el nuevo nombre del color"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleEditColor}>
              Guardar Cambios
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Eliminar Color */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirmar Eliminación</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Está seguro de que desea eliminar el color{' '}
              <strong>{currentColor ? currentColor.tmaNomcolb : ''}</strong>?
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
            <CButton color="danger" onClick={handleDeleteColor}>
              Eliminar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default ColorSettings
