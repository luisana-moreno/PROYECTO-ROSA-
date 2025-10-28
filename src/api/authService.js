const API_URL = import.meta.env.VITE_API_URL

export const login = async (correo, contrasena) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo, contrasena }),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error al iniciar sesión')
  }

  const data = await response.json()
  return data // Ahora el backend devuelve { token, user } directamente
}

// La función getProfile ya no es necesaria en el flujo de login del frontend
// pero la mantendremos por si se usa en otro lugar.
export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/auth/profile`, {
    // La ruta corregida para incluir '/auth'
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Error al obtener el perfil')
  }

  const data = await response.json()
  return data.user // Asume que devuelve { user: userProfile }
}
