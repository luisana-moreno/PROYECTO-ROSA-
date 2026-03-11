'use client'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilInfo, cilSearch, cilCheckCircle } from '@coreui/icons'
import { usePagination } from '../../../../hooks/usePagination'

const LotsTable = ({ lots, onEdit, onDelete, onViewDetails, onViewBovines, loading }) => {
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(lots, 10)

  return (
    <>
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
            currentData.map((lot, idx) => (
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
                  {/* Deshabilitar edición si está inactivo, o permitir reactivar */}
                  {lot.estado === 'INACTIVO' ? (
                    <CButton
                      color="success"
                      size="sm"
                      className="text-white"
                      title="Reactivar"
                      onClick={() => {
                        // Usamos onReactivate (prop nueva) o reutilizamos una existente si se pasa
                        if (onDelete) onDelete(lot, 'reactivar') // Hack si no actualizamos props todavía, mejor actualizar props
                      }}
                      disabled={loading}
                    >
                      <CIcon icon={cilCheckCircle} size="sm" className="me-1" />
                      Reactivar
                    </CButton>
                  ) : (
                    <>
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
                        title="Desactivar"
                        onClick={() => onDelete(lot, 'eliminar')}
                        disabled={loading}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </>
                  )}
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
      {lots.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination aria-label="Navegación de lotes">
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
    </>
  )
}

export default LotsTable
