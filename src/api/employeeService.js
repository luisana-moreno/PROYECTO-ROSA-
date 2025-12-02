const API_URL = import.meta.env.VITE_API_URL

export const employeeService = {
  getAllEmployees: async () => {
    const response = await fetch(`${API_URL}/empleados`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener empleados')
    }
    const data = await response.json()
    return data.map((employee) => ({
      id: employee.ttr_idemplo,
      ttrNombrel: employee.ttr_nombrel,
      ttrApellid: employee.ttr_apellid,
      cargoNombre: employee.cargonombre,
      // Incluir otras propiedades si son necesarias para otros componentes
      ttrNomsegu: employee.ttr_nomsegu,
      ttrApesegu: employee.ttr_apesegu,
      ttrDocumen: employee.ttr_documen,
      ttrFecnaci: employee.ttr_fecnaci,
      ttrTelefon: employee.ttr_telefon,
      ttrDirecci: employee.ttr_direcci,
      ttrFeccont: employee.ttr_feccont,
      ttrIdcargp: employee.ttr_idcargp,
    }))
  },

  getEmployeeById: async (id) => {
    const response = await fetch(`${API_URL}/empleados/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener empleado por ID')
    }
    const data = await response.json()
    return {
      id: data.ttr_idemplo,
      ttrNombrel: data.ttr_nombrel,
      ttrApellid: data.ttr_apellid,
      cargoNombre: data.cargoNombre,
      // Incluir otras propiedades si son necesarias para otros componentes
      ttrNomsegu: data.ttr_nomsegu,
      ttrApesegu: data.ttr_apesegu,
      ttrDocumen: data.ttr_documen,
      ttrFecnaci: data.ttr_fecnaci,
      ttrTelefon: data.ttr_telefon,
      ttrDirecci: data.ttr_direcci,
      ttrFeccont: data.ttr_feccont,
      ttrIdcargp: data.ttr_idcargp,
    }
  },

  addEmployee: async (employeeData) => {
    const response = await fetch(`${API_URL}/empleados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear empleado')
    }
    const data = await response.json()
    return data
  },

  updateEmployee: async (id, employeeData) => {
    const response = await fetch(`${API_URL}/empleados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar empleado')
    }
    const data = await response.json()
    return data
  },

  deleteEmployee: async (id) => {
    const response = await fetch(`${API_URL}/empleados/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar empleado')
    }
    return true
  },

  checkEmployeeId: async (id) => {
    const response = await fetch(`${API_URL}/empleados/check-document/${id}`, {
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

  getAllPositions: async () => {
    const response = await fetch(`${API_URL}/empleados/cargos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // console.log(response)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener cargos')
    }
    const data = await response.json()
    // Mapear tma_idemplo a id y tma_nombrel a nombre
    return data.map((cargo) => ({
      id: cargo.tma_idemplo,
      nombre: cargo.tma_nombrel,
    }))
  },

  createPosition: async (positionData) => {
    const response = await fetch(`${API_URL}/empleados/cargos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: positionData.nombre }), // Asegurarse de enviar solo 'nombre'
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear cargo')
    }
    const data = await response.json()
    return { id: data.tma_idemplo, nombre: data.tma_nombrel } // Mapear la respuesta
  },

  updatePosition: async (id, positionData) => {
    const response = await fetch(`${API_URL}/empleados/cargos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: positionData.nombre }), // Asegurarse de enviar solo 'nombre'
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al actualizar cargo')
    }
    const data = await response.json()
    return { id: data.tma_idemplo, nombre: data.tma_nombrel } // Mapear la respuesta
  },

  deletePosition: async (id) => {
    const response = await fetch(`${API_URL}/empleados/cargos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al eliminar cargo')
    }
    return true
  },
}
