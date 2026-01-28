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
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { usePagination } from '../../../../../hooks/usePagination'
import CIcon from '@coreui/icons-react'
import { cilList } from '@coreui/icons'
import { formatDateToDDMMYYYY } from '../../../../../utils/dateFormatter'

export const MilkProductionLotTable = ({ milkProductionLots, onViewDetails }) => {
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(
    milkProductionLots,
    10,
  )

  return (
    <>
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
          {currentData.map((lotProduction) => (
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
                    (lotProduction.jornada || lotProduction.ttr_jornada) === 'AM'
                      ? 'warning'
                      : 'dark'
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
      {milkProductionLots.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination aria-label="Navegación de producción de leche por lote">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </CPaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <CPaginationItem
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </CPaginationItem>
          </CPagination>
        </div>
      )}
    </>
  )
}
