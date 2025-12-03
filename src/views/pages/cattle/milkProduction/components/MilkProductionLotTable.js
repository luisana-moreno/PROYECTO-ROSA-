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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCaretBottom, cilCaretTop } from '@coreui/icons'

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
      (record) => record.ttr_idlote === lotId && record.ttr_fechapro === date,
    )
  }

  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Lote</CTableHeaderCell>
          <CTableHeaderCell>Fecha</CTableHeaderCell>
          <CTableHeaderCell>Total Litros</CTableHeaderCell>
          <CTableHeaderCell>Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {milkProductionLots.map((lotProduction) => (
          <React.Fragment key={lotProduction.ttr_idprolot}>
            <CTableRow>
              <CTableDataCell>{lotProduction.nombre_lote}</CTableDataCell>
              <CTableDataCell>{lotProduction.ttr_fechapro}</CTableDataCell>
              <CTableDataCell>{lotProduction.ttr_totlitrs}</CTableDataCell>
              <CTableDataCell>
                <CButton color="link" onClick={() => toggleDetails(lotProduction.ttr_idprolot)}>
                  {visibleDetail[lotProduction.ttr_idprolot] ? (
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
              <CTableDataCell colSpan={4} className="p-0">
                <CCollapse visible={visibleDetail[lotProduction.ttr_idprolot]}>
                  <div className="p-3">
                    <h6>
                      Producción Individual de Bovinos en Lote {lotProduction.nombre_lote} (
                      {lotProduction.ttr_fechapro})
                    </h6>
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
                          lotProduction.ttr_idlote,
                          lotProduction.ttr_fechapro,
                        ).map((individualRecord) => (
                          <CTableRow key={individualRecord.ttr_idprodlc}>
                            <CTableDataCell>{individualRecord.bovino_numero}</CTableDataCell>
                            <CTableDataCell>{individualRecord.ttr_litrsprd}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                className="me-2 mb-2"
                                size="sm"
                                color="info"
                                variant="outline"
                                onClick={() => {
                                  setCurrentRecord(individualRecord)
                                  setEditVisible(true)
                                }}
                              >
                                Editar
                              </CButton>
                              <CButton
                                className="me-2 mb-2"
                                size="sm"
                                color="danger"
                                variant="outline"
                                onClick={() => {
                                  setCurrentRecord(individualRecord)
                                  setDeleteVisible(true)
                                }}
                              >
                                Eliminar
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
            <CTableDataCell colSpan="4" className="text-center">
              No hay registros de producción de leche por lote disponibles.
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}
