'use client'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilInfo, cilSearch } from '@coreui/icons'

const LotsTable = ({ lots, onEdit, onDelete, onViewDetails, onViewBovines, loading }) => {
  return (
    <CTable hover responsive className="align-middle" striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Nombre</CTableHeaderCell>
          <CTableHeaderCell>Bovinos</CTableHeaderCell>
          <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {lots.length > 0 ? (
          lots.map((lot, idx) => (
            <CTableRow key={lot.id}>
              <CTableDataCell>{idx + 1}</CTableDataCell>
              <CTableDataCell>
                <strong>{lot.nombre}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="info"
                  size="sm"
                  className="text-white"
                  onClick={() => onViewBovines(lot)}
                  disabled={loading}
                >
                  <CIcon icon={cilSearch} className="me-2" />
                  Ver Bovinos ({lot.bovinos})
                </CButton>
              </CTableDataCell>
              <CTableDataCell className="text-end">
                <CButton
                  color="info"
                  size="sm"
                  className="me-2 text-white"
                  title="Detalles"
                  onClick={() => onViewDetails(lot)}
                  disabled={loading}
                >
                  <CIcon icon={cilInfo} />
                </CButton>
                <CButton
                  color="warning"
                  size="sm"
                  className="me-2 text-white"
                  title="Editar"
                  onClick={() => onEdit(lot)}
                  disabled={loading}
                >
                  <CIcon icon={cilPencil} />
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  title="Eliminar"
                  onClick={() => onDelete(lot.id)}
                  disabled={loading}
                >
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))
        ) : (
          <CTableRow>
            <CTableDataCell colSpan="4" className="text-center text-muted py-5">
              No hay lotes registrados
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}

export default LotsTable
