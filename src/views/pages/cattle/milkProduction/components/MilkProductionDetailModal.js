import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { formatDateToDDMMYYYY } from '../../../../../utils/dateFormatter'

export const MilkProductionDetailModal = ({
  visible,
  setVisible,
  selectedLotProduction,
  individualRecords,
  setCurrentRecord,
  setEditVisible,
  setDeleteVisible,
}) => {
  if (!selectedLotProduction) return null

  // Filtrar registros para el lote seleccionado
  const recordsForLot = individualRecords.filter(
    (record) =>
      record.ttrIdlote === (selectedLotProduction.ttrIdlote || selectedLotProduction.ttr_idlote) &&
      record.fechaProduccion ===
        (selectedLotProduction.fechaProduccion || selectedLotProduction.ttr_fechapro),
  )

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Detalles de Producción</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <h5>
            Lote:{' '}
            <strong>{selectedLotProduction.nombreLote || selectedLotProduction.nombre_lote}</strong>
          </h5>
          <div className="d-flex gap-3 text-muted">
            <span>
              Fecha:{' '}
              {formatDateToDDMMYYYY(
                selectedLotProduction.fechaProduccion || selectedLotProduction.ttr_fechapro,
              )}
            </span>
            <span>
              Jornada:{' '}
              <CBadge
                color={
                  (selectedLotProduction.jornada || selectedLotProduction.ttr_jornada) === 'AM'
                    ? 'warning'
                    : 'dark'
                }
              >
                {selectedLotProduction.jornada || selectedLotProduction.ttr_jornada}
              </CBadge>
            </span>
            <span>
              Total:{' '}
              <strong>
                {Number(
                  selectedLotProduction.ttrTotlitrs || selectedLotProduction.ttr_totlitrs,
                ).toFixed(2)}{' '}
                L
              </strong>
            </span>
          </div>
          {(selectedLotProduction.observacion || selectedLotProduction.ttr_observacion) && (
            <div className="alert alert-info py-2 mt-2 mb-0">
              <strong>Observación:</strong>{' '}
              {selectedLotProduction.observacion || selectedLotProduction.ttr_observacion}
            </div>
          )}
        </div>

        <CTable striped hover responsive small className="align-middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Número Bovino</CTableHeaderCell>
              <CTableHeaderCell>Litros</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {recordsForLot.length > 0 ? (
              recordsForLot.map((record) => (
                <CTableRow key={record.idProduccionLeche || record.ttr_idprodlc}>
                  <CTableDataCell>
                    <strong>{record.bovinoNumero || record.bovinoNumero}</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    {Number(record.litrosProducidos || record.ttr_litrsprd).toFixed(2)} L
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="warning"
                      size="sm"
                      className="text-white me-2"
                      title="Editar"
                      onClick={() => {
                        setCurrentRecord(record)
                        setEditVisible(true)
                      }}
                    >
                      <CIcon icon={cilPencil} size="sm" />
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      className="text-white"
                      title="Eliminar"
                      onClick={() => {
                        setCurrentRecord(record)
                        setDeleteVisible(true)
                      }}
                    >
                      <CIcon icon={cilTrash} size="sm" />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="3" className="text-center text-muted">
                  No hay registros individuales disponibles para este lote.
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
