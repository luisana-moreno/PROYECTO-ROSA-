import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilList, cilGrid } from '@coreui/icons'
import { CCard, CCardHeader, CCardBody, CButton, CAlert } from '@coreui/react'
import { toast } from 'react-toastify'

import { usePastures } from './hooks/usePastures'
// import { pastureService } from 'src/api/pastureService' // pastureService might be unused inside the component now if usePastures handles it, but let's check. Actually I removed explicit calls to pastureService in previous step so it might be unused too.
// I will just remove lotService for now.

import PasturesTable from './components/PasturesTable'
import AddPastureModal from './components/AddPastureModal'
import EditPastureModal from './components/EditPastureModal'
import DeletePastureModal from './components/DeletePastureModal'
import PastureFilters from './components/PastureFilters'
import MantenimientoModal from './components/MantenimientoModal'

const Pastures = () => {
  const {
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    deleteVisible,
    setDeleteVisible,
    currentPasture,
    setCurrentPasture,
    deleteConfirmation,
    setDeleteConfirmation,
    pastures,
    estadosPotrero,
    tiposMantenimiento,
    addPasture,
    setAddPasture,
    handleAddPasture,
    handleEditPasture,
    handleDeletePasture,
    searchTerm,
    setSearchTerm,
    filterEstadoPotrero,
    setFilterEstadoPotrero,
    filterTipoMantenimiento,
    setFilterTipoMantenimiento,
    filteredPastures,
  } = usePastures()

  // --- Estados para Dashboard y Rotación ---
  const [mantenimientoModalVisible, setMantenimientoModalVisible] = useState(false)
  const navigate = useNavigate()

  return (
    <CCard className="mb-4 shadow-sm border-0">
      <CCardHeader className="d-flex justify-content-between align-items-center bg-white border-bottom pb-3 pt-3">
        <div>
          <h4 className="mb-0 text-primary-green">Gestión de Potreros</h4>
          <p className="text-muted small mb-0">Administración de inventario de pasturas</p>
        </div>
        <div>
          <CButton
            color="primary"
            variant="outline"
            className="me-2"
            onClick={() => navigate('/pastures/activity')}
          >
            <CIcon icon={cilList} className="me-2" />
            Control de Actividad y Rotación
          </CButton>
          {/* <CButton
            color="info"
            className="text-white me-2"
            onClick={() => setMantenimientoModalVisible(true)}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Reg. Mantenimiento
          </CButton> */}
          <CButton color="success" className="text-white" onClick={() => setVisible(!visible)}>
            <CIcon icon={cilPlus} className="me-2" />
            Nuevo Potrero
          </CButton>
        </div>
      </CCardHeader>

      <CCardBody>
        <>
          <PastureFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterEstadoPotrero={filterEstadoPotrero}
            setFilterEstadoPotrero={setFilterEstadoPotrero}
            filterTipoMantenimiento={filterTipoMantenimiento}
            setFilterTipoMantenimiento={setFilterTipoMantenimiento}
            estadosPotrero={estadosPotrero}
            tiposMantenimiento={tiposMantenimiento}
          />
          <PasturesTable
            pastures={filteredPastures}
            setCurrentPasture={setCurrentPasture}
            setEditVisible={setEditVisible}
            setDeleteVisible={setDeleteVisible}
          />
        </>
      </CCardBody>

      <AddPastureModal
        visible={visible}
        setVisible={setVisible}
        addPasture={addPasture}
        setAddPasture={setAddPasture}
        handleAddPasture={handleAddPasture}
        estadosPotrero={estadosPotrero}
        tiposMantenimiento={tiposMantenimiento}
      />
      <EditPastureModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
        currentPasture={currentPasture}
        setCurrentPasture={setCurrentPasture}
        handleEditPasture={handleEditPasture}
        estadosPotrero={estadosPotrero}
        tiposMantenimiento={tiposMantenimiento}
      />
      <DeletePastureModal
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        handleDeletePasture={handleDeletePasture}
      />

      <MantenimientoModal
        visible={mantenimientoModalVisible}
        onClose={() => setMantenimientoModalVisible(false)}
        potreroId={null}
        pastures={pastures}
        onSuccess={() => {
          toast.success('Mantenimiento registrado exitosamente')
          // No needed reload dashboard logic here anymore as list updates separately or stays static
        }}
      />
    </CCard>
  )
}

export default Pastures
