import React from 'react'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react'
import { useMilkRecords } from './hooks/useMilkRecords'
import { MilkProductionLotTable } from './components/MilkProductionLotTable'
import { AddMilkRecordModal } from './components/AddMilkRecordModal'
import { EditMilkRecordModal } from './components/EditMilkRecordModal'
import { DeleteMilkRecordModal } from './components/DeleteMilkRecordModal'

const MilkProduction = () => {
  const {
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
    lots,
    selectedLotId,
    setSelectedLotId,
    productionDate,
    setProductionDate,
    bovinesInSelectedLot,
    individualBovineProduction,
    setIndividualBovineProduction,
    milkProductionLots,
    individualMilkRecords,
    isLoading, // Importar isLoading
    handleAddRecord,
    handleEditRecord,
    handleDeleteRecord,
  } = useMilkRecords()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Registro de Producción de Leche por Lote
          <CButton className="button-no-hover-green text-white" onClick={() => setVisible(true)}>
            Agregar Producción por Lote
          </CButton>
        </h4>
      </CCardHeader>
      <CCardBody>
        <MilkProductionLotTable
          milkProductionLots={milkProductionLots}
          individualMilkRecords={individualMilkRecords}
          setCurrentRecord={setCurrentRecord}
          setEditVisible={setEditVisible}
          setDeleteVisible={setDeleteVisible}
        />
      </CCardBody>

      <AddMilkRecordModal
        visible={visible}
        setVisible={setVisible}
        lots={lots}
        selectedLotId={selectedLotId}
        setSelectedLotId={setSelectedLotId}
        productionDate={productionDate}
        setProductionDate={setProductionDate}
        bovinesInSelectedLot={bovinesInSelectedLot}
        individualBovineProduction={individualBovineProduction}
        setIndividualBovineProduction={setIndividualBovineProduction}
        isLoading={isLoading} // Pasar isLoading al modal
        handleAddRecord={handleAddRecord}
      />

      <EditMilkRecordModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
        currentRecord={currentRecord}
        setCurrentRecord={setCurrentRecord}
        handleEditRecord={handleEditRecord}
      />

      <DeleteMilkRecordModal
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        handleDeleteRecord={handleDeleteRecord}
      />
    </CCard>
  )
}

export default MilkProduction
