const API_URL = import.meta.env.VITE_API_URL

export const clientService = {
  getAllClients: async () => {
    const response = await fetch(`${API_URL}/clientes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener clientes')
    }
    const data = await response.json()
    return data
  },

  getClientById: async (id) => {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener cliente por ID')
    }
    const data = await response.json()
    return data
  },

  createClient: async (clientData) => {
    const response = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear cliente')
    }
    const data = await response.json()
    return data
  },

  updateClient: async (id, clientData) => {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar cliente')
    }
    const data = await response.json()
    return data
  },

  deleteClient: async (id) => {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar cliente')
    }
    return true
  },

  checkClientDocument: async (documento) => {
    const response = await fetch(`${API_URL}/clientes/check-document/${documento}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al verificar documento')
    }
    const data = await response.json()
    return data
  },

  getNaturalClients: async () => {
    const response = await fetch(`${API_URL}/clientes/natural`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener clientes naturales')
    }
    const data = await response.json()
    return data
  },

  getCompanyClients: async () => {
    const response = await fetch(`${API_URL}/clientes/juridico`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener clientes jurídicos')
    }
    const data = await response.json()
    return data
  },
}
