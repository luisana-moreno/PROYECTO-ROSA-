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
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { formatDateToYYYYMMDD } from 'src/utils/dateFormatter'

const EditInventoryModal = ({
  editVisible,
  setEditVisible,
  currentRecord,
  handleEditItem,
  categories,
}) => {
  const [formData, setFormData] = useState({
    nombreInsumo: '',
    idCategoria: '',
    cantidad: '',
    fechaVencimiento: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentRecord) {
      setFormData({
        nombreInsumo: currentRecord.ttr_nominsum || '',
        idCategoria: currentRecord.ttr_idcatein || '',
        cantidad: currentRecord.ttr_cantidad || '',
        fechaVencimiento: currentRecord.ttr_fechaven
          ? formatDateToYYYYMMDD(currentRecord.ttr_fechaven)
          : '',
      })
    }
  }, [currentRecord])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async () => {
    if (!currentRecord) return
    setLoading(true)
    await handleEditItem(currentRecord.ttr_idinsumo, {
      nombreInsumo: formData.nombreInsumo,
      idCategoria: parseInt(formData.idCategoria),
      cantidad: parseInt(formData.cantidad),
      fechaVencimiento: formData.fechaVencimiento || null,
    })
    setLoading(false)
  }

  return (
    <CModal visible={editVisible} onClose={() => setEditVisible(false)}>
      <CModalHeader onClose={() => setEditVisible(false)}>
        <CModalTitle>Editar Insumo</CModalTitle>
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
        <CButton color="secondary" onClick={() => setEditVisible(false)}>
          Cancelar
        </CButton>
        <CButton
          color="primary"
          onClick={handleSubmit}
          disabled={
            loading || !formData.nombreInsumo || !formData.idCategoria || !formData.cantidad
          }
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditInventoryModal
