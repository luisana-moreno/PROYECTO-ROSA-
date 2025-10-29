import React from 'react'
import { CRow, CCol, CFormSelect, CFormInput } from '@coreui/react'

const AttendanceFilters = ({ filters, setFilters }) => {
  return (
    <CRow className="mt-3">
      <CCol md={6}>
        <CFormInput
          placeholder="Buscar por nombre"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
      </CCol>
      <CCol md={6}>
        <CFormSelect
          value={filters.position}
          onChange={(e) => setFilters({ ...filters, position: e.target.value })}
        >
          <option value="">Filtrar por cargo</option>
          <option value="Administrador">Administrador</option>
          <option value="Gerente de lacteos">Gerente de lacteos</option>
          <option value="Veterinario">Veterinario</option>
          <option value="Gerente de transporte">Gerente de transporte</option>
          <option value="Gerente de Potreros">Gerente de Potreros</option>
          <option value="Gerente de Mantenimiento">Gerente de Mantenimiento</option>
          <option value="Trabajador de campo">Trabajador de campo</option>
        </CFormSelect>
      </CCol>
    </CRow>
  )
}

export default AttendanceFilters
