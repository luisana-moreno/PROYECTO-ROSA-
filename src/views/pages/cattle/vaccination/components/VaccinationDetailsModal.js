import React from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import CIcon from '@coreui/icons-react'
const VaccinationDetailsModal = ({
  visible,
  onClose,
  records,
  selectedDate,
  onShowAssociatedBovinos,
}) => {
  if (!visible) return null

  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>
          Detalles de Vacunación para el {format(selectedDate, 'dd MMMM yyyy', { locale: es })}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {records && records.length > 0 ? (
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID Registro Médico</CTableHeaderCell>
                <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                <CTableHeaderCell>Tipo de Vacuna</CTableHeaderCell>
                <CTableHeaderCell>Tratamiento</CTableHeaderCell>
                <CTableHeaderCell>Nombre del Responsable</CTableHeaderCell>
                <CTableHeaderCell>Bovinos</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {records.map((record) => (
                <CTableRow key={record.id}>
                  <CTableDataCell>{record.id}</CTableDataCell>
                  <CTableDataCell>{record.diagnostico || ''}</CTableDataCell>
                  <CTableDataCell>{record.tipoVacuna}</CTableDataCell>
                  <CTableDataCell>{record.tratamiento}</CTableDataCell>
                  <CTableDataCell>{record.nombreEmpleado || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      size="sm"
                      className="text-white ms-2"
                      onClick={() => onShowAssociatedBovinos(record.bovinos)}
                    >
                      Ver Bovinos
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <p>No hay registros de vacunación para esta fecha.</p>
        )}
        <div className="d-flex justify-content-end">
          <CButton color="secondary" onClick={onClose}>
            Cerrar
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

VaccinationDetailsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  records: PropTypes.array,
  selectedDate: PropTypes.instanceOf(Date),
  onShowAssociatedBovinos: PropTypes.func.isRequired,
}

export default VaccinationDetailsModal
