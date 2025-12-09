import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilWarning } from '@coreui/icons'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const InventoryTable = ({ items, setCurrentRecord, setEditVisible, setDeleteVisible }) => {
  const getStockBadge = (quantity) => {
    if (quantity <= 5) return 'danger'
    if (quantity <= 20) return 'warning'
    return 'success'
  }

  const getExpiryBadge = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return <CBadge color="danger">Vencido</CBadge>
    if (diffDays <= 30) return <CBadge color="warning">Por Vencer</CBadge>
    return <span className="text-muted">{formatDateToDDMMYYYY(dateString)}</span>
  }

  return (
    <CTable hover responsive striped className="align-middle">
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell>ID</CTableHeaderCell>
          <CTableHeaderCell>Nombre del Insumo</CTableHeaderCell>
          <CTableHeaderCell>Categoría</CTableHeaderCell>
          <CTableHeaderCell className="text-center">Cantidad</CTableHeaderCell>
          <CTableHeaderCell className="text-center">Vencimiento</CTableHeaderCell>
          <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {items.map((item) => (
          <CTableRow key={item.ttr_idinsumo}>
            <CTableDataCell>{item.ttr_idinsumo}</CTableDataCell>
            <CTableDataCell className="fw-bold">{item.ttr_nominsum}</CTableDataCell>
            <CTableDataCell>
              <CBadge color="info" shape="rounded-pill">
                {item.categoria_nombre || 'Sin Categoría'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <CBadge color={getStockBadge(item.ttr_cantidad)} size="lg">
                {item.ttr_cantidad}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              {getExpiryBadge(item.ttr_fechaven)}
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <CButton
                color="warning"
                size="sm"
                className="me-2 text-white"
                title="Editar"
                onClick={() => {
                  setCurrentRecord(item)
                  setEditVisible(true)
                }}
              >
                <CIcon icon={cilPencil} />
              </CButton>
              <CButton
                color="danger"
                size="sm"
                className="text-white"
                title="Eliminar"
                onClick={() => {
                  setCurrentRecord(item)
                  setDeleteVisible(true)
                }}
              >
                <CIcon icon={cilTrash} />
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
        {items.length === 0 && (
          <CTableRow>
            <CTableDataCell colSpan="6" className="text-center text-muted py-4">
              <CIcon icon={cilWarning} size="xl" className="mb-2" />
              <p className="mb-0">No se encontraron insumos registrados.</p>
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}

export default InventoryTable
