import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { usePagination } from '../../../../../hooks/usePagination'

export const MilkRecordsTable = ({
  milkRecords,
  setCurrentRecord,
  setEditVisible,
  setDeleteVisible,
}) => {
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(milkRecords, 10)

  return (
    <>
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
          {currentData.map((record) => (
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

      {milkRecords.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination aria-label="Navegación de registros de leche">
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
