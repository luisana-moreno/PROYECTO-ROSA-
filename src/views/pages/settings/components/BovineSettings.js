import React from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import BreedSettings from './BreedSettings'
import ColorSettings from './ColorSettings'
import StageSettings from './StageSettings'
import StateSettings from './StateSettings'

const BovineSettings = ({
  razas,
  createRaza,
  updateRaza,
  deleteRaza,
  colores,
  createColor,
  updateColor,
  deleteColor,
  etapas,
  createEtapa,
  updateEtapa,
  deleteEtapa,
  estados,
  createEstado,
  updateEstado,
  deleteEstado,
}) => {
  const [activeTab, setActiveTab] = React.useState('breeds') // Default to breeds tab

  return (
    <>
      <CNav variant="tabs" className="mb-4">
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
      </CNav>

      <CTabContent>
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
      </CTabContent>
    </>
  )
}

export default BovineSettings
