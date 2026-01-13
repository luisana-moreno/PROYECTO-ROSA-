import { helpFetch } from '../helpper/helpFetch'

const API_URL = 'clientes'
const api = helpFetch()

export const clientService = {
  getAllClients: async () => {
    try {
      const response = await api.get(API_URL)
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.statusText || 'Error al obtener clientes')
      }
    } catch (error) {
      throw error
    }
  },

  getClientById: async (id) => {
    try {
      const response = await api.get(`${API_URL}/${id}`)
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.statusText || 'Error al obtener cliente por ID')
      }
    } catch (error) {
      throw error
    }
  },

  createClient: async (clientData) => {
    try {
      const response = await api.post(API_URL, clientData)
      if (response && !response.error) {
        return response
      } else {
        // Propagate backend errors (like 409 Conflict)
        const error = new Error(response.message || 'Error al crear cliente')
        if (response.status) error.response = { status: response.status, data: response }
        throw error
      }
    } catch (error) {
      throw error
    }
  },

  updateClient: async (id, clientData) => {
    try {
      const response = await api.put(API_URL, id, clientData)
      if (response && !response.error) {
        return response
      } else {
        const error = new Error(response.message || 'Error al actualizar cliente')
        if (response.status) error.response = { status: response.status, data: response }
        throw error
      }
    } catch (error) {
      throw error
    }
  },

  deleteClient: async (id) => {
    try {
      const response = await api.del(API_URL, id)
      if (response && !response.error) {
        return true
      } else {
        throw new Error(response.message || 'Error al eliminar cliente')
      }
    } catch (error) {
      throw error
    }
  },

  checkClientDocument: async (documento) => {
    try {
      const response = await api.get(`${API_URL}/check-document/${documento}`)
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.message || 'Error al verificar documento')
      }
    } catch (error) {
      throw error
    }
  },

  getNaturalClients: async () => {
    try {
      const response = await api.get(`${API_URL}/natural`)
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.message || 'Error al obtener clientes naturales')
      }
    } catch (error) {
      throw error
    }
  },

  getCompanyClients: async () => {
    try {
      const response = await api.get(`${API_URL}/juridico`)
      if (response && !response.error) {
        return response
      } else {
        throw new Error(response.message || 'Error al obtener clientes jurídicos')
      }
    } catch (error) {
      throw error
    }
  },
}
