import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow } from '@coreui/react'

const EmployeeFilters = ({
  searchTerm,
  setSearchTerm,
  filterPosition,
  setFilterPosition,
  positions,
}) => {
  return (
    <CRow className="mb-3 align-items-center">
      <CCol md={6} className="mb-2 mb-md-0">
        <CFormInput
          type="text"
          placeholder="Buscar por nombre, apellido o documento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CCol>
      <CCol md={6}>
        <CFormSelect
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
          aria-label="Filtrar por cargo"
        >
          <option value="">Todos los cargos</option>
          {positions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.nombre}
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </CRow>
  )
}

export default EmployeeFilters
