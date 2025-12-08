'use client'

import { useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { useLots } from './hooks/useLots'
import LotForm from './components/LotForm'
import LotsTable from './components/LotsTable'
import LotDetailsModal from './components/LotDetailsModal'
import LotFilters from './components/LotFilters'
import CustomTableModal from '../../../components/CustomTableModal'

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
    fetchBovinesInLot,
    fetchActiveBovinesInLot,
    addBovinesToLot,
    removeBovineFromLot,
    updateBovineLotAssignment,
  } = useLots()

  const [detailsModalVisible, setDetailsModalVisible] = useState(false)
  const [selectedLotForDetails, setSelectedLotForDetails] = useState(null)
  const [bovinesModalVisible, setBovinesModalVisible] = useState(false)

  const handleEditClick = (lot) => {
    setFormData({ nombre: lot.nombre })
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

  const handleViewBovines = (lot) => {
    fetchActiveBovinesInLot(lot.id)
    setBovinesModalVisible(true)
  }

  const handleSubmit = () => {
    if (editingLot) {
      handleEditLot()
    } else {
      handleAddLot()
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Registro de Lotes</strong>
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
          onViewBovines={handleViewBovines}
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
        fetchBovinesInLot={fetchBovinesInLot}
        fetchActiveBovinesInLot={fetchActiveBovinesInLot}
        addBovinesToLot={addBovinesToLot}
        removeBovineFromLot={removeBovineFromLot}
        updateBovineLotAssignment={updateBovineLotAssignment}
      />

      <CustomTableModal
        visible={bovinesModalVisible}
        onClose={() => setBovinesModalVisible(false)}
        data={activeBovinesInLot}
        columns={[
          { key: 'numerobovino', label: 'Número' },
          { key: 'razanombre', label: 'Raza' },
          { key: 'pesokilo', label: 'Peso (Kg)' },
          { key: 'etapanombre', label: 'Etapa' },
          { key: 'codpotrero', label: 'Potrero' },
        ]}
        onSelect={() => {}}
        title="Bovinos en el Lote"
        searchPlaceholder="Buscar bovinos..."
        readOnly={true}
      />
    </CCard>
  )
}

export default LotRegistration
