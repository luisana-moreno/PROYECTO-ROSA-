import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormCheck,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHeart } from '@coreui/icons'

const MastitisDetalle = ({ detalle, onChange }) => {
  const handleCuartoChange = (cuartoNum, checked) => {
    onChange({
      ...detalle,
      [`ttr_cuarto${cuartoNum}`]: checked,
    })
  }

  const handleFieldChange = (field, value) => {
    onChange({
      ...detalle,
      [field]: value,
    })
  }

  // Contar cuartos afectados
  const cuartosAfectados = [
    detalle.ttr_cuarto1,
    detalle.ttr_cuarto2,
    detalle.ttr_cuarto3,
    detalle.ttr_cuarto4,
  ].filter(Boolean).length

  return (
    <CCard className="mb-3 border-danger">
      <CCardHeader className="bg-danger-gradient text-white">
        <strong>
          <CIcon icon={cilHeart} className="me-2" />
          🐄 Control de Mastitis - Cuartos Mamarios Afectados
        </strong>
        {cuartosAfectados > 0 && (
          <CBadge color="light" className="ms-2">
            {cuartosAfectados} cuarto{cuartosAfectados > 1 ? 's' : ''} afectado
            {cuartosAfectados > 1 ? 's' : ''}
          </CBadge>
        )}
      </CCardHeader>
      <CCardBody>
        <p className="text-muted small mb-3">
          Seleccione los cuartos mamarios que presentan signos de mastitis:
        </p>

        {/* Checkboxes de Cuartos Mamarios */}
        <CRow className="mb-4">
          <CCol md={6} className="mb-3">
            <div className="p-3 border rounded bg-light">
              <CFormCheck
                id="cuarto1"
                label={<span className="fw-bold">1 - Cuarto Anterior Derecho</span>}
                checked={detalle.ttr_cuarto1}
                onChange={(e) => handleCuartoChange(1, e.target.checked)}
                className="mb-0"
              />
            </div>
          </CCol>

          <CCol md={6} className="mb-3">
            <div className="p-3 border rounded bg-light">
              <CFormCheck
                id="cuarto2"
                label={<span className="fw-bold">2 - Cuarto Anterior Izquierdo</span>}
                checked={detalle.ttr_cuarto2}
                onChange={(e) => handleCuartoChange(2, e.target.checked)}
                className="mb-0"
              />
            </div>
          </CCol>

          <CCol md={6} className="mb-3">
            <div className="p-3 border rounded bg-light">
              <CFormCheck
                id="cuarto3"
                label={<span className="fw-bold">3 - Cuarto Posterior Derecho</span>}
                checked={detalle.ttr_cuarto3}
                onChange={(e) => handleCuartoChange(3, e.target.checked)}
                className="mb-0"
              />
            </div>
          </CCol>

          <CCol md={6} className="mb-3">
            <div className="p-3 border rounded bg-light">
              <CFormCheck
                id="cuarto4"
                label={<span className="fw-bold">4 - Cuarto Posterior Izquierdo</span>}
                checked={detalle.ttr_cuarto4}
                onChange={(e) => handleCuartoChange(4, e.target.checked)}
                className="mb-0"
              />
            </div>
          </CCol>
        </CRow>

        {/* Información Adicional de Mastitis */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor="gravedad">Gravedad</CFormLabel>
            <CFormSelect
              id="gravedad"
              value={detalle.ttr_gravedad}
              onChange={(e) => handleFieldChange('ttr_gravedad', e.target.value)}
            >
              <option value="">Seleccione...</option>
              <option value="Leve">Leve</option>
              <option value="Moderada">Moderada</option>
              <option value="Severa">Severa</option>
            </CFormSelect>
          </CCol>

          <CCol md={6}>
            <CFormLabel htmlFor="tipomast">Tipo de Mastitis</CFormLabel>
            <CFormSelect
              id="tipomast"
              value={detalle.ttr_tipomast}
              onChange={(e) => handleFieldChange('ttr_tipomast', e.target.value)}
            >
              <option value="">Seleccione...</option>
              <option value="Clínica">Clínica</option>
              <option value="Subclínica">Subclínica</option>
              <option value="Crónica">Crónica</option>
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow>
          <CCol md={12}>
            <CFormLabel htmlFor="trataesp">Tratamiento Específico</CFormLabel>
            <CFormTextarea
              id="trataesp"
              rows={2}
              value={detalle.ttr_trataesp}
              onChange={(e) => handleFieldChange('ttr_trataesp', e.target.value)}
              placeholder="Describa el tratamiento específico aplicado para la mastitis..."
            />
            <small className="text-muted">
              Ej: Aplicación de antibiótico intramamario + antiinflamatorio sistémico
            </small>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default MastitisDetalle
