'use client'

import { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink } from '@coreui/react'
import { useLots } from './hooks/useLots'
import LotForm from './components/LotForm'
import LotsTable from './components/LotsTable'
import LotDetailsModal from './components/LotDetailsModal'
import LotFilters from './components/LotFilters'
import ReactivateLotModal from './components/ReactivateLotModal'
import DeleteLotModal from './components/DeleteLotModal'
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
    // Soft Delete props
    filterStatus,
    setFilterStatus,
    reactivateVisible,
    setReactivateVisible,
    reactivateConfirmation,
    setReactivateConfirmation,
    handleReactivateLot,
    deleteVisible,
    setDeleteVisible,
    deleteConfirmation,
    setDeleteConfirmation,
    handleDeleteConfirm,
    setCurrentLot,
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

  const handleTableAction = (lot, action) => {
    setCurrentLot(lot)
    if (action === 'eliminar') {
      setDeleteVisible(true)
    } else if (action === 'reactivar') {
      setReactivateVisible(true)
    }
  }

  const handleSubmit = () => {
    if (editingLot) {
      handleEditLot()
    } else {
      handleAddLot()
    }
  }

  // console.log(lots)
  // console.log(allBovines)

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Registro de Lotes</strong>
      </CCardHeader>
      <CCardBody>
        <CNav variant="tabs" className="mb-3">
          <CNavItem>
            <CNavLink
              active={filterStatus === 'ACTIVO'}
              onClick={() => setFilterStatus('ACTIVO')}
              style={{ cursor: 'pointer', color: filterStatus === 'ACTIVO' ? '#2eb85c' : '' }}
            >
              Activos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={filterStatus === 'INACTIVO'}
              onClick={() => setFilterStatus('INACTIVO')}
              style={{ cursor: 'pointer', color: filterStatus === 'INACTIVO' ? '#e55353' : '' }}
            >
              Inactivos
            </CNavLink>
          </CNavItem>
        </CNav>

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
          onDelete={handleTableAction}
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

      <ReactivateLotModal
        visible={reactivateVisible}
        onClose={() => setReactivateVisible(false)}
        confirmationText={reactivateConfirmation}
        setConfirmationText={setReactivateConfirmation}
        onConfirm={handleReactivateLot}
      />

      <DeleteLotModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        confirmationText={deleteConfirmation}
        setConfirmationText={setDeleteConfirmation}
        onConfirm={handleDeleteConfirm}
      />

      <CustomTableModal
        visible={bovinesModalVisible}
        onClose={() => setBovinesModalVisible(false)}
        data={activeBovinesInLot}
        columns={[
          { key: 'numeroBovino', label: 'Número' },
          { key: 'razaNombre', label: 'Raza' },
          { key: 'pesokilo', label: 'Peso (Kg)' },
          { key: 'etapanombre', label: 'Etapa' },
          { key: 'codPotrero' || 'n/a', label: 'Potrero' },
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
