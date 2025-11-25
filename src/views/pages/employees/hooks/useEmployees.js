import { useState, useEffect } from 'react'
import { employeeService } from 'src/api/employeeService'
import { toast } from 'react-toastify' // Importa toast de react-toastify

export const useEmployees = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [viewVisible, setViewVisible] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [originalEmployee, setOriginalEmployee] = useState(null) // Nuevo estado para el empleado original
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [employees, setEmployees] = useState([])
  const [addEmployeeForm, setAddEmployeeForm] = useState({
    ttr_nombrel: '',
    ttr_apellid: '',
    ttr_documen: '',
    ttr_fecnaci: '',
    ttr_telefon: '',
    ttr_direcci: '',
    ttr_feccont: '',
    ttrIdcargp: '', // Almacenará el ID del cargo (camelCase para consistencia)
  })
  const [searchTerm, setSearchTerm] = useState('') // Nuevo estado para el término de búsqueda
  const [filterPosition, setFilterPosition] = useState('') // Nuevo estado para el filtro por cargo
  // const [toast, setToast] = useState({ show: false, message: '', color: 'success' }) // Eliminado
  const [currentPage, setCurrentPage] = useState(1)
  const [employeesPerPage] = useState(10)
  const [positions, setPositions] = useState([]) // Almacenará objetos { id: ..., name: ... }

  // const showToast = (message, color = 'success') => { // Eliminado
  //   setToast({ show: true, message, color })
  //   setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500)
  // }

  // Función de validación
  const validateEmployeeForm = (form) => {
    if (!form.ttrNombrel) {
      toast.warning('El campo "Primer Nombre" es requerido.')
      return false
    }
    if (!form.ttrApellid) {
      toast.warning('El campo "Primer Apellido" es requerido.')
      return false
    }
    if (!form.ttrDocumen) {
      toast.warning('El campo "Cédula de Identidad" es requerido.')
      return false
    }
    if (!/^\d+$/.test(form.ttrDocumen)) {
      toast.warning('El campo "Cédula de Identidad" solo debe contener números.')
      return false
    }
    if (!form.ttrFecnaci) {
      toast.warning('El campo "Fecha de Nacimiento" es requerido.')
      return false
    }
    if (!form.ttrTelefon) {
      toast.warning('El campo "Número de Teléfono" es requerido.')
      return false
    }
    if (!/^\d+$/.test(form.ttrTelefon)) {
      toast.warning('El campo "Número de Teléfono" solo debe contener números.')
      return false
    }
    if (form.ttrTelefon.length !== 11) {
      toast.warning('El campo "Número de Teléfono" debe tener exactamente 11 dígitos.')
      return false
    }
    if (!form.ttrDirecci) {
      toast.warning('El campo "Dirección" es requerido.')
      return false
    }
    if (!form.ttrFeccont) {
      toast.warning('El campo "Fecha de Contratación" es requerido.')
      return false
    }
    if (!form.ttrIdcargp) {
      toast.warning('El campo "Cargo" es requerido.')
      return false
    }
    return true
  }

  // Get current employees
  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Actualizar originalEmployee cuando currentEmployee cambia y editVisible es true
  useEffect(() => {
    if (editVisible && currentEmployee) {
      setOriginalEmployee(currentEmployee)
    }
  }, [editVisible, currentEmployee])

  useEffect(() => {
    const fetchEmployeesAndPositions = async () => {
      try {
        const employeesData = await employeeService.getAllEmployees()
        if (employeesData) {
          setEmployees(
            employeesData.map((emp) => ({
              ...emp,
              ttrIdcargp: emp.ttrIdcargp ? parseInt(emp.ttrIdcargp, 10) : '',
              ttrFecnaci: emp.ttrFecnaci
                ? new Date(emp.ttrFecnaci).toISOString().split('T')[0]
                : '',
              ttrFeccont: emp.ttrFeccont
                ? new Date(emp.ttrFeccont).toISOString().split('T')[0]
                : '',
            })),
          )
          console.log(
            'Empleados después del mapeo en useEmployees:',
            employeesData.map((emp) => ({
              ...emp,
              ttr_idcargp: emp.ttr_idcargp ? parseInt(emp.ttr_idcargp, 10) : '',
              ttr_fecnaci: emp.ttr_fecnaci
                ? new Date(emp.ttr_fecnaci).toISOString().split('T')[0]
                : '',
              ttr_feccont: emp.ttr_feccont
                ? new Date(emp.ttr_feccont).toISOString().split('T')[0]
                : '',
            })),
          )
        }
        const positionsData = await employeeService.getAllPositions()
        if (positionsData) {
          setPositions(positionsData.map((pos) => ({ id: pos.id, nombre: pos.nombre }))) // Corregido: usar 'nombre' en lugar de 'name'
        }
      } catch (error) {
        toast.error(error.message || 'Error al cargar datos iniciales.')
      }
    }
    fetchEmployeesAndPositions()
  }, [])

  const handleAddEmployee = async () => {
    if (!validateEmployeeForm(addEmployeeForm)) {
      return
    }
    const employeeToSend = {
      ttr_nombrel: addEmployeeForm.ttr_nombrel, // Estos aún deben ser snake_case para el backend
      ttr_apellid: addEmployeeForm.ttr_apellid,
      ttr_documen: addEmployeeForm.ttr_documen,
      ttr_fecnaci: addEmployeeForm.ttr_fecnaci,
      ttr_telefon: addEmployeeForm.ttr_telefon,
      ttr_direcci: addEmployeeForm.ttr_direcci,
      ttr_feccont: addEmployeeForm.ttr_feccont,
      ttr_idcargp: addEmployeeForm.ttrIdcargp, // Corregido: usar ttrIdcargp para el formulario
    }
    try {
      const newEmp = await employeeService.addEmployee(employeeToSend)
      if (newEmp) {
        const cargoNombre = positions.find((p) => p.id === newEmp.ttrIdcargp)?.nombre || '' // Corregido: usar ttrIdcargp y cargoNombre
        setEmployees([...employees, { ...newEmp, cargoNombre: cargoNombre }])
        setAddEmployeeForm({
          ttr_nombrel: '',
          ttr_apellid: '',
          ttr_documen: '',
          ttr_fecnaci: '',
          ttr_telefon: '',
          ttr_direcci: '',
          ttr_feccont: '',
          ttrIdcargp: '', // Corregido: usar ttrIdcargp
        })
        setVisible(false)
        toast.success('Registro agregado correctamente')
      }
    } catch (error) {
      // Manejo de errores de validación del backend
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message) // Muestra el mensaje de error específico del backend
      } else {
        toast.error(error.message || 'Error al agregar empleado.')
      }
    }
  }

  const handleEditEmployee = async () => {
    if (!currentEmployee || !currentEmployee.id) {
      // Corregido: usar currentEmployee.id
      toast.warning('No employee selected for editing.')
      return
    }
    if (!validateEmployeeForm(currentEmployee)) {
      return
    }
    const employeeToSend = {
      ttr_nombrel: currentEmployee.ttrNombrel, // Estos deben ser camelCase porque son los del currentEmployee
      ttr_apellid: currentEmployee.ttrApellid,
      ttr_documen: currentEmployee.ttrDocumen,
      ttr_fecnaci: currentEmployee.ttrFecnaci,
      ttr_telefon: currentEmployee.ttrTelefon,
      ttr_direcci: currentEmployee.ttrDirecci,
      ttr_feccont: currentEmployee.ttrFeccont,
      ttr_idcargp: currentEmployee.ttrIdcargp, // Corregido: usar ttrIdcargp
    }
    try {
      const updated = await employeeService.updateEmployee(
        currentEmployee.id, // Corregido: usar currentEmployee.id
        employeeToSend,
      )
      if (updated) {
        const cargoNombre = positions.find((p) => p.id === updated.ttrIdcargp)?.nombre || '' // Corregido: usar ttrIdcargp y cargoNombre
        setEmployees(
          employees.map((emp) =>
            emp.id === updated.id // Corregido: usar emp.id y updated.id
              ? { ...updated, cargoNombre: cargoNombre }
              : emp,
          ),
        )
        setEditVisible(false)
        toast.info('Registro editado correctamente')
      }
    } catch (error) {
      // Manejo de errores de validación del backend
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message) // Muestra el mensaje de error específico del backend
      } else {
        toast.error(error.message || 'Error al editar empleado.')
      }
    }
  }

  const handleDeleteEmployee = async () => {
    if (!currentEmployee || !currentEmployee.id) {
      // Corregido: usar currentEmployee.id
      toast.warning('No employee selected for deletion.') // Usar toast.warning
      return
    }
    if (deleteConfirmation === 'confirmar') {
      try {
        await employeeService.deleteEmployee(currentEmployee.id) // Corregido: usar currentEmployee.id
        setEmployees(employees.filter((emp) => emp.id !== currentEmployee.id)) // Corregido: usar emp.id y currentEmployee.id
        setDeleteVisible(false)
        toast.error('Empleado eliminado exitosamente') // Usar toast.error
      } catch (error) {
        toast.error(error.message || 'Error al eliminar empleado.') // Usar toast.error
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar') // Usar toast.warning
    }
  }

  const filteredEmployees = employees.filter((employee) => {
    const employeeName = employee.ttr_nombrel ? employee.ttr_nombrel.trim().toLowerCase() : ''
    const employeeApellido = employee.ttr_apellid ? employee.ttr_apellid.trim().toLowerCase() : ''
    const employeeDocument = employee.ttr_documen ? employee.ttr_documen.trim().toLowerCase() : ''

    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    const matchesSearchTerm = searchTerm
      ? employeeName.includes(lowerCaseSearchTerm) ||
        employeeApellido.includes(lowerCaseSearchTerm) ||
        employeeDocument.includes(lowerCaseSearchTerm)
      : true
    const matchesPosition = filterPosition
      ? employee.ttrIdcargp === parseInt(filterPosition, 10) // Corregido: usar ttrIdcargp
      : true
    return matchesSearchTerm && matchesPosition
  })

  return {
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    deleteVisible,
    setDeleteVisible,
    viewVisible,
    setViewVisible,
    currentEmployee,
    setCurrentEmployee,
    deleteConfirmation,
    setDeleteConfirmation,
    employees,
    addEmployeeForm,
    setAddEmployeeForm,
    handleAddEmployee,
    handleEditEmployee,
    handleDeleteEmployee,
    toast,
    currentEmployees,
    indexOfFirstEmployee,
    employeesPerPage,
    currentPage,
    paginate,
    positions,
    searchTerm,
    setSearchTerm,
    setFilterPosition,
    filteredEmployees,
    originalEmployee, // Exportar el estado original
  }
}
