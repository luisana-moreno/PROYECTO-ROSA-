const API_URL = import.meta.env.VITE_API_URL

export const attendanceService = {
  getAllAttendances: async () => {
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
  },

  getAttendanceById: async (id) => {
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
  },

  createAttendance: async (attendanceData) => {
    const response = await fetch(`${API_URL}/asistencias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear asistencia')
    }
    const data = await response.json()
    return data
  },

  updateAttendance: async (id, attendanceData) => {
    const response = await fetch(`${API_URL}/asistencias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar asistencia')
    }
    const data = await response.json()
    return data
  },

  deleteAttendance: async (id) => {
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
    return true
  },
}
