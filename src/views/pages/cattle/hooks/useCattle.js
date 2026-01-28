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
  const [males, setMales] = useState([])
  const [females, setFemales] = useState([])

  const [addCattleForm, setAddCattleForm] = useState({
    numeroBovino: '',
    idRazaBovino: '',
    fechaNacimiento: '',
    idColorBovino: '',
    pesoKilo: '',
    idEtapaBovino: '',
    idEstadoBovino: '',
    sexo: '',
    idPadre: '',
    idMadre: '',
    padreExterno: false,
    ttrPadreExterno: '',
    madreExterna: false,
    ttrMadreExterna: '',
    numPartos: 0,
    fecUltimoParto: '',
  })

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      const [cattleData, razasData, coloresData, etapasData, estadosData, malesData, femalesData] =
        await Promise.all([
          cattleService.getAllCattle(),
          cattleService.getAllRazas(),
          cattleService.getAllColores(),
          cattleService.getAllEtapas(),
          cattleService.getAllEstados(),
          cattleService.getMales(),
          cattleService.getFemales(),
        ])
      setCattle(cattleData.sort((a, b) => new Date(b.ttrFeccreacion) - new Date(a.ttrFeccreacion)))
      setRazas(razasData)
      setColores(coloresData)
      setEtapas(etapasData)
      setEstados(estadosData)
      setMales(malesData || [])
      setFemales(femalesData || [])
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
          sexo: '',
          idPadre: '',
          idMadre: '',
          padreExterno: false,
          ttrPadreExterno: '',
          madreExterna: false,
          ttrMadreExterna: '',
          numPartos: 0,
          fecUltimoParto: '',
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
        // Nuevos campos
        sexo: currentCattle.ttrSexo,
        idPadre: currentCattle.ttrIdpadre,
        idMadre: currentCattle.ttrIdmadre,
        ttrPadreExterno: currentCattle.ttrPadreExterno,
        ttrMadreExterna: currentCattle.ttrMadreExterna,
        numPartos: currentCattle.ttrNumpartos || 0,
        fecUltimoParto: currentCattle.ttrFecultpar,
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

  // Reactivation Logic
  const [reactivateVisible, setReactivateVisible] = useState(false)
  const [reactivateConfirmation, setReactivateConfirmation] = useState('')
  const [filterStatus, setFilterStatus] = useState('3') // Default to Active (ID 3)

  const handleReactivateCattle = async () => {
    if (!currentCattle || !currentCattle.ttrIdbovino) {
      toast.warning('No cattle selected for reactivation.')
      return
    }
    if (reactivateConfirmation === 'reactivar') {
      try {
        await cattleService.reactivateCattle(currentCattle.ttrIdbovino)
        // Update local state
        setCattle((prevCattle) =>
          prevCattle.map((c) =>
            c.ttrIdbovino === currentCattle.ttrIdbovino
              ? { ...c, ttrIdestadb: 3, estadoNombre: 'Activo' }
              : c,
          ),
        )
        setReactivateVisible(false)
        setReactivateConfirmation('')
        setFilterStatus('3') // Switch back to active tab
        toast.info('Bovino reactivado correctamente.')
      } catch (error) {
        console.error('Error reactivating cattle:', error)
        toast.error(error.message || 'Error al reactivar bovino')
      }
    } else {
      toast.warning('Debe escribir "reactivar" para confirmar')
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
        // Soft delete update: change status to 1 (Inactive)
        setCattle((prevCattle) =>
          prevCattle.map((c) =>
            c.ttrIdbovino === currentCattle.ttrIdbovino
              ? { ...c, ttrIdestadb: 1, estadoNombre: 'Inactivo' }
              : c,
          ),
        )
        setDeleteVisible(false)
        setDeleteConfirmation('')
        toast.error('Bovino desactivado exitosamente')
      } catch (error) {
        console.error('Error al eliminar bovino:', error)
        toast.error(error.message || 'Error al eliminar bovino')
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar')
    }
  }

  const handleViewExpBov = (cattle) => {
    console.log('useCattle: handleViewExpBov llamado con:', cattle)
    setCurrentCattle({
      ...cattle,
      ttrFecnacim: formatDateToDDMMYYYY(cattle.ttrFecnacim),
    })
    setExpBovVisible(true)
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

    // Status Filter: Check against ttrIdestadb based on filterStatus (1 or 3)
    // If filterStatus is '1' (Inactivos), include status 1 (Inactivo) and 15 (Vendido)
    const matchesStatus = filterStatus
      ? filterStatus === '1'
        ? [1, 15].includes(bovino.ttrIdestadb)
        : bovino.ttrIdestadb === parseInt(filterStatus)
      : true

    return (
      matchesSearchTerm &&
      matchesRaza &&
      matchesColor &&
      matchesEtapa &&
      matchesEstado &&
      matchesStatus
    )
  })

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
    males,
    females,
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
    // Reactivation
    reactivateVisible,
    setReactivateVisible,
    reactivateConfirmation,
    setReactivateConfirmation,
    handleReactivateCattle,
    filterStatus,
    setFilterStatus,
  }
}
