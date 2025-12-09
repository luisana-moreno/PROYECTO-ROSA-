import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilPlus } from '@coreui/icons'

import { useInventory } from './hooks/useInventory'
import InventoryTable from './components/InventoryTable'
import InventoryFilters from './components/InventoryFilters'
import InventoryStats from './components/InventoryStats'
import AddInventoryModal from './components/AddInventoryModal'
import EditInventoryModal from './components/EditInventoryModal'
import DeleteInventoryModal from './components/DeleteInventoryModal'

const Inventory = () => {
  const {
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
  } = useInventory()

  return (
    <>
      {/* Header & Stats */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex align-items-center">
                <CIcon icon={cilCart} className="me-2" size="lg" style={{ color: '#28a745' }} />
                <strong>Gestión de Inventario</strong>
              </div>
            </CCardHeader>
            <CCardBody>
              <InventoryStats items={items} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Main Content */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Lista de Insumos</strong>
              <CButton color="success" className="text-white" onClick={() => setVisible(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Insumo
              </CButton>
            </CCardHeader>
            <CCardBody>
              <InventoryFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                categories={categories}
              />
              <InventoryTable
                items={filteredItems}
                setCurrentRecord={setCurrentRecord}
                setEditVisible={setEditVisible}
                setDeleteVisible={setDeleteVisible}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modals */}
      <AddInventoryModal
        visible={visible}
        setVisible={setVisible}
        handleAddItem={handleAddItem}
        categories={categories}
      />
      <EditInventoryModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
        currentRecord={currentRecord}
        handleEditItem={handleEditItem}
        categories={categories}
      />
      <DeleteInventoryModal
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        handleDeleteItem={handleDeleteItem}
        currentRecord={currentRecord}
      />
    </>
  )
}

export default Inventory
