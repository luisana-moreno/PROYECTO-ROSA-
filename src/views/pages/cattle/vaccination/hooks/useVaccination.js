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

  const [visibleReadOnlyCattleModal, setVisibleReadOnlyCattleModal] = useState(false)
  const [readOnlyCattleDetails, setReadOnlyCattleDetails] = useState([])

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
      const allRegistros = await vaccinationService.getAllRegistrosMedicos() // Usar vaccinationService (que ahora re-exporta regmedicosService)
      const events = allRegistros
        .filter((registro) => registro.id !== undefined && registro.id !== null)
        .map((registro) => {
          const employee = employees.find((emp) => emp.id === registro.idEmpleado)
          const employeeName = employee ? `${employee.nombre} ${employee.apellido}` : 'N/A'

          return {
            id: registro.id.toString(),
            title: `Vacuna: ${registro.nombreTipoVacuna || ''} - ${registro.diagnostico || ''}`,
            date: registro.fechaVacunacion?.split('T')[0] || '',
            extendedProps: {
              // Asegurarse de que bovinos sea un array de objetos completos si es necesario
              cattleIds: registro.bovinos ? registro.bovinos.map((b) => b.id) : [],
              bovinosCompletos: registro.bovinos // Almacenar los objetos bovinos completos
                ? registro.bovinos.map((bovinoData) => ({
                    ...bovinoData,
                    ttrNumerobv: bovinoData.ttrNumerobv || 'N/A', // Asegurar que exista la propiedad
                    razaNombre: bovinoData.razaNombre || 'N/A', // Asegurar que exista la propiedad
                  }))
                : [],
              employeeId: registro.idEmpleado,
              employeeName: registro.nombreEmpleado,
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
  }, [employees]) // Añadir employees a las dependencias

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const employeesData = await employeeService.getAllEmployees()
        setEmployees(employeesData || [])

        const cattleData = await cattleService.getAllCattle()
        setAllCattle(cattleData || [])

        const tiposVacunaData = await vaccinationService.getAllTiposVacuna()
        console.log('Datos de Tipos de Vacuna:', tiposVacunaData) // Añadido para depuración
        setTiposVacuna(tiposVacunaData || [])

        const tratamientosData = await vaccinationService.getAllTratamientos()
        console.log('Datos de Tratamientos:', tratamientosData) // Añadido para depuración
        setTratamientos(tratamientosData || [])
      } catch (err) {
        console.error('Error al obtener datos iniciales:', err)
        toast.error('Error al cargar datos iniciales.')
      } finally {
        fetchVaccinationEvents() // Se asegura que los eventos se carguen después de que `employees` esté disponible
      }
    }
    fetchInitialData()
  }, []) // Dependencias vacías para que se ejecute solo una vez al montar el componente

  const handleDateClick = (info) => {
    setDayOptionsDate(info.date)
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
      const records = await vaccinationService.getRegistrosMedicosByDate(formattedDate) // Usar vaccinationService
      const enrichedRecords = records.map((record) => ({
        ...record,
        bovinos: record.bovinos
          ? record.bovinos.map((bovinoData) => {
              const fullCattleData = allCattle.find((c) => c.id === bovinoData.id)
              return {
                ...bovinoData,
                ttrNumerobv: fullCattleData?.ttrNumerobv || bovinoData.ttrNumerobv || 'N/A',
                razaNombre: fullCattleData?.razaNombre || bovinoData.razaNombre || 'N/A',
              }
            })
          : [],
      }))
      setVaccinationDetails(enrichedRecords)
      setVisibleVaccinationDetailsModal(true)
    } catch (error) {
      console.error('Error al obtener detalles de vacunación:', error)
      toast.error('Error al obtener los detalles de vacunación para esta fecha.')
    }
  }, [dayOptionsDate])

  const handleViewCattleDetails = useCallback(
    (bovinos) => {
      console.log('Bovinos recibidos en handleViewCattleDetails:', bovinos)
      // Asegurarse de que los bovinos tengan la información completa antes de pasarlos al modal
      const enrichedBovinos = bovinos.map((bovinoData) => {
        const fullCattleData = allCattle.find((c) => c.id === bovinoData.id)
        return {
          ...bovinoData,
          ttrNumerobv: fullCattleData?.ttrNumerobv || bovinoData.ttrNumerobv || 'N/A',
          razaNombre: fullCattleData?.razaNombre || bovinoData.razaNombre || 'N/A',
        }
      })
      setReadOnlyCattleDetails(enrichedBovinos)
      setVisibleReadOnlyCattleModal(true)
    },
    [allCattle],
  )

  const handleEventClick = (info) => {
    setEditMode(true)
    setSelectedEventId(info.event.id)
    setFormData({
      cattleIds: info.event.extendedProps.cattleIds || [], // Ya es un array de IDs
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
    console.log('Bovinos seleccionados del CustomTableModal:', selected)
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
        cattleIds: formData.cattleIds, // Enviar array de IDs de bovinos
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
      fetchVaccinationEvents()
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
        fetchVaccinationEvents()
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
    visibleVaccinationDetailsModal,
    setVisibleVaccinationDetailsModal,
    vaccinationDetails,
    handleViewCattleDetails, // Ahora se exporta
    visibleReadOnlyCattleModal,
    setVisibleReadOnlyCattleModal,
    readOnlyCattleDetails,
  }
}

export default useVaccination
