import { useState, useEffect } from 'react'
import { attendanceService } from 'src/api/attendanceService'
import { employeeService } from 'src/api/employeeService' // Asumiendo que ya existe un employeeService

const useAttendance = () => {
  const [week, setWeek] = useState('21 abr - 27 abr 2025')
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [detailVisible, setDetailVisible] = useState(false)
  const [filters, setFilters] = useState({
    name: '',
    position: '',
  })
  const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await employeeService.getEmployees()
        const attendancesData = await attendanceService.getAllAttendances()

        if (employeesData) {
          const employeesWithAttendance = employeesData.map((emp) => {
            const employeeAttendances = attendancesData.filter(
              (att) => att.ttr_idemplea === emp.id, // Asumiendo que 'id' es el ID del empleado en el frontend y 'ttr_idemplea' en el backend
            )

            // Agrupar asistencias por día y calcular horas trabajadas
            const attendanceByDay = {}
            let totalHoursWorked = 0

            employeeAttendances.forEach((att) => {
              const date = new Date(att.ttr_fechaasi)
              const dayOfWeek = days[date.getDay() - 1] // Ajustar para que lunes sea el primer día (0-indexed)

              // Aquí se asume que cada empleado tiene una entrada/salida por día.
              // Si hay múltiples registros por día, se necesitaría una lógica más compleja.
              attendanceByDay[dayOfWeek] = 'Presente' // O un estado más específico si se guarda en la DB

              // Calcular horas trabajadas para este registro
              const horaEntrada = new Date(`2000-01-01T${att.ttr_horaentr}`)
              const horaSalida = new Date(`2000-01-01T${att.ttr_horasali}`)
              const diffMs = horaSalida - horaEntrada
              const hours = diffMs / (1000 * 60 * 60)
              totalHoursWorked += hours
            })

            return {
              ...emp,
              name: `${emp.firts_name || ''} ${emp.Firts_Las_Name || ''}`.trim(),
              position: emp.Position || '',
              attendance: attendanceByDay,
              hoursWorked: totalHoursWorked,
            }
          })
          setEmployees(employeesWithAttendance)
        }
      } catch (error) {
        console.error('Error al obtener datos de asistencia y empleados:', error)
      }
    }
    fetchData()
  }, [])

  const handleAttendanceChange = (employeeId, day, value) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === employeeId ? { ...emp, attendance: { ...emp.attendance, [day]: value } } : emp,
      ),
    )
  }

  const handleHoursWorkedChange = (employeeId, hours) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => (emp.id === employeeId ? { ...emp, hoursWorked: hours } : emp)),
    )
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesName = filters.name
      ? emp.name.toLowerCase().includes(filters.name.toLowerCase())
      : true
    const matchesPosition = filters.position
      ? emp.position.toLowerCase().includes(filters.position.toLowerCase())
      : true
    return matchesName && matchesPosition
  })

  return {
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
  }
}

export default useAttendance
