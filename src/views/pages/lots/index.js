'use client'

import { useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { useLots } from './hooks/useLots'
import LotForm from './components/LotForm'
import LotsTable from './components/LotsTable'
import LotDetailsModal from './components/LotDetailsModal'
import LotFilters from './components/LotFilters'

const LotRegistration = () => {
  const {
    lots,
    allBovines,
    allPastures,
    bovinesInLot,
    activeBovinesInLot,
    movementHistory,
    loading,
    formData,
    setFormData,
    editingLot,
    setEditingLot,
    searchTerm,
    setSearchTerm,
    handleAddLot,
    handleEditLot,
    handleDeleteLot,
    fetchBovinesInLot, // Ahora es para historial
    fetchActiveBovinesInLot,
    addBovinesToLot,
    removeBovineFromLot,
    updateBovineLotAssignment,
  } = useLots()

  const [detailsModalVisible, setDetailsModalVisible] = useState(false)
  const [selectedLotForDetails, setSelectedLotForDetails] = useState(null)

  const handleEditClick = (lot) => {
    setFormData({ nombre: lot.nombre }) // Lote solo tiene nombre
    setEditingLot(lot)
  }

  const handleCancelEdit = () => {
    setFormData({ nombre: '' })
    setEditingLot(null)
  }

  const handleViewDetails = (lot) => {
    setSelectedLotForDetails(lot)
    setDetailsModalVisible(true)
  }

  const handleSubmit = () => {
    if (editingLot) {
      handleEditLot()
    } else {
      handleAddLot()
    }
  }

  return (
    <CCard>
      <CCardHeader>
        <h4 className="mb-0">Registro de Lotes</h4>
      </CCardHeader>
      <CCardBody>
        <LotForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isEditing={!!editingLot}
          onCancel={handleCancelEdit}
          loading={loading}
        />

        <LotFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <LotsTable
          lots={lots}
          onEdit={handleEditClick}
          onDelete={handleDeleteLot}
          onViewDetails={handleViewDetails}
          loading={loading}
        />
      </CCardBody>

      <LotDetailsModal
        visible={detailsModalVisible}
        onClose={() => setDetailsModalVisible(false)}
        lot={selectedLotForDetails}
        allBovines={allBovines}
        allPastures={allPastures}
        bovinesInLot={bovinesInLot}
        activeBovinesInLot={activeBovinesInLot}
        loading={loading}
        fetchBovinesInLot={fetchBovinesInLot} // Para historial
        fetchActiveBovinesInLot={fetchActiveBovinesInLot}
        addBovinesToLot={addBovinesToLot}
        removeBovineFromLot={removeBovineFromLot}
        updateBovineLotAssignment={updateBovineLotAssignment}
      />
    </CCard>
  )
}

export default LotRegistration
