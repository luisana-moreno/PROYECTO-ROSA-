import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'

export const MilkRecordsTable = ({
  milkRecords,
  setCurrentRecord,
  setEditVisible,
  setDeleteVisible,
}) => {
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Tipo</CTableHeaderCell>
          <CTableHeaderCell>Identificador</CTableHeaderCell>
          <CTableHeaderCell>Día</CTableHeaderCell>
          <CTableHeaderCell>Litros</CTableHeaderCell>
          <CTableHeaderCell>Inicio Mañana</CTableHeaderCell>
          <CTableHeaderCell>Fin Mañana</CTableHeaderCell>
          <CTableHeaderCell>Inicio Tarde</CTableHeaderCell>
          <CTableHeaderCell>Fin Tarde</CTableHeaderCell>
          <CTableHeaderCell>Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {milkRecords.map((record) => (
          <CTableRow key={record.id}>
            <CTableDataCell>{record.type}</CTableDataCell>
            <CTableDataCell>{record.identifier}</CTableDataCell>
            <CTableDataCell>{record.day}</CTableDataCell>
            <CTableDataCell>{record.liters}</CTableDataCell>
            <CTableDataCell>{record.morningStart}</CTableDataCell>
            <CTableDataCell>{record.morningEnd}</CTableDataCell>
            <CTableDataCell>{record.afternoonStart}</CTableDataCell>
            <CTableDataCell>{record.afternoonEnd}</CTableDataCell>
            <CTableDataCell>
              <div className="d-flex">
                <CButton
                  className="me-2 mb-2"
                  size="sm"
                  color="info"
                  variant="outline"
                  onClick={() => {
                    setCurrentRecord(record)
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
                    setCurrentRecord(record)
                    setDeleteVisible(true)
                  }}
                >
                  Eliminar
                </CButton>
              </div>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}
