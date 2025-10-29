import React from 'react'
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
} from '@coreui/react'

const AttendanceTable = ({
  employees,
  days,
  handleAttendanceChange,
  handleHoursWorkedChange,
  setSelectedEmployee,
  setDetailVisible,
}) => {
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Empleado</CTableHeaderCell>
          <CTableHeaderCell>Cargo</CTableHeaderCell>
          {days.map((day) => (
            <CTableHeaderCell key={day}>{day}</CTableHeaderCell>
          ))}
          <CTableHeaderCell>Horas Trabajadas</CTableHeaderCell>
          <CTableHeaderCell>Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {employees.map((emp) => (
          <CTableRow key={emp.id}>
            <CTableDataCell>{emp.name}</CTableDataCell>
            <CTableDataCell>{emp.position}</CTableDataCell>
            {days.map((day) => (
              <CTableDataCell key={day}>
                <CFormSelect
                  value={emp.attendance[day] || ''}
                  onChange={(e) => handleAttendanceChange(emp.id, day, e.target.value)}
                >
                  <option value="">Seleccione</option>
                  <option value="Presente">Presente</option>
                  <option value="Ausente">Ausente</option>
                  <option value="Reposo">Reposo</option>
                </CFormSelect>
              </CTableDataCell>
            ))}
            <CTableDataCell>
              <CFormInput
                type="number"
                placeholder="Horas"
                value={emp.hoursWorked}
                onChange={(e) => handleHoursWorkedChange(emp.id, e.target.value)}
              />
            </CTableDataCell>
            <CTableDataCell>
              <CButton
                size="sm"
                color="info"
                variant="outline"
                onClick={() => {
                  setSelectedEmployee(emp)
                  setDetailVisible(true)
                }}
                className="button-no-hover-green text-white"
              >
                Ver Detalle
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default AttendanceTable
