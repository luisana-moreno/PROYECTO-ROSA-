const baseUrl = import.meta.env.VITE_BACKEND_URL

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

      const response = await fetch(`${baseUrl}${endpoint}`, options)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }

  // Métodos
  const get = (endpoint) => customFetch(endpoint, 'GET')
  const post = (endpoint, body) => customFetch(endpoint, 'POST', body)
  const put = (endpoint, id, body) => customFetch(`${endpoint}/${id}`, 'PUT', body)
  const del = (endpoint, id) => customFetch(`${endpoint}/${id}`, 'DELETE')

  return { get, post, put, del }
}