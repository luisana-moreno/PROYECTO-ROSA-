const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return {
    'Content-Type': 'application/json',
    Authorization: user.token ? `Bearer ${user.token}` : '',
  }
}

export const settingsService = {
  // ==================== TIPOS DE VACUNA ====================
  async getTiposVacuna() {
    const response = await fetch(`${API_URL}/settings/tipos-vacuna`, {
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Error al obtener tipos de vacuna')
    return response.json()
  },

  async createTipoVacuna(nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-vacuna`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al crear tipo de vacuna')
    return response.json()
  },

  async updateTipoVacuna(id, nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-vacuna/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al actualizar tipo de vacuna')
    return response.json()
  },

  async deleteTipoVacuna(id) {
    const response = await fetch(`${API_URL}/settings/tipos-vacuna/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Error al eliminar tipo de vacuna')
    }
    return response.json()
  },

  // ==================== TRATAMIENTOS ====================
  async getTratamientos() {
    const response = await fetch(`${API_URL}/settings/tratamientos`, {
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Error al obtener tratamientos')
    return response.json()
  },

  async createTratamiento(nombre) {
    const response = await fetch(`${API_URL}/settings/tratamientos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al crear tratamiento')
    return response.json()
  },

  async updateTratamiento(id, nombre) {
    const response = await fetch(`${API_URL}/settings/tratamientos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al actualizar tratamiento')
    return response.json()
  },

  async deleteTratamiento(id) {
    const response = await fetch(`${API_URL}/settings/tratamientos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Error al eliminar tratamiento')
    }
    return response.json()
  },

  // ==================== CATEGORÍAS DE INSUMOS ====================
  async getCategoriasInsumo() {
    const response = await fetch(`${API_URL}/settings/categorias-insumo`, {
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Error al obtener categorías de insumo')
    return response.json()
  },

  async createCategoriaInsumo(nombre) {
    const response = await fetch(`${API_URL}/settings/categorias-insumo`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al crear categoría de insumo')
    return response.json()
  },

  async updateCategoriaInsumo(id, nombre) {
    const response = await fetch(`${API_URL}/settings/categorias-insumo/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al actualizar categoría de insumo')
    return response.json()
  },

  async deleteCategoriaInsumo(id) {
    const response = await fetch(`${API_URL}/settings/categorias-insumo/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Error al eliminar categoría de insumo')
    }
    return response.json()
  },

  // ==================== TIPOS DE MOVIMIENTO ====================
  async getTiposMovimiento() {
    const response = await fetch(`${API_URL}/settings/tipos-movimiento`, {
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Error al obtener tipos de movimiento')
    return response.json()
  },

  async createTipoMovimiento(nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-movimiento`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al crear tipo de movimiento')
    return response.json()
  },

  async updateTipoMovimiento(id, nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-movimiento/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al actualizar tipo de movimiento')
    return response.json()
  },

  async deleteTipoMovimiento(id) {
    const response = await fetch(`${API_URL}/settings/tipos-movimiento/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Error al eliminar tipo de movimiento')
    }
    return response.json()
  },

  // ==================== TIPOS DE PAGO ====================
  async getTiposPago() {
    const response = await fetch(`${API_URL}/settings/tipos-pago`, {
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Error al obtener tipos de pago')
    return response.json()
  },

  async createTipoPago(nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-pago`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al crear tipo de pago')
    return response.json()
  },

  async updateTipoPago(id, nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-pago/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al actualizar tipo de pago')
    return response.json()
  },

  async deleteTipoPago(id) {
    const response = await fetch(`${API_URL}/settings/tipos-pago/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Error al eliminar tipo de pago')
    }
    return response.json()
  },

  // ==================== TIPOS DE VENTA ====================
  async getTiposVenta() {
    const response = await fetch(`${API_URL}/settings/tipos-venta`, {
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Error al obtener tipos de venta')
    return response.json()
  },

  async createTipoVenta(nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-venta`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al crear tipo de venta')
    return response.json()
  },

  async updateTipoVenta(id, nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-venta/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al actualizar tipo de venta')
    return response.json()
  },

  async deleteTipoVenta(id) {
    const response = await fetch(`${API_URL}/settings/tipos-venta/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Error al eliminar tipo de venta')
    }
    return response.json()
  },

  // ==================== ESTADOS DE FACTURA ====================
  async getEstadosFactura() {
    const response = await fetch(`${API_URL}/settings/estados-factura`, {
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Error al obtener estados de factura')
    return response.json()
  },

  async createEstadoFactura(nombre) {
    const response = await fetch(`${API_URL}/settings/estados-factura`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al crear estado de factura')
    return response.json()
  },

  async updateEstadoFactura(id, nombre) {
    const response = await fetch(`${API_URL}/settings/estados-factura/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al actualizar estado de factura')
    return response.json()
  },

  async deleteEstadoFactura(id) {
    const response = await fetch(`${API_URL}/settings/estados-factura/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Error al eliminar estado de factura')
    }
    return response.json()
  },

  // ==================== TIPOS DE ASISTENCIA ====================
  async getTiposAsistencia() {
    const response = await fetch(`${API_URL}/settings/tipos-asistencia`, {
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Error al obtener tipos de asistencia')
    return response.json()
  },

  async createTipoAsistencia(nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-asistencia`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al crear tipo de asistencia')
    return response.json()
  },

  async updateTipoAsistencia(id, nombre) {
    const response = await fetch(`${API_URL}/settings/tipos-asistencia/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) throw new Error('Error al actualizar tipo de asistencia')
    return response.json()
  },

  async deleteTipoAsistencia(id) {
    const response = await fetch(`${API_URL}/settings/tipos-asistencia/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Error al eliminar tipo de asistencia')
    }
    return response.json()
  },
}
