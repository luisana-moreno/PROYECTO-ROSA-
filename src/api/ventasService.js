import { helpFetch } from '../helpper/helpFetch'

const API_URL = 'ventas'
const api = helpFetch()

export const ventasService = {
  // Obtener todas las ventas
  getVentas: async () => {
    try {
      const response = await api.get(API_URL)
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.message || 'Error al obtener ventas')
      }
    } catch (error) {
      throw error
    }
  },

  // Obtener una venta por ID
  getVentaById: async (id) => {
    try {
      const response = await api.get(`${API_URL}/${id}`)
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.message || 'Error al obtener venta')
      }
    } catch (error) {
      throw error
    }
  },

  // Obtener productos disponibles para venta
  getProductosDisponibles: async (tipo = null) => {
    try {
      const url = tipo
        ? `${API_URL}/productos-disponibles?tipo=${tipo}`
        : `${API_URL}/productos-disponibles`

      const response = await api.get(url)
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.message || 'Error al obtener productos disponibles')
      }
    } catch (error) {
      throw error
    }
  },

  // Crear una nueva venta
  createVenta: async (ventaData) => {
    try {
      const response = await api.post(API_URL, ventaData)
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.message || 'Error al crear venta')
      }
    } catch (error) {
      // Propagate detailed error if available
      if (error.response) throw error
      throw error
    }
  },

  // Actualizar estado de venta
  updateEstadoVenta: async (id, idEstado) => {
    try {
      const response = await api.put(API_URL, `${id}/estado`, { idEstado })
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.message || 'Error al actualizar estado')
      }
    } catch (error) {
      throw error
    }
  },

  // Obtener clientes (Wrapper para consistencia)
  getClientes: async () => {
    try {
      const response = await api.get('clientes')
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.message || 'Error al obtener clientes')
      }
    } catch (error) {
      throw error
    }
  },

  downloadFactura: async (id) => {
    const token = localStorage.getItem('token')
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/ventas/${id}/factura`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) throw new Error('Error descargando factura')
    return await response.blob()
  },
}

export const clientesService = {
  getClientes: ventasService.getClientes,
}

export default {
  ...ventasService,
  clientesService,
}
