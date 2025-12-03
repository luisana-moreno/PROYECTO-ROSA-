import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { helpFetch } from 'src/helpper/helpFetch'
import { lotService } from 'src/api/lotService' // Importar lotService
import { prodlecheService } from 'src/api/prodlecheService' // Importar prodlecheService
// No necesitamos desestructurar get, post, put, del de helpFetch aquí
// ya que prodlecheService ahora encapsula todas esas llamadas para prodleche
// y lotService ya tiene sus propios métodos.

export const useMilkRecords = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null) // Esto será un registro individual de bovino para editar/eliminar
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Nuevo estado para indicar carga

  // Nuevo estado para la gestión por lotes
  const [lots, setLots] = useState([])
  const [selectedLotId, setSelectedLotId] = useState('')
  const [productionDate, setProductionDate] = useState('')
  const [bovinesInSelectedLot, setBovinesInSelectedLot] = useState([]) // Bovinos activos en el lote seleccionado
  const [individualBovineProduction, setIndividualBovineProduction] = useState({}) // {bovinoId: liters, ...}
  const [milkProductionLots, setMilkProductionLots] = useState([]) // Producción total por lote
  const [individualMilkRecords, setIndividualMilkRecords] = useState([]) // Todos los registros individuales

  const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

  // Fetch initial data (lots and milk production records)
  useEffect(() => {
    fetchLots()
    fetchMilkProductionByLot()
  }, [])

  // Fetch bovines when selectedLotId changes
  useEffect(() => {
    if (selectedLotId) {
      fetchBovinesInLot(selectedLotId)
    } else {
      setBovinesInSelectedLot([])
      setIndividualBovineProduction({}) // Ensure it's reset
    }
    // Also reset productionDate if lot changes, as it's tied to new lot context
    setProductionDate('')
  }, [selectedLotId])

  const fetchLots = async () => {
    try {
      const data = await lotService.getAllLots()
      if (data) {
        setLots(data)
      }
    } catch (error) {
      // toast.error is already handled in lotService
      console.error('Error fetching lots in useMilkRecords:', error)
    }
  }

  const fetchBovinesInLot = async (lotId) => {
    try {
      const data = await lotService.getAllActiveBovinesInLot(lotId)
      if (data) {
        console.log('Fetched bovines in lot:', data) // Add logging for debugging
        setBovinesInSelectedLot(data)
        // Initialize individual production for fetched bovines
        const initialProduction = {}
        data.forEach((bovine) => {
          initialProduction[bovine.idBovino] = ''
        })
        setIndividualBovineProduction(initialProduction)
      }
    } catch (error) {
      // toast.error is already handled in lotService
      console.error('Error fetching active bovines in lot in useMilkRecords:', error)
      setBovinesInSelectedLot([])
      setIndividualBovineProduction({})
    }
  }

  const fetchMilkProductionByLot = useCallback(async () => {
    try {
      const lotsData = await prodlecheService.getAllMilkProductionLots()
      if (lotsData) {
        setMilkProductionLots(lotsData)
      }
      const individualRecordsData = await prodlecheService.getAllIndividualMilkRecords()
      if (individualRecordsData) {
        setIndividualMilkRecords(individualRecordsData)
      }
    } catch (error) {
      toast.error('Error al cargar los registros de producción de leche.')
      console.error('Error fetching milk production records:', error)
    }
  }, [])

  const handleAddRecord = async () => {
    if (
      !selectedLotId ||
      !productionDate ||
      Object.values(individualBovineProduction).every((liters) => !liters)
    ) {
      toast.warning(
        'Debe seleccionar un lote, una fecha e ingresar al menos una producción de bovino.',
      )
      return
    }

    const bovinosProduccion = Object.entries(individualBovineProduction)
      .filter(([, liters]) => liters && parseFloat(liters) > 0)
      .map(([idBovinoLeche, litrosProducidos]) => ({
        idBovinoLeche: parseInt(idBovinoLeche),
        litrosProducidos: parseFloat(litrosProducidos),
      }))

    if (bovinosProduccion.length === 0) {
      toast.warning('Debe ingresar al menos una producción de bovino con litros mayores a 0.')
      return
    }

    setIsLoading(true) // Iniciar carga
    try {
      const response = await prodlecheService.createProduccionLechePorLote({
        idLote: parseInt(selectedLotId),
        fechaProduccion: productionDate,
        bovinosProduccion,
      })
      // La función createProduccionLechePorLote ya retorna el resultado directamente, no response.data
      if (response) {
        toast.success('Registro de producción por lote agregado correctamente.')
        setVisible(false)
        setSelectedLotId('')
        setProductionDate('')
        setIndividualBovineProduction({})
        fetchMilkProductionByLot() // Recargar datos
      }
    } catch (error) {
      toast.error('Error al agregar el registro de producción por lote.')
      console.error('Error adding milk production by lot:', error)
    } finally {
      setIsLoading(false) // Finalizar carga
    }
  }

  const handleEditRecord = async () => {
    if (!currentRecord) {
      toast.warning('No hay registro seleccionado para editar.')
      return
    }

    // currentRecord es un registro individual de bovino (TTRPRODLECH)
    const {
      idProduccionLeche,
      idBovinoLeche,
      idLote,
      idProduccionLecheLote,
      fechaProduccion,
      litrosProducidos,
    } = currentRecord

    try {
      const response = await prodlecheService.updateProduccionLeche(idProduccionLeche, {
        idBovinoLeche: idBovinoLeche,
        idLote: idLote,
        idProduccionLecheLote: idProduccionLecheLote,
        fechaProduccion: fechaProduccion,
        litrosProducidos: parseFloat(litrosProducidos),
      })

      if (response) {
        toast.info('Registro individual de producción editado correctamente.')
        setEditVisible(false)
        setCurrentRecord(null)
        fetchMilkProductionByLot() // Recargar datos
      }
    } catch (error) {
      toast.error('Error al editar el registro individual de producción.')
      console.error('Error editing individual milk production:', error)
    }
  }

  const handleDeleteRecord = async () => {
    if (!currentRecord) {
      toast.warning('No hay registro seleccionado para eliminar.')
      return
    }
    if (deleteConfirmation !== 'confirmar') {
      toast.warning('Debe escribir "confirmar" para eliminar.')
      return
    }

    // currentRecord es un registro individual de bovino (TTRPRODLECH)
    try {
      const response = await prodlecheService.deleteProduccionLeche(currentRecord.idProduccionLeche)
      if (response) {
        toast.error('Registro individual de producción eliminado correctamente.')
        setDeleteVisible(false)
        setCurrentRecord(null)
        setDeleteConfirmation('')
        fetchMilkProductionByLot() // Recargar datos
      }
    } catch (error) {
      toast.error('Error al eliminar el registro individual de producción.')
      console.error('Error deleting individual milk production:', error)
    }
  }

  return {
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    deleteVisible,
    setDeleteVisible,
    currentRecord,
    setCurrentRecord,
    deleteConfirmation,
    setDeleteConfirmation,
    lots,
    selectedLotId,
    setSelectedLotId,
    productionDate,
    setProductionDate,
    bovinesInSelectedLot,
    individualBovineProduction,
    setIndividualBovineProduction,
    milkProductionLots,
    individualMilkRecords,
    days, // Aunque days ya no se usa directamente en el modal de Add, lo mantenemos por si se necesita en otros componentes.
    isLoading, // Exportar el estado de carga
    handleAddRecord,
    handleEditRecord,
    handleDeleteRecord,
    fetchMilkProductionByLot,
  }
}
