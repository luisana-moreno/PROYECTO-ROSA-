import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/potreros/activity'

export const activityService = {
  async assignLotToPastureWithBovines(data) {
    const response = await fetch(`${API_URL}/assign-lot-with-bovines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al asignar lote a potrero con bovinos.')
    }
    return response.json()
  },

  async getLotPastureHistory(idPotrero) {
    const response = await fetch(`${API_URL}/history/${idPotrero}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener historial de lotes por potrero.')
    }
    return response.json()
  },

  async getBovinesInLotPastureByDate(idPotrero, idLote, fecha) {
    const response = await fetch(`${API_URL}/bovines-by-date/${idPotrero}/${idLote}/${fecha}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener bovinos en lote/potrero por fecha.')
    }
    return response.json()
  },

  async updatePastureStatus(idPotrero, idEstadoPotrero) {
    const response = await fetch(`${API_URL}/status/${idPotrero}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idEstadoPotrero }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar estado del potrero.')
    }
    return response.json()
  },

  async getAllBovines() {
    const response = await fetch(`${API_URL}/bovines`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener todos los bovinos.')
    }
    return response.json()
  },

  async getAllLots() {
    const response = await fetch(`${API_URL}/lots`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener todos los lotes.')
    }
    return response.json()
  },

  async getAllPastures() {
    const response = await fetch(`${API_URL}/pastures`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener todos los potreros.')
    }
    return response.json()
  },

  async getAllPastureStates() {
    const response = await fetch(`${API_URL}/pasture-states`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener todos los estados de potrero.')
    }
    return response.json()
  },
}
