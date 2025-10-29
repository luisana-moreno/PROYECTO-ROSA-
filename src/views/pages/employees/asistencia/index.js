import React from 'react'
import AttendanceFilters from './components/AttendanceFilters'
import AttendanceTable from './components/AttendanceTable'
import AttendanceDetailModal from './components/AttendanceDetailModal'
import useAttendance from './hooks/useAttendance'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'

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
    setFilters,
    setSelectedEmployee,
    setDetailVisible,
    filteredEmployees,
  } = useAttendance()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0">Control de Asistencias</h4>
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
        />
      </CCardBody>

      <AttendanceDetailModal
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
        employee={selectedEmployee}
        days={days}
      />
    </CCard>
  )
}

export default AsistenciaModule
