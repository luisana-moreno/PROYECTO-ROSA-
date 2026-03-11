const API_URL = import.meta.env.VITE_API_URL

export const roleService = {
  getRoles: async () => {
    const response = await fetch(`${API_URL}/usuarios/roles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener roles de usuario')
    }
    const data = await response.json()
    return data
  },
}
