import { useState, useEffect } from 'react'
import { employeeService } from 'src/api/employeeService'
import { toast } from 'react-toastify' // Importa toast de react-toastify

export const useEmployees = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [viewVisible, setViewVisible] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [employees, setEmployees] = useState([])
  const [addEmployeeForm, setAddEmployeeForm] = useState({
    ttr_nombrel: '',
    ttr_nomsegu: '',
    ttr_apellid: '',
    ttr_apesegu: '',
    ttr_documen: '',
    ttr_fecnaci: '',
    ttr_telefon: '',
    ttr_direcci: '',
    ttr_feccont: '',
    ttr_idcargp: '', // Almacenará el ID del cargo
    Contact_Person: '', // Mantener por ahora, pero no se enviará al backend
  })
  // const [toast, setToast] = useState({ show: false, message: '', color: 'success' }) // Eliminado
  const [currentPage, setCurrentPage] = useState(1)
  const [employeesPerPage] = useState(10)
  const [positions, setPositions] = useState([]) // Almacenará objetos { id: ..., name: ... }

  // const showToast = (message, color = 'success') => { // Eliminado
  //   setToast({ show: true, message, color })
  //   setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500)
  // }

  // Get current employees
  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  useEffect(() => {
    const fetchEmployeesAndPositions = async () => {
      try {
        const employeesData = await employeeService.getAllEmployees()
        if (employeesData) {
          // Asegurarse de que ttr_idcargp sea un número para la comparación en el select
          setEmployees(
            employeesData.map((emp) => ({
              ...emp,
              ttr_idcargp: emp.ttr_idcargp ? parseInt(emp.ttr_idcargp, 10) : '', // Usar ttr_idcargp del backend (minúsculas)
              // También asegurarse de que las fechas sean strings en formato YYYY-MM-DD si es necesario para los inputs type="date"
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
          setPositions(positionsData.map((pos) => ({ id: pos.id, name: pos.nombre })))
        }
      } catch (error) {
        toast.error(error.message || 'Error al cargar datos iniciales.')
      }
    }
    fetchEmployeesAndPositions()
  }, [])

  const handleAddEmployee = async () => {
    const employeeToSend = {
      nombre1: addEmployeeForm.ttr_nombrel,
      nombre2: addEmployeeForm.ttr_nomsegu,
      apellido1: addEmployeeForm.ttr_apellid,
      apellido2: addEmployeeForm.ttr_apesegu,
      documento: addEmployeeForm.ttr_documen,
      fechaNacimiento: addEmployeeForm.ttr_fecnaci,
      telefono: addEmployeeForm.ttr_telefon,
      direccion: addEmployeeForm.ttr_direcci,
      fechaContratacion: addEmployeeForm.ttr_feccont,
      idCargo: addEmployeeForm.ttr_idcargp, // Ya es el ID numérico
    }
    try {
      const newEmp = await employeeService.addEmployee(employeeToSend)
      if (newEmp) {
        const cargoNombre = positions.find((p) => p.id === newEmp.ttr_idcargp)?.name || ''
        setEmployees([...employees, { ...newEmp, cargo_nombre: cargoNombre }])
        setAddEmployeeForm({
          ttr_nombrel: '',
          ttr_nomsegu: '',
          ttr_apellid: '',
          ttr_apesegu: '',
          ttr_documen: '',
          ttr_fecnaci: '',
          ttr_telefon: '',
          ttr_direcci: '',
          ttr_feccont: '',
          ttr_idcargp: '',
          Contact_Person: '',
        })
        setVisible(false)
        toast.success('Registro agregado correctamente') // Usar toast.success
      }
    } catch (error) {
      toast.error(error.message || 'Error al agregar empleado.') // Usar toast.error
    }
  }

  const handleEditEmployee = async () => {
    if (!currentEmployee || !currentEmployee.ttr_idemplo) {
      toast.warning('No employee selected for editing.') // Usar toast.warning
      return
    }
    const employeeToSend = {
      nombre1: currentEmployee.ttr_nombrel,
      nombre2: currentEmployee.ttr_nomsegu,
      apellido1: currentEmployee.ttr_apellid,
      apellido2: currentEmployee.ttr_apesegu,
      documento: currentEmployee.ttr_documen,
      fechaNacimiento: currentEmployee.ttr_fecnaci,
      telefono: currentEmployee.ttr_telefon,
      direccion: currentEmployee.ttr_direcci,
      fechaContratacion: currentEmployee.ttr_feccont,
      idCargo: currentEmployee.ttr_idcargp, // Ya es el ID numérico
    }
    try {
      const updated = await employeeService.updateEmployee(
        currentEmployee.ttr_idemplo,
        employeeToSend,
      )
      if (updated) {
        const cargoNombre = positions.find((p) => p.id === updated.ttr_idcargp)?.name || ''
        setEmployees(
          employees.map((emp) =>
            emp.ttr_idemplo === updated.ttr_idemplo
              ? { ...updated, cargo_nombre: cargoNombre }
              : emp,
          ),
        )
        setEditVisible(false)
        toast.info('Registro editado correctamente') // Usar toast.info
      }
    } catch (error) {
      toast.error(error.message || 'Error al editar empleado.') // Usar toast.error
    }
  }

  const handleDeleteEmployee = async () => {
    if (!currentEmployee || !currentEmployee.ttr_idemplo) {
      toast.warning('No employee selected for deletion.') // Usar toast.warning
      return
    }
    if (deleteConfirmation === 'confirmar') {
      try {
        await employeeService.deleteEmployee(currentEmployee.ttr_idemplo)
        setEmployees(employees.filter((emp) => emp.ttr_idemplo !== currentEmployee.ttr_idemplo))
        setDeleteVisible(false)
        toast.error('Empleado eliminado exitosamente') // Usar toast.error
      } catch (error) {
        toast.error(error.message || 'Error al eliminar empleado.') // Usar toast.error
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar') // Usar toast.warning
    }
  }

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
  }
}
