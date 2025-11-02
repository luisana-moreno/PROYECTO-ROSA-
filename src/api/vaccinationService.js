const API_URL = import.meta.env.VITE_API_URL

export const vaccinationService = {
  // Servicios para Tipos de Vacuna (TMATIPVACUN)
  getAllTiposVacuna: async () => {
    const response = await fetch(`${API_URL}/regmedicos/tiposvacuna`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener tipos de vacuna')
    }
    const data = await response.json()
    return data.map((tipo) => ({
      id: tipo.TMA_IDTIPVA,
      nombre: tipo.TMA_NOMBREL,
    }))
  },

  createTipoVacuna: async (tipoVacunaData) => {
    const response = await fetch(`${API_URL}/regmedicos/tiposvacuna`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: tipoVacunaData.nombre }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear tipo de vacuna')
    }
    const data = await response.json()
    return { id: data.TMA_IDTIPVA, nombre: data.TMA_NOMBREL }
  },

  updateTipoVacuna: async (id, tipoVacunaData) => {
    const response = await fetch(`${API_URL}/regmedicos/tiposvacuna/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: tipoVacunaData.nombre }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar tipo de vacuna')
    }
    const data = await response.json()
    return { id: data.TMA_IDTIPVA, nombre: data.TMA_NOMBREL }
  },

  deleteTipoVacuna: async (id) => {
    const response = await fetch(`${API_URL}/regmedicos/tiposvacuna/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar tipo de vacuna')
    }
    return true
  },

  // Servicios para Registros Médicos (Vacunación) (TTRREGMEDIC)
  getAllRegistrosMedicos: async () => {
    const response = await fetch(`${API_URL}/regmedicos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener registros médicos')
    }
    const data = await response.json()
    return data.map((registro) => ({
      id: registro.TTR_IDREGMED,
      idBovino: registro.TTR_IDBOVIN,
      idTipoVacuna: registro.TTR_IDTIPVA,
      fechaVacunacion: registro.TTR_FECVACU,
      proximaVacunacion: registro.TTR_PROVACU,
      observaciones: registro.TTR_OBSERVA,
      nombreTipoVacuna: registro.TMA_NOMBREL, // Asumiendo que el backend une esta información
    }))
  },

  createRegistroMedico: async (registroMedicoData) => {
    const response = await fetch(`${API_URL}/regmedicos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registroMedicoData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear registro médico')
    }
    const data = await response.json()
    return {
      id: data.TTR_IDREGMED,
      idBovino: data.TTR_IDBOVIN,
      idTipoVacuna: data.TTR_IDTIPVA,
      fechaVacunacion: data.TTR_FECVACU,
      proximaVacunacion: data.TTR_PROVACU,
      observaciones: data.TTR_OBSERVA,
    }
  },

  updateRegistroMedico: async (id, registroMedicoData) => {
    const response = await fetch(`${API_URL}/regmedicos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registroMedicoData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar registro médico')
    }
    const data = await response.json()
    return {
      id: data.TTR_IDREGMED,
      idBovino: data.TTR_IDBOVIN,
      idTipoVacuna: data.TTR_IDTIPVA,
      fechaVacunacion: data.TTR_FECVACU,
      proximaVacunacion: data.TTR_PROVACU,
      observaciones: data.TTR_OBSERVA,
    }
  },

  deleteRegistroMedico: async (id) => {
    const response = await fetch(`${API_URL}/regmedicos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar registro médico')
    }
    return true
  },
}
