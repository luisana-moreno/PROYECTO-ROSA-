import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilHistory } from '@coreui/icons'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { usePastureActivity } from './hooks/usePastureActivity'
import PastureGrid from './components/PastureGrid'
import PastureActivityForm from './components/PastureActivityForm'
import PastureHistoryModal from './components/PastureHistoryModal'

const PastureActivity = () => {
  const {
    pastures,
    lots,
    selectedPasture,
    setSelectedPasture,
    selectedLot,
    setSelectedLot,
    startDate,
    setStartDate,
    turno,
    setTurno,
    observaciones,
    setObservaciones,
    loading,
    pastureHistory,
    fetchPastureHistory,
    handleAssignLotToPasture,
    pastureStatus,
    fetchHistoricalBovines,
  } = usePastureActivity()

  const [activeTab, setActiveTab] = useState('activity')
  const [historyModalVisible, setHistoryModalVisible] = useState(false)

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Registro de Actividad de Potreros</h4>
        <div className="d-flex gap-2">
          <CButton
            color="info"
            variant="outline"
            onClick={() => {
              if (selectedPasture) {
                fetchPastureHistory(selectedPasture.id || selectedPasture.ttr_idpotrer)
                setHistoryModalVisible(true)
              }
            }}
            disabled={!selectedPasture}
          >
            <CIcon icon={cilHistory} className="me-2" />
            Ver Historial
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CNav variant="tabs" className="mb-3">
          <CNavItem>
            <CNavLink active={activeTab === 'activity'} onClick={() => setActiveTab('activity')}>
              Registro de Actividad
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'states'} onClick={() => setActiveTab('states')}>
              Estados del Potrero
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent className="mb-3">
          <CTabPane visible={activeTab === 'activity'}>
            <div className="alert alert-success">
              <strong>Instrucciones:</strong> Seleccione un potrero del mapa (Verdes = Descansados)
              y asigne una actividad de rotación.
            </div>
            <PastureGrid
              pastures={pastures}
              selectedPasture={selectedPasture}
              onSelectPasture={setSelectedPasture}
              pastureStatus={pastureStatus}
            />
            <div className="mt-4">
              <h5>Formulario de Rotación</h5>
              <PastureActivityForm
                selectedPasture={selectedPasture}
                selectedLot={selectedLot}
                setSelectedLot={setSelectedLot}
                startDate={startDate}
                setStartDate={setStartDate}
                turno={turno}
                setTurno={setTurno}
                observaciones={observaciones}
                setObservaciones={setObservaciones}
                lots={lots}
                onAssign={handleAssignLotToPasture}
                loading={loading}
              />
            </div>
          </CTabPane>

          <CTabPane visible={activeTab === 'states'}>
            <div className="alert alert-info">
              Visualización de estado general de todos los potreros.
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
        fetchHistoricalBovines={fetchHistoricalBovines}
      />
    </CCard>
  )
}

export default PastureActivity
