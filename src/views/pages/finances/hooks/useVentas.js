import { useState, useEffect, useCallback } from 'react'
import { ventasService } from 'src/api/ventasService'
import { toast } from 'react-toastify'

export const useVentas = () => {
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar todas las ventas
  const fetchVentas = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await ventasService.getVentas()
      setVentas(data)
    } catch (err) {
      setError(err.message || 'Error al cargar ventas')
      toast.error('Error al cargar ventas')
      setVentas([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Obtener una venta por ID
  const getVentaById = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const data = await ventasService.getVentaById(id)
      return data
    } catch (err) {
      const errorMsg = err.message || 'Error al obtener venta'
      setError(errorMsg)
      toast.error(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Cargar ventas al montar el componente
  useEffect(() => {
    fetchVentas()
  }, [fetchVentas])

  return {
    ventas,
    loading,
    error,
    fetchVentas,
    getVentaById,
  }
}

export default useVentas
