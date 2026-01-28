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
import PastureSettings from './components/PastureSettings'
import SanidadSettings from './components/SanidadSettings'
import InventarioSettings from './components/InventarioSettings'
import FinanzasSettings from './components/FinanzasSettings'
import { useSettings } from './hooks/useSettings'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const {
    razas,
    colores,
    etapas,
    estados,
    cargos,
    estadosPotrero,
    tiposMantenimiento,
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
    createEstadoPotrero,
    updateEstadoPotrero,
    deleteEstadoPotrero,
    createTipoMantenimiento,
    updateTipoMantenimiento,
    deleteTipoMantenimiento,
    // Nuevos settings
    tiposVacuna,
    createTipoVacuna,
    updateTipoVacuna,
    deleteTipoVacuna,
    tratamientos,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento,
    categoriasInsumo,
    createCategoriaInsumo,
    updateCategoriaInsumo,
    deleteCategoriaInsumo,
    tiposMovimiento,
    createTipoMovimiento,
    updateTipoMovimiento,
    deleteTipoMovimiento,
    tiposPago,
    createTipoPago,
    updateTipoPago,
    deleteTipoPago,
    tiposVenta,
    createTipoVenta,
    updateTipoVenta,
    deleteTipoVenta,
    estadosFactura,
    createEstadoFactura,
    updateEstadoFactura,
    deleteEstadoFactura,
  } = useSettings()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="mb-0 text-black">Configuración de la Aplicación</h4>
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
              Bovinos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'pastures'} onClick={() => setActiveTab('pastures')}>
              Potreros
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'positions'} onClick={() => setActiveTab('positions')}>
              Cargos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'sanidad'} onClick={() => setActiveTab('sanidad')}>
              Sanidad
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'inventario'}
              onClick={() => setActiveTab('inventario')}
            >
              Inventario
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'finanzas'} onClick={() => setActiveTab('finanzas')}>
              Finanzas
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
          <CTabPane visible={activeTab === 'sanidad'}>
            <SanidadSettings
              tiposVacuna={tiposVacuna}
              createTipoVacuna={createTipoVacuna}
              updateTipoVacuna={updateTipoVacuna}
              deleteTipoVacuna={deleteTipoVacuna}
              tratamientos={tratamientos}
              createTratamiento={createTratamiento}
              updateTratamiento={updateTratamiento}
              deleteTratamiento={deleteTratamiento}
            />
          </CTabPane>
          <CTabPane visible={activeTab === 'inventario'}>
            <InventarioSettings
              categoriasInsumo={categoriasInsumo}
              createCategoriaInsumo={createCategoriaInsumo}
              updateCategoriaInsumo={updateCategoriaInsumo}
              deleteCategoriaInsumo={deleteCategoriaInsumo}
              tiposMovimiento={tiposMovimiento}
              createTipoMovimiento={createTipoMovimiento}
              updateTipoMovimiento={updateTipoMovimiento}
              deleteTipoMovimiento={deleteTipoMovimiento}
            />
          </CTabPane>
          <CTabPane visible={activeTab === 'finanzas'}>
            <FinanzasSettings
              tiposPago={tiposPago}
              createTipoPago={createTipoPago}
              updateTipoPago={updateTipoPago}
              deleteTipoPago={deleteTipoPago}
              tiposVenta={tiposVenta}
              createTipoVenta={createTipoVenta}
              updateTipoVenta={updateTipoVenta}
              deleteTipoVenta={deleteTipoVenta}
              estadosFactura={estadosFactura}
              createEstadoFactura={createEstadoFactura}
              updateEstadoFactura={updateEstadoFactura}
              deleteEstadoFactura={deleteEstadoFactura}
            />
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default Settings
