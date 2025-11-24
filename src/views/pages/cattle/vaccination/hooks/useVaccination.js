import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { helpFetch } from 'src/helpper/helpFetch'
import { cattleService } from '../../../../../api/cattleService'
import { employeeService } from '../../../../../api/employeeService'
import { vaccinationService } from '../../../../../api/vaccinationService'
import { regmedicosService } from '../../../../../api/regmedicosService' // Importar regmedicosService
const { get, post, put, del } = helpFetch()

const useVaccination = () => {
  const [visibleVaccination, setVisibleVaccination] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [vaccinationEvents, setVaccinationEvents] = useState([])
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [formData, setFormData] = useState({
    cattleIds: [],
    employeeId: '',
    diagnosis: '',
    treatment: '',
    vaccine: '',
    date_vaccination: '',
  })
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  const [employees, setEmployees] = useState([])
  const [allCattle, setAllCattle] = useState([])
  const [visibleCattleModal, setVisibleCattleModal] = useState(false)

  const [tiposVacuna, setTiposVacuna] = useState([])
  const [tratamientos, setTratamientos] = useState([])

  const [visibleDayOptionsModal, setVisibleDayOptionsModal] = useState(false)
  const [dayOptionsDate, setDayOptionsDate] = useState('')

  // Nuevos estados para el modal de detalles de vacunación
  const [visibleVaccinationDetailsModal, setVisibleVaccinationDetailsModal] = useState(false)
  const [vaccinationDetails, setVaccinationDetails] = useState([])

  const closeModal = useCallback(() => {
    setVisibleVaccination(false)
    setFormData({
      cattleIds: [],
      employeeId: '',
      diagnosis: '',
      treatment: '',
      vaccine: '',
      date_vaccination: '',
    })
    setSelectedEventId(null)
    setEditMode(false)
  }, [])

  const cancelDelete = useCallback(() => {
    setConfirmDelete(false)
  }, [])

  const fetchVaccinationEvents = useCallback(async () => {
    try {
      const allRegistros = await regmedicosService.getAllRegistrosMedicos()
      const events = allRegistros
        .filter((registro) => registro.id !== undefined && registro.id !== null) // Filtra registros con ID indefinido o nulo
        .map((registro) => {
          const employee = employees.find((emp) => emp.id === registro.idEmpleado)
          const employeeName = employee ? `${employee.nombre} ${employee.apellido}` : 'N/A'

          return {
            id: registro.id.toString(),
            title: `Vacuna: ${registro.nombreTipoVacuna || ''} - ${registro.diagnostico || ''}`,
            date: registro.fechaVacunacion?.split('T')[0] || '', // Asegurarse de que el formato sea 'YYYY-MM-DD'
            extendedProps: {
              cattleIds: [registro.idBovino],
              employeeId: registro.idEmpleado,
              employeeName: registro.nombreEmpleado, // Añadir el nombre del empleado
              diagnosis: registro.diagnostico,
              treatment: registro.tratamiento,
              vaccine: registro.nombreTipoVacuna,
              date_vaccination: registro.fechaVacunacion?.split('T')[0] || '',
            },
          }
        })
      setVaccinationEvents(events)
    } catch (err) {
      console.error('Error al obtener los eventos de vacunación:', err)
      toast.error('Error al cargar eventos de vacunación.')
    }
  }, [])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const employeesData = await employeeService.getAllEmployees()
        setEmployees(employeesData || [])

        const cattleData = await cattleService.getAllCattle()
        setAllCattle(cattleData || [])

        const tiposVacunaData = await vaccinationService.getAllTiposVacuna()
        setTiposVacuna(tiposVacunaData || [])

        const tratamientosData = await vaccinationService.getAllTratamientos()
        setTratamientos(tratamientosData || [])

        fetchVaccinationEvents() // Cargar los eventos de vacunación
      } catch (err) {
        console.error('Error al obtener datos iniciales:', err)
        toast.error('Error al cargar datos iniciales.')
      }
    }
    fetchInitialData()
  }, [fetchVaccinationEvents])

  const handleDateClick = (info) => {
    setDayOptionsDate(info.date) // date ya es un objeto Date
    setVisibleDayOptionsModal(true)
  }

  const handleRegisterOptionClick = useCallback(() => {
    setVisibleDayOptionsModal(false)
    setEditMode(false)
    setSelectedDate(dayOptionsDate)
    setFormData({
      cattleIds: [],
      employeeId: '',
      diagnosis: '',
      treatment: '',
      vaccine: '',
      date_vaccination: dayOptionsDate.toISOString().split('T')[0],
    })
    setVisibleVaccination(true)
    setSelectedEventId(null)
  }, [dayOptionsDate])

  const handleViewDetailsOptionClick = useCallback(async () => {
    setVisibleDayOptionsModal(false)
    try {
      const formattedDate = dayOptionsDate.toISOString().split('T')[0]
      const records = await regmedicosService.getRegistrosMedicosByDate(formattedDate)
      setVaccinationDetails(records)
      setVisibleVaccinationDetailsModal(true)
    } catch (error) {
      console.error('Error al obtener detalles de vacunación:', error)
      toast.error('Error al obtener los detalles de vacunación para esta fecha.')
    }
  }, [dayOptionsDate])

  const handleEventClick = (info) => {
    setEditMode(true)
    setSelectedEventId(info.event.id)
    setFormData({
      cattleIds: info.event.extendedProps.cattleIds || [],
      employeeId: info.event.extendedProps.employeeId,
      diagnosis: info.event.extendedProps.diagnosis,
      treatment: info.event.extendedProps.treatment,
      vaccine: info.event.extendedProps.vaccine,
      date_vaccination: info.event.extendedProps.date_vaccination,
    })
    setSelectedDate(new Date(info.event.startStr))
    setVisibleVaccination(true)
  }

  const handleSelectCattle = (selected) => {
    setFormData((prev) => ({
      ...prev,
      cattleIds: selected.map((item) => item.id),
    }))
    setVisibleCattleModal(false)
  }

  const handleSubmit = useCallback(async () => {
    if (formData.cattleIds.length === 0) {
      toast.error('Debe seleccionar al menos un bovino.')
      return
    }
    if (!formData.employeeId) {
      toast.error('Debe seleccionar un empleado.')
      return
    }
    if (!formData.diagnosis) {
      toast.error('Debe ingresar un diagnóstico.')
      return
    }
    if (!formData.treatment) {
      toast.error('Debe ingresar un tratamiento.')
      return
    }
    if (!formData.vaccine) {
      toast.error('Debe ingresar el nombre de la vacuna.')
      return
    }
    if (!formData.date_vaccination) {
      toast.error('Debe ingresar la fecha de vacunación.')
      return
    }

    try {
      // Buscar el ID de la vacuna y tratamiento en los estados existentes
      const selectedVacuna = tiposVacuna.find(
        (v) => v.nombre.toLowerCase() === formData.vaccine.toLowerCase(),
      )
      const selectedTratamiento = tratamientos.find(
        (t) => t.nombre.toLowerCase() === formData.treatment.toLowerCase(),
      )

      if (!selectedVacuna) {
        toast.error('Debe seleccionar una vacuna existente o agregar una nueva con el botón.')
        return
      }
      if (!selectedTratamiento) {
        toast.error('Debe seleccionar un tratamiento existente o agregar uno nuevo con el botón.')
        return
      }

      const registroMedicoData = {
        idBovinoRef: formData.cattleIds[0],
        idEmpleadoMed: formData.employeeId,
        idMovRef: null,
        diagnostico: formData.diagnosis,
        idTratamiento: selectedTratamiento.id,
        idVacuna: selectedVacuna.id,
        fechaRegistro: formData.date_vaccination,
      }

      let result
      if (editMode && selectedEventId !== null) {
        result = await vaccinationService.updateRegistroMedico(selectedEventId, registroMedicoData)
        toast.info('Evento editado correctamente')
      } else {
        result = await vaccinationService.createRegistroMedico(registroMedicoData)
        toast.success('Evento registrado correctamente')
      }
      fetchVaccinationEvents() // Actualizar eventos después de una operación
      closeModal()
    } catch (error) {
      console.error('Error al guardar el registro médico:', error)
      toast.error(error.message || 'Error al guardar el registro médico.')
    }
  }, [
    formData,
    editMode,
    selectedEventId,
    closeModal,
    fetchVaccinationEvents,
    tiposVacuna,
    tratamientos,
  ])

  const handleDelete = useCallback(() => {
    setConfirmDelete(true)
    setDeleteConfirmation('')
  }, [])

  const handleConfirmDelete = useCallback(async () => {
    if (deleteConfirmation === 'confirmar' && selectedEventId !== null) {
      try {
        await vaccinationService.deleteRegistroMedico(selectedEventId)
        toast.error('Evento eliminado correctamente')
        setConfirmDelete(false)
        closeModal()
        fetchVaccinationEvents() // Actualizar eventos después de una eliminación
      } catch (error) {
        console.error('Error al eliminar el registro médico:', error)
        toast.error(error.message || 'Error al eliminar el registro médico.')
      }
    } else {
      toast.warn('Debe escribir "confirmar" para eliminar')
    }
  }, [deleteConfirmation, selectedEventId, closeModal, fetchVaccinationEvents])

  const handleAddVacuna = useCallback(async () => {
    if (!formData.vaccine) {
      toast.error('Debe ingresar un nombre para la vacuna.')
      return
    }
    try {
      const newVacuna = await vaccinationService.createTipoVacuna(formData.vaccine)
      setTiposVacuna((prev) => [...prev, newVacuna])
      setFormData((prev) => ({ ...prev, vaccine: newVacuna.nombre }))
      toast.success(`Vacuna "${newVacuna.nombre}" agregada.`)
    } catch (error) {
      console.error('Error al agregar vacuna:', error)
      const errorMessage =
        error.message.includes('409') || error.message.includes('existe')
          ? 'El nombre de la vacuna ya existe.'
          : error.message || 'Error al agregar vacuna.'
      toast.error(errorMessage)
    }
  }, [formData.vaccine, setTiposVacuna, setFormData])

  const handleAddTratamiento = useCallback(async () => {
    if (!formData.treatment) {
      toast.error('Debe ingresar un nombre para el tratamiento.')
      return
    }
    try {
      const newTratamiento = await vaccinationService.createTratamiento(formData.treatment)
      setTratamientos((prev) => [...prev, newTratamiento])
      setFormData((prev) => ({ ...prev, treatment: newTratamiento.nombre }))
      toast.success(`Tratamiento "${newTratamiento.nombre}" agregado.`)
    } catch (error) {
      console.error('Error al agregar tratamiento:', error)
      const errorMessage =
        error.message.includes('409') || error.message.includes('existe')
          ? 'El nombre del tratamiento ya existe.'
          : error.message || 'Error al agregar tratamiento.'
      toast.error(errorMessage)
    }
  }, [formData.treatment, setTratamientos, setFormData])

  return {
    visibleVaccination,
    setVisibleVaccination,
    editMode,
    setEditMode,
    selectedDate,
    setSelectedDate,
    vaccinationEvents,
    setVaccinationEvents,
    selectedEventId,
    setSelectedEventId,
    formData,
    setFormData,
    confirmDelete,
    setConfirmDelete,
    deleteConfirmation,
    setDeleteConfirmation,
    employees,
    allCattle,
    visibleCattleModal,
    setVisibleCattleModal,
    tiposVacuna,
    tratamientos,
    handleDateClick,
    handleEventClick,
    handleSelectCattle,
    handleSubmit,
    handleDelete,
    handleConfirmDelete,
    cancelDelete,
    closeModal,
    handleAddVacuna,
    handleAddTratamiento,
    visibleDayOptionsModal,
    setVisibleDayOptionsModal,
    dayOptionsDate,
    handleRegisterOptionClick,
    handleViewDetailsOptionClick,
    visibleVaccinationDetailsModal, // Nuevo estado
    setVisibleVaccinationDetailsModal, // Nuevo setter
    vaccinationDetails, // Nuevos detalles de vacunación
  }
}

export default useVaccination
