import React from 'react'
import { CRow, CCol, CFormInput, CFormSelect } from '@coreui/react'

const InventoryFilters = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  categories,
}) => {
  return (
    <CRow className="mb-4 g-3">
      <CCol md={6} lg={4}>
        <CFormInput
          type="text"
          placeholder="Buscar insumo por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CCol>
      <CCol md={4} lg={3}>
        <CFormSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Todas las Categorías</option>
          {categories.map((cat) => (
            <option key={cat.tma_idcatin} value={cat.tma_idcatin}>
              {cat.tma_nomcati}
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </CRow>
  )
}

export default InventoryFilters
