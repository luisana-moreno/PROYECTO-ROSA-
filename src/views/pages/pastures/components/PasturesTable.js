import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const PasturesTable = ({ pastures, setCurrentPasture, setEditVisible, setDeleteVisible }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponible':
        return 'success'
      case 'En uso':
        return 'primary'
      case 'En mantenimiento':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  return (
    <CTable hover responsive className="align-middle">
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell>Código Potrero</CTableHeaderCell>
          <CTableHeaderCell>Estado</CTableHeaderCell>
          <CTableHeaderCell>Descripción</CTableHeaderCell>
          <CTableHeaderCell>Fecha Mantenimiento</CTableHeaderCell>
          <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {pastures.map((pasture) => (
          <CTableRow key={pasture.ttr_idpotrer}>
            <CTableDataCell className="fw-semibold text-success">
              {pasture.ttr_codpotre}
            </CTableDataCell>
            <CTableDataCell>
              <CBadge color={getStatusColor(pasture.tma_nomestp)}>{pasture.tma_nomestp}</CBadge>
            </CTableDataCell>
            <CTableDataCell>{pasture.ttr_descripc}</CTableDataCell>
            <CTableDataCell>{new Date(pasture.ttr_fechamnt).toLocaleDateString()}</CTableDataCell>
            <CTableDataCell className="text-end">
              <CButton
                color="warning"
                size="sm"
                className="me-2 text-white"
                title="Editar"
                onClick={() => {
                  setCurrentPasture(pasture)
                  setEditVisible(true)
                }}
              >
                <CIcon icon={cilPencil} />
              </CButton>
              <CButton
                color="danger"
                size="sm"
                title="Eliminar"
                onClick={() => {
                  setCurrentPasture(pasture)
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
  )
}

export default PasturesTable
