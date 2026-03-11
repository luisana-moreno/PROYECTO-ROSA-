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
import { cilX, cilFile, cilCheckCircle } from '@coreui/icons'
import { ventasService } from '../../../../api/ventasService'
import { toast } from 'react-toastify'

const FacturaModal = ({ visible, onClose, venta, onPaymentSuccess }) => {
  if (!venta) return null

  // Calcular totales (asumiendo que vienen del backend o recalculando por seguridad visual)
  const subtotal = venta.ttr_montofac || 0
  const iva = subtotal * 0.16 // O el impuesto que venga del backend
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
      case 'pagada':
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

  const handleDownloadPDF = async () => {
    try {
      toast.info('Solicitando factura al servidor...')
      const blob = await ventasService.downloadFactura(venta.ttr_idfactur)

      // Crear URL y descargar
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `Factura_${venta.ttr_idfactur}.pdf`)
      document.body.appendChild(link)
      link.click()

      // Limpieza
      window.URL.revokeObjectURL(url)
      link.parentNode.removeChild(link)

      toast.success('Factura descargada')
    } catch (error) {
      console.error(error)
      toast.error('Error al descargar factura')
    }
  }

  const handlePagar = async () => {
    try {
      await ventasService.pagarVenta(venta.ttr_idfactur)
      toast.success('Pago registrado exitosamente')
      if (onPaymentSuccess) onPaymentSuccess()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Error al registrar pago')
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
                  <td>{venta.ttr_nombrecl + ' ' + venta.ttr_apellido}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Teléfono:</td>
                  <td>{venta.ttr_telefono || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </CCol>
        </CRow>

        <hr />

        {/* Productos */}
        <h6 className="text-muted mb-3">DETALLES DE PRODUCTOS</h6>
        {venta.detalles && venta.detalles.length > 0 ? (
          <CTable hover responsive className="mb-4">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Descripción</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Cant.</CTableHeaderCell>
                <CTableHeaderCell className="text-end">Precio</CTableHeaderCell>
                <CTableHeaderCell className="text-end">Total</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {venta.detalles.map((detalle, index) => {
                const esBovino =
                  detalle.tipo === 'bovino' || detalle.tipo?.toUpperCase() === 'BOVINO'
                const descripcion = esBovino
                  ? `Bovino N° ${detalle.numero_bovino || ''}`
                  : detalle.nombre_producto

                return (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <div>
                        <strong>{descripcion}</strong>
                        {esBovino && <div className="small text-muted">Ganado en pie</div>}
                        {!esBovino && <div className="small text-muted">Insumo</div>}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{detalle.cantidad}</CTableDataCell>
                    <CTableDataCell className="text-end">
                      Bs. {parseFloat(detalle.precio_unitario || 0).toFixed(2)}
                    </CTableDataCell>
                    <CTableDataCell className="text-end">
                      <strong>
                        Bs.{' '}
                        {(detalle.cantidad * parseFloat(detalle.precio_unitario || 0)).toFixed(2)}
                      </strong>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        ) : (
          <p className="text-muted">No hay detalles disponibles.</p>
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
        <CButton color="info" className="text-white" onClick={handleDownloadPDF}>
          <CIcon icon={cilFile} className="me-2" />
          Descargar PDF
        </CButton>
        {venta.estado_factura === 'Pendiente' && (
          <CButton color="success" className="text-white" onClick={handlePagar}>
            <CIcon icon={cilCheckCircle} className="me-2" />
            Registrar Pago
          </CButton>
        )}
      </CModalFooter>
    </CModal>
  )
}

export default FacturaModal
