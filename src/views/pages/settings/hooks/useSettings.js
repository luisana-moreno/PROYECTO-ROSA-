import { useState, useEffect } from 'react'
import { cattleService } from 'src/api/cattleService'
import { employeeService } from 'src/api/employeeService'
import { pastureService } from 'src/api/pastureService' // Importar pastureService

export const useSettings = () => {
  const [razas, setRazas] = useState([])
  const [colores, setColores] = useState([])
  const [etapas, setEtapas] = useState([])
  const [estados, setEstados] = useState([])
  const [cargos, setCargos] = useState([])
  const [estadosPotrero, setEstadosPotrero] = useState([]) // Nuevo estado
  const [tiposMantenimiento, setTiposMantenimiento] = useState([]) // Nuevo estado
  const [toast, setToast] = useState({ show: false, message: '', color: 'success' })

  const showToast = (message, color = 'success') => {
    setToast({ show: true, message, color })
    setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500)
  }

  // --- Fetch functions ---
  const fetchRazas = async () => {
    try {
      const data = await cattleService.getAllRazas()
      setRazas(data)
    } catch (error) {
      console.error('Error fetching razas:', error)
      showToast('Error al cargar razas', 'danger')
    }
  }

  const fetchColores = async () => {
    try {
      const data = await cattleService.getAllColores()
      setColores(data)
    } catch (error) {
      console.error('Error fetching colores:', error)
      showToast('Error al cargar colores', 'danger')
    }
  }

  const fetchEtapas = async () => {
    try {
      const data = await cattleService.getAllEtapas()
      setEtapas(data)
    } catch (error) {
      console.error('Error fetching etapas:', error)
      showToast('Error al cargar etapas', 'danger')
    }
  }

  const fetchEstados = async () => {
    try {
      const data = await cattleService.getAllEstados()
      setEstados(data)
    } catch (error) {
      console.error('Error fetching estados:', error)
      showToast('Error al cargar estados', 'danger')
    }
  }

  const fetchCargos = async () => {
    try {
      const data = await employeeService.getAllPositions()
      setCargos(data)
    } catch (error) {
      console.error('Error fetching cargos:', error)
      showToast('Error al cargar cargos', 'danger')
    }
  }

  // --- Fetch functions for Pastures ---
  const fetchEstadosPotrero = async () => {
    try {
      const data = await pastureService.getAllEstadosPotrero()
      setEstadosPotrero(
        data.map((estado) => ({
          tma_idestpo: estado.tma_idestpo,
          tma_nomestp: estado.tma_nomestp,
        })),
      )
    } catch (error) {
      console.error('Error fetching estados de potrero:', error)
      showToast('Error al cargar estados de potrero', 'danger')
    }
  }

  const fetchTiposMantenimiento = async () => {
    try {
      const data = await pastureService.getAllTiposMantenimiento()
      setTiposMantenimiento(
        data.map((tipo) => ({
          tma_idtipma: tipo.tma_idtipma,
          tma_nomtipm: tipo.tma_nomtipm,
        })),
      )
    } catch (error) {
      console.error('Error fetching tipos de mantenimiento:', error)
      showToast('Error al cargar tipos de mantenimiento', 'danger')
    }
  }

  useEffect(() => {
    fetchRazas()
    fetchColores()
    fetchEtapas()
    fetchEstados()
    fetchCargos()
    fetchEstadosPotrero() // Cargar estados de potrero
    fetchTiposMantenimiento() // Cargar tipos de mantenimiento
  }, [])

  // --- CRUD functions for Razas ---
  const createRaza = async (nombre) => {
    try {
      await cattleService.createRaza({ nombre })
      showToast('Raza agregada correctamente', 'success')
      fetchRazas()
    } catch (error) {
      console.error('Error creating raza:', error)
      showToast(error.message || 'Error al agregar raza', 'danger')
      throw error // Re-throw to allow component to handle modal closing
    }
  }

  const updateRaza = async (id, nombre) => {
    try {
      await cattleService.updateRaza(id, { nombre })
      showToast('Raza editada correctamente', 'info')
      fetchRazas()
    } catch (error) {
      console.error('Error updating raza:', error)
      showToast(error.message || 'Error al editar raza', 'danger')
      throw error
    }
  }

  const deleteRaza = async (id) => {
    try {
      await cattleService.deleteRaza(id)
      showToast('Raza eliminada correctamente', 'danger')
      fetchRazas()
    } catch (error) {
      console.error('Error deleting raza:', error)
      showToast(error.message || 'Error al eliminar raza', 'danger')
      throw error
    }
  }

  // --- CRUD functions for Colores ---
  const createColor = async (nombre) => {
    try {
      await cattleService.createColor({ nombre })
      showToast('Color agregado correctamente', 'success')
      fetchColores()
    } catch (error) {
      console.error('Error creating color:', error)
      showToast(error.message || 'Error al agregar color', 'danger')
      throw error
    }
  }

  const updateColor = async (id, nombre) => {
    try {
      await cattleService.updateColor(id, { nombre })
      showToast('Color editado correctamente', 'info')
      fetchColores()
    } catch (error) {
      console.error('Error updating color:', error)
      showToast(error.message || 'Error al editar color', 'danger')
      throw error
    }
  }

  const deleteColor = async (id) => {
    try {
      await cattleService.deleteColor(id)
      showToast('Color eliminado correctamente', 'danger')
      fetchColores()
    } catch (error) {
      console.error('Error deleting color:', error)
      showToast(error.message || 'Error al eliminar color', 'danger')
      throw error
    }
  }

  // --- CRUD functions for Etapas ---
  const createEtapa = async (nombre) => {
    try {
      await cattleService.createEtapa({ nombre })
      showToast('Etapa agregada correctamente', 'success')
      fetchEtapas()
    } catch (error) {
      console.error('Error creating etapa:', error)
      showToast(error.message || 'Error al agregar etapa', 'danger')
      throw error
    }
  }

  const updateEtapa = async (id, nombre) => {
    try {
      await cattleService.updateEtapa(id, { nombre })
      showToast('Etapa editada correctamente', 'info')
      fetchEtapas()
    } catch (error) {
      console.error('Error updating etapa:', error)
      showToast(error.message || 'Error al editar etapa', 'danger')
      throw error
    }
  }

  const deleteEtapa = async (id) => {
    try {
      await cattleService.deleteEtapa(id)
      showToast('Etapa eliminada correctamente', 'danger')
      fetchEtapas()
    } catch (error) {
      console.error('Error deleting etapa:', error)
      showToast(error.message || 'Error al eliminar etapa', 'danger')
      throw error
    }
  }

  // --- CRUD functions for Estados ---
  const createEstado = async (nombre) => {
    try {
      await cattleService.createEstado({ nombre })
      showToast('Estado agregado correctamente', 'success')
      fetchEstados()
    } catch (error) {
      console.error('Error creating estado:', error)
      showToast(error.message || 'Error al agregar estado', 'danger')
      throw error
    }
  }

  const updateEstado = async (id, nombre) => {
    try {
      await cattleService.updateEstado(id, { nombre })
      showToast('Estado editado correctamente', 'info')
      fetchEstados()
    } catch (error) {
      console.error('Error updating estado:', error)
      showToast(error.message || 'Error al editar estado', 'danger')
      throw error
    }
  }

  const deleteEstado = async (id) => {
    try {
      await cattleService.deleteEstado(id)
      showToast('Estado eliminado correctamente', 'danger')
      fetchEstados()
    } catch (error) {
      console.error('Error deleting estado:', error)
      showToast(error.message || 'Error al eliminar estado', 'danger')
      throw error
    }
  }

  // --- CRUD functions for Cargos (Positions) ---
  // Asumiendo que employeeService tiene createPosition, updatePosition, deletePosition
  const createCargo = async (nombre) => {
    try {
      await employeeService.createPosition({ nombre })
      showToast('Cargo agregado correctamente', 'success')
      fetchCargos()
    } catch (error) {
      console.error('Error creating cargo:', error)
      showToast(error.message || 'Error al agregar cargo', 'danger')
      throw error
    }
  }

  const updateCargo = async (id, nombre) => {
    try {
      await employeeService.updatePosition(id, { nombre })
      showToast('Cargo editado correctamente', 'info')
      fetchCargos()
    } catch (error) {
      console.error('Error updating cargo:', error)
      showToast(error.message || 'Error al editar cargo', 'danger')
      throw error
    }
  }

  const deleteCargo = async (id) => {
    try {
      await employeeService.deletePosition(id)
      showToast('Cargo eliminado correctamente', 'danger')
      fetchCargos()
    } catch (error) {
      console.error('Error deleting cargo:', error)
      showToast(error.message || 'Error al eliminar cargo', 'danger')
      throw error
    }
  }

  // --- CRUD functions for Estados de Potrero ---
  const createEstadoPotrero = async (nombre) => {
    try {
      await pastureService.createEstadoPotrero({ nombre })
      showToast('Estado de potrero agregado correctamente', 'success')
      fetchEstadosPotrero()
    } catch (error) {
      console.error('Error creating estado de potrero:', error)
      showToast(error.message || 'Error al agregar estado de potrero', 'danger')
      throw error
    }
  }

  const updateEstadoPotrero = async (id, nombre) => {
    try {
      await pastureService.updateEstadoPotrero(id, { nombre })
      showToast('Estado de potrero editado correctamente', 'info')
      fetchEstadosPotrero()
    } catch (error) {
      console.error('Error updating estado de potrero:', error)
      showToast(error.message || 'Error al editar estado de potrero', 'danger')
      throw error
    }
  }

  const deleteEstadoPotrero = async (id) => {
    try {
      await pastureService.deleteEstadoPotrero(id)
      showToast('Estado de potrero eliminado correctamente', 'danger')
      fetchEstadosPotrero()
    } catch (error) {
      console.error('Error deleting estado de potrero:', error)
      showToast(error.message || 'Error al eliminar estado de potrero', 'danger')
      throw error
    }
  }

  // --- CRUD functions for Tipos de Mantenimiento ---
  const createTipoMantenimiento = async (nombre) => {
    try {
      await pastureService.createTipoMantenimiento({ nombre })
      showToast('Tipo de mantenimiento agregado correctamente', 'success')
      fetchTiposMantenimiento()
    } catch (error) {
      console.error('Error creating tipo de mantenimiento:', error)
      showToast(error.message || 'Error al agregar tipo de mantenimiento', 'danger')
      throw error
    }
  }

  const updateTipoMantenimiento = async (id, nombre) => {
    try {
      await pastureService.updateTipoMantenimiento(id, { nombre })
      showToast('Tipo de mantenimiento editado correctamente', 'info')
      fetchTiposMantenimiento()
    } catch (error) {
      console.error('Error updating tipo de mantenimiento:', error)
      showToast(error.message || 'Error al editar tipo de mantenimiento', 'danger')
      throw error
    }
  }

  const deleteTipoMantenimiento = async (id) => {
    try {
      await pastureService.deleteTipoMantenimiento(id)
      showToast('Tipo de mantenimiento eliminado correctamente', 'danger')
      fetchTiposMantenimiento()
    } catch (error) {
      console.error('Error deleting tipo de mantenimiento:', error)
      showToast(error.message || 'Error al eliminar tipo de mantenimiento', 'danger')
      throw error
    }
  }

  return {
    razas,
    colores,
    etapas,
    estados,
    cargos,
    estadosPotrero,
    tiposMantenimiento,
    fetchRazas,
    fetchColores,
    fetchEtapas,
    fetchEstados,
    fetchCargos,
    fetchEstadosPotrero,
    fetchTiposMantenimiento,
    createRaza,
    updateRaza,
    deleteRaza,
    createColor,
    updateColor,
    deleteColor,
    createEtapa,
    updateEtapa,
    deleteEtapa,
    createEstado,
    updateEstado,
    deleteEstado,
    createCargo,
    updateCargo,
    deleteCargo,
    createEstadoPotrero,
    updateEstadoPotrero,
    deleteEstadoPotrero,
    createTipoMantenimiento,
    updateTipoMantenimiento,
    deleteTipoMantenimiento,
    toast,
    showToast,
  }
}
