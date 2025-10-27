const API_URL = import.meta.env.VITE_API_URL

export const userService = {
  getUsers: async () => {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener usuarios')
    }
    const data = await response.json()
    return data
  },

  createUser: async (userData) => {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear usuario')
    }
    const data = await response.json()
    return data
  },

  updateUser: async (id, userData) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar usuario')
    }
    const data = await response.json()
    return data
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar usuario')
    }
    // No esperamos un JSON de vuelta para una eliminación exitosa, solo el status
    return true
  },
}
