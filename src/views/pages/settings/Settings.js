import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'

import GeneralSettings from './components/GeneralSettings'
import BreedSettings from './components/BreedSettings'
import ColorSettings from './components/ColorSettings'
import StageSettings from './components/StageSettings'
import StateSettings from './components/StateSettings'
import PositionSettings from './components/PositionSettings'
import { useSettings } from './hooks/useSettings'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const {
    razas,
    colores,
    etapas,
    estados,
    cargos,
    createRaza,
    updateRaza,
    deleteRaza,
    createColor,
    updateColor,
    deleteColor,
    createEtapa,
    updateEtapa,
    deleteEtapa,
    createEstado,
    updateEstado,
    deleteEstado,
    createCargo,
    updateCargo,
    deleteCargo,
  } = useSettings()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0">Configuración de la Aplicación</h4>
      </CCardHeader>
      <CCardBody>
        <CNav variant="tabs" className="mb-4">
          <CNavItem>
            <CNavLink active={activeTab === 'general'} onClick={() => setActiveTab('general')}>
              General
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'breeds'} onClick={() => setActiveTab('breeds')}>
              Razas de Bovinos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'colors'} onClick={() => setActiveTab('colors')}>
              Colores de Bovinos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'stages'} onClick={() => setActiveTab('stages')}>
              Etapas de Bovinos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'states'} onClick={() => setActiveTab('states')}>
              Estados de Bovinos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'positions'} onClick={() => setActiveTab('positions')}>
              Cargos de Empleado
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          <CTabPane visible={activeTab === 'general'}>
            <GeneralSettings />
          </CTabPane>
          <CTabPane visible={activeTab === 'breeds'}>
            <BreedSettings
              razas={razas}
              createRaza={createRaza}
              updateRaza={updateRaza}
              deleteRaza={deleteRaza}
            />
          </CTabPane>
          <CTabPane visible={activeTab === 'colors'}>
            <ColorSettings
              colores={colores}
              createColor={createColor}
              updateColor={updateColor}
              deleteColor={deleteColor}
            />
          </CTabPane>
          <CTabPane visible={activeTab === 'stages'}>
            <StageSettings
              etapas={etapas}
              createEtapa={createEtapa}
              updateEtapa={updateEtapa}
              deleteEtapa={deleteEtapa}
            />
          </CTabPane>
          <CTabPane visible={activeTab === 'states'}>
            <StateSettings
              estados={estados}
              createEstado={createEstado}
              updateEstado={updateEstado}
              deleteEstado={deleteEstado}
            />
          </CTabPane>
          <CTabPane visible={activeTab === 'positions'}>
            <PositionSettings
              cargos={cargos}
              createCargo={createCargo}
              updateCargo={updateCargo}
              deleteCargo={deleteCargo}
            />
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default Settings
