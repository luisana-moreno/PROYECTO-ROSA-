import React from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CButton } from '@coreui/react'

const AttendanceDetailModal = ({ visible, onClose, employee, days }) => {
  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Detalle del Empleado</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {employee ? (
          <>
            <h5>Nombre: {employee.name}</h5>
            <h6>Cargo: {employee.position}</h6>
            <h6>Horas Trabajadas: {employee.hoursWorked}</h6>
            <h6>Estado de la Semana:</h6>
            <ul>
              {days.map((day) => (
                <li key={day}>
                  {day}: {employee.attendance[day] || 'Sin registro'}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No hay detalles disponibles.</p>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={onClose}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AttendanceDetailModal
