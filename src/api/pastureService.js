const API_URL = import.meta.env.VITE_API_URL

export const pastureService = {
  // Servicios para Potreros (TTRPOTREROS)
  getAllPotreros: async () => {
    const response = await fetch(`${API_URL}/potreros`, {
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
    return data
  },

  getPotreroById: async (id) => {
    const response = await fetch(`${API_URL}/potreros/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener potrero por ID')
    }
    const data = await response.json()
    return data
  },

  createPotrero: async (potreroData) => {
    const response = await fetch(`${API_URL}/potreros`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(potreroData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear potrero')
    }
    const data = await response.json()
    return data
  },

  updatePotrero: async (id, potreroData) => {
    const response = await fetch(`${API_URL}/potreros/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(potreroData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar potrero')
    }
    const data = await response.json()
    return data
  },

  deletePotrero: async (id) => {
    const response = await fetch(`${API_URL}/potreros/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar potrero')
    }
    return true
  },

  // Servicios para Estados de Potrero (TMAESTPOTRE)
  getAllEstadosPotrero: async () => {
    const response = await fetch(`${API_URL}/potreros/estadospotrero`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener estados de potrero')
    }
    const data = await response.json()
    return data
  },

  createEstadoPotrero: async (estadoPotreroData) => {
    const response = await fetch(`${API_URL}/potreros/estadospotrero`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadoPotreroData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear estado de potrero')
    }
    const data = await response.json()
    return data
  },

  updateEstadoPotrero: async (id, estadoPotreroData) => {
    const response = await fetch(`${API_URL}/potreros/estadospotrero/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadoPotreroData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar estado de potrero')
    }
    const data = await response.json()
    return data
  },

  deleteEstadoPotrero: async (id) => {
    const response = await fetch(`${API_URL}/potreros/estadospotrero/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar estado de potrero')
    }
    return true
  },

  // Servicios para Tipos de Mantenimiento (TMATIPMANTE)
  getAllTiposMantenimiento: async () => {
    const response = await fetch(`${API_URL}/potreros/tiposmantenimiento`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener tipos de mantenimiento')
    }
    const data = await response.json()
    return data
  },

  createTipoMantenimiento: async (tipoMantenimientoData) => {
    const response = await fetch(`${API_URL}/potreros/tiposmantenimiento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tipoMantenimientoData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear tipo de mantenimiento')
    }
    const data = await response.json()
    return data
  },

  updateTipoMantenimiento: async (id, tipoMantenimientoData) => {
    const response = await fetch(`${API_URL}/potreros/tiposmantenimiento/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tipoMantenimientoData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar tipo de mantenimiento')
    }
    const data = await response.json()
    return data
  },

  deleteTipoMantenimiento: async (id) => {
    const response = await fetch(`${API_URL}/potreros/tiposmantenimiento/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar tipo de mantenimiento')
    }
    return true
  },
}
