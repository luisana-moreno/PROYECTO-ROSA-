'use client'
import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody, CContainer, CRow, CCol, CButton } from '@coreui/react'
import usePastureActivity from './hooks/usePastureActivity'
import AssignLotToPastureForm from './components/AssignLotToPastureForm'
import PastureActivityOverview from './components/PastureActivityOverview'
import LotPastureHistoryModal from './components/LotPastureHistoryModal'
import BovinesInLotPastureModal from './components/BovinesInLotPastureModal'

const PastureActivityModule = () => {
  const {
    pastures,
    lots,
    bovines,
    pastureStates,
    selectedPasture,
    setSelectedPasture,
    selectedLot,
    setSelectedLot,
    startDate,
    setStartDate,
    selectedBovines,
    setSelectedBovines,
    bovineModalVisible,
    setBovineModalVisible,
    loading,
    lotPastureHistory,
    fetchLotPastureHistory,
    bovinesInLotPasture,
    fetchBovinesInLotPastureByDate,
    handleAssignLotToPasture,
    handleUpdatePastureStatus,
  } = usePastureActivity()

  const [historyModalVisible, setHistoryModalVisible] = useState(false)
  const [selectedPastureForHistory, setSelectedPastureForHistory] = useState(null)

  const [bovinesDetailModalVisible, setBovinesDetailModalVisible] = useState(false)
  const [selectedLotForBovines, setSelectedLotForBovines] = useState(null)
  const [selectedDateForBovines, setSelectedDateForBovines] = useState(null)

  const handleViewHistory = (pasture) => {
    setSelectedPastureForHistory(pasture)
    fetchLotPastureHistory(pasture.id)
    setHistoryModalVisible(true)
  }

  const handleViewBovinesInLot = (pastureId, lotId, date) => {
    setSelectedPasture(pastureId) // Set the selected pasture for context
    setSelectedLotForBovines(lotId)
    setSelectedDateForBovines(date)
    fetchBovinesInLotPastureByDate(pastureId, lotId, date)
    setBovinesDetailModalVisible(true)
  }

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h3 className="mb-1">Actividad de Potreros</h3>
          <p className="text-muted mb-0">Gestión de asignación de lotes y bovinos a potreros.</p>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} lg={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <h5>Asignar Lote a Potrero</h5>
            </CCardHeader>
            <CCardBody>
              <AssignLotToPastureForm
                pastures={pastures}
                lots={lots}
                bovines={bovines}
                selectedPasture={selectedPasture}
                setSelectedPasture={setSelectedPasture}
                selectedLot={selectedLot}
                setSelectedLot={setSelectedLot}
                startDate={startDate}
                setStartDate={setStartDate}
                selectedBovines={selectedBovines}
                setSelectedBovines={setSelectedBovines}
                bovineModalVisible={bovineModalVisible}
                setBovineModalVisible={setBovineModalVisible}
                handleAssignLotToPasture={handleAssignLotToPasture}
                loading={loading}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} lg={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <h5>Potreros Activos</h5>
            </CCardHeader>
            <CCardBody>
              <PastureActivityOverview
                pastures={pastures}
                pastureStates={pastureStates}
                handleUpdatePastureStatus={handleUpdatePastureStatus}
                handleViewHistory={handleViewHistory}
                loading={loading}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <LotPastureHistoryModal
        visible={historyModalVisible}
        onClose={() => setHistoryModalVisible(false)}
        pasture={selectedPastureForHistory}
        history={lotPastureHistory}
        loading={loading}
        onViewBovinesInLot={handleViewBovinesInLot}
      />

      <BovinesInLotPastureModal
        visible={bovinesDetailModalVisible}
        onClose={() => setBovinesDetailModalVisible(false)}
        pastureId={selectedPasture}
        lotId={selectedLotForBovines}
        date={selectedDateForBovines}
        bovines={bovinesInLotPasture}
        loading={loading}
      />
    </CContainer>
  )
}

export default PastureActivityModule
