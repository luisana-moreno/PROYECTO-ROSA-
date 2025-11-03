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

const PasturesTable = ({ pastures, setCurrentPasture, setEditVisible, setDeleteVisible }) => {
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Código Potrero</CTableHeaderCell>
          <CTableHeaderCell>Estado</CTableHeaderCell>
          <CTableHeaderCell>Descripción</CTableHeaderCell>
          <CTableHeaderCell>Fecha Mantenimiento</CTableHeaderCell>
          <CTableHeaderCell>Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {pastures.map((pasture) => (
          <CTableRow key={pasture.ttr_idpotrer}>
            <CTableDataCell>{pasture.ttr_codpotre}</CTableDataCell>
            <CTableDataCell>{pasture.tma_nomestp}</CTableDataCell>
            <CTableDataCell>{pasture.ttr_descripc}</CTableDataCell>
            <CTableDataCell>{new Date(pasture.ttr_fechamnt).toLocaleDateString()}</CTableDataCell>
            <CTableDataCell>
              <div className="d-flex">
                <CButton
                  className="me-2 mb-2"
                  size="sm"
                  color="info"
                  variant="outline"
                  onClick={() => {
                    setCurrentPasture(pasture)
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
                    setCurrentPasture(pasture)
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

export default PasturesTable
