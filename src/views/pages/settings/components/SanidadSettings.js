import React from 'react'
import { CRow, CCol } from '@coreui/react'
import GenericSettingsTable from './GenericSettingsTable'

const SanidadSettings = ({
  tiposVacuna,
  createTipoVacuna,
  updateTipoVacuna,
  deleteTipoVacuna,
  tratamientos,
  createTratamiento,
  updateTratamiento,
  deleteTratamiento,
}) => {
  return (
    <CRow>
      <CCol md={6}>
        <GenericSettingsTable
          title="Tipos de Vacuna"
          items={tiposVacuna}
          onCreate={createTipoVacuna}
          onUpdate={updateTipoVacuna}
          onDelete={deleteTipoVacuna}
          itemLabel="Tipo de Vacuna"
        />
      </CCol>
      <CCol md={6}>
        <GenericSettingsTable
          title="Tratamientos"
          items={tratamientos}
          onCreate={createTratamiento}
          onUpdate={updateTratamiento}
          onDelete={deleteTratamiento}
          itemLabel="Tratamiento"
        />
      </CCol>
    </CRow>
  )
}

export default SanidadSettings
