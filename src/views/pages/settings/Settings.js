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
import PositionSettings from './components/PositionSettings'
import BovineSettings from './components/BovineSettings'
import PastureSettings from './components/PastureSettings' // Importar el nuevo componente
import { useSettings } from './hooks/useSettings'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const {
    razas,
    colores,
    etapas,
    estados,
    cargos,
    estadosPotrero, // Nuevos estados para potreros
    tiposMantenimiento, // Nuevos tipos de mantenimiento para potreros
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
    createEstadoPotrero, // Nuevas funciones CRUD para estados de potrero
    updateEstadoPotrero,
    deleteEstadoPotrero,
    createTipoMantenimiento, // Nuevas funciones CRUD para tipos de mantenimiento
    updateTipoMantenimiento,
    deleteTipoMantenimiento,
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
            <CNavLink active={activeTab === 'bovines'} onClick={() => setActiveTab('bovines')}>
              Configuración de Bovinos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'pastures'} onClick={() => setActiveTab('pastures')}>
              Configuración de Potreros
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
          <CTabPane visible={activeTab === 'bovines'}>
            <BovineSettings
              razas={razas}
              createRaza={createRaza}
              updateRaza={updateRaza}
              deleteRaza={deleteRaza}
              colores={colores}
              createColor={createColor}
              updateColor={updateColor}
              deleteColor={deleteColor}
              etapas={etapas}
              createEtapa={createEtapa}
              updateEtapa={updateEtapa}
              deleteEtapa={deleteEtapa}
              estados={estados}
              createEstado={createEstado}
              updateEstado={updateEstado}
              deleteEstado={deleteEstado}
            />
          </CTabPane>
          <CTabPane visible={activeTab === 'pastures'}>
            <PastureSettings
              estadosPotrero={estadosPotrero}
              createEstadoPotrero={createEstadoPotrero}
              updateEstadoPotrero={updateEstadoPotrero}
              deleteEstadoPotrero={deleteEstadoPotrero}
              tiposMantenimiento={tiposMantenimiento}
              createTipoMantenimiento={createTipoMantenimiento}
              updateTipoMantenimiento={updateTipoMantenimiento}
              deleteTipoMantenimiento={deleteTipoMantenimiento}
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
