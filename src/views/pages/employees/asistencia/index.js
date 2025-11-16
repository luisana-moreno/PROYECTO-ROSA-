'use client'
import { CCard, CCardHeader, CCardBody, CContainer, CRow, CCol } from '@coreui/react'
import CheckInOut from './components/CheckInOut'
import AttendanceFilters from './components/AttendanceFilters'
import AttendanceTable from './components/AttendanceTable'
import AttendanceDetailModal from './components/AttendanceDetailModal'
import useAttendance from './hooks/useAttendance'

const AsistenciaModule = () => {
  const {
    week,
    employees,
    selectedEmployee,
    detailVisible,
    filters,
    days,
    handleAttendanceChange,
    handleHoursWorkedChange,
    handleCheckIn,
    setFilters,
    setSelectedEmployee,
    setDetailVisible,
    filteredEmployees,
    loading,
    attendanceHistory, // Recibir el historial de asistencia
    todayDayName, // Recibir el nombre del día actual
  } = useAttendance()

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h3 className="mb-1">Control de Asistencias</h3>
          <p className="text-muted mb-0">Semana del {week}</p>
        </CCol>
      </CRow>

      {/* Sección de Check-in/Check-out */}
      <CheckInOut employees={employees} onCheckIn={handleCheckIn} loading={loading} />

      {/* Card principal de asistencias */}
      <CCard>
        <CCardHeader className="bg-light">
          <h5 className="mb-3">Gestión de Asistencias</h5>
          <AttendanceFilters filters={filters} setFilters={setFilters} />
        </CCardHeader>
        <CCardBody>
          <AttendanceTable
            employees={filteredEmployees}
            days={days}
            handleAttendanceChange={handleAttendanceChange}
            handleHoursWorkedChange={handleHoursWorkedChange}
            setSelectedEmployee={setSelectedEmployee}
            setDetailVisible={setDetailVisible}
            todayDayName={todayDayName} // Pasar el nombre del día actual
          />
        </CCardBody>
      </CCard>

      {/* Modal de detalles */}
      <AttendanceDetailModal
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
        employee={selectedEmployee}
        days={days}
        attendanceHistory={attendanceHistory} // Pasar el historial de asistencia
      />
    </CContainer>
  )
}

export default AsistenciaModule
