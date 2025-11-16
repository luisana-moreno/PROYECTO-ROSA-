import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow } from '@coreui/react'

const UserFilters = ({ searchTerm, setSearchTerm, filterRole, setFilterRole, roles }) => {
  return (
    <CRow className="mb-3 align-items-center">
      <CCol md={6} className="mb-2 mb-md-0">
        <CFormInput
          type="text"
          placeholder="Buscar por nombre, apellido o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CCol>
      <CCol md={6}>
        <CFormSelect
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          aria-label="Filtrar por rol"
        >
          <option value="">Todos los roles</option>
          {roles.map((role) => (
            <option key={role.tma_idrolus} value={role.tma_idrolus}>
              {role.tma_nomrolu}
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </CRow>
  )
}

export default UserFilters
