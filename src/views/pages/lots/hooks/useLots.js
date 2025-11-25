'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { lotService } from '../../../../api/lotService' // Servicio de lotes real
import { formatDateToYYYYMMDD } from '../../../../utils/dateFormatter'

const useLots = () => {
  const [lots, setLots] = useState([])
  const [bovinesInLot, setBovinesInLot] = useState([])
  const [activeBovinesInLot, setActiveBovinesInLot] = useState([]) // Para bovinos actualmente en el lote
  const [movementHistory, setMovementHistory] = useState([]) // Esto no está implementado en el backend de lotes, pero lo mantengo por si acaso
  const [allBovines, setAllBovines] = useState([]) // Todos los bovinos para la selección
  const [allPastures, setAllPastures] = useState([]) // Todos los potreros para la selección
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ nombre: '' }) // Lotes solo tienen nombre por ahora
  const [editingLot, setEditingLot] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBovines, setSelectedBovines] = useState([]) // IDs de bovinos seleccionados para añadir
  // selectedPasture ya no es necesario aquí, ya que la selección se maneja en otro módulo

  const fetchAllLots = useCallback(async () => {
    setLoading(true)
    try {
      const data = await lotService.getAllLots()
      setLots(data)
    } catch (error) {
      console.error('Error cargando lotes:', error)
      toast.error(error.message || 'Error al cargar los lotes')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchAllBovines = useCallback(async () => {
    setLoading(true)
    try {
      const data = await lotService.getAllBovines()
      setAllBovines(data)
    } catch (error) {
      console.error('Error cargando bovinos:', error)
      toast.error(error.message || 'Error al cargar los bovinos para selección')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchAllPastures = useCallback(async () => {
    setLoading(true)
    try {
      const data = await lotService.getAllPastures()
      setAllPastures(data)
    } catch (error) {
      console.error('Error cargando potreros:', error)
      toast.error(error.message || 'Error al cargar los potreros para selección')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllLots()
    fetchAllBovines()
    fetchAllPastures()
  }, [fetchAllLots, fetchAllBovines, fetchAllPastures])

  const handleAddLot = useCallback(async () => {
    if (!formData.nombre.trim()) {
      toast.warning('Por favor ingrese el nombre del lote')
      return
    }

    setLoading(true)
    try {
      const newLot = await lotService.createLot({ nombre: formData.nombre })
      setLots((prevLots) => [...prevLots, newLot])
      setFormData({ nombre: '' })
      toast.success('Lote creado exitosamente')
    } catch (error) {
      toast.error(error.message || 'Error al crear el lote')
    } finally {
      setLoading(false)
    }
  }, [formData])

  const handleEditLot = useCallback(async () => {
    if (!formData.nombre.trim()) {
      toast.warning('Por favor ingrese el nombre del lote')
      return
    }

    if (!editingLot) {
      toast.error('No hay lote seleccionado para editar.')
      return
    }

    setLoading(true)
    try {
      await lotService.updateLot(editingLot.id, { nombre: formData.nombre }) // Usar editingLot.id
      setLots((prevLots) =>
        prevLots.map(
          (lot) => (lot.id === editingLot.id ? { ...lot, nombre: formData.nombre } : lot), // Usar lot.id y editingLot.id
        ),
      )
      setFormData({ nombre: '' })
      setEditingLot(null)
      toast.success('Lote actualizado exitosamente')
    } catch (error) {
      toast.error(error.message || 'Error al actualizar el lote')
    } finally {
      setLoading(false)
    }
  }, [formData, editingLot])

  const handleDeleteLot = useCallback(
    async (lotId) => {
      setLoading(true)
      try {
        await lotService.deleteLot(lotId)
        setLots((prevLots) => prevLots.filter((lot) => lot.id !== lotId)) // Usar lot.id
        toast.success('Lote eliminado exitosamente')
        await fetchAllBovines() // Refrescar bovinos si la eliminación de un lote implica desasignaciones
      } catch (error) {
        toast.error(error.message || 'Error al eliminar el lote')
      } finally {
        setLoading(false)
      }
    },
    [fetchAllBovines], // Añadir fetchAllBovines
  )

  const fetchBovinesInLot = useCallback(async (lotId) => {
    setLoading(true)
    try {
      const data = await lotService.getBovinesInLot(lotId)
      setBovinesInLot(data)
    } catch (error) {
      toast.error(error.message || 'Error al cargar historial de bovinos del lote')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchActiveBovinesInLot = useCallback(async (lotId) => {
    setLoading(true)
    try {
      const data = await lotService.getActiveBovinesInLot(lotId)
      setActiveBovinesInLot(data)
    } catch (error) {
      toast.error(error.message || 'Error al cargar bovinos activos en el lote')
    } finally {
      setLoading(false)
    }
  }, [])

  const addBovinesToLot = useCallback(
    async (idLote, pastureId, bovinoIds, initialDate) => {
      setLoading(true)
      try {
        await lotService.addBovinesToLot(idLote, pastureId, bovinoIds, initialDate)
        toast.success('Bovinos asignados al lote correctamente.')
        await fetchAllLots() // Refrescar la lista de lotes si la asignación afecta el conteo
        await fetchActiveBovinesInLot(idLote) // Refrescar bovinos activos para el lote
        await fetchAllBovines() // Refrescar la lista de todos los bovinos para actualizar la lista de "no asignados"
        setSelectedBovines([])
      } catch (error) {
        toast.error(error.message || 'Error al asignar bovinos al lote.')
      } finally {
        setLoading(false)
      }
    },
    [fetchAllLots, fetchActiveBovinesInLot, fetchAllBovines],
  )

  const removeBovineFromLot = useCallback(
    async (idLote, idBovino) => {
      setLoading(true)
      try {
        await lotService.removeBovineFromLot(idLote, idBovino)
        toast.success('Bovino desasociado del lote correctamente.')
        await fetchAllLots()
        await fetchActiveBovinesInLot(idLote) // Refrescar bovinos activos para el lote
        await fetchAllBovines() // Refrescar la lista de todos los bovinos
      } catch (error) {
        toast.error(error.message || 'Error al desasociar bovino del lote.')
      } finally {
        setLoading(false)
      }
    },
    [fetchAllLots, fetchActiveBovinesInLot, fetchAllBovines],
  )

  const updateBovineLotAssignment = useCallback(
    async (idBovLotPotr, assignmentData) => {
      setLoading(true)
      try {
        await lotService.updateBovineLotAssignment(idBovLotPotr, assignmentData)
        toast.success('Asignación de bovino en lote actualizada correctamente.')
        await fetchAllLots()
        await fetchActiveBovinesInLot(assignmentData.id) // Usar assignmentData.id (mapeado de tmaIdLote)
        await fetchAllBovines() // Refrescar la lista de todos los bovinos
      } catch (error) {
        toast.error(error.message || 'Error al actualizar asignación de bovino en lote.')
      } finally {
        setLoading(false)
      }
    },
    [fetchAllLots, fetchActiveBovinesInLot, fetchAllBovines],
  )

  // Filtrar los bovinos que NO están asignados activamente al lote actual
  const unassignedBovines = allBovines.filter(
    (bovine) => !activeBovinesInLot.some((activeBovine) => activeBovine.idBovino === bovine.id), // Comparar idBovino con el id mapeado
  )

  const filteredLots = lots.filter(
    (lot) => lot.nombre && lot.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return {
    lots: filteredLots,
    allLots: lots, // Para usar en modales donde se necesiten todos los lotes sin filtrar
    allBovines,
    allPastures,
    bovinesInLot,
    activeBovinesInLot,
    movementHistory,
    loading,
    formData,
    setFormData,
    editingLot,
    setEditingLot,
    searchTerm,
    setSearchTerm,
    selectedBovines,
    setSelectedBovines,
    handleAddLot,
    handleEditLot,
    handleDeleteLot,
    fetchBovinesInLot,
    fetchActiveBovinesInLot,
    addBovinesToLot,
    removeBovineFromLot,
    updateBovineLotAssignment,
    fetchAllLots,
    fetchAllBovines,
    fetchAllPastures,
    unassignedBovines, // Exportar los bovinos no asignados
  }
}

export { useLots }
