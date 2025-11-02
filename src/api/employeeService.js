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
    // Función auxiliar para transformar las claves de mayúsculas a minúsculas
    const formatEmployeeData = (employee) => {
      const formattedEmployee = {}
      for (const key in employee) {
        if (Object.hasOwnProperty.call(employee, key)) {
          formattedEmployee[key.toLowerCase()] = employee[key]
        }
      }
      return formattedEmployee
    }
    return data.map(formatEmployeeData)
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
    // No es necesario formatear aquí, ya que useEmployees lo maneja
    return data
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
