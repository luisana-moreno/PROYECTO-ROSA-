import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const NOTIFICATIONS_API_URL = `${API_BASE_URL}/notifications`

export const notificationService = {
  getNotifications: async () => {
    try {
      const storedUser = localStorage.getItem('user')
      let token = localStorage.getItem('token')

      // Si no hay token directo, intentamos sacarlo del objeto user
      if (!token && storedUser) {
        try {
          const userParsed = JSON.parse(storedUser)
          token = userParsed.token
        } catch (e) {
          console.error('Error parsing user from localStorage', e)
        }
      }

      if (!token) {
        console.warn('No authentication token found.')
        return []
      }

      const response = await fetch(`${NOTIFICATIONS_API_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      })

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.warn('Unauthorized access to notifications.')
          return []
        }
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener notificaciones')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
  },
}

export default notificationService
