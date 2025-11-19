import { useState, useEffect } from 'react'
import { cattleService } from 'src/api/cattleService'
import { toast } from 'react-toastify' // Importa toast de react-toastify

const formatDateToDDMMYYYY = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const useCattle = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [viewVisible, setViewVisible] = useState(false)
  const [expBovVisible, setExpBovVisible] = useState(false) // Nuevo estado para el modal de expediente
  const [currentCattle, setCurrentCattle] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [cattle, setCattle] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRaza, setFilterRaza] = useState('')
  const [filterColor, setFilterColor] = useState('')
  const [filterEtapa, setFilterEtapa] = useState('')
  const [filterEstado, setFilterEstado] = useState('')
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

  const filteredCattle = cattle.filter((bovino) => {
    const matchesSearchTerm = searchTerm
      ? String(bovino.ttrNumerobv)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(bovino.ttrNombrbov)?.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    const matchesRaza = filterRaza ? bovino.ttrIdrazabo === parseInt(filterRaza) : true
    const matchesColor = filterColor ? bovino.ttrIdcolorb === parseInt(filterColor) : true
    const matchesEtapa = filterEtapa ? bovino.ttrIdetapav === parseInt(filterEtapa) : true
    const matchesEstado = filterEstado ? bovino.ttrIdestadb === parseInt(filterEstado) : true

    return matchesSearchTerm && matchesRaza && matchesColor && matchesEtapa && matchesEstado
  })

  const handleAddCattle = async () => {
    try {
      const newCattleResponse = await cattleService.createCattle(addCattleForm)
      if (newCattleResponse) {
        // Obtener los nombres de las propiedades relacionadas
        const razaNombre =
          razas.find((r) => r.tmaIdrazab === newCattleResponse.ttrIdrazabo)?.tmaNomraza || ''
        const colorNombre =
          colores.find((c) => c.tmaIdcolbo === newCattleResponse.ttrIdcolorb)?.tmaNomcolb || ''
        const etapaNombre =
          etapas.find((e) => e.tmaIdetabo === newCattleResponse.ttrIdetapav)?.tmaNometab || ''
        const estadoNombre =
          estados.find((s) => s.tmaIdestbo === newCattleResponse.ttrIdestadb)?.tmaNomestb || ''

        const formattedNewCattle = {
          ...newCattleResponse,
          razaNombre: razaNombre,
          colorNombre: colorNombre,
          etapaNombre: etapaNombre,
          estadoNombre: estadoNombre,
        }

        loadInitialData() // Recargar la lista de bovinos
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
      // Manejo de errores de validación del backend
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message) // Muestra el mensaje de error específico del backend
      } else {
        toast.error(error.message || 'Error al agregar bovino')
      }
    }
  }

  const handleEditCattle = async () => {
    if (!currentCattle || !currentCattle.ttrIdbovino) {
      toast.warning('No cattle selected for editing.')
      return
    }
    try {
      const updated = await cattleService.updateCattle(currentCattle.ttrIdbovino, {
        numeroBovino: currentCattle.ttrNumerobv,
        idRazaBovino: currentCattle.ttrIdrazabo,
        fechaNacimiento: currentCattle.ttrFecnacim,
        idColorBovino: currentCattle.ttrIdcolorb,
        pesoKilo: currentCattle.ttrPesokilo,
        idEtapaBovino: currentCattle.ttrIdetapav,
        idEstadoBovino: currentCattle.ttrIdestadb,
      })
      if (updated) {
        const formattedUpdated = {
          ...updated,
          ttrFecnacim: formatDateToDDMMYYYY(updated.ttrFecnacim),
        }
        setCattle((prevCattle) =>
          prevCattle.map((c) =>
            c.ttrIdbovino === formattedUpdated.ttrIdbovino ? formattedUpdated : c,
          ),
        )
        loadInitialData() // Recargar la lista de bovinos
        setEditVisible(false)
        toast.info('Registro editado correctamente')
      }
    } catch (error) {
      console.error('Error al editar bovino:', error)
      // Manejo de errores de validación del backend
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message) // Muestra el mensaje de error específico del backend
      } else {
        toast.error(error.message || 'Error al editar bovino')
      }
    }
  }

  const handleDeleteCattle = async () => {
    if (!currentCattle || !currentCattle.ttrIdbovino) {
      toast.warning('No cattle selected for deletion.')
      return
    }
    if (deleteConfirmation === 'confirmar') {
      try {
        await cattleService.deleteCattle(currentCattle.ttrIdbovino)
        setCattle((prevCattle) =>
          prevCattle.filter((c) => c.ttrIdbovino !== currentCattle.ttrIdbovino),
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

  const handleViewExpBov = (cattle) => {
    setCurrentCattle({
      ...cattle,
      ttrFecnacim: formatDateToDDMMYYYY(cattle.ttrFecnacim),
    })
    setExpBovVisible(true)
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
    expBovVisible, // Nuevo estado
    setExpBovVisible, // Nuevo setter
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
    handleViewExpBov, // Nueva función
    razas,
    colores,
    etapas,
    estados,
    searchTerm,
    setSearchTerm,
    filterRaza,
    setFilterRaza,
    filterColor,
    setFilterColor,
    filterEtapa,
    setFilterEtapa,
    filterEstado,
    setFilterEstado,
    filteredCattle,
  }
}
