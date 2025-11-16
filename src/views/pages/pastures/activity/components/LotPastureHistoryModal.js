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

const LotPastureHistoryModal = ({
  visible,
  onClose,
  pasture,
  history,
  loading,
  onViewBovinesInLot,
}) => {
  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose} size="lg">
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">
          Historial de Lotes en Potrero: {pasture ? pasture.codigo : ''}
        </CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <CSpinner color="primary" />
          </div>
        ) : history.length === 0 ? (
          <p>No hay historial de lotes para este potrero.</p>
        ) : (
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Lote</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Asignación</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {history.map((item) => (
                <CTableRow key={item.ttr_idlotpot}>
                  <CTableDataCell>{item.lote_nombre}</CTableDataCell>
                  <CTableDataCell>{formatDateToDDMMYYYY(item.ttr_fechaasi)}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      size="sm"
                      color="info"
                      variant="outline"
                      onClick={() =>
                        onViewBovinesInLot(pasture.id, item.ttr_idlote, item.ttr_fechaasi)
                      }
                    >
                      Ver Bovinos
                    </CButton>
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

LotPastureHistoryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pasture: PropTypes.object,
  history: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onViewBovinesInLot: PropTypes.func.isRequired,
}

export default LotPastureHistoryModal
