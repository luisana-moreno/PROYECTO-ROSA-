import { helpFetch } from '../helpper/helpFetch'

const { get, post, put, del } = helpFetch()

// Función auxiliar para mapear nombres de columnas de la base de datos a camelCase para el frontend
const mapKeysToCamelCase = (data) => {
  if (!data) return null
  if (Array.isArray(data)) {
    return data.map((item) => mapKeysToCamelCase(item))
  }
  const newObject = {}
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let newKey = key.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase())
      // Mapear claves específicas para el frontend
      if (newKey === 'idbovino') newKey = 'idBovino'
      if (newKey === 'numerobovino') newKey = 'numeroBovino'
      if (newKey === 'razanombre') newKey = 'razaNombre'
      if (newKey === 'ttrIdbovlec') newKey = 'idBovinoLeche'
      if (newKey === 'ttrIdprodlc') newKey = 'idProduccionLeche'
      if (newKey === 'ttrIdprolot') newKey = 'idProduccionLecheLote'
      if (newKey === 'ttrLitrsprd') newKey = 'litrosProducidos'
      if (newKey === 'ttrFechapro') newKey = 'fechaProduccion'

      newObject[newKey] = data[key]
    }
  }
  return newObject
}

export const prodlecheService = {
  // Servicios para Producción de Leche (TTRPRODLECH)
  getAllProduccionLeche: async () => {
    try {
      const data = await get('prodleche/bovino') // Cambio aquí
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getAllProduccionLeche:', error)
      throw new Error(error.message || 'Error al obtener registros de producción de leche')
    }
  },

  getProduccionLecheById: async (id) => {
    try {
      const data = await get(`prodleche/bovino/${id}`) // Cambio aquí
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getProduccionLecheById:', error)
      throw new Error(error.message || 'Error al obtener registro de producción de leche por ID')
    }
  },

  createProduccionLeche: async (produccionLecheData) => {
    try {
      const data = await post('prodleche/bovino', produccionLecheData) // Cambio aquí
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en createProduccionLeche:', error)
      throw new Error(error.message || 'Error al crear registro de producción de leche')
    }
  },

  updateProduccionLeche: async (id, produccionLecheData) => {
    try {
      const data = await put('prodleche/bovino', id, produccionLecheData) // Cambio aquí
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en updateProduccionLeche:', error)
      throw new Error(error.message || 'Error al actualizar registro de producción de leche')
    }
  },

  deleteProduccionLeche: async (id) => {
    try {
      await del('prodleche/bovino', id) // Cambio aquí
      return true
    } catch (error) {
      console.error('Error en deleteProduccionLeche:', error)
      throw new Error(error.message || 'Error al eliminar registro de producción de leche')
    }
  },

  getMilkProductionByBovinoId: async (idBovino) => {
    try {
      const data = await get(`prodleche/bovino/${idBovino}`) // Cambio aquí, ya era relativo
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getMilkProductionByBovinoId:', error)
      throw new Error(error.message || 'Error al obtener producción de leche por ID de bovino')
    }
  },

  // Nuevo servicio para Producción de Leche por Lote (TTRPRODLOTE)
  createProduccionLechePorLote: async (lotProductionData) => {
    try {
      const data = await post('prodleche/lote', lotProductionData) // Cambio aquí
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en createProduccionLechePorLote:', error)
      throw new Error(error.message || 'Error al crear registro de producción por lote')
    }
  },

  getAllMilkProductionLots: async () => {
    try {
      const data = await get('prodleche/lote') // Nueva función para obtener producción por lotes
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getAllMilkProductionLots:', error)
      throw new Error(error.message || 'Error al obtener producción de leche por lotes')
    }
  },

  getAllIndividualMilkRecords: async () => {
    try {
      const data = await get('prodleche/bovino') // Nueva función para obtener todos los registros individuales
      return mapKeysToCamelCase(data)
    } catch (error) {
      console.error('Error en getAllIndividualMilkRecords:', error)
      throw new Error(
        error.message || 'Error al obtener registros individuales de producción de leche',
      )
    }
  },
}
