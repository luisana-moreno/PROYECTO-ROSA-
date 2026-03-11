'use client'
import { CForm, CFormLabel, CFormInput, CButton, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilX } from '@coreui/icons'

const LotForm = ({ formData, setFormData, onSubmit, isEditing, onCancel, loading }) => {
  return (
    <div className="mb-4 p-4 border rounded shadow-sm bg-light">
      <h5 className="mb-3 text-success fw-bold">
        {isEditing ? 'Editar Lote' : 'Crear Nuevo Lote'}
      </h5>

      <CRow className="g-3 align-items-end">
        <CCol md="8">
          <CFormLabel htmlFor="lotName" className="fw-semibold">
            Nombre del Lote
          </CFormLabel>
          <CFormInput
            id="lotName"
            type="text"
            placeholder="Ej: Lote A"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            disabled={loading}
          />
        </CCol>
        <CCol md="4">
          <div className="d-flex gap-2">
            <CButton
              className="text-white fw-semibold"
              color="success"
              onClick={onSubmit}
              disabled={loading}
            >
              <CIcon icon={isEditing ? cilPencil : cilPlus} className="me-2" />
              {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Lote'}
            </CButton>

            {isEditing && (
              <CButton color="secondary" variant="ghost" onClick={onCancel} disabled={loading}>
                <CIcon icon={cilX} className="me-2" />
                Cancelar
              </CButton>
            )}
          </div>
        </CCol>
      </CRow>
    </div>
  )
}

export default LotForm
