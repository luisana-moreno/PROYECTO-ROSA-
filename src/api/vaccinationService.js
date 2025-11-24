import { regmedicosService } from './regmedicosService'

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
    return data
      .map((tipo) => ({
        id: tipo.tma_idtipva, // Corregido a minúsculas
        nombre: tipo.tma_nomtipv, // Corregido a minúsculas
      }))
      .filter((tipo) => tipo.nombre) // Filtrar elementos sin nombre
  },

  createTipoVacuna: async (nombre) => {
    // Cambiado para recibir 'nombre' directamente
    const response = await fetch(`${API_URL}/regmedicos/tiposvacuna`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }), // Usar 'nombre' directamente
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear tipo de vacuna')
    }
    const data = await response.json()
    return { id: data.tma_idtipva, nombre: data.tma_nomtipv } // Corregido a minúsculas
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
    return { id: data.tma_idtipva, nombre: data.tma_nomtipv } // Corregido a minúsculas
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

  // Servicios para Tratamientos (TMATRATAMEN)
  getAllTratamientos: async () => {
    const response = await fetch(`${API_URL}/regmedicos/tratamientos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener tratamientos')
    }
    const data = await response.json()
    return data
      .map((tratamiento) => ({
        id: tratamiento.tma_idtrata,
        nombre: tratamiento.tma_nomtrat,
      }))
      .filter((tratamiento) => tratamiento.nombre)
  },

  createTratamiento: async (nombre) => {
    const response = await fetch(`${API_URL}/regmedicos/tratamientos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear tratamiento')
    }
    const data = await response.json()
    console.log('Respuesta de la API al crear tratamiento:', data)
    return { id: data.tma_idtrata, nombre: data.tma_nomtrat }
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
      idBovino: registro.TTR_IDBOVREF,
      idTipoVacuna: registro.TTR_IDVACUNA,
      fechaVacunacion: registro.TTR_FECHAREG,
      observaciones: registro.TTR_DIAGNOST,
      nombreTipoVacuna: registro.vacuna_nombre,
      nombreEmpleado: `${registro.empleado_nombre} ${registro.empleado_apellido}`,
      diagnostico: registro.TTR_DIAGNOST,
      tratamiento: registro.tratamiento_nombre,
      idEmpleado: registro.TTR_IDEMPMED,
      idTratamiento: registro.TTR_IDTRATAM,
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
      idBovino: data.TTR_IDBOVREF,
      idEmpleado: data.TTR_IDEMPMED,
      idMovRef: data.TTR_IDMOVREF,
      diagnostico: data.TTR_DIAGNOST,
      idTratamiento: data.TTR_IDTRATAM,
      idVacuna: data.TTR_IDVACUNA,
      fechaRegistro: data.TTR_FECHAREG,
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
      idBovino: data.TTR_IDBOVREF,
      idEmpleado: data.TTR_IDEMPMED,
      idMovRef: data.TTR_IDMOVREF,
      diagnostico: data.TTR_DIAGNOST,
      idTratamiento: data.TTR_IDTRATAM,
      idVacuna: data.TTR_IDVACUNA,
      fechaRegistro: data.TTR_FECHAREG,
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
