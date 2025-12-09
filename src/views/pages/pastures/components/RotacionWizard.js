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

const RotacionWizard = ({ visible, onClose, preSelectedPotreroId, onSuccess, lotes = [] }) => {
  const [formData, setFormData] = useState({
    idLote: '',
    idPotrero: preSelectedPotreroId || '',
    fecha: new Date().toISOString().split('T')[0],
    turno: 'AM',
    alturaEntrada: '',
    alturaSalida: '',
    observaciones: '',
  })
  const [potrerosDisponibles, setPotrerosDisponibles] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (visible) {
      setFormData((prev) => ({ ...prev, idPotrero: preSelectedPotreroId || '' }))
      loadPotreros()
    }
  }, [visible, preSelectedPotreroId])

  const loadPotreros = async () => {
    try {
      const data = await pastureService.getDashboardStats()
      setPotrerosDisponibles(data)
    } catch (err) {
      console.error('Error cargando potreros', err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    if (!formData.idLote || !formData.idPotrero || !formData.fecha) {
      setError('Por favor complete los campos obligatorios (Lote, Potrero, Fecha)')
      return
    }

    try {
      await pastureService.createRotacion(formData)
      onSuccess()
      onClose()
    } catch (err) {
      setError('Error al registrar rotación. Verifique los datos.')
      console.error(err)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader onClose={onClose}>
        <CModalTitle>Registrar Rotación</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        <CForm>
          <div className="mb-3">
            <CFormLabel>Seleccionar Lote *</CFormLabel>
            <CFormSelect name="idLote" value={formData.idLote} onChange={handleChange}>
              <option value="">Seleccione un lote...</option>
              {lotes.map((lote) => (
                <option key={lote.tma_idlote} value={lote.tma_idlote}>
                  {lote.tma_nomlote}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="mb-3">
            <CFormLabel>Potrero Destino *</CFormLabel>
            <CFormSelect name="idPotrero" value={formData.idPotrero} onChange={handleChange}>
              <option value="">Seleccione potrero...</option>
              {potrerosDisponibles.map((p) => (
                <option key={p.ttr_idpotrer} value={p.ttr_idpotrer}>
                  {p.ttr_codpotre} - {p.estado_nombre}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <CFormLabel>Fecha *</CFormLabel>
              <CFormInput type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <CFormLabel>Turno *</CFormLabel>
              <CFormSelect name="turno" value={formData.turno} onChange={handleChange}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
                <option value="DIA_COMPLETO">Día Completo</option>
              </CFormSelect>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <CFormLabel>Altura Entrada (cm)</CFormLabel>
              <CFormInput
                type="number"
                name="alturaEntrada"
                value={formData.alturaEntrada}
                onChange={handleChange}
                placeholder="Ej: 15"
              />
            </div>
            <div className="col-md-6 mb-3">
              <CFormLabel>Altura Salida (cm)</CFormLabel>
              <CFormInput
                type="number"
                name="alturaSalida"
                value={formData.alturaSalida}
                onChange={handleChange}
                placeholder="Ej: 5"
              />
            </div>
          </div>

          <div className="mb-3">
            <CFormLabel>Observaciones</CFormLabel>
            <CFormTextarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={3}
            ></CFormTextarea>
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Guardar Rotación
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default RotacionWizard
