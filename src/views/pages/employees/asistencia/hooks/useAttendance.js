'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { attendanceService } from 'src/api/attendanceService'
import { employeeService } from 'src/api/employeeService'
import { getWeekRange, getDayName, formatHoursToHHMMSS } from 'src/utils/dateFormatter'
import { toast } from 'react-toastify' // Importa toast de react-toastify

// Días de la semana para la tabla, definidos fuera del hook para estabilidad
const DAYS_OF_WEEK = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

const useAttendance = () => {
  const [week, setWeek] = useState('')
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, _setSelectedEmployee] = useState(null) // Renombrado para uso interno
  const [detailVisible, setDetailVisible] = useState(false)
  const [attendanceHistory, setAttendanceHistory] = useState([]) // Nuevo estado para el historial
  const [filters, setFilters] = useState({
    name: '',
    position: '',
  })
  const [loading, setLoading] = useState(false)
  const [attendanceTypes, setAttendanceTypes] = useState([]) // Nuevo estado para tipos de asistencia
  const isMounted = useRef(false) // Para controlar la ejecución única del useEffect

  const fetchAttendanceData = useCallback(async () => {
    setLoading(true)
    try {
      const [employeesData, attendancesData, typesData] = await Promise.all([
        employeeService.getAllEmployees(),
        attendanceService.getAllAttendances(),
        attendanceService.getAllAttendanceTypes(), // Obtener tipos de asistencia
      ])

      setAttendanceTypes(typesData) // Guardar tipos de asistencia

      console.log('Employees Data from API:', employeesData) // Log para depuración
      console.log('Attendances Data from API:', attendancesData) // Log para depuración
      console.log('Attendance Types Data from API:', typesData) // Log para depuración

      const today = new Date()
      const currentWeekRange = getWeekRange(today)
      setWeek(currentWeekRange)

      if (employeesData) {
        const employeesWithAttendance = employeesData.map((emp) => {
          const formattedEmp = {
            ...emp,
            id: emp.ttr_idemplo,
            name: `${emp.ttr_nombrel || ''} ${emp.ttr_nomsegu || ''} ${
              emp.ttr_apellid || ''
            } ${emp.ttr_apesegu || ''}`,
            position: emp.cargo_nombre || '',
          }

          const employeeAttendances = attendancesData.filter(
            (att) => att.ttr_idemplea === formattedEmp.id,
          )

          const attendanceByDay = {}
          let totalHoursWorked = 0
          let currentAttendanceId = null

          DAYS_OF_WEEK.forEach((day) => {
            attendanceByDay[day] = {
              status: 'Ausente', // Por defecto
              id: null,
              horaEntrada: null,
              horaSalida: null,
              horaTrabajo: '00:00:00',
              idTipoAsistencia:
                typesData.find((type) => type.tma_nomtipa === 'Ausente')?.tma_idtipasi || 2,
              tipoAsistenciaNombre: 'Ausente',
            }
          })

          employeeAttendances.forEach((att) => {
            const attendanceDate = new Date(att.ttr_fechaasi)
            const dayOfWeek = getDayName(attendanceDate)
            const tipoAsistencia = typesData.find((type) => type.tma_idtipasi === att.ttr_idtipasi)

            if (DAYS_OF_WEEK.includes(dayOfWeek)) {
              const horaEntrada = att.ttr_horaentr
              const horaSalida = att.ttr_horasali
              const horaTrabajo = att.ttr_horatrab

              attendanceByDay[dayOfWeek] = {
                status: tipoAsistencia ? tipoAsistencia.tma_nomtipa : 'Desconocido',
                id: att.ttr_idasisen,
                horaEntrada: horaEntrada,
                horaSalida: horaSalida,
                horaTrabajo: horaTrabajo,
                idTipoAsistencia: att.ttr_idtipasi,
                tipoAsistenciaNombre: tipoAsistencia ? tipoAsistencia.tma_nomtipa : 'Desconocido',
              }

              if (horaEntrada && horaSalida && horaTrabajo) {
                const [h, m, s] = horaTrabajo.split(':').map(Number)
                totalHoursWorked += h + m / 60 + s / 3600
              }

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
            ...formattedEmp,
            attendance: attendanceByDay,
            hoursWorked: totalHoursWorked.toFixed(2),
            currentAttendanceId: currentAttendanceId,
          }
        })
        setEmployees(employeesWithAttendance)
      }
    } catch (error) {
      console.error('Error al obtener datos de asistencia:', error)
      toast.error(error.message || 'Error al obtener datos de asistencia.')
    } finally {
      setLoading(false)
    }
  }, [setEmployees, setWeek, setLoading, toast])

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
      const employee = employees.find((emp) => Number(emp.id) === Number(employeeId))
      if (!employee) {
        console.error('Error: Empleado no encontrado para el ID:', employeeId)
        toast.warning('Empleado no encontrado para registrar asistencia.')
        return
      }

      const currentTime = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      const today = new Date().toISOString().split('T')[0]

      const currentDayName = getDayName(new Date())
      let updatedEmployee = { ...employee }

      if (!updatedEmployee.attendance) {
        updatedEmployee.attendance = {}
      }
      if (!updatedEmployee.attendance[currentDayName]) {
        updatedEmployee.attendance[currentDayName] = {
          status: 'Ausente',
          id: null,
          horaEntrada: null,
          horaSalida: null,
          horaTrabajo: '00:00:00',
          idTipoAsistencia:
            attendanceTypes.find((type) => type.tma_nomtipa === 'Ausente')?.tma_idtipasi || 2,
          tipoAsistenciaNombre: 'Ausente',
        }
      }

      if (type === 'entrada') {
        const newAttendance = await attendanceService.recordCheckIn(
          Number(employeeId),
          currentTime,
          today,
        )
        updatedEmployee.currentAttendanceId = newAttendance.ttr_idasisen
        updatedEmployee.attendance[currentDayName] = {
          status: 'Pendiente',
          id: newAttendance.ttr_idasisen,
          horaEntrada: newAttendance.ttr_horaentr,
          horaSalida: null,
          horaTrabajo: '00:00:00',
          idTipoAsistencia:
            attendanceTypes.find((type) => type.tma_nomtipa === 'Pendiente')?.tma_idtipasi || 4,
          tipoAsistenciaNombre: 'Pendiente',
        }
      } else if (type === 'salida') {
        if (!updatedEmployee.currentAttendanceId) {
          toast.warning('No se ha registrado una entrada para este empleado hoy.')
          setLoading(false)
          return
        }
        const employeeAttendances = await attendanceService.getAttendancesByEmployeeId(employeeId)
        const todayAttendance = employeeAttendances.find(
          (att) =>
            new Date(att.ttr_fechaasi).toDateString() === new Date().toDateString() &&
            att.ttr_idasisen === updatedEmployee.currentAttendanceId,
        )

        if (todayAttendance && todayAttendance.ttr_horaentr) {
          const horaEntrada = new Date(`2000-01-01T${todayAttendance.ttr_horaentr}`)
          const horaSalida = new Date(`2000-01-01T${currentTime}`)
          const diffMs = horaSalida - horaEntrada
          const hoursDecimal = diffMs / (1000 * 60 * 60)
          const hoursFormatted = formatHoursToHHMMSS(hoursDecimal)

          const updatedAttendance = await attendanceService.recordCheckOut(
            updatedEmployee.currentAttendanceId,
            currentTime,
            hoursFormatted,
          )
          updatedEmployee.currentAttendanceId = null
          updatedEmployee.hoursWorked = (
            parseFloat(updatedEmployee.hoursWorked) + hoursDecimal
          ).toFixed(2)
          updatedEmployee.attendance[currentDayName] = {
            status: 'Presente',
            id: updatedAttendance.ttr_idasisen,
            horaEntrada: updatedAttendance.ttr_horaentr,
            horaSalida: updatedAttendance.ttr_horasali,
            horaTrabajo: updatedAttendance.ttr_horatrab,
            idTipoAsistencia:
              attendanceTypes.find((type) => type.tma_nomtipa === 'Presente')?.tma_idtipasi || 1,
            tipoAsistenciaNombre: 'Presente',
          }
        }
      }

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === employeeId ? updatedEmployee : emp)),
      )
      fetchAttendanceData() // Recargar los datos de asistencia después de un check-in/out exitoso
    } catch (error) {
      console.error('Error al registrar asistencia:', error)
      // El toast.error ya se maneja en attendanceService.js
    } finally {
      setLoading(false)
    }
  }

  const handleAttendanceChange = async (employeeId, day, value) => {
    setLoading(true)
    try {
      const employee = employees.find((emp) => emp.id === employeeId)
      if (!employee) {
        toast.warning('Empleado no encontrado para actualizar asistencia.')
        return
      }

      const today = new Date()
      today.setHours(0, 0, 0, 0) // Normalizar la fecha de hoy a medianoche

      const tempDate = new Date()
      const attendanceDate = new Date(
        tempDate.setDate(tempDate.getDate() - tempDate.getDay() + DAYS_OF_WEEK.indexOf(day) + 1),
      )
      attendanceDate.setHours(0, 0, 0, 0) // Normalizar la fecha de asistencia a medianoche

      // Si la fecha de asistencia es anterior a hoy, no permitir el cambio
      if (attendanceDate < today) {
        toast.warning('No se puede cambiar el estado de asistencia de días anteriores.')
        setLoading(false)
        return
      }

      const formattedDate = attendanceDate.toISOString().split('T')[0]

      let existingAttendance = null
      if (employee.attendance[day] && employee.attendance[day].id) {
        existingAttendance = await attendanceService.getAttendanceById(employee.attendance[day].id)
      }

      let updatedEmployee = { ...employee }
      let newAttendanceId = null
      const selectedAttendanceType = attendanceTypes.find((type) => type.tma_nomtipa === value)

      if (!selectedAttendanceType) {
        toast.error('Tipo de asistencia no válido.')
        setLoading(false)
        return
      }

      if (existingAttendance) {
        const defaultHoraEntrada = '08:00:00'
        const defaultHoraSalida = '17:00:00'
        const defaultHorasTrabajadasDecimal = 9
        const defaultHorasTrabajadasFormatted = formatHoursToHHMMSS(defaultHorasTrabajadasDecimal)

        const updatedData = {
          idTipoAsistencia: selectedAttendanceType.tma_idtipasi,
          horaEntrada:
            value === 'Presente' ? existingAttendance.ttr_horaentr || defaultHoraEntrada : null,
          horaSalida:
            value === 'Presente' ? existingAttendance.ttr_horasali || defaultHoraSalida : null,
          horaTrabajo:
            value === 'Presente'
              ? existingAttendance.ttr_horatrab || defaultHorasTrabajadasFormatted
              : '00:00:00',
        }
        const response = await attendanceService.updateAttendanceStatusAndHours(
          existingAttendance.ttr_idasisen,
          updatedData,
        )
        updatedEmployee.attendance[day] = {
          status: selectedAttendanceType.tma_nomtipa,
          id: response.ttr_idasisen,
          horaEntrada: response.ttr_horaentr,
          horaSalida: response.ttr_horasali,
          horaTrabajo: response.ttr_horatrab,
          idTipoAsistencia: response.ttr_idtipasi,
          tipoAsistenciaNombre: selectedAttendanceType.tma_nomtipa,
        }
      } else {
        // Crear nueva asistencia si no existe
        const defaultHorasTrabajadasDecimal = 9
        const defaultHorasTrabajadasFormatted = formatHoursToHHMMSS(defaultHorasTrabajadasDecimal)

        const newAttendance = await attendanceService.createAttendance({
          idEmpleado: employeeId,
          fechaAsistencia: formattedDate,
          horaEntrada: value === 'Presente' ? '08:00:00' : null,
          horaSalida: value === 'Presente' ? '17:00:00' : null,
          horaTrabajo: value === 'Presente' ? defaultHorasTrabajadasFormatted : '00:00:00',
          idTipoAsistencia: selectedAttendanceType.tma_idtipasi,
        })
        newAttendanceId = newAttendance.ttr_idasisen
        updatedEmployee.attendance[day] = {
          status: selectedAttendanceType.tma_nomtipa,
          id: newAttendanceId,
          horaEntrada: newAttendance.ttr_horaentr,
          horaSalida: newAttendance.ttr_horasali,
          horaTrabajo: newAttendance.ttr_horatrab,
          idTipoAsistencia: newAttendance.ttr_idtipasi,
          tipoAsistenciaNombre: selectedAttendanceType.tma_nomtipa,
        }
      }

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === employeeId ? updatedEmployee : emp)),
      )
    } catch (error) {
      console.error('Error al cambiar estado de asistencia:', error)
      toast.error(error.message || 'Error al cambiar estado de asistencia.')
    } finally {
      setLoading(false)
    }
  }

  const handleHoursWorkedChange = async (employeeId, hours) => {
    setLoading(true)
    try {
      const employee = employees.find((emp) => emp.id === employeeId)
      if (!employee) {
        toast.warning('Empleado no encontrado para actualizar horas trabajadas.')
        return
      }
      const today = new Date()
      const dayOfWeek = getDayName(today)
      const currentAttendance = employee.attendance[dayOfWeek]

      if (currentAttendance && currentAttendance.id) {
        const existingAttendance = await attendanceService.getAttendanceById(currentAttendance.id)
        const updatedData = {
          idTipoAsistencia: existingAttendance.ttr_idtipasi, // Mantener el tipo de asistencia actual
          horaTrabajo: formatHoursToHHMMSS(parseFloat(hours)),
          horaEntrada: existingAttendance.ttr_horaentr,
          horaSalida: existingAttendance.ttr_horasali,
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
                  hoursWorked: parseFloat(hours).toFixed(2),
                  attendance: {
                    ...emp.attendance,
                    [dayOfWeek]: {
                      ...emp.attendance[dayOfWeek],
                      horaTrabajo: response.ttr_horatrab,
                    },
                  },
                }
              : emp,
          ),
        )
      } else {
        toast.warning('No hay registro de asistencia actual para actualizar las horas trabajadas.')
      }
    } catch (error) {
      console.error('Error al cambiar horas trabajadas:', error)
      toast.error(error.message || 'Error al cambiar horas trabajadas.')
    } finally {
      setLoading(false)
    }
  }

  const handleEmployeeSelectForDetail = async (employee) => {
    _setSelectedEmployee(employee)
    if (employee) {
      setLoading(true)
      try {
        const history = await attendanceService.getAttendancesByEmployeeId(employee.id)
        setAttendanceHistory(history)
      } catch (error) {
        console.error('Error al obtener historial de asistencia:', error)
        toast.error(error.message || 'Error al obtener historial de asistencia.')
        setAttendanceHistory([])
      } finally {
        setLoading(false)
      }
    }
    setDetailVisible(true)
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
    days: DAYS_OF_WEEK,
    handleAttendanceChange,
    handleHoursWorkedChange,
    handleCheckIn,
    setFilters,
    setSelectedEmployee: handleEmployeeSelectForDetail,
    setDetailVisible,
    filteredEmployees,
    loading,
    attendanceHistory,
    attendanceTypes, // Exportar los tipos de asistencia
    todayDayName: getDayName(new Date()), // Exportar el nombre del día actual
  }
}

export default useAttendance
