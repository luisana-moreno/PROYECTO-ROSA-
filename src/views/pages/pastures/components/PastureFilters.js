import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow } from '@coreui/react'

const PastureFilters = ({
  searchTerm,
  setSearchTerm,
  filterEstadoPotrero,
  setFilterEstadoPotrero,
  filterTipoMantenimiento,
  setFilterTipoMantenimiento,
  estadosPotrero,
  tiposMantenimiento,
}) => {
  return (
    <CRow className="mb-3 align-items-center">
      <CCol md={12} className="mb-2 mb-md-0">
        <CFormInput
          type="text"
          placeholder="Buscar por código o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CCol>
      <CCol md={6} className="mt-2">
        <CFormSelect
          value={filterEstadoPotrero}
          onChange={(e) => setFilterEstadoPotrero(e.target.value)}
          aria-label="Filtrar por estado"
        >
          <option value="">Todos los estados</option>
          {estadosPotrero.map((estado) => (
            <option key={estado.tma_idestpo} value={estado.tma_idestpo}>
              {estado.tma_nomestp}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol md={6} className="mt-2">
        <CFormSelect
          value={filterTipoMantenimiento}
          onChange={(e) => setFilterTipoMantenimiento(e.target.value)}
          aria-label="Filtrar por tipo de mantenimiento"
        >
          <option value="">Todos los tipos de mantenimiento</option>
          {tiposMantenimiento.map((tipo) => (
            <option key={tipo.tma_idtipma} value={tipo.tma_idtipma}>
              {tipo.tma_nomtipm}
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </CRow>
  )
}

export default PastureFilters
