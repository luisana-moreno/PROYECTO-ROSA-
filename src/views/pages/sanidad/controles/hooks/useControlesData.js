import { useState, useEffect } from 'react'
import * as sanidadService from '../../../../../api/sanidadService'

const API_URL = import.meta.env.VITE_API_URL

const useControlesData = () => {
  const [tiposControl, setTiposControl] = useState([])
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null)
  const [bovinos, setBovinos] = useState([])
  const [lotes, setLotes] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [tiposVacuna, setTiposVacuna] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [errorData, setErrorData] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    setLoadingData(true)
    try {
      await Promise.all([
        cargarTiposControl(),
        cargarBovinos(),
        cargarLotes(),
        cargarEmpleados(),
        cargarTiposVacuna(),
      ])
    } catch (error) {
      console.error('Error cargando datos iniciales:', error)
      setErrorData('Error al cargar datos necesarios para el formulario.')
    } finally {
      setLoadingData(false)
    }
  }

  const cargarTiposControl = async () => {
    try {
      const data = await sanidadService.getTiposControl()
      setTiposControl(data)
      if (data.length > 0) {
        setTipoSeleccionado(data[0]) // Seleccionar el primero por defecto
      }
    } catch (error) {
      throw error // Re-lanzar para que Promise.all lo capture o manejar individualmente
    }
  }

  const cargarBovinos = async () => {
    try {
      const response = await fetch(`${API_URL}/bovinos`)
      const data = await response.json()
      setBovinos(data)
    } catch (error) {
      console.error('Error cargando bovinos:', error)
    }
  }

  const cargarLotes = async () => {
    try {
      const data = await sanidadService.getLotes()
      setLotes(data)
    } catch (error) {
      console.error('Error cargando lotes:', error)
    }
  }

  const cargarEmpleados = async () => {
    try {
      const response = await fetch(`${API_URL}/empleados`)
      const data = await response.json()
      setEmpleados(data)
    } catch (error) {
      console.error('Error cargando empleados:', error)
    }
  }

  const cargarTiposVacuna = async () => {
    try {
      const data = await sanidadService.getTiposVacuna()
      setTiposVacuna(data)
    } catch (error) {
      console.error('Error cargando tipos de vacuna:', error)
    }
  }

  return {
    tiposControl,
    tipoSeleccionado,
    setTipoSeleccionado,
    bovinos,
    lotes,
    empleados,
    tiposVacuna,
    loadingData,
    errorData,
    refetch: cargarDatos,
    fetchGlobalControles: sanidadService.getControlesSanitarios,
    updateControl: sanidadService.updateControlSanitario,
    deleteControl: sanidadService.deleteControlSanitario,
  }
}

export default useControlesData
