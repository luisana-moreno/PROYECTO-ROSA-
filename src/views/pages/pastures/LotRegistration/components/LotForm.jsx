"use client"
import { CForm, CFormLabel, CFormInput, CButton, CRow, CCol } from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilPlus, cilPencil, cilX } from "@coreui/icons"

const LotForm = ({ formData, setFormData, onSubmit, isEditing, editingLot, onCancel, loading }) => {
  return (
    <CForm className="mb-4 p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
      <h5 className="mb-3">{isEditing ? "Editar Lote" : "Crear Nuevo Lote"}</h5>

      <CRow className="g-3">
        <CCol md="6">
          <CFormLabel htmlFor="lotName">Nombre del Lote</CFormLabel>
          <CFormInput
            id="lotName"
            type="text"
            placeholder="Ej: Lote A"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            disabled={loading}
          />
        </CCol>

        <CCol md="6">
          <CFormLabel htmlFor="lotDescription">Descripción</CFormLabel>
          <CFormInput
            id="lotDescription"
            type="text"
            placeholder="Ej: Lote de lechería"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            disabled={loading}
          />
        </CCol>
      </CRow>

      <CRow className="g-2 mt-3">
        <CCol xs="auto">
          <CButton className="button-no-hover-green text-white" onClick={onSubmit} disabled={loading}>
            <CIcon icon={isEditing ? cilPencil : cilPlus} className="me-2" />
            {loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
          </CButton>
        </CCol>
        {isEditing && (
          <CCol xs="auto">
            <CButton color="secondary" variant="outline" onClick={onCancel} disabled={loading}>
              <CIcon icon={cilX} className="me-2" />
              Cancelar
            </CButton>
          </CCol>
        )}
      </CRow>
    </CForm>
  )
}

export default LotForm
