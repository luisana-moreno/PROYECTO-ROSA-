import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL

export const attendanceService = {
  getAllAttendances: async () => {
    try {
      const response = await fetch(`${API_URL}/asistencias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener asistencias')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error en getAllAttendances:', error)
      toast.error(error.message || 'Error al obtener asistencias.')
      throw error
    }
  },

  getAttendanceById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/asistencias/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener asistencia por ID')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error en getAttendanceById:', error)
      toast.error(error.message || 'Error al obtener asistencia por ID.')
      throw error
    }
  },

  createAttendance: async (attendanceData) => {
    try {
      const formattedAttendanceData = {
        ...attendanceData,
        horaTrabajo: attendanceData.horaTrabajo || '00:00:00',
        idTipoAsistencia: attendanceData.idTipoAsistencia || 1, // Default a 'Presente'
      }
      const response = await fetch(`${API_URL}/asistencias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedAttendanceData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al crear asistencia')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error en createAttendance:', error)
      toast.error(error.message || 'Error al crear asistencia.')
      throw error
    }
  },

  updateAttendance: async (id, attendanceData) => {
    try {
      const formattedAttendanceData = {
        ...attendanceData,
        horaTrabajo: attendanceData.horaTrabajo || '00:00:00',
        idTipoAsistencia: attendanceData.idTipoAsistencia || 1, // Default a 'Presente'
      }
      const response = await fetch(`${API_URL}/asistencias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedAttendanceData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar asistencia')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error en updateAttendance:', error)
      toast.error(error.message || 'Error al actualizar asistencia.')
      throw error
    }
  },

  deleteAttendance: async (id) => {
    try {
      const response = await fetch(`${API_URL}/asistencias/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al eliminar asistencia')
      }
      toast.success('Asistencia eliminada exitosamente.')
      return true
    } catch (error) {
      console.error('Error en deleteAttendance:', error)
      toast.error(error.message || 'Error al eliminar asistencia.')
      throw error
    }
  },

  recordCheckIn: async (idEmpleado, horaEntrada, fechaAsistencia) => {
    try {
      const response = await fetch(`${API_URL}/asistencias/check-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idEmpleado,
          horaEntrada,
          fechaAsistencia,
          idTipoAsistencia: 4, // 'Pendiente'
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al registrar entrada')
      }
      toast.success('Entrada registrada correctamente.')
      return response.json()
    } catch (error) {
      console.error('Error en recordCheckIn:', error)
      toast.error(error.message || 'Error al registrar entrada.')
      throw error
    }
  },

  recordCheckOut: async (idAsistencia, horaSalida, horaTrabajo) => {
    try {
      const response = await fetch(`${API_URL}/asistencias/check-out/${idAsistencia}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          horaSalida,
          horaTrabajo,
          idTipoAsistencia: 1, // 'Presente'
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al registrar salida')
      }
      toast.success('Salida registrada correctamente.')
      return response.json()
    } catch (error) {
      console.error('Error en recordCheckOut:', error)
      toast.error(error.message || 'Error al registrar salida.')
      throw error
    }
  },

  updateAttendanceStatusAndHours: async (idAsistencia, attendanceData) => {
    try {
      const formattedAttendanceData = {
        idTipoAsistencia: attendanceData.idTipoAsistencia,
        horaEntrada: attendanceData.horaEntrada,
        horaSalida: attendanceData.horaSalida,
        horaTrabajo: attendanceData.horaTrabajo,
      }
      const response = await fetch(`${API_URL}/asistencias/status/${idAsistencia}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedAttendanceData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar estado de asistencia')
      }
      toast.info('Estado de asistencia actualizado correctamente.')
      return response.json()
    } catch (error) {
      console.error('Error en updateAttendanceStatusAndHours:', error)
      toast.error(error.message || 'Error al actualizar estado de asistencia.')
      throw error
    }
  },

  getAttendancesByEmployeeId: async (idEmpleado) => {
    try {
      const response = await fetch(`${API_URL}/asistencias/empleado/${idEmpleado}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener asistencias por empleado')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error en getAttendancesByEmployeeId:', error)
      toast.error(error.message || 'Error al obtener asistencias por empleado.')
      throw error
    }
  },

  getAllAttendanceTypes: async () => {
    try {
      const response = await fetch(`${API_URL}/asistencias/types`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener tipos de asistencia')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error en getAllAttendanceTypes:', error)
      toast.error(error.message || 'Error al obtener tipos de asistencia.')
      throw error
    }
  },

  qrCheckIn: async (qrCode) => {
    try {
      const response = await fetch(`${API_URL}/asistencias/qr-checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCode }),
      })

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || 'Error al procesar código QR')
        }
        return data
      } else {
        const text = await response.text()
        console.error('Respuesta no JSON del servidor:', text)
        throw new Error(
          'El servidor devolvió una respuesta no válida (posible error 500). Revisa la consola.',
        )
      }
    } catch (error) {
      console.error('Error en qrCheckIn:', error)
      throw error
    }
  },
}
