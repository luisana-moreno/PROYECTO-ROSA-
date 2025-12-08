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

import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

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
                  className="me-2 mb-2 text-white"
                  size="sm"
                  color="warning"
                  title="Editar"
                  onClick={() => {
                    setCurrentRecord(record)
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
                    setCurrentRecord(record)
                    setDeleteVisible(true)
                  }}
                >
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}
