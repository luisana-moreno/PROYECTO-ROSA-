"use client"
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
} from "@coreui/react"

const AttendanceTable = ({
  employees,
  days,
  handleAttendanceChange,
  handleHoursWorkedChange,
  setSelectedEmployee,
  setDetailVisible,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Presente":
        return "success"
      case "Ausente":
        return "danger"
      case "Reposo":
        return "warning"
      default:
        return "secondary"
    }
  }

  return (
    <div className="table-responsive">
      <CTable hover responsive>
        <CTableHead className="table-light">
          <CTableRow>
            <CTableHeaderCell style={{ minWidth: "150px" }}>Empleado</CTableHeaderCell>
            <CTableHeaderCell style={{ minWidth: "130px" }}>Cargo</CTableHeaderCell>
            {days.map((day) => (
              <CTableHeaderCell key={day} style={{ minWidth: "120px", textAlign: "center" }}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </CTableHeaderCell>
            ))}
            <CTableHeaderCell style={{ minWidth: "100px", textAlign: "center" }}>Horas</CTableHeaderCell>
            <CTableHeaderCell style={{ minWidth: "100px", textAlign: "center" }}>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employees.map((emp) => (
            <CTableRow key={emp.id} className="align-middle">
              <CTableDataCell>
                <strong>{emp.name}</strong>
              </CTableDataCell>
              <CTableDataCell className="text-muted">{emp.position}</CTableDataCell>
              {days.map((day) => (
                <CTableDataCell key={day} className="text-center p-2">
                  <CFormSelect
                    size="sm"
                    value={emp.attendance[day] || ""}
                    onChange={(e) => handleAttendanceChange(emp.id, day, e.target.value)}
                    style={{ fontSize: "0.85rem" }}
                  >
                    <option value="">—</option>
                    <option value="Presente">Presente</option>
                    <option value="Ausente">Ausente</option>
                    <option value="Reposo">Reposo</option>
                  </CFormSelect>
                  {emp.attendance[day] && (
                    <div className="mt-1">
                      <CBadge color={getStatusColor(emp.attendance[day])} shape="rounded-pill">
                        {emp.attendance[day]}
                      </CBadge>
                    </div>
                  )}
                </CTableDataCell>
              ))}
              <CTableDataCell className="text-center">
                <CFormInput
                  type="number"
                  size="sm"
                  placeholder="0"
                  value={emp.hoursWorked || ""}
                  onChange={(e) => handleHoursWorkedChange(emp.id, e.target.value)}
                  style={{ maxWidth: "70px", margin: "0 auto" }}
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
