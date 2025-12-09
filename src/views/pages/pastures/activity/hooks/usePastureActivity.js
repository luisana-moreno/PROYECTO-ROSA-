'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { pastureService } from 'src/api/pastureService'
import { lotService } from 'src/api/lotService'

const usePastureActivity = () => {
  const [pastures, setPastures] = useState([])
  const [lots, setLots] = useState([])
  const [bovines, setBovines] = useState([])
  const [pastureStates, setPastureStates] = useState([]) // Estados de TMAESTPOTRE
  const [selectedPasture, setSelectedPasture] = useState(null)
  const [selectedLot, setSelectedLot] = useState(null)

  // Variables form asignación
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [turno, setTurno] = useState('AM')
  const [observaciones, setObservaciones] = useState('')

  const [loading, setLoading] = useState(false)
  const [pastureHistory, setPastureHistory] = useState([])

  // Estado Dashboard (Heatmap Data)
  const [pastureStatus, setPastureStatus] = useState({})

  const fetchInitialData = useCallback(async () => {
    setLoading(true)
    try {
      const [pasturesData, lotsData, statesData, dashboardStats] = await Promise.all([
        pastureService.getAllPotreros(),
        lotService.getAllLots(),
        pastureService.getAllEstadosPotrero(),
        pastureService.getDashboardStats(),
      ])

      setPastures(pasturesData)
      setLots(lotsData)
      setPastureStates(statesData)

      // Transformar dashboardStats a mapa por ID para acceso rápido
      const statusMap = {}
      dashboardStats.forEach((p) => {
        statusMap[p.ttr_idpotrer] = p
      })
      setPastureStatus(statusMap)
    } catch (error) {
      console.error('Error cargando datos:', error)
      toast.error('Error al cargar datos iniciales')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  // Registrar Rotación (Asignar Lote a Potrero)
  const handleAssignLotToPasture = useCallback(async () => {
    if (!selectedPasture || !selectedLot || !startDate) {
      toast.warning('Por favor complete los campos obligatorios (Potrero, Lote, Fecha)')
      return
    }

    setLoading(true)
    try {
      // Usar endpoint real de rotación
      await pastureService.createRotacion({
        idPotrero: selectedPasture.ttrIdpotrer || selectedPasture.ttr_idpotrer,
        idLote: selectedLot.id || selectedLot.tmaIdlote || selectedLot.tma_idlote,
        fecha: startDate,
        turno: turno,
        observaciones: observaciones,
      })

      toast.success('Rotación registrada exitosamente')

      // Limpiar foormulario
      setSelectedLot(null)
      setStartDate(new Date().toISOString().split('T')[0])
      setObservaciones('')

      // Recargar datos para ver cambio de estado
      fetchInitialData()

      // Si estamos viendo historial, recargarlo
      if (selectedPasture) {
        fetchPastureHistory(selectedPasture.id || selectedPasture.ttr_idpotrer)
      }
    } catch (error) {
      console.error(error)
      toast.error('Error al asignar lote: ' + error.message)
    } finally {
      setLoading(false)
    }
  }, [selectedPasture, selectedLot, startDate, turno, observaciones, fetchInitialData])

  const fetchPastureHistory = useCallback(async (pastureId) => {
    if (!pastureId) return
    setLoading(true)
    try {
      // Obtener tanto historial de rotación como de mantenimiento
      const [rotaciones, mantenimientos] = await Promise.all([
        pastureService.getHistorialRotacion(pastureId),
        pastureService.getHistorialMantenimiento(pastureId),
      ])

      // Combinar y ordenar cronológicamente
      const combined = [
        ...rotaciones.map((r) => ({ ...r, type: 'ROTACION', date: r.ttr_fecha })),
        ...mantenimientos.map((m) => ({ ...m, type: 'MANTENIMIENTO', date: m.ttr_fechamant })),
      ].sort((a, b) => new Date(b.date) - new Date(a.date))

      setPastureHistory(combined)
    } catch (error) {
      console.error(error)
      toast.error('Error al cargar historial')
    } finally {
      setLoading(false)
    }
  }, [])

  // Función para obtener bovinos históricos de una rotación específica
  const fetchHistoricalBovines = async (idLote, fecha) => {
    try {
      return await lotService.getHistoricalBovinesInLot(idLote, fecha)
    } catch (err) {
      console.error('Error fetching historical bovines', err)
      return []
    }
  }

  return {
    pastures,
    lots,
    pastureStates,
    selectedPasture,
    setSelectedPasture,
    selectedLot,
    setSelectedLot,
    startDate,
    setStartDate,
    turno,
    setTurno,
    observaciones,
    setObservaciones,
    loading,
    pastureHistory,
    fetchPastureHistory,
    handleAssignLotToPasture,
    pastureStatus,
    fetchHistoricalBovines, // Exponemos para que el Modal pueda usarlo
  }
}

export { usePastureActivity }
