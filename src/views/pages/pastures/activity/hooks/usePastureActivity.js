import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { activityService } from 'src/api/activityService' // Necesitaremos crear este servicio

const usePastureActivity = () => {
  const [pastures, setPastures] = useState([])
  const [lots, setLots] = useState([])
  const [bovines, setBovines] = useState([])
  const [pastureStates, setPastureStates] = useState([])

  const [selectedPasture, setSelectedPasture] = useState(null)
  const [selectedLot, setSelectedLot] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [selectedBovines, setSelectedBovines] = useState([])
  const [bovineModalVisible, setBovineModalVisible] = useState(false)

  const [loading, setLoading] = useState(false)
  const [lotPastureHistory, setLotPastureHistory] = useState([])
  const [bovinesInLotPasture, setBovinesInLotPasture] = useState([])

  const fetchInitialData = useCallback(async () => {
    setLoading(true)
    try {
      const [pasturesData, lotsData, bovinesData, statesData] = await Promise.all([
        activityService.getAllPastures(),
        activityService.getAllLots(),
        activityService.getAllBovines(),
        activityService.getAllPastureStates(),
      ])
      setPastures(pasturesData)
      setLots(lotsData)
      setBovines(bovinesData.map((b) => ({ id: b.id, numero: b.numero }))) // Formatear para CustomTableModal
      setPastureStates(statesData)
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error)
      toast.error('Error al cargar datos iniciales.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  const handleAssignLotToPasture = async () => {
    if (!selectedPasture || !selectedLot || !startDate || selectedBovines.length === 0) {
      toast.warning('Por favor, complete todos los campos y seleccione al menos un bovino.')
      return
    }

    setLoading(true)
    try {
      const bovineIds = selectedBovines.map((b) => b.id)
      await activityService.assignLotToPastureWithBovines({
        idPotrero: selectedPasture.id,
        idLote: selectedLot.id,
        fechaInicio: startDate,
        idBovinos: bovineIds,
      })
      toast.success('Lote asignado y bovinos registrados exitosamente.')
      // Resetear formulario
      setSelectedPasture(null)
      setSelectedLot(null)
      setStartDate('')
      setSelectedBovines([])
      // Refrescar historial si es necesario
      if (selectedPasture) {
        fetchLotPastureHistory(selectedPasture.id)
      }
    } catch (error) {
      console.error('Error al asignar lote a potrero con bovinos:', error)
      toast.error(error.message || 'Error al asignar lote a potrero con bovinos.')
    } finally {
      setLoading(false)
    }
  }

  const fetchLotPastureHistory = useCallback(async (pastureId) => {
    setLoading(true)
    try {
      const history = await activityService.getLotPastureHistory(pastureId)
      setLotPastureHistory(history)
    } catch (error) {
      console.error('Error al obtener historial de lotes por potrero:', error)
      toast.error(error.message || 'Error al obtener historial de lotes por potrero.')
      setLotPastureHistory([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchBovinesInLotPastureByDate = useCallback(async (pastureId, lotId, date) => {
    setLoading(true)
    try {
      const bovines = await activityService.getBovinesInLotPastureByDate(pastureId, lotId, date)
      setBovinesInLotPasture(bovines)
    } catch (error) {
      console.error('Error al obtener bovinos en lote/potrero por fecha:', error)
      toast.error(error.message || 'Error al obtener bovinos en lote/potrero por fecha.')
      setBovinesInLotPasture([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleUpdatePastureStatus = async (pastureId, newStatusId) => {
    setLoading(true)
    try {
      await activityService.updatePastureStatus(pastureId, newStatusId)
      toast.success('Estado del potrero actualizado exitosamente.')
      fetchInitialData() // Refrescar la lista de potreros
    } catch (error) {
      console.error('Error al actualizar estado del potrero:', error)
      toast.error(error.message || 'Error al actualizar estado del potrero.')
    } finally {
      setLoading(false)
    }
  }

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
    bovineModalVisible,
    setBovineModalVisible,
    loading,
    lotPastureHistory,
    fetchLotPastureHistory,
    bovinesInLotPasture,
    fetchBovinesInLotPastureByDate,
    handleAssignLotToPasture,
    handleUpdatePastureStatus,
  }
}

export default usePastureActivity
