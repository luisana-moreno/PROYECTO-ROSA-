import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CSpinner,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const BovinesInLotPastureModal = ({
  visible,
  onClose,
  pastureId,
  lotId,
  date,
  bovines,
  loading,
}) => {
  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose} size="lg">
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">
          Bovinos en Lote {lotId} en Potrero {pastureId} el {formatDateToDDMMYYYY(date)}
        </CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <CSpinner color="primary" />
          </div>
        ) : bovines.length === 0 ? (
          <p>No se encontraron bovinos para este lote y potrero en la fecha seleccionada.</p>
        ) : (
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Número de Bovino</CTableHeaderCell>
                <CTableHeaderCell>Raza</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Inicio</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Fin</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {bovines.map((bovine) => (
                <CTableRow key={bovine.ttr_idbovlotpotr}>
                  <CTableDataCell>{bovine.bovino_numero}</CTableDataCell>
                  <CTableDataCell>{bovine.raza_nombre}</CTableDataCell>
                  <CTableDataCell>{formatDateToDDMMYYYY(bovine.ttr_fechaini)}</CTableDataCell>
                  <CTableDataCell>
                    {bovine.ttr_fechafin ? formatDateToDDMMYYYY(bovine.ttr_fechafin) : 'Activo'}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

BovinesInLotPastureModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pastureId: PropTypes.number,
  lotId: PropTypes.number,
  date: PropTypes.string,
  bovines: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default BovinesInLotPastureModal
