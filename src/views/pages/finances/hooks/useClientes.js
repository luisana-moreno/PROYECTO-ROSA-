import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ventasService from 'src/api/ventasService'

const useClientes = () => {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchClientes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ventasService.clientesService.getClientes()

      setClientes(data)
    } catch (err) {
      console.error('Error al cargar clientes:', err)
      setError(err.message || 'Error al cargar clientes')
      toast.error('Error al cargar la lista de clientes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  return {
    clientes,
    loading,
    error,
    fetchClientes,
  }
}

export default useClientes
