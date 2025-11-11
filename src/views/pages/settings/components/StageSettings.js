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

const StageSettings = ({ etapas, createEtapa, updateEtapa, deleteEtapa }) => {
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [newEtapaName, setNewEtapaName] = useState('')
  const [currentEtapa, setCurrentEtapa] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  const handleAddEtapa = async () => {
    try {
      await createEtapa(newEtapaName)
      setNewEtapaName('')
      setVisibleAdd(false)
      toast.success('Etapa agregada correctamente')
    } catch (error) {
      toast.error(error.message || 'Error al agregar etapa')
    }
  }

  const handleEditEtapa = async () => {
    if (!currentEtapa) return
    try {
      await updateEtapa(currentEtapa.tmaIdetabo, currentEtapa.tmaNometab)
      setVisibleEdit(false)
      toast.info('Etapa editada correctamente')
    } catch (error) {
      toast.error(error.message || 'Error al editar etapa')
    }
  }

  const handleDeleteEtapa = async () => {
    if (!currentEtapa) return
    if (deleteConfirmation === 'confirmar') {
      try {
        await deleteEtapa(currentEtapa.tmaIdetabo)
        setVisibleDelete(false)
        toast.error('Etapa eliminada correctamente')
      } catch (error) {
        toast.error(error.message || 'Error al eliminar etapa')
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar')
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Gestión de Etapas de Bovinos</strong>
        <CButton className="ms-3" color="success" onClick={() => setVisibleAdd(true)}>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar Etapa
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
            {etapas.map((etapa) => (
              <CTableRow key={etapa.tmaIdetabo}>
                <CTableDataCell>{etapa.tmaIdetabo}</CTableDataCell>
                <CTableDataCell>{etapa.tmaNometab}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentEtapa(etapa)
                      setVisibleEdit(true)
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setCurrentEtapa(etapa)
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

        {/* Modal para Agregar Etapa */}
        <CModal visible={visibleAdd} onClose={() => setVisibleAdd(false)}>
          <CModalHeader>
            <CModalTitle>Agregar Nueva Etapa</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre de la Etapa"
              value={newEtapaName}
              onChange={(e) => setNewEtapaName(e.target.value)}
              placeholder="Ingrese el nombre de la etapa"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
              Cancelar
            </CButton>
            <CButton color="success" onClick={handleAddEtapa}>
              Agregar
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Editar Etapa */}
        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Editar Etapa</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nombre de la Etapa"
              value={currentEtapa ? currentEtapa.tmaNometab : ''}
              onChange={(e) => setCurrentEtapa({ ...currentEtapa, tmaNometab: e.target.value })}
              placeholder="Ingrese el nuevo nombre de la etapa"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleEditEtapa}>
              Guardar Cambios
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Modal para Eliminar Etapa */}
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalHeader>
            <CModalTitle>Confirmar Eliminación</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              ¿Está seguro de que desea eliminar la etapa{' '}
              <strong>{currentEtapa ? currentEtapa.tmaNometab : ''}</strong>?
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
            <CButton color="danger" onClick={handleDeleteEtapa}>
              Eliminar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default StageSettings
