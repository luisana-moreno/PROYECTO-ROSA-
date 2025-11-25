import React from 'react'
import {
  CButton,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
} from '@coreui/react'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const CattleTable = ({
  cattle,
  setCurrentCattle,
  setEditVisible,
  setDeleteVisible,
  setViewVisible,
  handleViewExpBov, // Nueva prop
}) => {
  console.log('CattleTable cattle prop:', cattle)
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell className="text-green">Número de Bovino</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Raza</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Fecha de Nacimiento</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Color</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Peso (Kg)</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Etapa</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Estado</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {cattle.map((cattleItem) => (
          <CTableRow key={cattleItem.ttrIdbovino}>
            <CTableDataCell>{cattleItem?.ttrNumerobv || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.razaNombre || ''}</CTableDataCell>
            <CTableDataCell>{formatDateToDDMMYYYY(cattleItem?.ttrFecnacim) || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.colorNombre || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.ttrPesokilo || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.etapaNombre || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.estadoNombre || ''}</CTableDataCell>
            <CTableDataCell>
              <div className="d-flex">
                <CButton
                  className="me-2 mb-2"
                  size="sm"
                  color="info"
                  variant="outline"
                  onClick={() => {
                    setCurrentCattle(cattleItem)
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
                    setCurrentCattle(cattleItem)
                    setDeleteVisible(true)
                  }}
                >
                  Eliminar
                </CButton>

                <CButton
                  className="me-2 mb-2"
                  size="sm"
                  color="success"
                  variant="outline"
                  onClick={() => handleViewExpBov(cattleItem)} // Nuevo botón
                >
                  Expediente
                </CButton>
              </div>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default CattleTable
