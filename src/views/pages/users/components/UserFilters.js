import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilX } from '@coreui/icons'

const UserFilters = ({ searchTerm, setSearchTerm, filterRole, setFilterRole, roles }) => {
  const handleClearFilters = () => {
    setSearchTerm('')
    setFilterRole('')
  }

  const hasActiveFilters = searchTerm || filterRole

  return (
    <div className="mb-3">
      <CRow className="align-items-end">
        <CCol md={5} className="mb-2 mb-md-0">
          <label className="form-label small text-medium-emphasis">Búsqueda</label>
          <div className="position-relative">
            <CFormInput
              type="text"
              placeholder="Buscar por nombre, apellido o correo..."
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
          <label className="form-label small text-medium-emphasis">Filtrar por rol</label>
          <CFormSelect value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">Todos los roles</option>
            {roles.map((role) => (
              <option key={role.tma_idrolus} value={role.tma_idrolus}>
                {role.tma_nomrolu}
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

export default UserFilters
