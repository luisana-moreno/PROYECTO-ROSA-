const API_URL = import.meta.env.VITE_API_URL

// Función auxiliar para mapear nombres de columnas de la base de datos a camelCase para el frontend
const mapKeysToCamelCase = (data) => {
  if (!data) return null
  if (Array.isArray(data)) {
    return data.map((item) => mapKeysToCamelCase(item))
  }
  const newObject = {}
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const newKey = key.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase())
      newObject[newKey] = data[key]
    }
  }
  return newObject
}

export const prodlecheService = {
  // Servicios para Producción de Leche (TTRPRODLECH)
  getAllProduccionLeche: async () => {
    const response = await fetch(`${API_URL}/prodleche`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener registros de producción de leche')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  getProduccionLecheById: async (id) => {
    const response = await fetch(`${API_URL}/prodleche/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || 'Error al obtener registro de producción de leche por ID',
      )
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  createProduccionLeche: async (produccionLecheData) => {
    const response = await fetch(`${API_URL}/prodleche`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produccionLecheData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear registro de producción de leche')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  updateProduccionLeche: async (id, produccionLecheData) => {
    const response = await fetch(`${API_URL}/prodleche/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produccionLecheData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar registro de producción de leche')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  deleteProduccionLeche: async (id) => {
    const response = await fetch(`${API_URL}/prodleche/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar registro de producción de leche')
    }
    return true
  },

  getMilkProductionByBovinoId: async (idBovino) => {
    const response = await fetch(`${API_URL}/prodleche/bovino/${idBovino}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener producción de leche por ID de bovino')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },
}
