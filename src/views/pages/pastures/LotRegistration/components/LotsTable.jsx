"use client"
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CBadge,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilPencil, cilTrash, cilInfo } from "@coreui/icons"

const LotsTable = ({ lots, onEdit, onDelete, onViewDetails, loading }) => {
  return (
    <CTable bordered hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Nombre</CTableHeaderCell>
          <CTableHeaderCell>Descripción</CTableHeaderCell>
          <CTableHeaderCell>Bovinos</CTableHeaderCell>
          <CTableHeaderCell>Estado</CTableHeaderCell>
          <CTableHeaderCell>Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {lots.length > 0 ? (
          lots.map((lot, idx) => (
            <CTableRow key={lot.id}>
              <CTableDataCell>{idx + 1}</CTableDataCell>
              <CTableDataCell>{lot.nombre}</CTableDataCell>
              <CTableDataCell>{lot.descripcion || "-"}</CTableDataCell>
              <CTableDataCell>
                <CBadge color="info">{lot.bovinos}</CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <CBadge color="success">{lot.estado}</CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="info"
                  variant="outline"
                  size="sm"
                  className="me-2"
                  onClick={() => onViewDetails(lot)}
                  disabled={loading}
                >
                  <CIcon icon={cilInfo} />
                </CButton>
                <CButton
                  color="warning"
                  variant="outline"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(lot)}
                  disabled={loading}
                >
                  <CIcon icon={cilPencil} />
                </CButton>
                <CButton color="danger" variant="outline" size="sm" onClick={() => onDelete(lot.id)} disabled={loading}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))
        ) : (
          <CTableRow>
            <CTableDataCell colSpan="6" className="text-center text-muted">
              No hay lotes registrados
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}

export default LotsTable
