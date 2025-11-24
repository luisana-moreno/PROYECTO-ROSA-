import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const DayOptionsModal = ({ visible, onClose, selectedDate, onRegister, onViewDetails }) => {
  const formattedDate = selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: es }) : ''
  return (
    <CModal alignment="center" visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>
        <CModalTitle className="typography-color-title">
          Opciones para el día {formattedDate}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>¿Qué acción desea realizar para el día seleccionado?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={onViewDetails} className="text-white">
          Ver Detalles
        </CButton>
        <CButton color="success" onClick={onRegister} className="text-white">
          Registrar Vacunación
        </CButton>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

DayOptionsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onRegister: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
}

export default DayOptionsModal
