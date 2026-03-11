import React from 'react'
import { CCol, CFormInput, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilX } from '@coreui/icons'

const ClientFilters = ({ searchTerm, setSearchTerm }) => {
  const handleClearFilters = () => {
    setSearchTerm('')
  }

  const hasActiveFilters = searchTerm

  return (
    <div className="mb-3">
      <CRow className="align-items-end">
        <CCol md={9} className="mb-2 mb-md-0">
          <label className="form-label small text-medium-emphasis">Búsqueda</label>
          <div className="position-relative">
            <CFormInput
              type="text"
              placeholder="Buscar por nombre, documento, empresa o RIF..."
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
        <CCol md={3} className="mb-2 mb-md-0">
          {hasActiveFilters && (
            <CButton
              color="secondary"
              variant="outline"
              onClick={handleClearFilters}
              className="w-100"
            >
              <CIcon icon={cilX} className="me-2" />
              Limpiar Búsqueda
            </CButton>
          )}
        </CCol>
      </CRow>
    </div>
  )
}

export default ClientFilters
