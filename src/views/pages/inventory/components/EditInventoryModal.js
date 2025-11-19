import React from 'react'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'
import InventoryForm from './InventoryForm'

const EditInventoryModal = ({
  visible,
  onClose,
  currentInventory,
  setCurrentInventory,
  onSave,
  categoriasInsumo,
  newCategoryName,
  setNewCategoryName,
}) => {
  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">Editar Registro</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <InventoryForm
          addInventory={currentInventory}
          setAddInventory={setCurrentInventory}
          insumoType={currentInventory?.type || ''}
          setInsumoType={(type) => setCurrentInventory({ ...currentInventory, type })}
          categoriasInsumo={categoriasInsumo}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
        />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={onSave}>
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditInventoryModal
