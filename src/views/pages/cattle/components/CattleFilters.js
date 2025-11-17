import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow } from '@coreui/react'

const CattleFilters = ({
  searchTerm,
  setSearchTerm,
  filterRaza,
  setFilterRaza,
  filterColor,
  setFilterColor,
  filterEtapa,
  setFilterEtapa,
  filterEstado,
  setFilterEstado,
  razas,
  colores,
  etapas,
  estados,
}) => {
  return (
    <CRow className="mb-3 align-items-center">
      <CCol md={12} className="mb-2 mb-md-0">
        <CFormInput
          type="text"
          placeholder="Buscar por número de identificación, nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CCol>
      <CCol md={3} className="mt-2">
        <CFormSelect
          value={filterRaza}
          onChange={(e) => setFilterRaza(e.target.value)}
          aria-label="Filtrar por raza"
        >
          <option value="">Todas las razas</option>
          {razas.map((raza) => (
            <option key={raza.tmaIdrazab} value={raza.tmaIdrazab}>
              {raza.tmaNomraza}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol md={3} className="mt-2">
        <CFormSelect
          value={filterColor}
          onChange={(e) => setFilterColor(e.target.value)}
          aria-label="Filtrar por color"
        >
          <option value="">Todos los colores</option>
          {colores.map((color) => (
            <option key={color.tmaIdcolbo} value={color.tmaIdcolbo}>
              {color.tmaNomcolb}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol md={3} className="mt-2">
        <CFormSelect
          value={filterEtapa}
          onChange={(e) => setFilterEtapa(e.target.value)}
          aria-label="Filtrar por etapa"
        >
          <option value="">Todas las etapas</option>
          {etapas.map((etapa) => (
            <option key={etapa.tmaIdetabo} value={etapa.tmaIdetabo}>
              {etapa.tmaNometab}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol md={3} className="mt-2">
        <CFormSelect
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
          aria-label="Filtrar por estado"
        >
          <option value="">Todos los estados</option>
          {estados.map((estado) => (
            <option key={estado.tmaIdestbo} value={estado.tmaIdestbo}>
              {estado.tmaNomestb}
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </CRow>
  )
}

export default CattleFilters
