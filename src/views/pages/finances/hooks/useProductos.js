import { useState, useEffect, useCallback } from 'react'
import { ventasService } from 'src/api/ventasService'
import { toast } from 'react-toastify'

export const useProductos = () => {
  const [insumos, setInsumos] = useState([])
  const [bovinos, setBovinos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar productos disponibles
  const fetchProductos = useCallback(async (tipo = null) => {
    setLoading(true)
    setError(null)
    try {
      const data = await ventasService.getProductosDisponibles(tipo)

      if (data.insumos) {
        setInsumos(data.insumos)
      }

      if (data.bovinos) {
        setBovinos(data.bovinos)
      }
    } catch (err) {
      setError(err.message || 'Error al cargar productos')
      toast.error('Error al cargar productos disponibles')
      setInsumos([])
      setBovinos([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Cargar solo insumos
  const fetchInsumos = useCallback(async () => {
    await fetchProductos('insumos')
  }, [fetchProductos])

  // Cargar solo bovinos
  const fetchBovinos = useCallback(async () => {
    await fetchProductos('bovinos')
  }, [fetchProductos])

  // Buscar un insumo por ID
  const findInsumoById = useCallback(
    (id) => {
      return insumos.find((insumo) => insumo.id === parseInt(id))
    },
    [insumos],
  )

  // Buscar un bovino por ID
  const findBovinoById = useCallback(
    (id) => {
      return bovinos.find((bovino) => bovino.id === parseInt(id))
    },
    [bovinos],
  )

  // Obtener información de un producto (insumo o bovino)
  const getProductoInfo = useCallback(
    (tipo, id) => {
      if (tipo === 'INSUMO') {
        return findInsumoById(id)
      } else if (tipo === 'BOVINO') {
        return findBovinoById(id)
      }
      return null
    },
    [findInsumoById, findBovinoById],
  )

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProductos()
  }, [fetchProductos])

  return {
    insumos,
    bovinos,
    loading,
    error,
    fetchProductos,
    fetchInsumos,
    fetchBovinos,
    findInsumoById,
    findBovinoById,
    getProductoInfo,
  }
}

export default useProductos
