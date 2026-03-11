import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CFormTextarea,
  CAlert,
} from '@coreui/react'
import { pastureService } from 'src/api/pastureService'

const MantenimientoModal = ({ visible, onClose, potreroId, onSuccess, pastures = [] }) => {
  const [formData, setFormData] = useState({
    idPotrero: potreroId || '',
    tipo: 'Riego',
    fecha: new Date().toISOString().split('T')[0],
    producto: '',
    cantidad: '',
    observaciones: '',
    responsable: '',
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (visible) {
      setFormData((prev) => ({
        ...prev,
        idPotrero: potreroId || '',
      }))
    }
  }, [visible, potreroId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    if (!formData.idPotrero) {
      setError('Debe seleccionar un potrero')
      return
    }
    if (!formData.fecha || !formData.tipo) {
      setError('Complete campos obligatorios')
      return
    }
    try {
      await pastureService.createMantenimiento(formData)
      onSuccess()
      onClose()
    } catch (err) {
      setError('Error al registrar mantenimiento')
      console.error(err)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader onClose={onClose}>
        <CModalTitle>Registrar Mantenimiento</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        <CForm>
          {!potreroId && (
            <div className="mb-3">
              <CFormLabel>Potrero *</CFormLabel>
              <CFormSelect name="idPotrero" value={formData.idPotrero} onChange={handleChange}>
                <option value="">Seleccione un potrero...</option>
                {pastures.map((p) => (
                  <option key={p.ttr_idpotrer} value={p.ttr_idpotrer}>
                    {p.ttr_codpotre} - {p.ttr_descripc}
                  </option>
                ))}
              </CFormSelect>
            </div>
          )}
          <div className="mb-3">
            <CFormLabel>Tipo *</CFormLabel>
            <CFormSelect name="tipo" value={formData.tipo} onChange={handleChange}>
              <option value="Riego">Riego</option>
              <option value="Fumigacion">Fumigación</option>
              <option value="Fertilizacion">Fertilización</option>
              <option value="Cercas">Reparación Cercas</option>
              <option value="Otro">Otro</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel>Fecha *</CFormLabel>
            <CFormInput type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormLabel>Producto (Si aplica)</CFormLabel>
            <CFormInput
              name="producto"
              value={formData.producto}
              onChange={handleChange}
              placeholder="Ej: Urea"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Cantidad/Dosis</CFormLabel>
            <CFormInput
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              placeholder="Ej: 50 kg"
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Observaciones</CFormLabel>
            <CFormTextarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default MantenimientoModal
