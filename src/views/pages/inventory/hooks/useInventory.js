import { useState, useEffect, useCallback } from 'react'
import { inventoryService } from '../../../../api/inventoryService'
import { toast } from 'react-toastify'

const useInventory = () => {
  const [visibleInventory, setVisibleInventory] = useState(false)
  const [editVisibleInventory, setEditVisibleInventory] = useState(false)
  const [deleteVisibleInventory, setDeleteVisibleInventory] = useState(false)
  const [currentInventory, setCurrentInventory] = useState(null)
  const [deleteConfirmationInventory, setDeleteConfirmationInventory] = useState('')
  const [inventory, setInventory] = useState([])
  const [addInventory, setAddInventory] = useState({ type: 'Ingreso' }) // Default to Ingreso
  const [insumoType, setInsumoType] = useState('Ingreso') // Default to Ingreso
  const [activeKey, setActiveKey] = useState(1)
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    date: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categoriasInsumo, setCategoriasInsumo] = useState([])
  const [newCategoryName, setNewCategoryName] = useState('')

  const fetchCategoriasInsumo = useCallback(async () => {
    try {
      const data = await inventoryService.getAllCategoriasInsumo()
      console.log(data)
      setCategoriasInsumo(data.map((cat) => ({ id: cat.tmaIdcatin, nombre: cat.tmaNomcati })))
    } catch (err) {
      setError(err.message)
    }
  }, [])

  const fetchInventory = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const insumos = await inventoryService.getAllInsumos()
      console.log(insumos)
      const egresos = await inventoryService.getAllEgresos()

      const formattedInsumos = insumos.map((item) => ({
        id: item.ttrIdinsumo,
        type: 'Ingreso',
        ttrIdcatein: item.ttrIdcatein,
        categoriaNombre: item.categoriaNombre || 'Sin Categoría', // Asegurar que siempre haya un nombre de categoría
        ttrNominsum: item.ttrNominsum,
        ttrCantidad: item.ttrCantidad,
        ttrFechaven: item.ttrFechaven,
      }))

      const formattedEgresos = egresos.map((item) => ({
        id: item.idegreso,
        type: 'Egreso',
        idempreg: item.idempreg,
        fechpago: item.fechpago,
        idtippag: item.idtippag,
        idnomref: item.idnomref,
        idpagref: item.idpagref,
        fechcrea: item.fechcrea,
        fechupda: item.fechupda,
      }))
      setInventory([...formattedInsumos, ...formattedEgresos])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInventory()
    fetchCategoriasInsumo()
  }, [fetchInventory, fetchCategoriasInsumo])

  const handleAddInventory = async () => {
    setLoading(true)
    setError(null)
    try {
      let categoriaId = addInventory.ttrIdcatein
      let categoriaNombre = addInventory.categoria_nombre

      // Validaciones para Ingreso
      if (addInventory.type === 'Ingreso') {
        if (categoriaNombre === 'Otro' && !newCategoryName) {
          toast.error('Debe ingresar el nombre de la nueva categoría.')
          setLoading(false)
          return
        }

        if (categoriaNombre === 'Otro' && newCategoryName) {
          const newCat = await inventoryService.createCategoriaInsumo({ nombre: newCategoryName })
          categoriaId = newCat.tmaIdcatin
          categoriaNombre = newCat.tmaNomcati
          setCategoriasInsumo((prev) => [
            ...prev,
            { id: newCat.tmaIdcatin, nombre: newCat.tmaNomcati },
          ])
          setNewCategoryName('')
        } else if (!categoriaId && categoriaNombre) {
          const existingCat = categoriasInsumo.find((cat) => cat.nombre === categoriaNombre)
          if (existingCat) {
            categoriaId = existingCat.id
          } else {
            toast.error('Categoría de insumo no válida.')
            setLoading(false)
            return
          }
        }

        if (!categoriaId) {
          toast.error('Debe seleccionar o crear una categoría para el insumo.')
          setLoading(false)
          return
        }

        if (!addInventory.ttrNominsum) {
          toast.error('Debe ingresar el nombre del insumo.')
          setLoading(false)
          return
        }
        if (!addInventory.ttrCantidad || addInventory.ttrCantidad <= 0) {
          toast.error('La cantidad debe ser un número positivo.')
          setLoading(false)
          return
        }
        if (!addInventory.ttrFechaven) {
          toast.error('Debe ingresar la fecha de vencimiento.')
          setLoading(false)
          return
        }

        await inventoryService.createInsumo({
          idcategoria: categoriaId,
          nombreinsumo: addInventory.ttrNominsum,
          cantidad: addInventory.ttrCantidad,
          fechavencimiento: addInventory.ttrFechaven,
        })
        toast.success('Insumo agregado exitosamente.')
      } else if (addInventory.type === 'Egreso') {
        // Validaciones para Egreso
        if (!addInventory.idempreg || addInventory.idempreg <= 0) {
          toast.error('Debe ingresar un ID de empleado válido.')
          setLoading(false)
          return
        }
        if (!addInventory.fechpago) {
          toast.error('Debe ingresar la fecha de pago.')
          setLoading(false)
          return
        }
        if (!addInventory.idtippag || addInventory.idtippag <= 0) {
          toast.error('Debe ingresar un ID de tipo de pago válido.')
          setLoading(false)
          return
        }
        if (!addInventory.idnomref || addInventory.idnomref <= 0) {
          toast.error('Debe ingresar un ID de nómina de referencia válido.')
          setLoading(false)
          return
        }
        if (!addInventory.idpagref || addInventory.idpagref <= 0) {
          toast.error('Debe ingresar un ID de pago de referencia válido.')
          setLoading(false)
          return
        }
        if (!addInventory.fechcrea) {
          toast.error('Debe ingresar la fecha de creación.')
          setLoading(false)
          return
        }
        if (!addInventory.fechupda) {
          toast.error('Debe ingresar la fecha de actualización.')
          setLoading(false)
          return
        }

        await inventoryService.createEgreso({
          idempreg: addInventory.idempreg,
          fechpago: addInventory.fechpago,
          idtippag: addInventory.idtippag,
          idnomref: addInventory.idnomref,
          idpagref: addInventory.idpagref,
          fechcrea: addInventory.fechcrea,
          fechupda: addInventory.fechupda,
        })
        toast.success('Egreso agregado exitosamente.')
      }
      setAddInventory({ type: insumoType })
      setVisibleInventory(false)
      fetchInventory()
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Error al agregar registro.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditInventory = async () => {
    setLoading(true)
    setError(null)
    try {
      // Validaciones para Ingreso
      if (currentInventory.type === 'Ingreso') {
        if (!currentInventory.ttrIdcatein) {
          toast.error('Debe seleccionar una categoría para el insumo.')
          setLoading(false)
          return
        }
        if (!currentInventory.ttrNominsum) {
          toast.error('Debe ingresar el nombre del insumo.')
          setLoading(false)
          return
        }
        if (!currentInventory.ttrCantidad || currentInventory.ttrCantidad <= 0) {
          toast.error('La cantidad debe ser un número positivo.')
          setLoading(false)
          return
        }
        if (!currentInventory.ttrFechaven) {
          toast.error('Debe ingresar la fecha de vencimiento.')
          setLoading(false)
          return
        }

        await inventoryService.updateInsumo(currentInventory.id, {
          idcategoria: currentInventory.ttrIdcatein,
          nombreinsumo: currentInventory.ttrNominsum,
          cantidad: currentInventory.ttrCantidad,
          fechavencimiento: currentInventory.ttrFechaven,
        })
        toast.success('Insumo actualizado exitosamente.')
      } else if (currentInventory.type === 'Egreso') {
        // Validaciones para Egreso
        if (!currentInventory.idempreg || currentInventory.idempreg <= 0) {
          toast.error('Debe ingresar un ID de empleado válido.')
          setLoading(false)
          return
        }
        if (!currentInventory.fechpago) {
          toast.error('Debe ingresar la fecha de pago.')
          setLoading(false)
          return
        }
        if (!currentInventory.idtippag || currentInventory.idtippag <= 0) {
          toast.error('Debe ingresar un ID de tipo de pago válido.')
          setLoading(false)
          return
        }
        if (!currentInventory.idnomref || currentInventory.idnomref <= 0) {
          toast.error('Debe ingresar un ID de nómina de referencia válido.')
          setLoading(false)
          return
        }
        if (!currentInventory.idpagref || currentInventory.idpagref <= 0) {
          toast.error('Debe ingresar un ID de pago de referencia válido.')
          setLoading(false)
          return
        }
        if (!currentInventory.fechcrea) {
          toast.error('Debe ingresar la fecha de creación.')
          setLoading(false)
          return
        }
        if (!currentInventory.fechupda) {
          toast.error('Debe ingresar la fecha de actualización.')
          setLoading(false)
          return
        }

        await inventoryService.updateEgreso(currentInventory.id, {
          idempreg: currentInventory.idempreg,
          fechpago: currentInventory.fechpago,
          idtippag: currentInventory.idtippag,
          idnomref: currentInventory.idnomref,
          idpagref: currentInventory.idpagref,
          fechcrea: currentInventory.fechcrea,
          fechupda: currentInventory.fechupda,
        })
        toast.success('Egreso actualizado exitosamente.')
      }
      setEditVisibleInventory(false)
      fetchInventory()
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Error al actualizar registro.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteInventory = async () => {
    if (deleteConfirmationInventory === 'confirmar') {
      setLoading(true)
      setError(null)
      try {
        if (currentInventory.type === 'Ingreso') {
          await inventoryService.deleteInsumo(currentInventory.id)
        } else if (currentInventory.type === 'Egreso') {
          await inventoryService.deleteEgreso(currentInventory.id)
        }
        setDeleteVisibleInventory(false)
        fetchInventory()
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    } else {
      console.error('Delete confirmation failed.')
    }
  }

  const filteredInventory = inventory.filter((item) => {
    const matchesType = filters.type ? item.type === filters.type : true
    const matchesCategory = filters.category ? item.categoriaNombre === filters.category : true
    return matchesType && matchesCategory
  })

  return {
    visibleInventory,
    setVisibleInventory,
    editVisibleInventory,
    setEditVisibleInventory,
    deleteVisibleInventory,
    setDeleteVisibleInventory,
    currentInventory,
    setCurrentInventory,
    deleteConfirmationInventory,
    setDeleteConfirmationInventory,
    inventory,
    setInventory,
    addInventory,
    setAddInventory,
    insumoType,
    setInsumoType,
    activeKey,
    setActiveKey,
    filters,
    setFilters,
    handleAddInventory,
    handleEditInventory,
    handleDeleteInventory,
    filteredInventory,
    loading,
    error,
    categoriasInsumo,
    newCategoryName,
    setNewCategoryName,
  }
}

export default useInventory
