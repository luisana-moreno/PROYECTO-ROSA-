'use client'
import { CRow, CCol, CFormSelect, CFormInput, CButton } from '@coreui/react'

const AttendanceFilters = ({ filters, setFilters, onExport }) => {
  const handleReset = () => {
    setFilters({ name: '', position: '' })
  }

  return (
    <CRow className="g-3">
      <CCol md={5}>
        <CFormInput
          placeholder="Buscar por nombre..."
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="form-control-sm"
        />
      </CCol>
      <CCol md={5}>
        <CFormSelect
          value={filters.position}
          onChange={(e) => setFilters({ ...filters, position: e.target.value })}
          className="form-control-sm"
        >
          <option value="">Todos los cargos</option>
          <option value="Administrador">Administrador</option>
          <option value="Gerente de lacteos">Gerente de lacteos</option>
          <option value="Veterinario">Veterinario</option>
          <option value="Gerente de transporte">Gerente de transporte</option>
          <option value="Gerente de Potreros">Gerente de Potreros</option>
          <option value="Gerente de Mantenimiento">Gerente de Mantenimiento</option>
          <option value="Trabajador de campo">Trabajador de campo</option>
        </CFormSelect>
      </CCol>
      <CCol md={2} className="d-flex gap-2">
        <CButton
          size="sm"
          color="secondary"
          variant="outline"
          onClick={handleReset}
          className="flex-grow-1"
        >
          Limpiar
        </CButton>
      </CCol>
    </CRow>
  )
}

export default AttendanceFilters
