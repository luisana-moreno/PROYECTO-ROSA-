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

  reactivateUser: async (id) => {
    const response = await fetch(`${API_URL}/usuarios/${id}/reactivate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al reactivar usuario')
    }
    const data = await response.json()
    return data
  },

  // Obtener perfil del usuario autenticado
  getProfile: async (token) => {
    const response = await fetch(`${API_URL}/usuarios/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener perfil')
    }
    const data = await response.json()
    return data
  },

  // Actualizar perfil del usuario autenticado
  updateProfile: async (token, profileData) => {
    const response = await fetch(`${API_URL}/usuarios/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar perfil')
    }
    const data = await response.json()
    return data
  },

  // Cambiar contraseña del usuario autenticado
  changePassword: async (token, passwordData) => {
    const response = await fetch(`${API_URL}/usuarios/profile/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al cambiar contraseña')
    }
    const data = await response.json()
    return data
  },
}
