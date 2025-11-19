import React from 'react'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'
import InventoryForm from './InventoryForm'

const AddInventoryModal = ({
  visible,
  onClose,
  addInventory,
  setAddInventory,
  insumoType,
  setInsumoType,
  onSave,
  categoriasInsumo,
  newCategoryName,
  setNewCategoryName,
}) => {
  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">Registro de Inventario</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <InventoryForm
          addInventory={addInventory}
          setAddInventory={setAddInventory}
          insumoType={insumoType}
          setInsumoType={setInsumoType}
          categoriasInsumo={categoriasInsumo}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
        />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={onSave}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddInventoryModal
