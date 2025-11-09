import { useState, useEffect, useCallback } from 'react'
import { helpFetch } from 'src/helpper/helpFetch'
import { cattleService } from '../../../../../api/cattleService' // Importar cattleService
const { get, post, put, del } = helpFetch()

const useVaccination = () => {
  const [visibleVaccination, setVisibleVaccination] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [vaccinationEvents, setVaccinationEvents] = useState([])
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [formData, setFormData] = useState({
    cattleIds: [], // Cambiado a array para múltiples bovinos
    employeeId: '',
    diagnosis: '',
    treatment: '',
    vaccine: '',
    date_vaccination: '',
  })
  const [toast, setToast] = useState({ show: false, message: '', color: 'success' })
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  const [employees, setEmployees] = useState([])
  const [allCattle, setAllCattle] = useState([]) // Todos los bovinos
  const [visibleCattleModal, setVisibleCattleModal] = useState(false) // Visibilidad del CustomTableModal

  useEffect(() => {
    get('empleados').then((data) => {
      setEmployees(data || [])
      console.log('Empleados obtenidos:', data) // Agregado para depuración
    })
    // Cargar todos los bovinos
    const fetchAllCattle = async () => {
      try {
        const data = await cattleService.getAllCattle()
        setAllCattle(data || [])
      } catch (err) {
        console.error('Error al obtener bovinos:', err)
      }
    }
    fetchAllCattle()
  }, [])

  const handleDateClick = (info) => {
    setEditMode(false)
    setSelectedDate(info.dateStr)
    setFormData({
      cattleIds: [], // Resetear bovinos seleccionados
      employeeId: '',
      diagnosis: '',
      treatment: '',
      vaccine: '',
      date_vaccination: info.dateStr,
    })
    setVisibleVaccination(true)
    setSelectedEventId(null)
  }

  const handleEventClick = (info) => {
    setEditMode(true)
    setSelectedEventId(info.event.id)
    setFormData({
      cattleIds: info.event.extendedProps.cattleIds || [], // Cargar bovinos del evento
      employeeId: info.event.extendedProps.employeeId,
      diagnosis: info.event.extendedProps.diagnosis,
      treatment: info.event.extendedProps.treatment,
      vaccine: info.event.extendedProps.vaccine,
      date_vaccination: info.event.extendedProps.date_vaccination,
    })
    setSelectedDate(info.event.startStr)
    setVisibleVaccination(true)
  }

  const handleSelectCattle = (selected) => {
    setFormData((prev) => ({
      ...prev,
      cattleIds: selected.map((item) => item.id), // Guardar solo los IDs
    }))
    setVisibleCattleModal(false)
  }

  const handleSubmit = () => {
    // Validaciones
    if (formData.cattleIds.length === 0) {
      showToast('Debe seleccionar al menos un bovino.', 'danger')
      return
    }
    if (!formData.employeeId) {
      showToast('Debe seleccionar un empleado.', 'danger')
      return
    }
    if (!formData.diagnosis) {
      showToast('Debe ingresar un diagnóstico.', 'danger')
      return
    }
    if (!formData.treatment) {
      showToast('Debe ingresar un tratamiento.', 'danger')
      return
    }
    if (!formData.vaccine) {
      showToast('Debe ingresar el nombre de la vacuna.', 'danger')
      return
    }
    if (!formData.date_vaccination) {
      showToast('Debe ingresar la fecha de vacunación.', 'danger')
      return
    }

    if (editMode && selectedEventId !== null) {
      setVaccinationEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEventId
            ? {
                ...event,
                title: `Vacuna: ${formData.vaccine} (${formData.cattleIds.length} bovinos)`,
                date: formData.date_vaccination,
                extendedProps: { ...formData },
              }
            : event,
        ),
      )
      showToast('Evento editado correctamente', 'info')
    } else {
      const newEvent = {
        id: Date.now().toString(),
        title: `Vacuna: ${formData.vaccine} (${formData.cattleIds.length} bovinos)`,
        date: formData.date_vaccination,
        extendedProps: { ...formData },
      }
      setVaccinationEvents([...vaccinationEvents, newEvent])
      showToast('Evento registrado correctamente', 'success')
    }
    closeModal()
  }

  const handleDelete = () => {
    setConfirmDelete(true)
    setDeleteConfirmation('')
  }

  const handleConfirmDelete = () => {
    if (deleteConfirmation === 'confirmar' && selectedEventId !== null) {
      setVaccinationEvents((prev) => prev.filter((event) => event.id !== selectedEventId))
      showToast('Evento eliminado correctamente', 'danger')
      setConfirmDelete(false)
      closeModal()
    } else {
      showToast('Debe escribir "confirmar" para eliminar', 'warning')
    }
  }

  const cancelDelete = () => {
    setConfirmDelete(false)
  }

  const showToast = (message, color = 'success') => {
    setToast({ show: true, message, color })
    setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500)
  }

  const closeModal = () => {
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
  }

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
    toast,
    setToast,
    confirmDelete,
    setConfirmDelete,
    deleteConfirmation,
    setDeleteConfirmation,
    employees,
    allCattle, // Cambiado a allCattle
    visibleCattleModal,
    setVisibleCattleModal,
    handleDateClick,
    handleEventClick,
    handleSelectCattle, // Nueva función
    handleSubmit,
    handleDelete,
    handleConfirmDelete,
    cancelDelete,
    showToast,
    closeModal,
  }
}

export default useVaccination
