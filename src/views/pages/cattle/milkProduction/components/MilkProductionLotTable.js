import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilList } from '@coreui/icons'
import { formatDateToDDMMYYYY } from '../../../../../utils/dateFormatter'

export const MilkProductionLotTable = ({ milkProductionLots, onViewDetails }) => {
  return (
    <CTable striped hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>ID</CTableHeaderCell>
          <CTableHeaderCell>Lote</CTableHeaderCell>
          <CTableHeaderCell>Fecha</CTableHeaderCell>
          <CTableHeaderCell>Jornada</CTableHeaderCell>
          <CTableHeaderCell>Total Litros</CTableHeaderCell>
          <CTableHeaderCell>Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {milkProductionLots.map((lotProduction) => (
          <CTableRow key={lotProduction.idProduccionLecheLote || lotProduction.ttrIdprolot}>
            <CTableDataCell>
              {lotProduction.idProduccionLecheLote || lotProduction.ttrIdprolot}
            </CTableDataCell>
            <CTableDataCell>
              <strong> {lotProduction.nombreLote || lotProduction.nombre_lote}</strong>
            </CTableDataCell>
            <CTableDataCell>
              {formatDateToDDMMYYYY(lotProduction.fechaProduccion || lotProduction.ttr_fechapro)}
            </CTableDataCell>
            <CTableDataCell>
              <CBadge
                color={
                  (lotProduction.jornada || lotProduction.ttr_jornada) === 'AM' ? 'warning' : 'dark'
                }
              >
                {lotProduction.jornada || lotProduction.ttr_jornada || 'AM'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              {Number(lotProduction.ttrTotlitrs || lotProduction.ttr_totlitrs).toFixed(2)}
            </CTableDataCell>
            <CTableDataCell>
              <CButton
                color="info"
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(lotProduction)}
                title="Ver Detalles"
              >
                <CIcon icon={cilList} /> Ver Detalles
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
        {milkProductionLots.length === 0 && (
          <CTableRow>
            <CTableDataCell colSpan="6" className="text-center">
              No hay registros de producción de leche por lote disponibles.
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}
