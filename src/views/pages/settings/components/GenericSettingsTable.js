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
  CSpinner,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../hooks/usePagination'

const GenericSettingsTable = ({
  title,
  items = [],
  onCreate,
  onUpdate,
  onDelete,
  itemLabel = 'elemento',
}) => {
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(items, 10)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [newName, setNewName] = useState('')
  const [currentItem, setCurrentItem] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!newName.trim()) {
      toast.warning('El nombre es requerido')
      return
    }
    setLoading(true)
    try {
      await onCreate(newName.trim())
      setNewName('')
      setVisibleAdd(false)
      toast.success(`${itemLabel} agregado correctamente`)
    } catch (error) {
      toast.error(error.message || `Error al agregar ${itemLabel}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async () => {
    if (!currentItem || !currentItem.nombre.trim()) {
      toast.warning('El nombre es requerido')
      return
    }
    setLoading(true)
    try {
      await onUpdate(currentItem.id, currentItem.nombre.trim())
      setVisibleEdit(false)
      toast.info(`${itemLabel} editado correctamente`)
    } catch (error) {
      toast.error(error.message || `Error al editar ${itemLabel}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!currentItem) return
    if (deleteConfirmation !== 'confirmar') {
      toast.warning('Debe escribir "confirmar" para eliminar')
      return
    }
    setLoading(true)
    try {
      await onDelete(currentItem.id)
      setVisibleDelete(false)
      setDeleteConfirmation('')
      toast.error(`${itemLabel} eliminado correctamente.`)
    } catch (error) {
      toast.error(error.message || `Error al eliminar ${itemLabel}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex align-items-center justify-content-between">
        <strong>{title}</strong>
        <CButton color="success" size="sm" onClick={() => setVisibleAdd(true)}>
          <CIcon icon={cilPlus} className="me-1" />
          Agregar
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive striped>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell style={{ width: '60px' }}>ID</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '120px' }}>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={3} className="text-center text-muted">
                  No hay registros
                </CTableDataCell>
              </CTableRow>
            ) : (
              currentData.map((item) => (
                <CTableRow key={item.id}>
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.nombre}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      size="sm"
                      variant="ghost"
                      className="me-1"
                      onClick={() => {
                        setCurrentItem({ ...item })
                        setVisibleEdit(true)
                      }}
                    >
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setCurrentItem({ ...item })
                        setDeleteConfirmation('')
                        setVisibleDelete(true)
                      }}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
        {items.length > 0 && (
          <div className="d-flex justify-content-center mt-3">
            <CPagination aria-label="Navegación de configuración">
              <CPaginationItem
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </CPaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <CPaginationItem
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </CPaginationItem>
            </CPagination>
          </div>
        )}

        {/* Modal Agregar */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Agregar {itemLabel}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={`Nombre del ${itemLabel}`}
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancelar
            </CButton>
            <CButton color="success" onClick={handleAdd} disabled={loading}>
              {loading ? <CSpinner size="sm" /> : 'Agregar'}
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal Editar */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Editar {itemLabel}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre"
              value={currentItem?.nombre || ''}
              onChange={(e) => setCurrentItem({ ...currentItem, nombre: e.target.value })}
              placeholder={`Nombre del ${itemLabel}`}
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleEdit} disabled={loading}>
              {loading ? <CSpinner size="sm" /> : 'Guardar'}
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal Eliminar */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirmar Eliminación</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Está seguro de eliminar <strong>{currentItem?.nombre}</strong>?
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
            <CButton color="danger" onClick={handleDelete} disabled={loading}>
              {loading ? <CSpinner size="sm" /> : 'Eliminar'}
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default GenericSettingsTable
