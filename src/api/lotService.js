import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const LOTES_API_URL = `${API_BASE_URL}/lotes`
const BOVINOS_API_URL = `${API_BASE_URL}/bovinos`
const POTREROS_API_URL = `${API_BASE_URL}/potreros`

// Función auxiliar para mapear nombres de columnas de la base de datos a camelCase para el frontend
const mapKeysToCamelCase = (data) => {
  if (!data) return null
  if (Array.isArray(data)) {
    return data.map((item) => mapKeysToCamelCase(item))
  }
  const newObject = {}
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let newKey = key.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase())
      // Mapear claves específicas de lotes para el frontend
      if (newKey === 'tmaIdlote') newKey = 'id'
      if (newKey === 'tmaNomlote') newKey = 'nombre'
      newObject[newKey] = data[key]
    }
  }
  return newObject
}

// Función auxiliar para mapear de camelCase del frontend a snake_case/TMA_ del backend
const mapKeysToBackend = (data) => {
  if (!data) return null
  const newObject = {}
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let newKey = key
      if (key === 'id') newKey = 'tmaIdlote'
      if (key === 'nombre') newKey = 'tmaNomlote'
      // Convertir a snake_case si no es una clave directamente mapeada para el backend
      if (newKey.startsWith('tma') || newKey.startsWith('ttr')) {
        newKey = newKey.replace(/([A-Z])/g, '_$1').toUpperCase()
      }
      newObject[newKey] = data[key]
    }
  }
  return newObject
}

export const lotService = {
  // CRUD para Lotes (TMALOTES)
  getAllLots: async () => {
    try {
      const response = await fetch(`${LOTES_API_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener lotes')
      }
      const data = await response.json()
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getAllLots:', error)
      toast.error(error.message || 'Error al obtener lotes.')
      throw error
    }
  },

  getLotById: async (id) => {
    try {
      const response = await fetch(`${LOTES_API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener lote por ID')
      }
      const data = await response.json()
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getLotById:', error)
      toast.error(error.message || 'Error al obtener lote por ID.')
      throw error
    }
  },

  createLot: async (lotData) => {
    try {
      const response = await fetch(`${LOTES_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lotData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al crear lote')
      }
      const data = await response.json()
      toast.success('Lote creado exitosamente.')
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en createLot:', error)
      toast.error(error.message || 'Error al crear lote.')
      throw error
    }
  },

  updateLot: async (id, lotData) => {
    try {
      const response = await fetch(`${LOTES_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lotData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar lote')
      }
      const data = await response.json()
      toast.success('Lote actualizado exitosamente.')
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en updateLot:', error)
      toast.error(error.message || 'Error al actualizar lote.')
      throw error
    }
  },

  deleteLot: async (id) => {
    try {
      const response = await fetch(`${LOTES_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al eliminar lote')
      }
      toast.success('Lote eliminado exitosamente.')
      return true
    } catch (error) {
      console.error('Error en deleteLot:', error)
      toast.error(error.message || 'Error al eliminar lote.')
      throw error
    }
  },

  // Gestión de bovinos en lotes
  addBovinesToLot: async (idLote, idPotrero, bovinoIds, fechaInicio) => {
    try {
      const response = await fetch(`${LOTES_API_URL}/${idLote}/bovinos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idPotrero, bovinoIds, fechaInicio }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al asignar bovinos al lote')
      }
      const data = await response.json()
      toast.success('Bovinos asignados al lote exitosamente.')
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en addBovinesToLot:', error)
      toast.error(error.message || 'Error al asignar bovinos al lote.')
      throw error
    }
  },

  getBovinesInLot: async (idLote) => {
    try {
      const response = await fetch(`${LOTES_API_URL}/${idLote}/bovinos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener bovinos en lote')
      }
      const data = await response.json()
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getBovinesInLot:', error)
      toast.error(error.message || 'Error al obtener bovinos en lote.')
      throw error
    }
  },

  removeBovineFromLot: async (idLote, idBovino) => {
    try {
      const response = await fetch(`${LOTES_API_URL}/${idLote}/bovinos/${idBovino}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al desasociar bovino del lote')
      }
      toast.success('Bovino desasociado del lote exitosamente.')
      return true
    } catch (error) {
      console.error('Error en removeBovineFromLot:', error)
      toast.error(error.message || 'Error al desasociar bovino del lote.')
      throw error
    }
  },

  updateBovineLotAssignment: async (idBovLotPotr, assignmentData) => {
    try {
      const response = await fetch(`${LOTES_API_URL}/bovinos/asignacion/${idBovLotPotr}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignmentData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar asignación de bovino en lote')
      }
      const data = await response.json()
      toast.success('Asignación de bovino en lote actualizada exitosamente.')
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en updateBovineLotAssignment:', error)
      toast.error(error.message || 'Error al actualizar asignación de bovino en lote.')
      throw error
    }
  },

  getActiveBovinesInLot: async (idLote) => {
    try {
      const response = await fetch(`${LOTES_API_URL}/${idLote}/bovinos/activos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener bovinos activos en lote')
      }
      const data = await response.json()
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getActiveBovinesInLot:', error)
      toast.error(error.message || 'Error al obtener bovinos activos en lote.')
      throw error
    }
  },

  // Servicios adicionales para el frontend (obtener bovinos y potreros)
  getAllBovines: async () => {
    try {
      const response = await fetch(`${BOVINOS_API_URL}`, {
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
        id: item.ttrIdbovino, // Usar directamente ttrIdbovino después del mapeo a camelCase
      }))
    } catch (error) {
      console.error('Error en getAllBovines (LotService):', error)
      toast.error(error.message || 'Error al obtener bovinos.')
      throw error
    }
  },

  getAllPastures: async () => {
    try {
      const response = await fetch(`${POTREROS_API_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener potreros')
      }
      const data = await response.json()
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getAllPastures (LotService):', error)
      toast.error(error.message || 'Error al obtener potreros.')
      throw error
    }
  },
}
