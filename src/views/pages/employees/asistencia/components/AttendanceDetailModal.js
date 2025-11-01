'use client'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
  CRow,
  CCol,
  CAlert,
  CBadge,
} from '@coreui/react'

const AttendanceDetailModal = ({ visible, onClose, employee, days }) => {
  if (!employee) return null

  const getStatusColor = (status) => {
    switch (status) {
      case 'Presente':
        return 'success'
      case 'Ausente':
        return 'danger'
      case 'Reposo':
        return 'warning'
      default:
        return 'secondary'
    }
  }

  const presentDays = days.filter((day) => employee.attendance[day] === 'Presente').length
  const absentDays = days.filter((day) => employee.attendance[day] === 'Ausente').length
  const restDays = days.filter((day) => employee.attendance[day] === 'Reposo').length

  return (
    <CModal size="lg" alignment="center" scrollable visible={visible} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Detalle de Asistencia - {employee.name}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="mb-4">
          <CCol md={6}>
            <h6 className="text-muted mb-2">Información del Empleado</h6>
            <p className="mb-1">
              <strong>Nombre:</strong> {employee.name}
            </p>
            <p className="mb-1">
              <strong>Cargo:</strong> {employee.position}
            </p>
            <p>
              <strong>Horas Trabajadas:</strong> {employee.hoursWorked || 0} hrs
            </p>
          </CCol>
          <CCol md={6}>
            <h6 className="text-muted mb-2">Resumen de la Semana</h6>
            <CAlert color="success" className="mb-2 py-2">
              <strong>Presentes:</strong> {presentDays} días
            </CAlert>
            <CAlert color="danger" className="mb-2 py-2">
              <strong>Ausentes:</strong> {absentDays} días
            </CAlert>
            <CAlert color="warning" className="py-2">
              <strong>Reposo:</strong> {restDays} días
            </CAlert>
          </CCol>
        </CRow>

        <h6 className="text-muted mb-3">Estado por Día</h6>
        <div className="d-flex flex-wrap gap-2">
          {days.map((day) => (
            <div key={day} className="text-center">
              <div className="small text-muted mb-1">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </div>
              <CBadge
                color={getStatusColor(employee.attendance[day])}
                shape="rounded-pill"
                className="py-2 px-3"
              >
                {employee.attendance[day] || '—'}
              </CBadge>
            </div>
          ))}
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AttendanceDetailModal
