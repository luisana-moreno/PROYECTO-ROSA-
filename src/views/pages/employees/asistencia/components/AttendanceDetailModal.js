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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const AttendanceDetailModal = ({
  visible,
  onClose,
  employee,
  days,
  attendanceHistory,
  attendanceTypes,
}) => {
  if (!employee) return null

  const getStatusColor = (statusName) => {
    switch (statusName) {
      case 'Presente':
        return 'success'
      case 'Ausente':
        return 'danger'
      case 'Reposo':
      case 'Pendiente': // Considerar Pendiente como un estado que podría tener un color específico
        return 'warning'
      default:
        return 'secondary'
    }
  }

  // Calcular el resumen de la semana usando los nombres de los tipos de asistencia
  const presentDays = days.filter(
    (dayInfo) => employee.attendance[dayInfo.name]?.tipoAsistenciaNombre === 'Presente',
  ).length
  const absentDays = days.filter(
    (dayInfo) => employee.attendance[dayInfo.name]?.tipoAsistenciaNombre === 'Ausente',
  ).length
  const restDays = days.filter(
    (dayInfo) => employee.attendance[dayInfo.name]?.tipoAsistenciaNombre === 'Reposo',
  ).length
  const pendingDays = days.filter(
    (dayInfo) => employee.attendance[dayInfo.name]?.tipoAsistenciaNombre === 'Pendiente',
  ).length

  return (
    <CModal
      size="lg"
      alignment="center"
      scrollable
      visible={visible}
      onClose={onClose}
      backdrop="static"
    >
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
            <CAlert color="warning" className="mb-2 py-2">
              <strong>Reposo:</strong> {restDays} días
            </CAlert>
            <CAlert color="info" className="py-2">
              <strong>Pendientes:</strong> {pendingDays} días
            </CAlert>
          </CCol>
        </CRow>

        <h6 className="text-muted mb-3">Estado por Día (Semana Actual)</h6>
        <div className="d-flex flex-wrap gap-2">
          {days.map((dayInfo) => (
            <div key={dayInfo.name} className="text-center">
              <div className="small text-muted mb-1">
                {dayInfo.name.charAt(0).toUpperCase() + dayInfo.name.slice(1)}
                <br />
                <small>{dayInfo.date}</small>
              </div>
              <CBadge
                color={getStatusColor(employee.attendance[dayInfo.name]?.tipoAsistenciaNombre)}
                shape="rounded-pill"
                className="py-2 px-3"
              >
                {employee.attendance[dayInfo.name]?.tipoAsistenciaNombre || '—'}
              </CBadge>
            </div>
          ))}
        </div>

        <h6 className="text-muted mt-4 mb-3">Historial de Asistencia</h6>
        {attendanceHistory && attendanceHistory.length > 0 ? (
          <CTable hover responsive striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>Entrada</CTableHeaderCell>
                <CTableHeaderCell>Salida</CTableHeaderCell>
                <CTableHeaderCell>Horas Trabajadas</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {attendanceHistory.map((record) => (
                <CTableRow key={record.ttr_idasisen}>
                  <CTableDataCell>{formatDateToDDMMYYYY(record.ttr_fechaasi)}</CTableDataCell>
                  <CTableDataCell>{record.ttr_horaentr || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{record.ttr_horasali || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{record.ttr_horatrab || '00:00:00'}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={getStatusColor(record.tipo_asistencia_nombre)}>
                      {record.tipo_asistencia_nombre || 'Desconocido'}
                    </CBadge>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <CAlert color="info">
            No hay historial de asistencia disponible para este empleado.
          </CAlert>
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

export default AttendanceDetailModal
