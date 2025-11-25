'use client'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormSelect,
  CFormInput,
  CButton,
  CBadge,
} from '@coreui/react'

const AttendanceTable = ({
  employees,
  days,
  handleAttendanceChange,
  handleHoursWorkedChange,
  setSelectedEmployee,
  setDetailVisible,
  todayDayName, // Nuevo prop
  todayFullDate, // Nuevo prop: fecha actual completa
  isEditingLocked, // Nuevo prop: estado de bloqueo de edición
}) => {
  // Normalizar todayFullDate a medianoche para comparaciones
  const todayNormalized = new Date(todayFullDate)
  todayNormalized.setHours(0, 0, 0, 0)
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

  console.log('Employees in AttendanceTable:', employees)
  return (
    <div className="table-responsive">
      <CTable hover responsive>
        <CTableHead className="table-light">
          <CTableRow>
            <CTableHeaderCell style={{ minWidth: '150px' }}>Empleado</CTableHeaderCell>
            <CTableHeaderCell style={{ minWidth: '130px' }}>Cargo</CTableHeaderCell>
            {days.map((dayInfo) => (
              <CTableHeaderCell
                key={dayInfo.name}
                style={{ minWidth: '120px', textAlign: 'center' }}
              >
                {dayInfo.name.charAt(0).toUpperCase() + dayInfo.name.slice(1)}
                <br />
                <small className="text-muted">{dayInfo.date}</small>
              </CTableHeaderCell>
            ))}
            <CTableHeaderCell style={{ minWidth: '100px', textAlign: 'center' }}>
              Horas
            </CTableHeaderCell>
            <CTableHeaderCell style={{ minWidth: '100px', textAlign: 'center' }}>
              Acciones
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employees.map((emp) => (
            <CTableRow key={emp.id} className="align-middle">
              <CTableDataCell>
                <strong>{`${emp.ttrNombrel || ''} ${emp.ttrNomsegu || ''} ${
                  emp.ttrApellid || ''
                } ${emp.ttrApesegu || ''}`}</strong>
              </CTableDataCell>
              <CTableDataCell className="text-muted">{emp.cargoNombre}</CTableDataCell>
              {days.map((dayInfo) => {
                // Reconstruir la fecha completa para el día de la semana actual
                const [dayOfMonth, monthOfYear] = dayInfo.date.split('/').map(Number)
                const currentYear = todayNormalized.getFullYear() // Usar el año de todayNormalized
                const dayFullDate = new Date(currentYear, monthOfYear - 1, dayOfMonth)
                dayFullDate.setHours(0, 0, 0, 0) // Normalizar a medianoche

                // Determinar si el día es futuro
                const isFutureDay = dayFullDate > todayNormalized

                // Determinar si el campo debe estar deshabilitado
                const isDisabled = isEditingLocked && isFutureDay

                return (
                  <CTableDataCell key={`${emp.id}-${dayInfo.name}`} className="text-center p-2">
                    <CFormSelect
                      size="sm"
                      value={emp.attendance[dayInfo.name]?.status || ''}
                      onChange={(e) => handleAttendanceChange(emp.id, dayInfo.name, e.target.value)}
                      style={{ fontSize: '0.85rem' }}
                      disabled={isDisabled} // Deshabilita si está bloqueado y es un día futuro
                    >
                      <option value="">—</option>
                      <option value="Presente">Presente</option>
                      <option value="Ausente">Ausente</option>
                      <option value="Reposo">Reposo</option>
                    </CFormSelect>
                    {emp.attendance[dayInfo.name]?.status && (
                      <div className="mt-1">
                        <CBadge
                          color={getStatusColor(emp.attendance[dayInfo.name].status)}
                          shape="rounded-pill"
                        >
                          {emp.attendance[dayInfo.name].status}
                        </CBadge>
                      </div>
                    )}
                  </CTableDataCell>
                )
              })}
              <CTableDataCell className="text-center">
                <CFormInput
                  type="number"
                  size="sm"
                  placeholder="0"
                  value={emp.hoursWorked || ''}
                  onChange={(e) => handleHoursWorkedChange(emp.id, e.target.value)}
                  style={{ maxWidth: '70px', margin: '0 auto' }}
                  disabled={isEditingLocked} // Deshabilita si la edición está bloqueada
                />
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <CButton
                  size="sm"
                  color="info"
                  variant="outline"
                  onClick={() => {
                    setSelectedEmployee(emp)
                    setDetailVisible(true)
                  }}
                >
                  Ver +
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default AttendanceTable
