"use client"

import { useState } from "react"
import { CCard, CCardBody, CCardHeader } from "@coreui/react"
import { useLots } from "./hooks/useLots"
import LotForm from "./components/LotForm"
import LotsTable from "./components/LotsTable"
import LotDetailsModal from "./components/LotDetailsModal"
import LotFilters from "./components/LotFilters"

const LotRegistration = () => {
  const {
    lots,
    bovinesInLot,
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
    fetchMovementHistory,
  } = useLots()

  const [detailsModalVisible, setDetailsModalVisible] = useState(false)
  const [selectedLotForDetails, setSelectedLotForDetails] = useState(null)

  const handleEditClick = (lot) => {
    setFormData({ nombre: lot.nombre, descripcion: lot.descripcion })
    setEditingLot(lot)
  }

  const handleCancelEdit = () => {
    setFormData({ nombre: "", descripcion: "" })
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
          editingLot={editingLot}
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
        bovinesInLot={bovinesInLot}
        movementHistory={movementHistory}
        loading={loading}
        onFetchBovines={fetchBovinesInLot}
        onFetchHistory={fetchMovementHistory}
      />
    </CCard>
  )
}

export default LotRegistration
