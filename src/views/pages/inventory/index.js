import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CCard, CCardBody, CCardHeader, CButton, CAlert, CSpinner } from '@coreui/react'
import useInventory from './hooks/useInventory'
import InventoryTable from './components/InventoryTable'
import AddInventoryModal from './components/AddInventoryModal'
import EditInventoryModal from './components/EditInventoryModal'
import DeleteInventoryModal from './components/DeleteInventoryModal'

const Inventory = () => {
  const {
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
  } = useInventory()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title  mb-0 d-flex justify-content-between align-items-center">
          Registro de Inventario
          <CButton
            className="button-no-hover-green text-white"
            onClick={() => setVisibleInventory(true)}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Registro
          </CButton>
        </h4>
      </CCardHeader>
      <CCardBody>
        {loading && (
          <div className="d-flex justify-content-center">
            <CSpinner color="primary" />
          </div>
        )}
        {error && <CAlert color="danger">{error}</CAlert>}
        {!loading && !error && (
          <InventoryTable
            filters={filters}
            setFilters={setFilters}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            filteredInventory={filteredInventory}
            setCurrentInventory={setCurrentInventory}
            setEditVisibleInventory={setEditVisibleInventory}
            setDeleteVisibleInventory={setDeleteVisibleInventory}
          />
        )}
      </CCardBody>
      <AddInventoryModal
        visible={visibleInventory}
        onClose={() => setVisibleInventory(false)}
        addInventory={addInventory}
        setAddInventory={setAddInventory}
        insumoType={insumoType}
        setInsumoType={setInsumoType}
        onSave={handleAddInventory}
        categoriasInsumo={categoriasInsumo}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
      />
      <EditInventoryModal
        visible={editVisibleInventory}
        onClose={() => setEditVisibleInventory(false)}
        currentInventory={currentInventory}
        setCurrentInventory={setCurrentInventory}
        onSave={handleEditInventory}
        categoriasInsumo={categoriasInsumo}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
      />
      <DeleteInventoryModal
        visible={deleteVisibleInventory}
        onClose={() => setDeleteVisibleInventory(false)}
        deleteConfirmationInventory={deleteConfirmationInventory}
        setDeleteConfirmationInventory={setDeleteConfirmationInventory}
        onDelete={handleDeleteInventory}
      />
    </CCard>
  )
}

export default Inventory
