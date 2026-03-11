import React from 'react'
import { CCol, CFormInput, CFormSelect, CRow, CButton, CFormLabel } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilX } from '@coreui/icons'

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
  const handleClearFilters = () => {
    setSearchTerm('')
    setFilterRaza('')
    setFilterColor('')
    setFilterEtapa('')
    setFilterEstado('')
  }

  const hasActiveFilters = searchTerm || filterRaza || filterColor || filterEtapa || filterEstado

  return (
    <div className="mb-3">
      {/* Búsqueda */}
      <CRow className="mb-3">
        <CCol md={10}>
          <CFormLabel className="small text-medium-emphasis">Búsqueda</CFormLabel>
          <div className="position-relative">
            <CFormInput
              type="text"
              placeholder="Buscar por número de identificación, nombre..."
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
        <CCol md={2} className="d-flex align-items-end">
          {hasActiveFilters && (
            <CButton
              color="secondary"
              variant="outline"
              onClick={handleClearFilters}
              className="w-100"
            >
              <CIcon icon={cilX} className="me-2" />
              Limpiar
            </CButton>
          )}
        </CCol>
      </CRow>

      {/* Filtros */}
      <CRow>
        <CCol md={3}>
          <CFormLabel className="small text-medium-emphasis">Raza</CFormLabel>
          <CFormSelect value={filterRaza} onChange={(e) => setFilterRaza(e.target.value)}>
            <option value="">Todas las razas</option>
            {razas.map((raza) => (
              <option key={raza.tmaIdrazab} value={raza.tmaIdrazab}>
                {raza.tmaNomraza}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormLabel className="small text-medium-emphasis">Color</CFormLabel>
          <CFormSelect value={filterColor} onChange={(e) => setFilterColor(e.target.value)}>
            <option value="">Todos los colores</option>
            {colores.map((color) => (
              <option key={color.tmaIdcolbo} value={color.tmaIdcolbo}>
                {color.tmaNomcolb}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormLabel className="small text-medium-emphasis">Etapa</CFormLabel>
          <CFormSelect value={filterEtapa} onChange={(e) => setFilterEtapa(e.target.value)}>
            <option value="">Todas las etapas</option>
            {etapas.map((etapa) => (
              <option key={etapa.tmaIdetabo} value={etapa.tmaIdetabo}>
                {etapa.tmaNometab}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormLabel className="small text-medium-emphasis">Estado</CFormLabel>
          <CFormSelect value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}>
            <option value="">Todos los estados</option>
            {estados.map((estado) => (
              <option key={estado.tmaIdestbo} value={estado.tmaIdestbo}>
                {estado.tmaNomestb}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </div>
  )
}

export default CattleFilters
