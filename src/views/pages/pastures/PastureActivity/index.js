"use client"

import { useState } from "react"
import CIcon from "@coreui/icons-react"
import { cilHistory } from "@coreui/icons"
import { CCard, CCardBody, CCardHeader, CButton, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react"
import { usePastureActivity } from "./hooks/usePastureActivity"
import PastureGrid from "./components/PastureGrid"
import PastureActivityForm from "./components/PastureActivityForm"
import PastureHistoryModal from "./components/PastureHistoryModal"

const PastureActivity = () => {
  const {
    pastures,
    lots,
    bovines,
    selectedPasture,
    setSelectedPasture,
    selectedLot,
    setSelectedLot,
    startDate,
    setStartDate,
    selectedBovines,
    setSelectedBovines,
    loading,
    pastureHistory,
    fetchPastureHistory,
    handleAssignLotToPasture,
    handleMarkExit,
    pastureStatus,
  } = usePastureActivity()

  const [activeTab, setActiveTab] = useState("activity")
  const [historyModalVisible, setHistoryModalVisible] = useState(false)

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Registro de Actividad de Potreros</h4>
        <CButton
          color="info"
          variant="outline"
          onClick={() => {
            if (selectedPasture) {
              fetchPastureHistory(selectedPasture.id)
              setHistoryModalVisible(true)
            }
          }}
          disabled={!selectedPasture}
        >
          <CIcon icon={cilHistory} className="me-2" />
          Ver Historial
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CNav variant="tabs" className="mb-3">
          <CNavItem>
            <CNavLink active={activeTab === "activity"} onClick={() => setActiveTab("activity")}>
              Registro de Actividad
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === "states"} onClick={() => setActiveTab("states")}>
              Estados del Potrero
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent className="mb-3">
          <CTabPane visible={activeTab === "activity"}>
            <PastureGrid
              pastures={pastures}
              selectedPasture={selectedPasture}
              onSelectPasture={setSelectedPasture}
              pastureStatus={pastureStatus}
            />
            <PastureActivityForm
              selectedPasture={selectedPasture}
              selectedLot={selectedLot}
              setSelectedLot={setSelectedLot}
              startDate={startDate}
              setStartDate={setStartDate}
              selectedBovines={selectedBovines}
              setSelectedBovines={setSelectedBovines}
              lots={lots}
              bovines={bovines}
              onAssign={handleAssignLotToPasture}
              onMarkExit={handleMarkExit}
              loading={loading}
            />
          </CTabPane>

          <CTabPane visible={activeTab === "states"}>
            <div className="alert alert-info">
              Los potreros seleccionados mostrarán su estado actual. Puede cambiar el estado usando la interfaz visual.
            </div>
            <PastureGrid
              pastures={pastures}
              selectedPasture={selectedPasture}
              onSelectPasture={setSelectedPasture}
              pastureStatus={pastureStatus}
            />
          </CTabPane>
        </CTabContent>
      </CCardBody>

      <PastureHistoryModal
        visible={historyModalVisible}
        onClose={() => setHistoryModalVisible(false)}
        history={pastureHistory}
        pasture={selectedPasture}
        loading={loading}
      />
    </CCard>
  )
}

export default PastureActivity
