'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { attendanceService } from 'src/api/attendanceService'
import { employeeService } from 'src/api/employeeService'
import { getWeekRange, getDayName } from 'src/utils/dateFormatter' // Asumo que tienes un util para esto

// Días de la semana para la tabla, definidos fuera del hook para estabilidad
const DAYS_OF_WEEK = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']

const useAttendance = () => {
  const [week, setWeek] = useState('')
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [detailVisible, setDetailVisible] = useState(false)
  const [filters, setFilters] = useState({
    name: '',
    position: '',
  })
  const [loading, setLoading] = useState(false)
  const isMounted = useRef(false) // Para controlar la ejecución única del useEffect

  const fetchAttendanceData = useCallback(async () => {
    setLoading(true)
    try {
      const employeesData = await employeeService.getAllEmployees()
      const attendancesData = await attendanceService.getAllAttendances()

      console.log('Employees Data from API:', employeesData) // Log para depuración
      console.log('Attendances Data from API:', attendancesData) // Log para depuración

      const today = new Date()
      const currentWeekRange = getWeekRange(today)
      setWeek(currentWeekRange)

      if (employeesData) {
        const employeesWithAttendance = employeesData.map((emp) => {
          const employeeAttendances = attendancesData.filter((att) => att.ttr_idemplea === emp.id)

          const attendanceByDay = {}
          let totalHoursWorked = 0
          let currentAttendanceId = null // Para registrar la asistencia actual del día

          // Inicializar todos los días como 'Ausente'
          DAYS_OF_WEEK.forEach((day) => {
            attendanceByDay[day] = {
              status: 'Ausente',
              id: null,
              horaEntrada: null,
              horaSalida: null,
              horaTrabajo: 0,
            }
          })

          employeeAttendances.forEach((att) => {
            const attendanceDate = new Date(att.ttr_fechaasi)
            const dayOfWeek = getDayName(attendanceDate)

            if (DAYS_OF_WEEK.includes(dayOfWeek)) {
              const horaEntrada = att.ttr_horaentr
              const horaSalida = att.ttr_horasali
              const horaTrabajo = att.ttr_horatrab

              attendanceByDay[dayOfWeek] = {
                status: horaEntrada ? (horaSalida ? 'Presente' : 'Pendiente') : 'Ausente',
                id: att.ttr_idasisen,
                horaEntrada: horaEntrada,
                horaSalida: horaSalida,
                horaTrabajo: horaTrabajo,
              }

              if (horaEntrada && horaSalida) {
                totalHoursWorked += parseFloat(horaTrabajo || 0)
              }

              // Si es la asistencia de hoy y no tiene hora de salida, guardamos el ID
              if (
                attendanceDate.toDateString() === today.toDateString() &&
                horaEntrada &&
                !horaSalida
              ) {
                currentAttendanceId = att.ttr_idasisen
              }
            }
          })

          return {
            ...emp,
            attendance: attendanceByDay,
            hoursWorked: totalHoursWorked.toFixed(2),
            currentAttendanceId: currentAttendanceId, // ID de la asistencia activa para check-out
          }
        })
        setEmployees(employeesWithAttendance)
      }
    } catch (error) {
      console.error('Error al obtener datos de asistencia:', error)
    } finally {
      setLoading(false)
    }
  }, [setEmployees, setWeek, setLoading]) // Eliminamos 'days' de las dependencias

  useEffect(() => {
    if (!isMounted.current) {
      console.log('useEffect: fetchAttendanceData se está ejecutando.')
      fetchAttendanceData()
      isMounted.current = true
    }
  }, [fetchAttendanceData])

  const handleCheckIn = async (employeeId, type) => {
    setLoading(true)
    try {
      const employee = employees.find((emp) => emp.id === employeeId)
      const currentTime = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      const today = new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD

      const currentDayName = getDayName(new Date())
      let updatedEmployee = { ...employee }

      if (type === 'entrada') {
        const newAttendance = await attendanceService.recordCheckIn(employeeId, currentTime, today)
        updatedEmployee.currentAttendanceId = newAttendance.ttr_idasisen
        updatedEmployee.attendance[currentDayName] = {
          status: 'Pendiente',
          id: newAttendance.ttr_idasisen,
          horaEntrada: newAttendance.ttr_horaentr,
          horaSalida: null,
          horaTrabajo: 0,
        }
      } else if (type === 'salida' && employee.currentAttendanceId) {
        const employeeAttendances = await attendanceService.getAttendancesByEmployeeId(employeeId)
        const todayAttendance = employeeAttendances.find(
          (att) =>
            new Date(att.ttr_fechaasi).toDateString() === new Date().toDateString() &&
            att.ttr_idasisen === employee.currentAttendanceId,
        )

        if (todayAttendance && todayAttendance.ttr_horaentr) {
          const horaEntrada = new Date(`2000-01-01T${todayAttendance.ttr_horaentr}`)
          const horaSalida = new Date(`2000-01-01T${currentTime}`)
          const diffMs = horaSalida - horaEntrada
          const hours = (diffMs / (1000 * 60 * 60)).toFixed(2)

          const updatedAttendance = await attendanceService.recordCheckOut(
            employee.currentAttendanceId,
            currentTime,
            hours,
          )
          updatedEmployee.currentAttendanceId = null
          updatedEmployee.hoursWorked = (
            parseFloat(updatedEmployee.hoursWorked) + parseFloat(hours)
          ).toFixed(2)
          updatedEmployee.attendance[currentDayName] = {
            status: 'Presente',
            id: updatedAttendance.ttr_idasisen,
            horaEntrada: updatedAttendance.ttr_horaentr,
            horaSalida: updatedAttendance.ttr_horasali,
            horaTrabajo: updatedAttendance.ttr_horatrab,
          }
        }
      }

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === employeeId ? updatedEmployee : emp)),
      )
    } catch (error) {
      console.error('Error al registrar asistencia:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAttendanceChange = async (employeeId, day, value) => {
    setLoading(true)
    try {
      const employee = employees.find((emp) => emp.id === employeeId)
      const tempDate = new Date() // Usar una nueva instancia de Date para evitar mutaciones
      const attendanceDate = new Date(
        tempDate.setDate(tempDate.getDate() - tempDate.getDay() + days.indexOf(day) + 1),
      )
      const formattedDate = attendanceDate.toISOString().split('T')[0]

      let existingAttendance = null
      if (employee && employee.attendance[day] && employee.attendance[day].id) {
        existingAttendance = await attendanceService.getAttendanceById(employee.attendance[day].id)
      }

      let updatedEmployee = { ...employee }
      let newAttendanceId = null

      if (existingAttendance) {
        // Actualizar asistencia existente
        const updatedData = {
          ...existingAttendance,
          idEmpleado: employeeId,
          fechaAsistencia: formattedDate,
          horaEntrada: value === 'Presente' ? existingAttendance.ttr_horaentr || '08:00:00' : null,
          horaSalida: value === 'Presente' ? existingAttendance.ttr_horasali || '17:00:00' : null,
          horaTrabajo: value === 'Presente' ? existingAttendance.ttr_horatrab || 9 : 0,
        }
        const response = await attendanceService.updateAttendanceStatusAndHours(
          existingAttendance.ttr_idasisen,
          updatedData,
        )
        updatedEmployee.attendance[day] = {
          status: value,
          id: response.ttr_idasisen,
          horaEntrada: response.ttr_horaentr,
          horaSalida: response.ttr_horasali,
          horaTrabajo: response.ttr_horatrab,
        }
      } else if (value === 'Presente' || value === 'Reposo') {
        // Crear nueva asistencia si no existe y el estado es Presente o Reposo
        const newAttendance = await attendanceService.createAttendance({
          idEmpleado: employeeId,
          fechaAsistencia: formattedDate,
          horaEntrada: value === 'Presente' ? '08:00:00' : null,
          horaSalida: value === 'Presente' ? '17:00:00' : null,
          horaTrabajo: value === 'Presente' ? 9 : 0,
        })
        newAttendanceId = newAttendance.ttr_idasisen
        updatedEmployee.attendance[day] = {
          status: value,
          id: newAttendanceId,
          horaEntrada: newAttendance.ttr_horaentr,
          horaSalida: newAttendance.ttr_horasali,
          horaTrabajo: newAttendance.ttr_horatrab,
        }
      } else {
        // Si el valor es 'Ausente' y no hay asistencia existente, simplemente actualizamos el estado local
        updatedEmployee.attendance[day] = {
          status: 'Ausente',
          id: null,
          horaEntrada: null,
          horaSalida: null,
          horaTrabajo: 0,
        }
      }

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === employeeId ? updatedEmployee : emp)),
      )
    } catch (error) {
      console.error('Error al cambiar estado de asistencia:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleHoursWorkedChange = async (employeeId, hours) => {
    setLoading(true)
    try {
      const employee = employees.find((emp) => emp.id === employeeId)
      const today = new Date()
      const dayOfWeek = getDayName(today)
      const currentAttendance = employee.attendance[dayOfWeek]

      if (currentAttendance && currentAttendance.id) {
        const existingAttendance = await attendanceService.getAttendanceById(currentAttendance.id)
        const updatedData = {
          ...existingAttendance,
          horaTrabajo: parseFloat(hours),
        }
        const response = await attendanceService.updateAttendanceStatusAndHours(
          currentAttendance.id,
          updatedData,
        )

        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.id === employeeId
              ? {
                  ...emp,
                  hoursWorked: parseFloat(hours),
                  attendance: {
                    ...emp.attendance,
                    [dayOfWeek]: { ...emp.attendance[dayOfWeek], horaTrabajo: parseFloat(hours) },
                  },
                }
              : emp,
          ),
        )
      }
    } catch (error) {
      console.error('Error al cambiar horas trabajadas:', error)
    } finally {
      setLoading(false)
    }
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
    days: DAYS_OF_WEEK, // Exportamos la constante global
    handleAttendanceChange,
    handleHoursWorkedChange,
    handleCheckIn,
    setFilters,
    setSelectedEmployee,
    setDetailVisible,
    filteredEmployees,
    loading,
  }
}

export default useAttendance
