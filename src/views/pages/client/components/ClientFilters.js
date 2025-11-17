import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow } from '@coreui/react'

const ClientFilters = ({ searchTerm, setSearchTerm }) => {
  return (
    <CRow className="mb-3 align-items-center">
      <CCol md={12} className="mb-2 mb-md-0">
        <CFormInput
          type="text"
          placeholder="Buscar por nombre, documento, empresa o rif..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CCol>
    </CRow>
  )
}

export default ClientFilters
