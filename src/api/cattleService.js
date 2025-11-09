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

export const cattleService = {
  // Servicios para Bovinos (TTRBOVINOSS)
  getAllCattle: async () => {
    const response = await fetch(`${API_URL}/bovinos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener bovinos')
    }
    const data = await response.json()
    // Asegurarse de que los datos de bovinos tengan una propiedad 'id' para CustomTableModal
    return mapKeysToCamelCase(data).map((item) => ({
      ...item,
      id: item.idbovino || item.ttrIdbovino || item.id, // Usar idbovino o ttrIdbovino como id si existe
    }))
  },

  getCattleById: async (id) => {
    const response = await fetch(`${API_URL}/bovinos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener bovino por ID')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  createCattle: async (cattleData) => {
    const response = await fetch(`${API_URL}/bovinos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cattleData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear bovino')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  updateCattle: async (id, cattleData) => {
    const response = await fetch(`${API_URL}/bovinos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cattleData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar bovino')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  deleteCattle: async (id) => {
    const response = await fetch(`${API_URL}/bovinos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar bovino')
    }
    return true
  },

  // Servicios para Razas de Bovino (TMARAZABOVI)
  getAllRazas: async () => {
    const response = await fetch(`${API_URL}/bovinos/razas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener razas de bovino')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  createRaza: async (razaData) => {
    const response = await fetch(`${API_URL}/bovinos/razas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(razaData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear raza')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  updateRaza: async (id, razaData) => {
    const response = await fetch(`${API_URL}/bovinos/razas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(razaData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar raza')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  deleteRaza: async (id) => {
    const response = await fetch(`${API_URL}/bovinos/razas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar raza')
    }
    return true
  },

  // Servicios para Colores de Bovino (TMACOLBOVIN)
  getAllColores: async () => {
    const response = await fetch(`${API_URL}/bovinos/colores`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener colores de bovino')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  createColor: async (colorData) => {
    const response = await fetch(`${API_URL}/bovinos/colores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colorData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear color')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  updateColor: async (id, colorData) => {
    const response = await fetch(`${API_URL}/bovinos/colores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colorData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar color')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  deleteColor: async (id) => {
    const response = await await fetch(`${API_URL}/bovinos/colores/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar color')
    }
    return true
  },

  // Servicios para Etapas de Bovino (TMAETABOVIN)
  getAllEtapas: async () => {
    const response = await fetch(`${API_URL}/bovinos/etapas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener etapas de bovino')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  createEtapa: async (etapaData) => {
    const response = await fetch(`${API_URL}/bovinos/etapas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(etapaData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear etapa')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  updateEtapa: async (id, etapaData) => {
    const response = await fetch(`${API_URL}/bovinos/etapas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(etapaData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar etapa')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  deleteEtapa: async (id) => {
    const response = await fetch(`${API_URL}/bovinos/etapas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar etapa')
    }
    return true
  },

  // Servicios para Estados de Bovino (TMAESTBOVIN)
  getAllEstados: async () => {
    const response = await fetch(`${API_URL}/bovinos/estados`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener estados de bovino')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  createEstado: async (estadoData) => {
    const response = await fetch(`${API_URL}/bovinos/estados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadoData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear estado')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  updateEstado: async (id, estadoData) => {
    const response = await fetch(`${API_URL}/bovinos/estados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadoData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar estado')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  deleteEstado: async (id) => {
    const response = await fetch(`${API_URL}/bovinos/estados/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar estado')
    }
    return true
  },
}
