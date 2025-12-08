import React from 'react'
import {
  CButton,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CBadge,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilFolder } from '@coreui/icons'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const CattleTable = ({
  cattle,
  setCurrentCattle,
  setEditVisible,
  setDeleteVisible,
  setViewVisible,
  handleViewExpBov,
}) => {
  // Función para obtener el color del badge según el estado
  const getEstadoBadgeColor = (estadoNombre) => {
    const estadoColors = {
      activo: 'success',
      vendido: 'info',
      muerto: 'danger',
      enfermo: 'warning',
    }
    return estadoColors[estadoNombre?.toLowerCase()] || 'secondary'
  }

  return (
    <>
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>N° Bovino</CTableHeaderCell>
            <CTableHeaderCell>Raza</CTableHeaderCell>
            <CTableHeaderCell>Fecha Nacimiento</CTableHeaderCell>
            <CTableHeaderCell>Color</CTableHeaderCell>
            <CTableHeaderCell>Peso (Kg)</CTableHeaderCell>
            <CTableHeaderCell>Etapa</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {cattle.map((cattleItem) => (
            <CTableRow key={cattleItem.ttrIdbovino}>
              <CTableDataCell>
                <strong>{cattleItem?.ttrNumerobv || '-'}</strong>
              </CTableDataCell>
              <CTableDataCell>{cattleItem?.razaNombre || '-'}</CTableDataCell>
              <CTableDataCell>
                {formatDateToDDMMYYYY(cattleItem?.ttrFecnacim) || '-'}
              </CTableDataCell>
              <CTableDataCell>{cattleItem?.colorNombre || '-'}</CTableDataCell>
              <CTableDataCell>{cattleItem?.ttrPesokilo || '-'}</CTableDataCell>
              <CTableDataCell>{cattleItem?.etapaNombre || '-'}</CTableDataCell>
              <CTableDataCell>
                <CBadge color={getEstadoBadgeColor(cattleItem?.estadoNombre)}>
                  {cattleItem?.estadoNombre || 'Sin estado'}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentCattle(cattleItem)
                    setEditVisible(true)
                  }}
                >
                  <CIcon icon={cilPencil} size="sm" className="me-1" />
                  Editar
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentCattle(cattleItem)
                    setDeleteVisible(true)
                  }}
                >
                  <CIcon icon={cilTrash} size="sm" className="me-1" />
                  Eliminar
                </CButton>
                <CButton color="success" size="sm" onClick={() => handleViewExpBov(cattleItem)}>
                  <CIcon icon={cilFolder} size="sm" className="me-1" />
                  Expediente
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {cattle.length === 0 && (
        <CAlert color="info">No hay bovinos registrados en el sistema.</CAlert>
      )}
    </>
  )
}

export default CattleTable
