import { helpFetch } from '../helpper/helpFetch'
import { toast } from 'react-toastify'

const api = helpFetch()
const BASE_URL = 'insumos'

export const insumosService = {
  // --- Categorías ---
  getAllCategorias: async () => {
    try {
      const response = await api.get(`${BASE_URL}/categorias`)
      if (!response.error) {
        return response
      } else {
        toast.error('Error al cargar las categorías de insumos')
        return []
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  },

  // --- Insumos ---
  getAllInsumos: async () => {
    try {
      const response = await api.get(BASE_URL)
      if (!response.error) {
        return response
      } else {
        toast.error('Error al cargar el inventario')
        return []
      }
    } catch (error) {
      console.error('Error fetching inventory:', error)
      return []
    }
  },

  createInsumo: async (insumoData) => {
    try {
      const response = await api.post(BASE_URL, insumoData)
      if (!response.error) {
        return response
      } else {
        toast.error('Error al crear el insumo')
        return null
      }
    } catch (error) {
      console.error('Error creating insumo:', error)
      return null
    }
  },

  updateInsumo: async (id, insumoData) => {
    try {
      const response = await api.put(BASE_URL, id, insumoData)
      if (!response.error) {
        return response
      } else {
        toast.error('Error al actualizar el insumo')
        return null
      }
    } catch (error) {
      console.error('Error updating insumo:', error)
      return null
    }
  },

  deleteInsumo: async (id) => {
    try {
      const response = await api.del(BASE_URL, id)
      if (!response.error) {
        return response
      } else {
        toast.error('Error al eliminar el insumo')
        return null
      }
    } catch (error) {
      console.error('Error deleting insumo:', error)
      throw error
    }
  },
}
