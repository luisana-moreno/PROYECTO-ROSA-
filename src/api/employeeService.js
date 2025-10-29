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
    return data
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
    return data
  },
}
