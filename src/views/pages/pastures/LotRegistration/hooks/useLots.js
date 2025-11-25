"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"

// Mock service - reemplazar con llamadas API reales
const lotService = {
  getAllLots: async () => [
    { id: 1, nombre: "Lote A", descripcion: "Lote de lechería", bovinos: 5, estado: "Activo" },
    { id: 2, nombre: "Lote B", descripcion: "Lote de cría", bovinos: 8, estado: "Activo" },
  ],
  createLot: async (data) => ({ id: Date.now(), ...data }),
  updateLot: async (id, data) => ({ id, ...data }),
  deleteLot: async (id) => ({ success: true }),
  getBovinesInLot: async (lotId) => [
    { id: 1, numero: 101, estado: "Sano" },
    { id: 2, numero: 102, estado: "Sano" },
  ],
  addBovineToLot: async (lotId, bovineId) => ({ success: true }),
  removeBovineFromLot: async (lotId, bovineId) => ({ success: true }),
  getLotMovementHistory: async (lotId) => [
    { id: 1, bovino: 101, accion: "Entrada", fecha: "2024-01-01", potrero: "POT-001" },
    { id: 2, bovino: 102, accion: "Salida", fecha: "2024-01-15", potrero: "POT-001" },
  ],
}

const useLots = () => {
  const [lots, setLots] = useState([])
  const [bovinesInLot, setBovinesInLot] = useState([])
  const [movementHistory, setMovementHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ nombre: "", descripcion: "" })
  const [editingLot, setEditingLot] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchAllLots = useCallback(async () => {
    setLoading(true)
    try {
      const data = await lotService.getAllLots()
      setLots(data)
    } catch (error) {
      console.error("Error cargando lotes:", error)
      toast.error("Error al cargar los lotes")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllLots()
  }, [fetchAllLots])

  const handleAddLot = useCallback(async () => {
    if (!formData.nombre.trim()) {
      toast.warning("Por favor ingrese el nombre del lote")
      return
    }

    setLoading(true)
    try {
      const newLot = await lotService.createLot(formData)
      setLots([...lots, newLot])
      setFormData({ nombre: "", descripcion: "" })
      toast.success("Lote creado exitosamente")
    } catch (error) {
      toast.error("Error al crear el lote")
    } finally {
      setLoading(false)
    }
  }, [formData, lots])

  const handleEditLot = useCallback(async () => {
    if (!formData.nombre.trim()) {
      toast.warning("Por favor ingrese el nombre del lote")
      return
    }

    setLoading(true)
    try {
      await lotService.updateLot(editingLot.id, formData)
      setLots(lots.map((lot) => (lot.id === editingLot.id ? { ...lot, ...formData } : lot)))
      setFormData({ nombre: "", descripcion: "" })
      setEditingLot(null)
      toast.success("Lote actualizado exitosamente")
    } catch (error) {
      toast.error("Error al actualizar el lote")
    } finally {
      setLoading(false)
    }
  }, [formData, editingLot, lots])

  const handleDeleteLot = useCallback(
    async (lotId) => {
      setLoading(true)
      try {
        await lotService.deleteLot(lotId)
        setLots(lots.filter((lot) => lot.id !== lotId))
        toast.success("Lote eliminado exitosamente")
      } catch (error) {
        toast.error("Error al eliminar el lote")
      } finally {
        setLoading(false)
      }
    },
    [lots],
  )

  const fetchBovinesInLot = useCallback(async (lotId) => {
    setLoading(true)
    try {
      const data = await lotService.getBovinesInLot(lotId)
      setBovinesInLot(data)
    } catch (error) {
      toast.error("Error al cargar bovinos del lote")
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchMovementHistory = useCallback(async (lotId) => {
    setLoading(true)
    try {
      const data = await lotService.getLotMovementHistory(lotId)
      setMovementHistory(data)
    } catch (error) {
      toast.error("Error al cargar historial de movimientos")
    } finally {
      setLoading(false)
    }
  }, [])

  const filteredLots = lots.filter(
    (lot) =>
      lot.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lot.descripcion && lot.descripcion.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return {
    lots: filteredLots,
    allLots: lots,
    bovinesInLot,
    movementHistory,
    loading,
    formData,
    setFormData,
    editingLot,
    setEditingLot,
    searchTerm,
    setSearchTerm,
    handleAddLot,
    handleEditLot,
    handleDeleteLot,
    fetchBovinesInLot,
    fetchMovementHistory,
    fetchAllLots,
  }
}

export { useLots }
