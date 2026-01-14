import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilX, cilSave } from '@coreui/icons'
import { ventasService } from '../../../../api/ventasService' // Adjust path if needed
import { toast } from 'react-toastify'

const EditVentaModal = ({ visible, onClose, venta, onUpdateSuccess }) => {
  const [idEstado, setIdEstado] = useState('')
  const [loading, setLoading] = useState(false)

  // IDs de estados (Idealmente vendrían del backend, pero hardcodeamos por ahora según seed)
  // 1: Pendiente, 2: Pagada, 3: Cancelada (Asumido)
  const estados = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'Pagada' },
    { id: 3, nombre: 'Cancelada' }, // Verificar si 3 es Cancelada en bd
  ]

  useEffect(() => {
    if (venta) {
      // Mapear el nombre del estado al ID si es necesario, o usar el ID si viene
      // Asumimos que venta tiene ttr_idestfac o buscamos por nombre
      // Si venta tiene estado_factura nombre, buscamos el ID
      const estadoEncontrado = estados.find((e) => e.nombre === venta.estado_factura)
      if (estadoEncontrado) {
        setIdEstado(estadoEncontrado.id)
      } else {
        setIdEstado(venta.ttr_idestfac || '')
      }
    }
  }, [venta])

  const handleSave = async () => {
    if (!idEstado) return

    setLoading(true)
    try {
      await ventasService.updateEstadoVenta(venta.ttr_idfactur, idEstado)
      toast.success('Estado actualizado correctamente')
      if (onUpdateSuccess) onUpdateSuccess()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Error al actualizar estado')
    } finally {
      setLoading(false)
    }
  }

  if (!venta) return null

  return (
    <CModal visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle>Editar Venta #{venta.ttr_idfactur}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <CFormLabel>
            <strong>Cliente:</strong>{' '}
            {venta.cliente_nombre || venta.ttr_nombrecl + ' ' + venta.ttr_apellido}
          </CFormLabel>
        </div>
        <div className="mb-3">
          <CFormLabel>Estado de la Factura</CFormLabel>
          <CFormSelect value={idEstado} onChange={(e) => setIdEstado(e.target.value)}>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nombre}
              </option>
            ))}
          </CFormSelect>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          <CIcon icon={cilX} className="me-2" />
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSave} disabled={loading}>
          <CIcon icon={cilSave} className="me-2" />
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditVentaModal
