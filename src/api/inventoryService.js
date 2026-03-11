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

export const inventoryService = {
  // Servicios para Insumos (TTRINSUMOSO)
  getAllInsumos: async () => {
    const response = await fetch(`${API_URL}/insumos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener insumos')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  getInsumoById: async (id) => {
    const response = await fetch(`${API_URL}/insumos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener insumo por ID')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  createInsumo: async (insumoData) => {
    console.log('Create: ' + JSON.stringify(insumoData))
    const dataToSend = {
      idCategoria: insumoData.idcategoria,
      nombreInsumo: insumoData.nombreinsumo,
      cantidad: insumoData.cantidad,
      fechaVencimiento: insumoData.fechavencimiento,
    }
    const response = await fetch(`${API_URL}/insumos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear insumo')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  updateInsumo: async (id, insumoData) => {
    const dataToSend = {
      TTR_IDCATEIN: insumoData.idcategoria,
      TTR_NOMINSUM: insumoData.nombreinsumo,
      TTR_CANTIDAD: insumoData.cantidad,
      TTR_FECHAVEN: insumoData.fechavencimiento,
    }
    const response = await fetch(`${API_URL}/insumos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar insumo')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  deleteInsumo: async (id) => {
    const response = await fetch(`${API_URL}/insumos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar insumo')
    }
    return true
  },

  // Servicios para Categorías de Insumo (TMACATINSUM)
  getAllCategoriasInsumo: async () => {
    const response = await fetch(`${API_URL}/insumos/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener categorías de insumo')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  createCategoriaInsumo: async (categoriaData) => {
    const dataToSend = {
      TMA_NOMCATI: categoriaData.nombre,
    }
    const response = await fetch(`${API_URL}/insumos/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear categoría de insumo')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  updateCategoriaInsumo: async (id, categoriaData) => {
    const dataToSend = {
      TMA_NOMCATI: categoriaData.nombre,
    }
    const response = await fetch(`${API_URL}/insumos/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar categoría de insumo')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  deleteCategoriaInsumo: async (id) => {
    const response = await fetch(`${API_URL}/insumos/categorias/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar categoría de insumo')
    }
    return true
  },

  // Servicios para Egresos (TTREGRESOSS)
  getAllEgresos: async () => {
    const response = await fetch(`${API_URL}/egresos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener egresos')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  getEgresoById: async (id) => {
    const response = await fetch(`${API_URL}/egresos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener egreso por ID')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  createEgreso: async (egresoData) => {
    const dataToSend = {
      IDEMPREG: egresoData.idempreg,
      FECHPAGO: egresoData.fechpago,
      IDTIPPAG: egresoData.idtippag,
      IDNOMREF: egresoData.idnomref,
      IDPAGREF: egresoData.idpagref,
      FECHCREA: egresoData.fechcrea,
      FECHUPDA: egresoData.fechupda,
    }
    const response = await fetch(`${API_URL}/egresos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear egreso')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  updateEgreso: async (id, egresoData) => {
    const dataToSend = {
      IDEMPREG: egresoData.idempreg,
      FECHPAGO: egresoData.fechpago,
      IDTIPPAG: egresoData.idtippag,
      IDNOMREF: egresoData.idnomref,
      IDPAGREF: egresoData.idpagref,
      FECHCREA: egresoData.fechcrea,
      FECHUPDA: egresoData.fechupda,
    }
    const response = await fetch(`${API_URL}/egresos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar egreso')
    }
    const data = await response.json()
    return mapKeysToCamelCase(data)
  },

  deleteEgreso: async (id) => {
    const response = await fetch(`${API_URL}/egresos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar egreso')
    }
    return true
  },
}
