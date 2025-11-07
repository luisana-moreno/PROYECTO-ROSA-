const baseUrl = import.meta.env.VITE_API_URL

export const helpFetch = () => {
  const customFetch = async (endpoint, method, body = null) => {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }
      if (body) {
        options.body = JSON.stringify(body)
      }

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
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error en customFetch:', error)
      throw error // Re-lanza el error para que los servicios lo manejen
    }
  }

  // Métodos
  const get = (endpoint) => customFetch(endpoint, 'GET')
  const post = (endpoint, body) => customFetch(endpoint, 'POST', body)
  const put = (endpoint, id, body) => customFetch(`${endpoint}/${id}`, 'PUT', body)
  const del = (endpoint, id) => customFetch(`${endpoint}/${id}`, 'DELETE')

  return { get, post, put, del }
}
