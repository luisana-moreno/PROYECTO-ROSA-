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

const EstadoPotreroTable = ({
  estadosPotrero,
  setCurrentEstadoPotrero,
  setAddEstadoPotreroVisible,
  setEditEstadoPotreroVisible,
  setDeleteEstadoPotreroVisible,
}) => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Estados de Potrero
          <CButton
            className="button-no-hover-green text-white"
            onClick={() => {
              setCurrentEstadoPotrero(null)
              setAddEstadoPotreroVisible(true)
            }}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Estado
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
          {estadosPotrero.map((estado, index) => (
            <CTableRow key={estado.tma_idestpo || index}>
              <CTableDataCell>{estado.tma_idestpo}</CTableDataCell>
              <CTableDataCell>{estado.tma_nomestp}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  className="me-2 mb-2"
                  size="sm"
                  color="info"
                  variant="outline"
                  onClick={() => {
                    setCurrentEstadoPotrero(estado)
                    setEditEstadoPotreroVisible(true)
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
                    setCurrentEstadoPotrero(estado)
                    setDeleteEstadoPotreroVisible(true)
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

export default EstadoPotreroTable
