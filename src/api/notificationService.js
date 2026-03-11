import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const NOTIFICATIONS_API_URL = `${API_BASE_URL}/notifications`

const getHeaders = () => {
  let token = localStorage.getItem('token')

  if (!token) {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userParsed = JSON.parse(storedUser)
        token = userParsed.token
      } catch (e) {
        console.error('Error parsing user from localStorage', e)
      }
    }
  }

  return {
    'Content-Type': 'application/json',
    'x-access-token': token || '',
  }
}

export const notificationService = {
  getNotifications: async () => {
    try {
      const headers = getHeaders()
      if (!headers['x-access-token']) return []

      const response = await fetch(NOTIFICATIONS_API_URL, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) return []
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener notificaciones')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return []
    }
  },

  getUnreadCount: async () => {
    try {
      const headers = getHeaders()
      if (!headers['x-access-token']) return 0

      const response = await fetch(`${NOTIFICATIONS_API_URL}/count`, {
        method: 'GET',
        headers,
      })

      if (!response.ok) return 0
      const data = await response.json()
      return data.count || 0
    } catch (error) {
      console.error('Error fetching unread count:', error)
      return 0
    }
  },

  markAsRead: async (id) => {
    try {
      const response = await fetch(`${NOTIFICATIONS_API_URL}/${id}/leer`, {
        method: 'PUT',
        headers: getHeaders(),
      })

      if (!response.ok) throw new Error('Error al marcar notificación')
      return await response.json()
    } catch (error) {
      console.error('Error marking notification as read:', error)
      throw error
    }
  },

  markAllAsRead: async () => {
    try {
      const response = await fetch(`${NOTIFICATIONS_API_URL}/leer-todas`, {
        method: 'PUT',
        headers: getHeaders(),
      })

      if (!response.ok) throw new Error('Error al marcar notificaciones')
      return await response.json()
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      throw error
    }
  },

  deleteNotification: async (id) => {
    try {
      const response = await fetch(`${NOTIFICATIONS_API_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      })

      if (!response.ok) throw new Error('Error al eliminar notificación')
      return await response.json()
    } catch (error) {
      console.error('Error deleting notification:', error)
      throw error
    }
  },
}

export default notificationService
