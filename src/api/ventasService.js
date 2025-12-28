const API_URL = import.meta.env.VITE_API_URL

export const ventasService = {
  // Obtener todas las ventas
  getVentas: async () => {
    const response = await fetch(`${API_URL}/ventas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener ventas')
    }
    const data = await response.json()
    return data
  },

  // Obtener una venta por ID
  getVentaById: async (id) => {
    const response = await fetch(`${API_URL}/ventas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener venta')
    }
    const data = await response.json()
    return data
  },

  // Obtener productos disponibles para venta
  getProductosDisponibles: async (tipo = null) => {
    const url = tipo
      ? `${API_URL}/ventas/productos-disponibles?tipo=${tipo}`
      : `${API_URL}/ventas/productos-disponibles`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener productos disponibles')
    }
    const data = await response.json()
    return data
  },

  // Crear una nueva venta (para implementar después)
  createVenta: async (ventaData) => {
    const response = await fetch(`${API_URL}/ventas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(ventaData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear venta')
    }
    const data = await response.json()
    return data
  },

  // Actualizar estado de venta (para implementar después)
  updateEstadoVenta: async (id, idEstado) => {
    const response = await fetch(`${API_URL}/ventas/${id}/estado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ idEstado }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar estado')
    }
    const data = await response.json()
    return data
  },
}

// Servicio de clientes (para el selector)
export const clientesService = {
  getClientes: async () => {
    const response = await fetch(`${API_URL}/clientes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener clientes')
    }
    const data = await response.json()
    return data
  },
}
