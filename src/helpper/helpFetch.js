<<<<<<< HEAD
const baseUrl = import.meta.env.VITE_BACKEND_URL
=======
const baseUrl = import.meta.env.VITE_API_URL
>>>>>>> master

export const helpFetch = () => {
  const customFetch = async (endpoint, method, body = null) => {
    try {
<<<<<<< HEAD
=======
      // Leer el token del objeto user en localStorage
      const userStr = localStorage.getItem('user')
      const user = userStr ? JSON.parse(userStr) : null
      const token = user?.token

>>>>>>> master
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }
<<<<<<< HEAD
=======

      // Agregar token si existe
      if (token) {
        options.headers['Authorization'] = `Bearer ${token}`
      }

>>>>>>> master
      if (body) {
        options.body = JSON.stringify(body)
      }

<<<<<<< HEAD
      const response = await fetch(`${baseUrl}${endpoint}`, options)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
=======
      const url = `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`
      const response = await fetch(url, options)

      if (!response.ok) {
        const errorText = await response.text() // Intenta leer el cuerpo como texto
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.message || errorMessage
        } catch (parseError) {
          // Si no es JSON, usa el texto directamente
          errorMessage = errorText || errorMessage
        }
        throw new Error(errorMessage)
>>>>>>> master
      }

      const data = await response.json()
      return data
    } catch (error) {
<<<<<<< HEAD
      console.error(error)
      return null
=======
      console.error('Error en customFetch:', error)
      throw error // Re-lanza el error para que los servicios lo manejen
>>>>>>> master
    }
  }

  // Métodos
  const get = (endpoint) => customFetch(endpoint, 'GET')
  const post = (endpoint, body) => customFetch(endpoint, 'POST', body)
  const put = (endpoint, id, body) => customFetch(`${endpoint}/${id}`, 'PUT', body)
  const del = (endpoint, id) => customFetch(`${endpoint}/${id}`, 'DELETE')

  return { get, post, put, del }
<<<<<<< HEAD
}
=======
}
>>>>>>> master
