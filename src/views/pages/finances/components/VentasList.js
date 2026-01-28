import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CSpinner,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFile, cilPencil } from '@coreui/icons'
import { usePagination } from '../../../../hooks/usePagination'

const VentasList = ({ ventas, loading, onViewVenta, onEditVenta }) => {
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(ventas || [], 10)
  if (loading) {
    return (
      <div className="text-center py-4">
        <CSpinner color="primary" />
        <p className="mt-2">Cargando ventas...</p>
      </div>
    )
  }

  if (!ventas || ventas.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">No hay ventas registradas</p>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-VE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const formatCurrency = (amount) => {
    if (!amount) return 'Bs. 0,00'
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'VES',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <>
      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>N° Factura</CTableHeaderCell>
            <CTableHeaderCell>Fecha</CTableHeaderCell>
            <CTableHeaderCell>Cliente</CTableHeaderCell>
            <CTableHeaderCell>Monto</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentData.map((venta) => (
            <CTableRow key={venta.ttr_idfactur}>
              <CTableDataCell>
                <strong>#{venta.ttr_idfactur}</strong>
              </CTableDataCell>
              <CTableDataCell>{formatDate(venta.ttr_fechafac)}</CTableDataCell>
              <CTableDataCell>{venta.cliente_nombre || '-'}</CTableDataCell>
              <CTableDataCell>
                <strong>{formatCurrency(venta.ttr_montofac)}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <span
                  className={`badge ${
                    venta.estado_factura === 'Pagada'
                      ? 'bg-success'
                      : venta.estado_factura === 'Pendiente'
                        ? 'bg-warning'
                        : 'bg-secondary'
                  }`}
                >
                  {venta.estado_factura || 'Desconocido'}
                </span>
              </CTableDataCell>
              <CTableDataCell>
                <div className="d-flex gap-2">
                  <CButton
                    color="info"
                    variant="outline"
                    size="sm"
                    onClick={() => onViewVenta(venta)}
                  >
                    <CIcon icon={cilFile} className="me-1" />
                    Ver
                  </CButton>
                  {venta.estado_factura === 'Pendiente' && (
                    <CButton
                      color="primary"
                      variant="outline"
                      size="sm"
                      onClick={() => onEditVenta(venta)}
                    >
                      <CIcon icon={cilPencil} className="me-1" />
                      Editar
                    </CButton>
                  )}
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Paginación */}
      {ventas && ventas.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination>
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

export default VentasList
