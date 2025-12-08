import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilDrop } from '@coreui/icons'
import { CCard, CCardHeader, CCardBody, CButton, CRow, CCol } from '@coreui/react'
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
    isLoading,
    handleAddRecord,
    handleEditRecord,
    handleDeleteRecord,
  } = useMilkRecords()

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex align-items-center">
                <CIcon icon={cilDrop} className="me-2" size="lg" style={{ color: '#28a745' }} />
                <strong>Gestión de Producción de Leche</strong>
              </div>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis mb-0">
                Administra los registros de producción de leche. Registra la producción diaria por
                lotes, visualiza historiales y gestiona la información individual de tus bovinos.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Lista de Producción por Lote</strong>
              <CButton color="success" className="text-white" onClick={() => setVisible(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Agregar Producción
              </CButton>
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
          </CCard>
        </CCol>
      </CRow>

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
        isLoading={isLoading}
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
        currentRecord={currentRecord}
      />
    </>
  )
}

export default MilkProduction
