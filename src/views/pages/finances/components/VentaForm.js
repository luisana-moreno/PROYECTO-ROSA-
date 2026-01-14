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
  CFormSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash, cilSave } from '@coreui/icons'
import { toast } from 'react-toastify'
import useClientes from '../hooks/useClientes'
import useProductos from '../hooks/useProductos'
import ventasService from 'src/api/ventasService'

const VentaForm = ({ onVentaCreated, config }) => {
  const { clientes, loading: loadingClientes } = useClientes()
  const { insumos, bovinos, loading: loadingProductos, fetchProductos } = useProductos()

  const [formData, setFormData] = useState({
    idCliente: '',
    idTipoVenta: '1', // Por defecto: Contado
    productos: [],
  })

  // Estado para el nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    tipo: 'insumo',
    id: '',
    cantidad: 1,
    precioUSD: 0, // Precio editable en USD
  })

  const [useUSD, setUseUSD] = useState(true) // Toggle para ver en USD/Bs
  const [saving, setSaving] = useState(false)

  // Cargar productos al montar
  useEffect(() => {
    fetchProductos('insumo')
    fetchProductos('bovino')
  }, [])

  // Efecto para actualizar precio cuando cambia el producto seleccionado
  useEffect(() => {
    if (!nuevoProducto.id) return

    let precioBaseBs = 0
    let cantidadDefault = 1
    let esLeche = false

    if (nuevoProducto.tipo === 'insumo') {
      const insumo = insumos.find((i) => i.ttr_idinsum === parseInt(nuevoProducto.id))
      if (insumo) {
        // Detectar si es leche
        if (insumo.ttr_nombrei.toLowerCase().includes('leche')) {
          esLeche = true
          // Si es leche, usar precio de configuración O precio base
          precioBaseBs = (config?.precioLeche || 0) * (config?.tasaCambio || 1)
        } else {
          precioBaseBs = insumo.ttr_preciounit || 0 // Asumiendo que el insumo tiene precio base
          // Si no tiene, por defecto 0
        }
      }
    } else {
      // Bovino
      const bovino = bovinos.find((b) => b.ttr_idbovino === parseInt(nuevoProducto.id))
      if (bovino) {
        precioBaseBs = bovino.ttr_precioventa || 0
        // Si el precio es 0, intentar calcular un estimado
        if (precioBaseBs === 0) precioBaseBs = bovino.ttr_pesokilo * 2 * (config?.tasaCambio || 60) // Fallback logic
      }
      cantidadDefault = 1 // Bovinos siempre 1
    }

    // Convertir a USD para el input editable
    const precioBaseUSD = (precioBaseBs / (config?.tasaCambio || 1)).toFixed(2)

    setNuevoProducto((prev) => ({
      ...prev,
      cantidad: esLeche ? prev.cantidad : cantidadDefault, // Mantener cantidad si es leche, resetear a 1 si es bovino
      precioUSD: precioBaseUSD,
    }))
  }, [nuevoProducto.id, nuevoProducto.tipo, config, insumos, bovinos])

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

    // Buscar información del producto para el nombre
    let nombreProducto = ''
    let productoObj = null

    if (nuevoProducto.tipo === 'insumo') {
      productoObj = insumos.find((i) => i.ttr_idinsum === parseInt(nuevoProducto.id))
      if (!productoObj) {
        toast.error('Producto no encontrado')
        return
      }

      const isLeche = productoObj.ttr_nombrei.toLowerCase().includes('leche')
      // Validar stock SOLO si no es Leche (asumiendo leche se produce/vende)
      // O validar stock igual. El usuario pidió vender "lo producido".
      // Si el stock es 0, dejaremos vender igual (stock negativo) o warn?
      // Por ahora validamos stock para otros insumos
      if (!isLeche && productoObj.ttr_stockin < nuevoProducto.cantidad) {
        toast.warning(`Stock bajo: ${productoObj.ttr_stockin}. Se agregará igual.`)
      }
      nombreProducto = productoObj.ttr_nombrei
    } else {
      productoObj = bovinos.find((b) => b.ttr_idbovino === parseInt(nuevoProducto.id))
      if (!productoObj) {
        toast.error('Bovino no encontrado')
        return
      }
      nombreProducto = `Bovino #${productoObj.ttr_numerobv} - ${productoObj.raza_nombre}`
    }

    // Validar duplicados
    const yaExiste = formData.productos.some(
      (p) => p.tipo === nuevoProducto.tipo && p.id === parseInt(nuevoProducto.id),
    )
    if (yaExiste) {
      toast.warning('Este producto ya está en la lista')
      return
    }

    // Calcular montos finales
    const precioFinalUSD = parseFloat(nuevoProducto.precioUSD)
    const precioFinalBs = precioFinalUSD * (config?.tasaCambio || 1)
    const subtotalBs = nuevoProducto.cantidad * precioFinalBs

    // Agregar producto
    const productoNuevo = {
      tipo: nuevoProducto.tipo,
      id: parseInt(nuevoProducto.id),
      nombre: nombreProducto,
      cantidad: nuevoProducto.cantidad,
      precioUnitarioUSD: precioFinalUSD,
      precioUnitario: precioFinalBs, // Para backend en Bs
      subtotal: subtotalBs,
    }

    setFormData({
      ...formData,
      productos: [...formData.productos, productoNuevo],
    })

    // Limpiar formulario (mantener tipo)
    setNuevoProducto((prev) => ({
      ...prev,
      id: '',
      cantidad: 1,
      precioUSD: 0,
    }))

    toast.success('Producto agregado')
  }

  const handleEliminarProducto = (index) => {
    const nuevosProductos = formData.productos.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      productos: nuevosProductos,
    })
  }

  const handleGuardarVenta = async () => {
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
      const ventaData = {
        idCliente: parseInt(formData.idCliente),
        idTipoVenta: parseInt(formData.idTipoVenta),
        detalles: formData.productos.map((p) => ({
          tipo: p.tipo,
          idProducto: p.id,
          cantidad: p.cantidad,
          precioUnitario: p.precioUnitario, // Enviamos en Bs
        })),
        // Podríamos enviar tasa si el backend lo soporta, por ahora solo montos
      }

      await ventasService.createVenta(ventaData)
      toast.success('Venta creada exitosamente')

      setFormData({
        idCliente: '',
        idTipoVenta: '1',
        productos: [],
      })
      if (onVentaCreated) onVentaCreated()
    } catch (error) {
      console.error('Error al crear venta:', error)
      toast.error(error.message || 'Error al crear la venta')
    } finally {
      setSaving(false)
    }
  }

  const totales = calcularTotales()
  const productosDisponibles = nuevoProducto.tipo === 'insumo' ? insumos : bovinos
  const isBovino = nuevoProducto.tipo === 'bovino'

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Nueva Venta</strong>
        <div className="d-flex align-items-center">
          <span className="me-2">Ver en: </span>
          <CFormSwitch
            label={useUSD ? 'USD ($)' : 'Bs'}
            defaultChecked={useUSD}
            onChange={() => setUseUSD(!useUSD)}
          />
          <span className="ms-3 badge bg-info text-dark">Tasa: {config?.tasaCambio} Bs/$</span>
        </div>
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
                  {cliente.ttr_nombrecl} {cliente.ttr_apellido}
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
            <strong>Agregar Item</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={2}>
                <CFormLabel>Tipo</CFormLabel>
                <CFormSelect
                  value={nuevoProducto.tipo}
                  onChange={(e) =>
                    setNuevoProducto({ ...nuevoProducto, tipo: e.target.value, id: '' })
                  }
                >
                  <option value="insumo">Producto/Leche</option>
                  <option value="bovino">Bovino (Ganado)</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel>Seleccionar</CFormLabel>
                <CFormSelect
                  value={nuevoProducto.id}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, id: e.target.value })}
                  disabled={loadingProductos}
                >
                  <option value="">Seleccione...</option>
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
                        ? `${producto.ttr_nombrei}`
                        : `Bovino #${producto.ttr_numerobv} - ${producto.raza_nombre}`}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={2}>
                <CFormLabel>Precio {useUSD ? '(USD)' : '(Bs)'}</CFormLabel>
                <CFormInput
                  type="number"
                  step="0.01"
                  disabled={
                    nuevoProducto.tipo === 'insumo' &&
                    nuevoProducto.nombre?.toLowerCase().includes('leche')
                  }
                  value={
                    useUSD
                      ? nuevoProducto.precioUSD
                      : (nuevoProducto.precioUSD * config.tasaCambio).toFixed(2)
                  }
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0
                    const valUSD = useUSD ? val : val / (config.tasaCambio || 1)
                    setNuevoProducto({ ...nuevoProducto, precioUSD: valUSD })
                  }}
                />
                {!useUSD && (
                  <small className="text-muted">
                    Ref: ${parseFloat(nuevoProducto.precioUSD).toFixed(2)}
                  </small>
                )}
              </CCol>

              <CCol md={2}>
                <CFormLabel>
                  Cantidad {nuevoProducto.tipo === 'bovino' ? '(Unidad)' : '(Lts/Unida)'}
                </CFormLabel>
                <CFormInput
                  type="number"
                  min="1"
                  value={nuevoProducto.cantidad}
                  disabled={isBovino} // Bloquear si es bovino
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
              <strong>Items de la Venta</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Producto</CTableHeaderCell>
                    <CTableHeaderCell>Cant.</CTableHeaderCell>
                    <CTableHeaderCell>Precio Unit. ($)</CTableHeaderCell>
                    <CTableHeaderCell>Precio Unit. (Bs)</CTableHeaderCell>
                    <CTableHeaderCell>Subtotal (Bs)</CTableHeaderCell>
                    <CTableHeaderCell>Eliminar</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {formData.productos.map((producto, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        {producto.nombre} <br />
                        <small className="text-muted">{producto.tipo.toUpperCase()}</small>
                      </CTableDataCell>
                      <CTableDataCell>{producto.cantidad}</CTableDataCell>
                      <CTableDataCell>${producto.precioUnitarioUSD.toFixed(2)}</CTableDataCell>
                      <CTableDataCell>Bs.{producto.precioUnitario.toFixed(2)}</CTableDataCell>
                      <CTableDataCell>
                        <strong>Bs.{producto.subtotal.toFixed(2)}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          size="sm"
                          variant="ghost"
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
                <CCol md={{ span: 5, offset: 7 }}>
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td className="text-end">
                          <strong>Subtotal:</strong>
                        </td>
                        <td className="text-end">Bs. {totales.subtotal.toFixed(2)}</td>
                        <td className="text-end text-muted">
                          (${(totales.subtotal / config.tasaCambio).toFixed(2)})
                        </td>
                      </tr>
                      <tr>
                        <td className="text-end">
                          <strong>IVA (16%):</strong>
                        </td>
                        <td className="text-end">Bs. {totales.iva.toFixed(2)}</td>
                        <td className="text-end text-muted">
                          (${(totales.iva / config.tasaCambio).toFixed(2)})
                        </td>
                      </tr>
                      <tr className="border-top">
                        <td className="text-end fs-5">
                          <strong>TOTAL:</strong>
                        </td>
                        <td className="text-end fs-5 text-success">
                          <strong>Bs. {totales.total.toFixed(2)}</strong>
                        </td>
                        <td className="text-end fs-5 text-primary">
                          <strong>(${(totales.total / config.tasaCambio).toFixed(2)})</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        ) : (
          <CAlert color="info">Agregue productos o bovinos a la venta.</CAlert>
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
                  Procesando...
                </>
              ) : (
                <>
                  <CIcon icon={cilSave} className="me-2" />
                  Registrar Venta
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
