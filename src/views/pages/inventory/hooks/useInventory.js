import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { insumosService } from '../../../../api/insumosService'

export const useInventory = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  // Modal States
  const [visible, setVisible] = useState(false) // Add Modal
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

  // Form States
  const [currentRecord, setCurrentRecord] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  // Initial Data Fetch
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [itemsData, categoriesData] = await Promise.all([
        insumosService.getAllInsumos(),
        insumosService.getAllCategorias(),
      ])

      if (itemsData) setItems(itemsData)
      if (categoriesData) setCategories(categoriesData)
    } catch (error) {
      console.error('Error loading inventory data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter Logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.ttr_nominsum?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory
      ? item.ttr_idcatein?.toString() === filterCategory.toString()
      : true
    return matchesSearch && matchesCategory
  })

  // CRUD Operations
  const handleAddItem = async (formData) => {
    const response = await insumosService.createInsumo(formData)
    if (response) {
      toast.success('Insumo agregado correctamente')
      setVisible(false)
      fetchData() // Refresh list
      return true
    }
    return false
  }

  const handleEditItem = async (id, formData) => {
    const response = await insumosService.updateInsumo(id, formData)
    if (response) {
      toast.info('Insumo actualizado correctamente.')
      setEditVisible(false)
      setCurrentRecord(null)
      fetchData()
      return true
    }
    return false
  }

  const handleDeleteItem = async () => {
    if (deleteConfirmation !== 'confirmar') {
      toast.warning('Escribe "confirmar" para eliminar')
      return
    }

    if (!currentRecord) return

    const response = await insumosService.deleteInsumo(currentRecord.ttr_idinsumo)
    if (response) {
      toast.error('Insumo eliminado correctamente.')
      setDeleteVisible(false)
      setCurrentRecord(null)
      setDeleteConfirmation('')
      fetchData()
    }
  }

  return {
    items,
    categories,
    loading,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filteredItems,
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
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    fetchData,
  }
}
