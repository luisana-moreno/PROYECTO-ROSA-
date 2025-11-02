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

const CattleTable = ({
  cattle,
  setCurrentCattle,
  setEditVisible,
  setDeleteVisible,
  setViewVisible,
}) => {
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
          <CTableRow key={cattleItem.ttr_idbovino}>
            <CTableDataCell>{cattleItem?.ttr_numerobv || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.raza_nombre || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.ttr_fecnacim || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.color_nombre || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.ttr_pesokilo || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.etapa_nombre || ''}</CTableDataCell>
            <CTableDataCell>{cattleItem?.estado_nombre || ''}</CTableDataCell>
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
                  color="primary"
                  variant="outline"
                  onClick={() => {
                    setCurrentCattle(cattleItem)
                    setViewVisible(true)
                  }}
                >
                  Visualizar
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
