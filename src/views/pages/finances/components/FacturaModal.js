import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilX } from '@coreui/icons'

const FacturaModal = ({ visible, onClose, venta }) => {
  if (!venta) return null

  // Calcular totales (asumiendo que vienen del backend)
  const subtotal = venta.ttr_montofac || 0
  const iva = subtotal * 0.16
  const total = subtotal + iva

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-VE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  // Color del badge según estado
  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'completada':
        return 'success'
      case 'pendiente':
        return 'warning'
      case 'cancelada':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size="lg" backdrop="static">
      <CModalHeader>
        <CModalTitle>
          Factura #{venta.ttr_idfactur}
          <CBadge color={getEstadoColor(venta.estado_factura)} className="ms-3">
            {venta.estado_factura || 'N/A'}
          </CBadge>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* Información General */}
        <CRow className="mb-4">
          <CCol md={6}>
            <h6 className="text-muted">INFORMACIÓN DE LA VENTA</h6>
            <table className="table table-sm table-borderless">
              <tbody>
                <tr>
                  <td className="fw-bold">Fecha:</td>
                  <td>{formatDate(venta.ttr_fechafac)}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Tipo:</td>
                  <td>{venta.tipo_venta || 'Contado'}</td>
                </tr>
              </tbody>
            </table>
          </CCol>
          <CCol md={6}>
            <h6 className="text-muted">CLIENTE</h6>
            <table className="table table-sm table-borderless">
              <tbody>
                <tr>
                  <td className="fw-bold">Nombre:</td>
                  <td>{venta.cliente_nombre || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Teléfono:</td>
                  <td>{venta.cliente_telefono || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </CCol>
        </CRow>

        <hr />

        {/* Productos */}
        <h6 className="text-muted mb-3">PRODUCTOS</h6>
        {venta.detalles && venta.detalles.length > 0 ? (
          <CTable hover responsive className="mb-4">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Tipo</CTableHeaderCell>
                <CTableHeaderCell>Producto</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Cantidad</CTableHeaderCell>
                <CTableHeaderCell className="text-end">Precio Unit.</CTableHeaderCell>
                <CTableHeaderCell className="text-end">Subtotal</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {venta.detalles.map((detalle, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <CBadge color={detalle.tipo === 'insumo' ? 'info' : 'success'}>
                      {detalle.tipo === 'insumo' ? 'Insumo' : 'Bovino'}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{detalle.nombre_producto || 'N/A'}</CTableDataCell>
                  <CTableDataCell className="text-center">{detalle.cantidad}</CTableDataCell>
                  <CTableDataCell className="text-end">
                    Bs. {parseFloat(detalle.precio_unitario || 0).toFixed(2)}
                  </CTableDataCell>
                  <CTableDataCell className="text-end">
                    <strong>
                      Bs. {(detalle.cantidad * parseFloat(detalle.precio_unitario || 0)).toFixed(2)}
                    </strong>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <p className="text-muted">No hay detalles de productos disponibles.</p>
        )}

        {/* Totales */}
        <CRow>
          <CCol md={{ span: 5, offset: 7 }}>
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td className="text-end">
                    <strong>Subtotal:</strong>
                  </td>
                  <td className="text-end">Bs. {subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-end">
                    <strong>IVA (16%):</strong>
                  </td>
                  <td className="text-end">Bs. {iva.toFixed(2)}</td>
                </tr>
                <tr className="table-active">
                  <td className="text-end">
                    <strong>TOTAL:</strong>
                  </td>
                  <td className="text-end">
                    <strong className="text-success fs-5">Bs. {total.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          <CIcon icon={cilX} className="me-2" />
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default FacturaModal
