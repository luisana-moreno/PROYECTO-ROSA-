import axios from 'axios'

const API_URL = 'http://localhost:5000/api/notifications'

const getNotifications = async () => {
  try {
    const token = localStorage.getItem('token') // Obtener token directamente del Storage
    if (!token) return [] // Si no hay token, no intentar request

    // La API espera x-access-token o Authorization? Revisando middleware verifyToken...
    // Generalmente es x-access-token en este proyecto
    const response = await axios.get(API_URL, {
      headers: {
        'x-access-token': token,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return []
  }
}

const notificationService = {
  getNotifications,
}

export default notificationService
