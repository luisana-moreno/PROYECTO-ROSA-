import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormSelect,
  CFormLabel,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CAlert,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash, cilSave } from '@coreui/icons'
import { toast } from 'react-toastify'
import useClientes from '../hooks/useClientes'
import useProductos from '../hooks/useProductos'
import ventasService from 'src/api/ventasService'

const VentaForm = ({ onVentaCreated }) => {
  const { clientes, loading: loadingClientes } = useClientes()
  const { insumos, bovinos, loading: loadingProductos, fetchProductos } = useProductos()

  const [formData, setFormData] = useState({
    idCliente: '',
    idTipoVenta: '1', // Por defecto: Contado
    productos: [],
  })

  const [nuevoProducto, setNuevoProducto] = useState({
    tipo: 'insumo', // 'insumo' o 'bovino'
    id: '',
    cantidad: 1,
  })

  const [saving, setSaving] = useState(false)

  // Cargar productos al montar
  useEffect(() => {
    fetchProductos('insumo')
    fetchProductos('bovino')
  }, [])

  // Calcular totales
  const calcularTotales = () => {
    const subtotal = formData.productos.reduce((sum, p) => sum + p.subtotal, 0)
    const iva = subtotal * 0.16
    const total = subtotal + iva
    return { subtotal, iva, total }
  }

  const handleAgregarProducto = () => {
    if (!nuevoProducto.id) {
      toast.warning('Seleccione un producto')
      return
    }

    if (nuevoProducto.cantidad <= 0) {
      toast.warning('La cantidad debe ser mayor a 0')
      return
    }

    // Buscar información del producto
    let producto
    if (nuevoProducto.tipo === 'insumo') {
      producto = insumos.find((i) => i.ttr_idinsum === parseInt(nuevoProducto.id))
      if (!producto) {
        toast.error('Insumo no encontrado')
        return
      }
      if (producto.ttr_stockin < nuevoProducto.cantidad) {
        toast.error(`Stock insuficiente. Disponible: ${producto.ttr_stockin}`)
        return
      }
    } else {
      producto = bovinos.find((b) => b.ttr_idbovino === parseInt(nuevoProducto.id))
      if (!producto) {
        toast.error('Bovino no encontrado')
        return
      }
    }

    // Verificar si ya está en la lista
    const yaExiste = formData.productos.some(
      (p) => p.tipo === nuevoProducto.tipo && p.id === parseInt(nuevoProducto.id),
    )
    if (yaExiste) {
      toast.warning('Este producto ya está en la lista')
      return
    }

    // Agregar producto
    const productoNuevo = {
      tipo: nuevoProducto.tipo,
      id: parseInt(nuevoProducto.id),
      nombre:
        nuevoProducto.tipo === 'insumo' ? producto.ttr_nombrei : `Bovino #${producto.ttr_numerobv}`,
      cantidad: nuevoProducto.cantidad,
      precioUnitario:
        nuevoProducto.tipo === 'insumo' ? producto.ttr_precioi : producto.ttr_pesokilo * 50, // Precio estimado por kg
      subtotal:
        nuevoProducto.cantidad *
        (nuevoProducto.tipo === 'insumo' ? producto.ttr_precioi : producto.ttr_pesokilo * 50),
    }

    setFormData({
      ...formData,
      productos: [...formData.productos, productoNuevo],
    })

    // Limpiar formulario de producto
    setNuevoProducto({
      tipo: 'insumo',
      id: '',
      cantidad: 1,
    })

    toast.success('Producto agregado')
  }

  const handleEliminarProducto = (index) => {
    const nuevosProductos = formData.productos.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      productos: nuevosProductos,
    })
    toast.info('Producto eliminado')
  }

  const handleGuardarVenta = async () => {
    // Validaciones
    if (!formData.idCliente) {
      toast.error('Seleccione un cliente')
      return
    }

    if (formData.productos.length === 0) {
      toast.error('Agregue al menos un producto')
      return
    }

    try {
      setSaving(true)

      // Preparar datos para el backend
      const ventaData = {
        idCliente: parseInt(formData.idCliente),
        idTipoVenta: parseInt(formData.idTipoVenta),
        detalles: formData.productos.map((p) => ({
          tipo: p.tipo,
          idProducto: p.id,
          cantidad: p.cantidad,
          precioUnitario: p.precioUnitario,
        })),
      }

      await ventasService.createVenta(ventaData)
      toast.success('Venta creada exitosamente')

      // Limpiar formulario
      setFormData({
        idCliente: '',
        idTipoVenta: '1',
        productos: [],
      })

      // Notificar al componente padre
      if (onVentaCreated) {
        onVentaCreated()
      }
    } catch (error) {
      console.error('Error al crear venta:', error)
      toast.error(error.message || 'Error al crear la venta')
    } finally {
      setSaving(false)
    }
  }

  const totales = calcularTotales()
  const productosDisponibles = nuevoProducto.tipo === 'insumo' ? insumos : bovinos

  return (
    <CCard>
      <CCardHeader>
        <strong>Nueva Venta</strong>
      </CCardHeader>
      <CCardBody>
        {/* Información de la Venta */}
        <CRow className="mb-4">
          <CCol md={6}>
            <CFormLabel>Cliente *</CFormLabel>
            <CFormSelect
              value={formData.idCliente}
              onChange={(e) => setFormData({ ...formData, idCliente: e.target.value })}
              disabled={loadingClientes}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.ttr_idclient} value={cliente.ttr_idclient}>
                  {cliente.ttr_nombrec} {cliente.ttr_apellidc}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Tipo de Venta *</CFormLabel>
            <CFormSelect
              value={formData.idTipoVenta}
              onChange={(e) => setFormData({ ...formData, idTipoVenta: e.target.value })}
            >
              <option value="1">Contado</option>
              <option value="2">Crédito</option>
            </CFormSelect>
          </CCol>
        </CRow>

        {/* Agregar Productos */}
        <CCard className="mb-4">
          <CCardHeader className="bg-light">
            <strong>Agregar Producto</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={3}>
                <CFormLabel>Tipo</CFormLabel>
                <CFormSelect
                  value={nuevoProducto.tipo}
                  onChange={(e) =>
                    setNuevoProducto({ ...nuevoProducto, tipo: e.target.value, id: '' })
                  }
                >
                  <option value="insumo">Insumo</option>
                  <option value="bovino">Bovino</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel>Producto</CFormLabel>
                <CFormSelect
                  value={nuevoProducto.id}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, id: e.target.value })}
                  disabled={loadingProductos}
                >
                  <option value="">Seleccione un producto</option>
                  {productosDisponibles.map((producto) => (
                    <option
                      key={
                        nuevoProducto.tipo === 'insumo'
                          ? producto.ttr_idinsum
                          : producto.ttr_idbovino
                      }
                      value={
                        nuevoProducto.tipo === 'insumo'
                          ? producto.ttr_idinsum
                          : producto.ttr_idbovino
                      }
                    >
                      {nuevoProducto.tipo === 'insumo'
                        ? `${producto.ttr_nombrei} (Stock: ${producto.ttr_stockin})`
                        : `Bovino #${producto.ttr_numerobv} - ${producto.raza_nombre}`}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel>Cantidad</CFormLabel>
                <CFormInput
                  type="number"
                  min="1"
                  value={nuevoProducto.cantidad}
                  onChange={(e) =>
                    setNuevoProducto({ ...nuevoProducto, cantidad: parseInt(e.target.value) || 1 })
                  }
                />
              </CCol>
              <CCol md={2} className="d-flex align-items-end">
                <CButton color="primary" onClick={handleAgregarProducto} className="w-100">
                  <CIcon icon={cilPlus} className="me-2" />
                  Agregar
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        {/* Tabla de Productos */}
        {formData.productos.length > 0 ? (
          <CCard className="mb-4">
            <CCardHeader className="bg-light">
              <strong>Productos en la Venta</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Tipo</CTableHeaderCell>
                    <CTableHeaderCell>Producto</CTableHeaderCell>
                    <CTableHeaderCell>Cantidad</CTableHeaderCell>
                    <CTableHeaderCell>Precio Unit.</CTableHeaderCell>
                    <CTableHeaderCell>Subtotal</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {formData.productos.map((producto, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <span
                          className={`badge bg-${producto.tipo === 'insumo' ? 'info' : 'success'}`}
                        >
                          {producto.tipo === 'insumo' ? 'Insumo' : 'Bovino'}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>{producto.nombre}</CTableDataCell>
                      <CTableDataCell>{producto.cantidad}</CTableDataCell>
                      <CTableDataCell>Bs. {producto.precioUnitario.toFixed(2)}</CTableDataCell>
                      <CTableDataCell>
                        <strong>Bs. {producto.subtotal.toFixed(2)}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => handleEliminarProducto(index)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              {/* Totales */}
              <CRow className="mt-3">
                <CCol md={{ span: 4, offset: 8 }}>
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td className="text-end">
                          <strong>Subtotal:</strong>
                        </td>
                        <td className="text-end">Bs. {totales.subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="text-end">
                          <strong>IVA (16%):</strong>
                        </td>
                        <td className="text-end">Bs. {totales.iva.toFixed(2)}</td>
                      </tr>
                      <tr className="table-active">
                        <td className="text-end">
                          <strong>TOTAL:</strong>
                        </td>
                        <td className="text-end">
                          <strong className="text-success">Bs. {totales.total.toFixed(2)}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        ) : (
          <CAlert color="info">
            No hay productos agregados. Agregue productos para continuar.
          </CAlert>
        )}

        {/* Botones de Acción */}
        <CRow>
          <CCol className="text-end">
            <CButton
              color="success"
              size="lg"
              onClick={handleGuardarVenta}
              disabled={saving || formData.productos.length === 0}
            >
              {saving ? (
                <>
                  <CSpinner size="sm" className="me-2" />
                  Guardando...
                </>
              ) : (
                <>
                  <CIcon icon={cilSave} className="me-2" />
                  Guardar Venta
                </>
              )}
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default VentaForm
