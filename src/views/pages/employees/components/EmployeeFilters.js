import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilX } from '@coreui/icons'

const EmployeeFilters = ({
  searchTerm,
  setSearchTerm,
  filterPosition,
  setFilterPosition,
  positions,
}) => {
  const handleClearFilters = () => {
    setSearchTerm('')
    setFilterPosition('')
  }

  const hasActiveFilters = searchTerm || filterPosition

  return (
    <div className="mb-3">
      <CRow className="align-items-end">
        <CCol md={5} className="mb-2 mb-md-0">
          <label className="form-label small text-medium-emphasis">Búsqueda</label>
          <div className="position-relative">
            <CFormInput
              type="text"
              placeholder="Buscar por nombre, apellido o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CIcon
              icon={cilSearch}
              className="position-absolute top-50 end-0 translate-middle-y me-2"
              style={{ pointerEvents: 'none', opacity: 0.5 }}
            />
          </div>
        </CCol>
        <CCol md={4} className="mb-2 mb-md-0">
          <label className="form-label small text-medium-emphasis">Filtrar por cargo</label>
          <CFormSelect value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}>
            <option value="">Todos los cargos</option>
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.nombre}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={3} className="mb-2 mb-md-0">
          {hasActiveFilters && (
            <CButton
              color="secondary"
              variant="outline"
              onClick={handleClearFilters}
              className="w-100"
            >
              <CIcon icon={cilX} className="me-2" />
              Limpiar Filtros
            </CButton>
          )}
        </CCol>
      </CRow>
    </div>
  )
}

export default EmployeeFilters
