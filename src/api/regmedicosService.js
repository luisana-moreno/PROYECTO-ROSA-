const API_URL = import.meta.env.VITE_API_URL

export const regmedicosService = {
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
    return data.map((tratamiento) => ({
      id: tratamiento.tma_idtrata,
      nombre: tratamiento.tma_nomtrat,
    }))
  },

  getTratamientoById: async (id) => {
    const response = await fetch(`${API_URL}/regmedicos/tratamientos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener tratamiento por ID')
    }
    const data = await response.json()
    return { id: data.TMA_IDTRATA, nombre: data.TMA_NOMTRAT }
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
    return { id: data.TMA_IDTRATA, nombre: data.TMA_NOMTRAT }
  },

  updateTratamiento: async (id, nombre) => {
    const response = await fetch(`${API_URL}/regmedicos/tratamientos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar tratamiento')
    }
    const data = await response.json()
    return { id: data.TMA_IDTRATA, nombre: data.TMA_NOMTRAT }
  },

  deleteTratamiento: async (id) => {
    const response = await fetch(`${API_URL}/regmedicos/tratamientos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar tratamiento')
    }
    return true
  },

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
      id: tipo.tma_idtipva,
      nombre: tipo.tma_nomtipv,
    }))
  },

  getTipoVacunaById: async (id) => {
    const response = await fetch(`${API_URL}/regmedicos/tiposvacuna/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener tipo de vacuna por ID')
    }
    const data = await response.json()
    return { id: data.TMA_IDTIPVA, nombre: data.TMA_NOMTIPV }
  },

  createTipoVacuna: async (nombre) => {
    const response = await fetch(`${API_URL}/regmedicos/tiposvacuna`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear tipo de vacuna')
    }
    const data = await response.json()
    return { id: data.TMA_IDTIPVA, nombre: data.TMA_NOMTIPV }
  },

  updateTipoVacuna: async (id, nombre) => {
    const response = await fetch(`${API_URL}/regmedicos/tiposvacuna/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar tipo de vacuna')
    }
    const data = await response.json()
    return { id: data.TMA_IDTIPVA, nombre: data.TMA_NOMTIPV }
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

  // Servicios para Registros Médicos (TTRREGMEDIC)
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
      id: registro.ttr_idregmed,
      bovinos: registro.bovinos, // Ahora es un array de objetos {id, numero}
      idTipoVacuna: registro.ttr_idvacuna,
      fechaVacunacion: registro.ttr_fechareg,
      observaciones: registro.ttr_diagnost,
      nombreTipoVacuna: registro.vacuna_nombre,
      nombreEmpleado: `${registro.empleado_nombre} ${registro.empleado_apellido}`,
      diagnostico: registro.ttr_diagnost,
      tratamiento: registro.tratamiento_nombre,
      idEmpleado: registro.ttr_idempmed,
      idTratamiento: registro.ttr_idtratam,
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
      id: data.ttr_idregmed,
      bovinos: data.bovinos, // Ahora es un array de IDs
      idEmpleado: data.idEmpleadoMed, // Asegúrate de que el backend devuelve esto
      idMovRef: data.idMovRef, // Asegúrate de que el backend devuelve esto
      diagnostico: data.diagnostico,
      idTratamiento: data.idTratamiento,
      idVacuna: data.idVacuna,
      fechaRegistro: data.fechaRegistro,
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
      id: data.ttr_idregmed,
      bovinos: data.bovinos, // Ahora es un array de IDs
      idEmpleado: data.idEmpleadoMed, // Asegúrate de que el backend devuelve esto
      idMovRef: data.idMovRef, // Asegúrate de que el backend devuelve esto
      diagnostico: data.diagnostico,
      idTratamiento: data.idTratamiento,
      idVacuna: data.idVacuna,
      fechaRegistro: data.fechaRegistro,
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

  getRegistrosMedicosByDate: async (date) => {
    const response = await fetch(`${API_URL}/regmedicos/date/${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener registros médicos por fecha')
    }
    const data = await response.json()
    return data.map((registro) => ({
      id: registro.ttr_idregmed,
      bovinos: registro.bovinos, // Ahora es un array de objetos {id, numero}
      diagnostico: registro.ttr_diagnost,
      tipoVacuna: registro.vacuna_nombre,
      tratamiento: registro.tratamiento_nombre,
      fechaRegistro: registro.ttr_fechareg,
      nombreEmpleado: `${registro.empleado_nombre} ${registro.empleado_apellido}`,
    }))
  },

  getRegistrosMedicosByBovinoId: async (idBovino) => {
    const response = await fetch(`${API_URL}/regmedicos/bovino/${idBovino}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener registros médicos por ID de bovino')
    }
    const data = await response.json()
    console.log('Registros médicos recibidos del API:', data) // Log para depuración
    // Asegurarse de que los nombres de las propiedades coincidan con los que el PDF espera
    return data.map((registro) => ({
      ttrFechareg: registro.ttrFechareg, // Fecha Registro
      ttrDiagnost: registro.ttrDiagnost, // Diagnóstico
      tmaNomtrat: registro.tmaNomtrat, // Tratamiento (nombre)
      tmaNomtipv: registro.tmaNomtipv, // Vacuna (nombre)
      employeeName: registro.employeeName, // Empleado nombre
      employeeLastName: registro.employeeLastName, // Empleado apellido
    }))
  },
}
