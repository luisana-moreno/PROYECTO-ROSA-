import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'

// Importar componentes para Estados de Potrero
import EstadoPotreroTable from './EstadoPotreroTable'
import AddEstadoPotreroModal from './AddEstadoPotreroModal'
import EditEstadoPotreroModal from './EditEstadoPotreroModal'
import DeleteEstadoPotreroModal from './DeleteEstadoPotreroModal'

// Importar componentes para Tipos de Mantenimiento
import TipoMantenimientoTable from './TipoMantenimientoTable'
import AddTipoMantenimientoModal from './AddTipoMantenimientoModal'
import EditTipoMantenimientoModal from './EditTipoMantenimientoModal'
import DeleteTipoMantenimientoModal from './DeleteTipoMantenimientoModal'

const PastureSettings = ({
  estadosPotrero,
  createEstadoPotrero,
  updateEstadoPotrero,
  deleteEstadoPotrero,
  tiposMantenimiento,
  createTipoMantenimiento,
  updateTipoMantenimiento,
  deleteTipoMantenimiento,
}) => {
  const [activeTab, setActiveTab] = useState('estadosPotrero')

  // Estados para Estados de Potrero
  const [addEstadoPotreroVisible, setAddEstadoPotreroVisible] = useState(false)
  const [editEstadoPotreroVisible, setEditEstadoPotreroVisible] = useState(false)
  const [currentEstadoPotrero, setCurrentEstadoPotrero] = useState(null)
  const [deleteEstadoPotreroVisible, setDeleteEstadoPotreroVisible] = useState(false)
  const [deleteEstadoPotreroConfirmation, setDeleteEstadoPotreroConfirmation] = useState('')

  // Estados para Tipos de Mantenimiento
  const [addTipoMantenimientoVisible, setAddTipoMantenimientoVisible] = useState(false)
  const [editTipoMantenimientoVisible, setEditTipoMantenimientoVisible] = useState(false)
  const [currentTipoMantenimiento, setCurrentTipoMantenimiento] = useState(null)
  const [deleteTipoMantenimientoVisible, setDeleteTipoMantenimientoVisible] = useState(false)
  const [deleteTipoMantenimientoConfirmation, setDeleteTipoMantenimientoConfirmation] = useState('')

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5 className="typography-color-title mb-0">Configuración de Potreros</h5>
      </CCardHeader>
      <CCardBody>
        <CNav variant="tabs" className="mb-4">
          <CNavItem>
            <CNavLink
              active={activeTab === 'estadosPotrero'}
              onClick={() => setActiveTab('estadosPotrero')}
            >
              Estados de Potrero
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'tiposMantenimiento'}
              onClick={() => setActiveTab('tiposMantenimiento')}
            >
              Tipos de Mantenimiento
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          <CTabPane visible={activeTab === 'estadosPotrero'}>
            <EstadoPotreroTable
              estadosPotrero={estadosPotrero}
              setCurrentEstadoPotrero={setCurrentEstadoPotrero}
              setAddEstadoPotreroVisible={setAddEstadoPotreroVisible}
              setEditEstadoPotreroVisible={setEditEstadoPotreroVisible}
              setDeleteEstadoPotreroVisible={setDeleteEstadoPotreroVisible}
            />
            <AddEstadoPotreroModal
              visible={addEstadoPotreroVisible}
              setVisible={setAddEstadoPotreroVisible}
              createEstadoPotrero={createEstadoPotrero}
            />
            <EditEstadoPotreroModal
              visible={editEstadoPotreroVisible}
              setVisible={setEditEstadoPotreroVisible}
              currentEstadoPotrero={currentEstadoPotrero}
              updateEstadoPotrero={updateEstadoPotrero}
            />
            <DeleteEstadoPotreroModal
              visible={deleteEstadoPotreroVisible}
              setVisible={setDeleteEstadoPotreroVisible}
              deleteConfirmation={deleteEstadoPotreroConfirmation}
              setDeleteConfirmation={setDeleteEstadoPotreroConfirmation}
              handleDelete={deleteEstadoPotrero}
              currentId={currentEstadoPotrero?.tma_idestpo}
            />
          </CTabPane>
          <CTabPane visible={activeTab === 'tiposMantenimiento'}>
            <TipoMantenimientoTable
              tiposMantenimiento={tiposMantenimiento}
              setCurrentTipoMantenimiento={setCurrentTipoMantenimiento}
              setAddTipoMantenimientoVisible={setAddTipoMantenimientoVisible}
              setEditTipoMantenimientoVisible={setEditTipoMantenimientoVisible}
              setDeleteTipoMantenimientoVisible={setDeleteTipoMantenimientoVisible}
            />
            <AddTipoMantenimientoModal
              visible={addTipoMantenimientoVisible}
              setVisible={setAddTipoMantenimientoVisible}
              createTipoMantenimiento={createTipoMantenimiento}
            />
            <EditTipoMantenimientoModal
              visible={editTipoMantenimientoVisible}
              setVisible={setEditTipoMantenimientoVisible}
              currentTipoMantenimiento={currentTipoMantenimiento}
              updateTipoMantenimiento={updateTipoMantenimiento}
            />
            <DeleteTipoMantenimientoModal
              visible={deleteTipoMantenimientoVisible}
              setVisible={setDeleteTipoMantenimientoVisible}
              deleteConfirmation={deleteTipoMantenimientoConfirmation}
              setDeleteConfirmation={setDeleteTipoMantenimientoConfirmation}
              handleDelete={deleteTipoMantenimiento}
              currentId={currentTipoMantenimiento?.tma_idtipma}
            />
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default PastureSettings
