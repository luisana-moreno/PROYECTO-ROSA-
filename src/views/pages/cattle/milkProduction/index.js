import React from 'react'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react'
import { useMilkRecords } from './hooks/useMilkRecords'
import { MilkRecordsTable } from './components/MilkRecordsTable'
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
    milkRecords,
    newRecord,
    setNewRecord,
    days,
    handleAddRecord,
    handleEditRecord,
    handleDeleteRecord,
  } = useMilkRecords()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Registro de Producción de Leche
          <CButton className="button-no-hover-green text-white" onClick={() => setVisible(true)}>
            Agregar Registro
          </CButton>
        </h4>
      </CCardHeader>
      <CCardBody>
        <MilkRecordsTable
          milkRecords={milkRecords}
          setCurrentRecord={setCurrentRecord}
          setEditVisible={setEditVisible}
          setDeleteVisible={setDeleteVisible}
        />
      </CCardBody>

      <AddMilkRecordModal
        visible={visible}
        setVisible={setVisible}
        newRecord={newRecord}
        setNewRecord={setNewRecord}
        handleAddRecord={handleAddRecord}
        days={days}
      />

      <EditMilkRecordModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
        currentRecord={currentRecord}
        setCurrentRecord={setCurrentRecord}
        handleEditRecord={handleEditRecord}
        days={days}
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
