'use client'
import { CCard, CCardHeader, CCardBody, CContainer, CRow, CCol, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilLockUnlocked } from '@coreui/icons'
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
    todayFormattedDate, // Recibir la fecha actual formateada
    todayFullDate, // Recibir la fecha actual completa
    isEditingLocked, // Recibir el estado de bloqueo de edición
    toggleEditingLock, // Recibir la función para alternar el bloqueo de edición
  } = useAttendance()

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h3 className="mb-1">Control de Asistencias</h3>
          <p className="text-muted mb-0">
            Semana del {week} | Hoy es {todayDayName}, {todayFormattedDate}
          </p>
        </CCol>
      </CRow>

      {/* Sección de Check-in/Check-out */}
      <CheckInOut employees={employees} onCheckIn={handleCheckIn} loading={loading} />

      {/* Card principal de asistencias */}
      <CCard>
        <CCardHeader className="bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Gestión de Asistencias</h5>
          <CButton
            color="light"
            variant="outline"
            onClick={toggleEditingLock}
            className="ms-2"
            title={isEditingLocked ? 'Desbloquear edición' : 'Bloquear edición'}
          >
            <CIcon icon={isEditingLocked ? cilLockLocked : cilLockUnlocked} />
          </CButton>
        </CCardHeader>
        <CCardBody>
          <AttendanceFilters filters={filters} setFilters={setFilters} />
          <AttendanceTable
            employees={filteredEmployees}
            days={days}
            handleAttendanceChange={handleAttendanceChange}
            handleHoursWorkedChange={handleHoursWorkedChange}
            setSelectedEmployee={setSelectedEmployee}
            setDetailVisible={setDetailVisible}
            todayDayName={todayDayName} // Pasar el nombre del día actual
            todayFullDate={todayFullDate} // Pasar la fecha actual completa
            isEditingLocked={isEditingLocked} // Pasar el estado de bloqueo de edición
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
