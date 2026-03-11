import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCard,
  CCardHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

const TipoMantenimientoTable = ({
  tiposMantenimiento,
  setCurrentTipoMantenimiento,
  setAddTipoMantenimientoVisible,
  setEditTipoMantenimientoVisible,
  setDeleteTipoMantenimientoVisible,
}) => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Tipos de Mantenimiento
          <CButton
            className="button-no-hover-green text-white"
            onClick={() => {
              setCurrentTipoMantenimiento(null)
              setAddTipoMantenimientoVisible(true)
            }}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Tipo
          </CButton>
        </h5>
      </CCardHeader>
      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Nombre</CTableHeaderCell>
            <CTableHeaderCell>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tiposMantenimiento.map((tipo, index) => (
            <CTableRow key={tipo.tma_idtipma || index}>
              <CTableDataCell>{tipo.tma_idtipma}</CTableDataCell>
              <CTableDataCell>{tipo.tma_nomtipm}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  className="me-2 mb-2"
                  size="sm"
                  color="info"
                  variant="outline"
                  onClick={() => {
                    setCurrentTipoMantenimiento(tipo)
                    setEditTipoMantenimientoVisible(true)
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
                    setCurrentTipoMantenimiento(tipo)
                    setDeleteTipoMantenimientoVisible(true)
                  }}
                >
                  Eliminar
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCard>
  )
}

export default TipoMantenimientoTable
