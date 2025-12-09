import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCollapse,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCaretBottom, cilCaretTop, cilPencil, cilTrash } from '@coreui/icons'
import { formatDateToDDMMYYYY } from '../../../../../utils/dateFormatter'

export const MilkProductionLotTable = ({
  milkProductionLots,
  individualMilkRecords,
  setCurrentRecord,
  setEditVisible,
  setDeleteVisible,
}) => {
  const [visibleDetail, setVisibleDetail] = useState({}) // State to manage collapse for each lot

  const toggleDetails = (lotId) => {
    setVisibleDetail((prev) => ({ ...prev, [lotId]: !prev[lotId] }))
  }

  const getIndividualRecordsForLot = (lotId, date) => {
    return individualMilkRecords.filter(
      (record) => record.ttrIdlote === lotId && record.fechaProduccion === date,
    )
  }

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
          <React.Fragment key={lotProduction.idProduccionLecheLote || lotProduction.ttrIdprolot}>
            <CTableRow>
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
                {lotProduction.ttrTotlitrs.toFixed(2) || lotProduction.ttr_totlitrs.toFixed(2)}
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="link"
                  onClick={() =>
                    toggleDetails(lotProduction.idProduccionLecheLote || lotProduction.ttrIdprolot)
                  }
                >
                  {visibleDetail[
                    lotProduction.idProduccionLecheLote || lotProduction.ttrIdprolot
                  ] ? (
                    <React.Fragment>
                      Ocultar Bovinos
                      <CIcon icon={cilCaretTop} />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      Ver Bovinos
                      <CIcon icon={cilCaretBottom} />
                    </React.Fragment>
                  )}
                </CButton>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell colSpan={5} className="p-0">
                <CCollapse
                  visible={
                    visibleDetail[lotProduction.idProduccionLecheLote || lotProduction.ttrIdprolot]
                  }
                >
                  <div className="p-3">
                    <h6>
                      Producción Individual de Bovinos en Lote{' '}
                      {lotProduction.nombreLote || lotProduction.nombre_lote} (
                      {formatDateToDDMMYYYY(
                        lotProduction.fechaProduccion || lotProduction.ttr_fechapro,
                      )}
                      )
                    </h6>
                    {(lotProduction.observacion || lotProduction.ttr_observacion) && (
                      <div className="alert alert-info py-1 mb-2">
                        <small>
                          <strong>Nota:</strong>{' '}
                          {lotProduction.observacion || lotProduction.ttr_observacion}
                        </small>
                      </div>
                    )}
                    <CTable striped hover small className="mb-0">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Número Bovino</CTableHeaderCell>
                          <CTableHeaderCell>Litros</CTableHeaderCell>
                          <CTableHeaderCell>Acciones</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {getIndividualRecordsForLot(
                          lotProduction.ttrIdlote || lotProduction.ttr_idlote,
                          lotProduction.fechaProduccion || lotProduction.ttr_fechapro,
                        ).map((individualRecord) => (
                          <CTableRow
                            key={
                              individualRecord.idProduccionLeche || individualRecord.ttr_idprodlc
                            }
                          >
                            <CTableDataCell>
                              {individualRecord.bovinoNumero || individualRecord.bovinoNumero}
                            </CTableDataCell>
                            <CTableDataCell>
                              {individualRecord.litrosProducidos || individualRecord.ttr_litrsprd}
                            </CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                className="me-2 mb-2 text-white"
                                size="sm"
                                color="warning"
                                title="Editar"
                                onClick={() => {
                                  setCurrentRecord(individualRecord)
                                  setEditVisible(true)
                                }}
                              >
                                <CIcon icon={cilPencil} />
                              </CButton>
                              <CButton
                                className="me-2 mb-2 text-white"
                                size="sm"
                                color="danger"
                                title="Eliminar"
                                onClick={() => {
                                  setCurrentRecord(individualRecord)
                                  setDeleteVisible(true)
                                }}
                              >
                                <CIcon icon={cilTrash} />
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </div>
                </CCollapse>
              </CTableDataCell>
            </CTableRow>
          </React.Fragment>
        ))}
        {milkProductionLots.length === 0 && (
          <CTableRow>
            <CTableDataCell colSpan="5" className="text-center">
              No hay registros de producción de leche por lote disponibles.
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}
