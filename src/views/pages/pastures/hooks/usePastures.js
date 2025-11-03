import { useState, useEffect } from 'react'
import { pastureService } from 'src/api/pastureService'

export const usePastures = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [currentEditSection, setEditCurrentSection] = useState(0)
  const [currentPasture, setCurrentPasture] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [pastures, setPastures] = useState([])
  const [estadosPotrero, setEstadosPotrero] = useState([])
  const [tiposMantenimiento, setTiposMantenimiento] = useState([])
  const [addPasture, setAddPasture] = useState({
    ttr_codpotre: '',
    ttr_idestpot: null, // ID del estado, inicializado a null
    ttr_idtipman: null, // ID del tipo de mantenimiento, inicializado a null
    ttr_descripc: '', // Combinará lote y responsable
    ttr_fechamnt: new Date().toISOString().split('T')[0], // Fecha actual por defecto
  })
  const [toast, setToast] = useState({ show: false, message: '', color: 'success' })

  const showToast = (message, color = 'success') => {
    setToast({ show: true, message, color })
    setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500)
  }

  // Cargar potreros, estados y tipos de mantenimiento al iniciar
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [potrerosData, estadosData, tiposMantenimientoData] = await Promise.all([
          pastureService.getAllPotreros(),
          pastureService.getAllEstadosPotrero(),
          pastureService.getAllTiposMantenimiento(),
        ])

        if (potrerosData) {
          const formattedPotreros = potrerosData.map((p) => ({
            ttr_idpotrer: p.ttr_idpotrer,
            ttr_codpotre: p.ttr_codpotre,
            ttr_idestpot: p.ttr_idestpot,
            tma_nomestp: p.estado_potrero_nombre, // Nombre del estado para mostrar
            ttr_idtipman: p.ttr_idtipman,
            tma_nomtipm: p.tipo_mantenimiento_nombre, // Nombre del tipo de mantenimiento para mostrar
            ttr_fechamnt: p.ttr_fechamnt,
            ttr_descripc: p.ttr_descripc,
          }))
          setPastures(formattedPotreros)
        }
        if (estadosData) {
          setEstadosPotrero(
            estadosData.map((estado) => ({
              tma_idestpo: estado.tma_idestpo,
              tma_nomestp: estado.tma_nomestp,
            })),
          )
        }
        if (tiposMantenimientoData) {
          setTiposMantenimiento(
            tiposMantenimientoData.map((tipo) => ({
              tma_idtipma: tipo.tma_idtipma,
              tma_nomtipm: tipo.tma_nomtipm,
            })),
          )
        }
        console.log('Estados de Potrero cargados:', estadosData)
        console.log('Tipos de Mantenimiento cargados:', tiposMantenimientoData)
      } catch (error) {
        console.error('Error al cargar datos iniciales:', error)
        showToast('Error al cargar los datos iniciales.', 'danger')
      }
    }
    fetchInitialData()
  }, [])

  // Agregar potrero
  // Agregar potrero
  const handleAddPasture = async () => {
    try {
      const potreroData = {
        codigoPotrero: addPasture.ttr_codpotre,
        idEstadoPotrero: addPasture.ttr_idestpot === '' ? null : addPasture.ttr_idestpot,
        idTipoMantenimiento: addPasture.ttr_idtipman === '' ? null : addPasture.ttr_idtipman,
        fechaMantenimiento: addPasture.ttr_fechamnt,
        descripcion: addPasture.ttr_descripc,
      }
      const newPotrero = await pastureService.createPotrero(potreroData)
      if (newPotrero) {
        const estadoNombre =
          estadosPotrero.find((e) => e.tma_idestpo === newPotrero.ttr_idestpot)?.tma_nomestp ||
          'Desconocido'
        const tipoMantenimientoNombre =
          tiposMantenimiento.find((t) => t.tma_idtipma === newPotrero.ttr_idtipman)?.tma_nomtipm ||
          'Desconocido'
        setPastures([
          ...pastures,
          {
            ttr_idpotrer: newPotrero.ttr_idpotrer,
            ttr_codpotre: newPotrero.ttr_codpotre,
            ttr_idestpot: newPotrero.ttr_idestpot,
            tma_nomestp: estadoNombre,
            ttr_idtipman: newPotrero.ttr_idtipman,
            tma_nomtipm: tipoMantenimientoNombre,
            ttr_fechamnt: newPotrero.ttr_fechamnt,
            ttr_descripc: newPotrero.ttr_descripc,
          },
        ])
      }
      setAddPasture({
        ttr_codpotre: '',
        ttr_idestpot: null,
        ttr_idtipman: null,
        ttr_descripc: '',
        ttr_fechamnt: new Date().toISOString().split('T')[0],
      })
      setVisible(false)
      showToast('Potrero agregado correctamente', 'success')
    } catch (error) {
      console.error('Error al agregar potrero:', error)
      showToast(error.message || 'Error al agregar potrero', 'danger')
    }
  }

  // Editar potrero
  const handleEditPasture = async () => {
    if (!currentPasture || !currentPasture.ttr_idpotrer) {
      showToast('No potrero seleccionado para editar.', 'warning')
      return
    }
    try {
      const potreroData = {
        codigoPotrero: currentPasture.ttr_codpotre,
        idEstadoPotrero: currentPasture.ttr_idestpot === '' ? null : currentPasture.ttr_idestpot,
        idTipoMantenimiento:
          currentPasture.ttr_idtipman === '' ? null : currentPasture.ttr_idtipman,
        fechaMantenimiento: currentPasture.ttr_fechamnt,
        descripcion: currentPasture.ttr_descripc,
      }
      const updated = await pastureService.updatePotrero(currentPasture.ttr_idpotrer, potreroData)
      if (updated) {
        const estadoNombre =
          estadosPotrero.find((e) => e.tma_idestpo === updated.ttr_idestpot)?.tma_nomestp ||
          'Desconocido'
        const tipoMantenimientoNombre =
          tiposMantenimiento.find((t) => t.tma_idtipma === updated.ttr_idtipman)?.tma_nomtipm ||
          'Desconocido'
        setPastures(
          pastures.map((p) =>
            p.ttr_idpotrer === updated.ttr_idpotrer
              ? {
                  ttr_idpotrer: updated.ttr_idpotrer,
                  ttr_codpotre: updated.ttr_codpotre,
                  ttr_idestpot: updated.ttr_idestpot,
                  tma_nomestp: estadoNombre,
                  ttr_idtipman: updated.ttr_idtipman,
                  tma_nomtipm: tipoMantenimientoNombre,
                  ttr_fechamnt: updated.ttr_fechamnt,
                  ttr_descripc: updated.ttr_descripc,
                }
              : p,
          ),
        )
      }
      setEditVisible(false)
      showToast('Potrero editado correctamente', 'info')
    } catch (error) {
      console.error('Error al editar potrero:', error)
      showToast(error.message || 'Error al editar potrero', 'danger')
    }
  }

  // Eliminar potrero
  const handleDeletePasture = async () => {
    if (!currentPasture || !currentPasture.ttr_idpotrer) {
      showToast('No potrero seleccionado para eliminar.', 'warning')
      return
    }
    if (deleteConfirmation === 'confirmar') {
      try {
        await pastureService.deletePotrero(currentPasture.ttr_idpotrer)
        setPastures(pastures.filter((p) => p.ttr_idpotrer !== currentPasture.ttr_idpotrer))
        setDeleteVisible(false)
        showToast('Potrero eliminado exitosamente', 'danger')
      } catch (error) {
        console.error('Error al eliminar potrero:', error)
        showToast(error.message || 'Error al eliminar potrero', 'danger')
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
    currentPasture,
    setCurrentPasture,
    deleteConfirmation,
    setDeleteConfirmation,
    pastures,
    estadosPotrero,
    tiposMantenimiento,
    addPasture,
    setAddPasture,
    handleAddPasture,
    handleEditPasture,
    handleDeletePasture,
    showToast,
  }
}
