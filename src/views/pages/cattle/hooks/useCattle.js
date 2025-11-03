import { useState, useEffect } from 'react'
import { cattleService } from 'src/api/cattleService'
import { toast } from 'react-toastify' // Importa toast de react-toastify

export const useCattle = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [viewVisible, setViewVisible] = useState(false)
  const [currentCattle, setCurrentCattle] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [cattle, setCattle] = useState([])
  const [razas, setRazas] = useState([])
  const [colores, setColores] = useState([])
  const [etapas, setEtapas] = useState([])
  const [estados, setEstados] = useState([])

  const [addCattleForm, setAddCattleForm] = useState({
    numeroBovino: '',
    idRazaBovino: '',
    fechaNacimiento: '',
    idColorBovino: '',
    pesoKilo: '',
    idEtapaBovino: '',
    idEstadoBovino: '',
  })

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      const [cattleData, razasData, coloresData, etapasData, estadosData] = await Promise.all([
        cattleService.getAllCattle(),
        cattleService.getAllRazas(),
        cattleService.getAllColores(),
        cattleService.getAllEtapas(),
        cattleService.getAllEstados(),
      ])
      setCattle(cattleData)
      setRazas(razasData)
      setColores(coloresData)
      setEtapas(etapasData)
      setEstados(estadosData)
    } catch (error) {
      console.error('Error loading initial data:', error)
      toast.error('Error al cargar datos iniciales')
    }
  }

  const handleAddCattle = async () => {
    try {
      const newCattleResponse = await cattleService.createCattle(addCattleForm)
      if (newCattleResponse) {
        // Obtener los nombres de las propiedades relacionadas
        const razaNombre =
          razas.find((r) => r.tma_idrazab === newCattleResponse.ttr_idrazabo)?.tma_nomraza || ''
        const colorNombre =
          colores.find((c) => c.tma_idcolbo === newCattleResponse.ttr_idcolorb)?.tma_nomcolb || ''
        const etapaNombre =
          etapas.find((e) => e.tma_idetabo === newCattleResponse.ttr_idetapav)?.tma_nometab || ''
        const estadoNombre =
          estados.find((s) => s.tma_idestbo === newCattleResponse.ttr_idestadb)?.tma_nomestb || ''

        const formattedNewCattle = {
          ...newCattleResponse,
          raza_nombre: razaNombre,
          color_nombre: colorNombre,
          etapa_nombre: etapaNombre,
          estado_nombre: estadoNombre,
        }

        setCattle((prevCattle) => [...prevCattle, formattedNewCattle])
        setAddCattleForm({
          numeroBovino: '',
          idRazaBovino: '',
          fechaNacimiento: '',
          idColorBovino: '',
          pesoKilo: '',
          idEtapaBovino: '',
          idEstadoBovino: '',
        })
        setVisible(false)
        toast.success('Registro agregado correctamente')
      }
    } catch (error) {
      console.error('Error al agregar bovino:', error)
      toast.error(error.message || 'Error al agregar bovino')
    }
  }

  const handleEditCattle = async () => {
    if (!currentCattle || !currentCattle.ttr_idbovino) {
      toast.warning('No cattle selected for editing.')
      return
    }
    try {
      const updated = await cattleService.updateCattle(currentCattle.ttr_idbovino, {
        numeroBovino: currentCattle.ttr_numerobv,
        idRazaBovino: currentCattle.ttr_idrazabo,
        fechaNacimiento: currentCattle.ttr_fecnacim,
        idColorBovino: currentCattle.ttr_idcolorb,
        pesoKilo: currentCattle.ttr_pesokilo,
        idEtapaBovino: currentCattle.ttr_idetapav,
        idEstadoBovino: currentCattle.ttr_idestadb,
      })
      if (updated) {
        setCattle((prevCattle) =>
          prevCattle.map((c) => (c.ttr_idbovino === updated.ttr_idbovino ? updated : c)),
        )
        setEditVisible(false)
        toast.info('Registro editado correctamente')
      }
    } catch (error) {
      console.error('Error al editar bovino:', error)
      toast.error(error.message || 'Error al editar bovino')
    }
  }

  const handleDeleteCattle = async () => {
    if (!currentCattle || !currentCattle.ttr_idbovino) {
      toast.warning('No cattle selected for deletion.')
      return
    }
    if (deleteConfirmation === 'confirmar') {
      try {
        await cattleService.deleteCattle(currentCattle.ttr_idbovino)
        setCattle((prevCattle) =>
          prevCattle.filter((c) => c.ttr_idbovino !== currentCattle.ttr_idbovino),
        )
        setDeleteVisible(false)
        toast.error('Bovino eliminado exitosamente')
      } catch (error) {
        console.error('Error al eliminar bovino:', error)
        toast.error(error.message || 'Error al eliminar bovino')
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar')
    }
  }

  return {
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    deleteVisible,
    setDeleteVisible,
    viewVisible,
    setViewVisible,
    currentCattle,
    setCurrentCattle,
    deleteConfirmation,
    setDeleteConfirmation,
    cattle,
    addCattleForm,
    setAddCattleForm,
    handleAddCattle,
    handleEditCattle,
    handleDeleteCattle,
    razas,
    colores,
    etapas,
    estados,
  }
}
