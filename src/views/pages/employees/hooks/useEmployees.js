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
    ttrNombrel: '',
    ttrApellid: '',
    ttrDocumen: '',
    ttrFecnaci: '',
    ttrTelefon: '',
    ttrDirecci: '',
    ttrFeccont: '',
    ttrIdcargp: '', // Almacenará el ID del cargo
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
    if (!form.ttrNombrel || form.ttrNombrel.trim() === '') {
      toast.error('El campo "Nombre" es requerido.')
      return false
    }
    if (!form.ttrApellid || form.ttrApellid.trim() === '') {
      toast.error('El campo "Apellido" es requerido.')
      return false
    }
    if (!form.ttrDocumen || form.ttrDocumen.trim() === '') {
      toast.error('El campo "Número de documento" es requerido.')
      return false
    }
    if (!/^\d+$/.test(form.ttrDocumen)) {
      toast.error('El campo "Número de documento" solo debe contener números.')
      return false
    }
    if (form.ttrDocumen.length > 8) {
      toast.error('El número de documento no puede exceder los 8 caracteres.')
      return false
    }
    if (!form.ttrFecnaci) {
      toast.error('El campo "Fecha de nacimiento" es requerido.')
      return false
    }
    if (new Date(form.ttrFecnaci) > new Date()) {
      toast.error('La fecha de nacimiento no puede ser una fecha futura.')
      return false
    }
    if (!form.ttrTelefon || form.ttrTelefon.trim() === '') {
      toast.error('El campo "Teléfono" es requerido.')
      return false
    }
    if (!/^\d+$/.test(form.ttrTelefon)) {
      toast.error('El campo "Teléfono" solo debe contener números.')
      return false
    }
    if (form.ttrTelefon.length !== 11) {
      toast.error('El teléfono debe tener exactamente 11 dígitos.')
      return false
    }
    if (!form.ttrDirecci || form.ttrDirecci.trim() === '') {
      toast.error('El campo "Dirección" es requerido.')
      return false
    }
    if (form.ttrDirecci.length > 255) {
      toast.error('La dirección no puede exceder los 255 caracteres.')
      return false
    }
    if (!form.ttrFeccont) {
      toast.error('El campo "Fecha de contrato" es requerido.')
      return false
    }
    if (new Date(form.ttrFeccont) > new Date()) {
      toast.error('La fecha de contrato no puede ser una fecha futura.')
      return false
    }
    if (!form.ttrIdcargp) {
      toast.error('El campo "Cargo" es requerido.')
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

  const fetchEmployees = async () => {
    try {
      const employeesData = await employeeService.getAllEmployees()
      if (employeesData) {
        setEmployees(
          employeesData.map((emp) => ({
            id: emp.id,
            ttrNombrel: emp.ttrNombrel,
            ttrApellid: emp.ttrApellid,
            cargoNombre: emp.cargoNombre,
            ttrNomsegu: emp.ttrNomsegu,
            ttrApesegu: emp.ttrApesegu,
            ttrDocumen: emp.ttrDocumen,
            ttrFecnaci: emp.ttrFecnaci ? new Date(emp.ttrFecnaci).toISOString().split('T')[0] : '',
            ttrTelefon: emp.ttrTelefon,
            ttrDirecci: emp.ttrDirecci,
            ttrFeccont: emp.ttrFeccont ? new Date(emp.ttrFeccont).toISOString().split('T')[0] : '',
            ttrIdcargp: emp.ttrIdcargp ? parseInt(emp.ttrIdcargp, 10) : '',
          })),
        )
      }
    } catch (error) {
      toast.error(error.message || 'Error al cargar empleados.')
    }
  }

  const fetchPositions = async () => {
    try {
      const positionsData = await employeeService.getAllPositions()
      if (positionsData) {
        setPositions(positionsData.map((pos) => ({ id: pos.id, nombre: pos.nombre })))
      }
    } catch (error) {
      toast.error(error.message || 'Error al cargar cargos.')
    }
  }

  useEffect(() => {
    fetchEmployees()
    fetchPositions()
  }, [])

  const handleAddEmployee = async () => {
    if (!validateEmployeeForm(addEmployeeForm)) {
      return
    }
    const employeeToSend = {
      ttr_nombrel: addEmployeeForm.ttrNombrel,
      ttr_apellid: addEmployeeForm.ttrApellid,
      ttr_documen: addEmployeeForm.ttrDocumen,
      ttr_fecnaci: addEmployeeForm.ttrFecnaci,
      ttr_telefon: addEmployeeForm.ttrTelefon,
      ttr_direcci: addEmployeeForm.ttrDirecci,
      ttr_feccont: addEmployeeForm.ttrFeccont,
      ttr_idcargp: addEmployeeForm.ttrIdcargp,
    }
    try {
      const newEmp = await employeeService.addEmployee(employeeToSend)
      if (newEmp) {
        await fetchEmployees() // Refrescar la tabla de empleados
        setAddEmployeeForm({
          ttrNombrel: '',
          ttrApellid: '',
          ttrDocumen: '',
          ttrFecnaci: '',
          ttrTelefon: '',
          ttrDirecci: '',
          ttrFeccont: '',
          ttrIdcargp: '',
        })
        setVisible(false)
        toast.success('Registro agregado correctamente')
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message || 'Error al agregar empleado.'
      toast.error(errorMessage)
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
      ttr_nombrel: currentEmployee.ttrNombrel,
      ttr_apellid: currentEmployee.ttrApellid,
      ttr_documen: currentEmployee.ttrDocumen,
      ttr_fecnaci: currentEmployee.ttrFecnaci,
      ttr_telefon: currentEmployee.ttrTelefon,
      ttr_direcci: currentEmployee.ttrDirecci,
      ttr_feccont: currentEmployee.ttrFeccont,
      ttr_idcargp: currentEmployee.ttrIdcargp,
    }
    try {
      const updated = await employeeService.updateEmployee(currentEmployee.id, employeeToSend)
      if (updated) {
        const cargoNombre = positions.find((p) => p.id === updated.ttrIdcargp)?.nombre || ''
        await fetchEmployees() // Refrescar la tabla de empleados
        setEditVisible(false)
        toast.info('Registro editado correctamente')
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message || 'Error al editar empleado.'
      toast.error(errorMessage)
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
        await employeeService.deleteEmployee(currentEmployee.id)
        await fetchEmployees() // Refrescar la tabla de empleados
        setDeleteVisible(false)
        toast.error('Empleado eliminado exitosamente')
      } catch (error) {
        toast.error(error.message || 'Error al eliminar empleado.')
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar')
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
      ? employee.ttrIdcargp === parseInt(filterPosition, 10)
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
    originalEmployee,
    fetchEmployees, // Exportar fetchEmployees para recargar en otros componentes si es necesario
    fetchPositions, // Exportar fetchPositions para recargar en otros componentes si es necesario
  }
}
