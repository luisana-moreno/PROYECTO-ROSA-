"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"

// Mock service - reemplazar con llamadas API reales
const pastureActivityService = {
  getAllPastures: async () => [
    { id: 1, codigo: "POT-001", estado: "Activo" },
    { id: 2, codigo: "POT-002", estado: "Activo" },
    { id: 3, codigo: "POT-003", estado: "Inactivo" },
  ],
  getAllLots: async () => [
    { id: 1, nombre: "Lote A", bovinos: 5 },
    { id: 2, nombre: "Lote B", bovinos: 8 },
  ],
  getAllBovines: async () => [
    { id: 1, numero: 101 },
    { id: 2, numero: 102 },
    { id: 3, numero: 103 },
  ],
  getAllPastureStates: async () => [
    { id: 1, nombre: "Disponible" },
    { id: 2, nombre: "Ocupado" },
    { id: 3, nombre: "Mantenimiento" },
  ],
  assignLotToPasture: async (data) => data,
  getPastureHistory: async (pastureId) => [
    { id: 1, lote: "Lote A", fechaInicio: "2024-01-01", fechaFin: "2024-01-15", bovinos: 5 },
  ],
}

const usePastureActivity = () => {
  const [pastures, setPastures] = useState([])
  const [lots, setLots] = useState([])
  const [bovines, setBovines] = useState([])
  const [pastureStates, setPastureStates] = useState([])
  const [selectedPasture, setSelectedPasture] = useState(null)
  const [selectedLot, setSelectedLot] = useState(null)
  const [startDate, setStartDate] = useState("")
  const [selectedBovines, setSelectedBovines] = useState([])
  const [loading, setLoading] = useState(false)
  const [pastureHistory, setPastureHistory] = useState([])
  const [pastureStatus, setPastureStatus] = useState({})

  const fetchInitialData = useCallback(async () => {
    setLoading(true)
    try {
      const [pasturesData, lotsData, bovinesData, statesData] = await Promise.all([
        pastureActivityService.getAllPastures(),
        pastureActivityService.getAllLots(),
        pastureActivityService.getAllBovines(),
        pastureActivityService.getAllPastureStates(),
      ])
      setPastures(pasturesData)
      setLots(lotsData)
      setBovines(bovinesData)
      setPastureStates(statesData)
    } catch (error) {
      console.error("Error cargando datos:", error)
      toast.error("Error al cargar datos iniciales")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  const handleAssignLotToPasture = useCallback(async () => {
    if (!selectedPasture || !selectedLot || !startDate || selectedBovines.length === 0) {
      toast.warning("Por favor complete todos los campos")
      return
    }

    setLoading(true)
    try {
      await pastureActivityService.assignLotToPasture({
        idPotrero: selectedPasture.id,
        idLote: selectedLot.id,
        fechaInicio: startDate,
        idBovinos: selectedBovines.map((b) => b.id),
      })
      toast.success("Lote asignado exitosamente")
      setSelectedPasture(null)
      setSelectedLot(null)
      setStartDate("")
      setSelectedBovines([])
      fetchPastureHistory(selectedPasture.id)
    } catch (error) {
      toast.error("Error al asignar lote")
    } finally {
      setLoading(false)
    }
  }, [selectedPasture, selectedLot, startDate, selectedBovines])

  const fetchPastureHistory = useCallback(async (pastureId) => {
    setLoading(true)
    try {
      const history = await pastureActivityService.getPastureHistory(pastureId)
      setPastureHistory(history)
    } catch (error) {
      toast.error("Error al cargar historial")
    } finally {
      setLoading(false)
    }
  }, [])

  const handleMarkExit = useCallback(async (pastureId) => {
    try {
      setPastureStatus((prev) => ({
        ...prev,
        [pastureId]: { ...prev[pastureId], exitDate: new Date().toISOString().split("T")[0] },
      }))
      toast.success("Salida registrada")
    } catch (error) {
      toast.error("Error al registrar salida")
    }
  }, [])

  const handleUpdatePastureState = useCallback(async (pastureId, stateId) => {
    try {
      setPastureStatus((prev) => ({
        ...prev,
        [pastureId]: { ...prev[pastureId], stateId },
      }))
      toast.success("Estado actualizado")
    } catch (error) {
      toast.error("Error al actualizar estado")
    }
  }, [])

  return {
    pastures,
    lots,
    bovines,
    pastureStates,
    selectedPasture,
    setSelectedPasture,
    selectedLot,
    setSelectedLot,
    startDate,
    setStartDate,
    selectedBovines,
    setSelectedBovines,
    loading,
    pastureHistory,
    fetchPastureHistory,
    handleAssignLotToPasture,
    handleMarkExit,
    handleUpdatePastureState,
    pastureStatus,
  }
}

export { usePastureActivity }
