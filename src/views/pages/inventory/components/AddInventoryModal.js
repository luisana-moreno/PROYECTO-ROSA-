import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

const AddInventoryModal = ({ visible, setVisible, handleAddItem, categories }) => {
  const [formData, setFormData] = useState({
    nombreInsumo: '',
    idCategoria: '',
    cantidad: '',
    fechaVencimiento: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    const success = await handleAddItem({
      nombreInsumo: formData.nombreInsumo,
      idCategoria: parseInt(formData.idCategoria),
      cantidad: parseInt(formData.cantidad),
      fechaVencimiento: formData.fechaVencimiento || null,
    })
    setLoading(false)
    if (success) {
      setFormData({
        nombreInsumo: '',
        idCategoria: '',
        cantidad: '',
        fechaVencimiento: '',
      })
    }
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Agregar Nuevo Insumo</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="nombreInsumo">Nombre del Insumo</CFormLabel>
            <CFormInput
              type="text"
              id="nombreInsumo"
              value={formData.nombreInsumo}
              onChange={handleChange}
              placeholder="Ej. Alimento Concentrado"
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="idCategoria">Categoría</CFormLabel>
            <CFormSelect id="idCategoria" value={formData.idCategoria} onChange={handleChange}>
              <option value="">Seleccione...</option>
              {categories.map((cat) => (
                <option key={cat.tma_idcatin} value={cat.tma_idcatin}>
                  {cat.tma_nomcati}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="cantidad">Cantidad</CFormLabel>
            <CFormInput
              type="number"
              id="cantidad"
              min="0"
              value={formData.cantidad}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="fechaVencimiento">Fecha de Vencimiento</CFormLabel>
            <CFormInput
              type="date"
              id="fechaVencimiento"
              value={formData.fechaVencimiento}
              onChange={handleChange}
            />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancelar
        </CButton>
        <CButton
          color="success"
          className="text-white"
          onClick={handleSubmit}
          disabled={
            loading || !formData.nombreInsumo || !formData.idCategoria || !formData.cantidad
          }
        >
          {loading ? 'Guardando...' : 'Guardar Insumo'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddInventoryModal
