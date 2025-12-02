import { useState } from 'react'
import { toast } from 'react-toastify'

export const useMilkRecords = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [milkRecords, setMilkRecords] = useState([
    {
      id: 1,
      type: 'Bovino',
      identifier: '1001',
      day: 'lunes',
      liters: 50,
      morningStart: '06:00',
      morningEnd: '08:00',
      afternoonStart: '14:00',
      afternoonEnd: '16:00',
    },
    {
      id: 2,
      type: 'Lote',
      identifier: 'Lote A',
      day: 'martes',
      liters: 120,
      morningStart: '06:00',
      morningEnd: '08:00',
      afternoonStart: '14:00',
      afternoonEnd: '16:00',
    },
  ])
  const [newRecord, setNewRecord] = useState({
    type: 'Bovino', // Bovino o Lote
    identifier: '',
    day: '',
    liters: '',
    morningStart: '',
    morningEnd: '',
    afternoonStart: '',
    afternoonEnd: '',
  })

  const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

  const handleAddRecord = () => {
    setMilkRecords([...milkRecords, { id: milkRecords.length + 1, ...newRecord }])
    setNewRecord({
      type: 'Bovino',
      identifier: '',
      day: '',
      liters: '',
      morningStart: '',
      morningEnd: '',
      afternoonStart: '',
      afternoonEnd: '',
    })
    setVisible(false)
    toast.success('Registro agregado correctamente')
  }

  const handleEditRecord = () => {
    setMilkRecords(
      milkRecords.map((record) => (record.id === currentRecord.id ? currentRecord : record)),
    )
    setEditVisible(false)
    toast.info('Registro editado correctamente')
  }

  const handleDeleteRecord = () => {
    if (deleteConfirmation === 'confirmar') {
      setMilkRecords(milkRecords.filter((record) => record.id !== currentRecord.id))
      setDeleteVisible(false)
      toast.error('Registro eliminado correctamente')
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
    currentRecord,
    setCurrentRecord,
    deleteConfirmation,
    setDeleteConfirmation,
    milkRecords,
    setMilkRecords,
    newRecord,
    setNewRecord,
    days,
    handleAddRecord,
    handleEditRecord,
    handleDeleteRecord,
  }
}
