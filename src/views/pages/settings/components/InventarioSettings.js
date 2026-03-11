import React from 'react'
import { CRow, CCol } from '@coreui/react'
import GenericSettingsTable from './GenericSettingsTable'

const InventarioSettings = ({
  categoriasInsumo,
  createCategoriaInsumo,
  updateCategoriaInsumo,
  deleteCategoriaInsumo,
  tiposMovimiento,
  createTipoMovimiento,
  updateTipoMovimiento,
  deleteTipoMovimiento,
}) => {
  return (
    <CRow>
      <CCol md={6}>
        <GenericSettingsTable
          title="Categorías de Insumos"
          items={categoriasInsumo}
          onCreate={createCategoriaInsumo}
          onUpdate={updateCategoriaInsumo}
          onDelete={deleteCategoriaInsumo}
          itemLabel="Categoría"
        />
      </CCol>
      <CCol md={6}>
        <GenericSettingsTable
          title="Tipos de Movimiento"
          items={tiposMovimiento}
          onCreate={createTipoMovimiento}
          onUpdate={updateTipoMovimiento}
          onDelete={deleteTipoMovimiento}
          itemLabel="Tipo de Movimiento"
        />
      </CCol>
    </CRow>
  )
}

export default InventarioSettings
