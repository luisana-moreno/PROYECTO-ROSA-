import { useState, useEffect } from 'react'
import { cattleService } from 'src/api/cattleService'

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
  const [toast, setToast] = useState({ show: false, message: '', color: 'success' })

  const showToast = (message, color = 'success') => {
    setToast({ show: true, message, color })
    setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500)
  }

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
      showToast('Error al cargar datos iniciales', 'danger')
    }
  }

  const handleAddCattle = async () => {
    try {
      const newCattle = await cattleService.createCattle(addCattleForm)
      if (newCattle) {
        setCattle((prevCattle) => [...prevCattle, newCattle])
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
        showToast('Registro agregado correctamente', 'success')
      }
    } catch (error) {
      console.error('Error al agregar bovino:', error)
      showToast(error.message || 'Error al agregar bovino', 'danger')
    }
  }

  const handleEditCattle = async () => {
    if (!currentCattle || !currentCattle.ttr_idbovino) {
      showToast('No cattle selected for editing.', 'warning')
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
        showToast('Registro editado correctamente', 'info')
      }
    } catch (error) {
      console.error('Error al editar bovino:', error)
      showToast(error.message || 'Error al editar bovino', 'danger')
    }
  }

  const handleDeleteCattle = async () => {
    if (!currentCattle || !currentCattle.ttr_idbovino) {
      showToast('No cattle selected for deletion.', 'warning')
      return
    }
    if (deleteConfirmation === 'confirmar') {
      try {
        await cattleService.deleteCattle(currentCattle.ttr_idbovino)
        setCattle((prevCattle) =>
          prevCattle.filter((c) => c.ttr_idbovino !== currentCattle.ttr_idbovino),
        )
        setDeleteVisible(false)
        showToast('Bovino eliminado exitosamente', 'danger')
      } catch (error) {
        console.error('Error al eliminar bovino:', error)
        showToast(error.message || 'Error al eliminar bovino', 'danger')
      }
    } else {
      showToast('Debe escribir "confirmar" para eliminar', 'warning')
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
    toast,
    showToast,
  }
}
