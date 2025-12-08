import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CCard, CCardHeader, CCardBody, CButton, CAlert } from '@coreui/react'

import { usePastures } from './hooks/usePastures'
import PasturesTable from './components/PasturesTable'
import AddPastureModal from './components/AddPastureModal'
import EditPastureModal from './components/EditPastureModal'
import DeletePastureModal from './components/DeletePastureModal'
import PastureFilters from './components/PastureFilters'

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
    toast,
    searchTerm,
    setSearchTerm,
    filterEstadoPotrero,
    setFilterEstadoPotrero,
    filterTipoMantenimiento,
    setFilterTipoMantenimiento,
    filteredPastures,
  } = usePastures()

  return (
    <CCard className="mb-4 shadow-sm border-0">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Gestión de Potreros</strong>
        <CButton color="success" className="text-white" onClick={() => setVisible(!visible)}>
          <CIcon icon={cilPlus} className="me-2" />
          Crear Potrero
        </CButton>
      </CCardHeader>
      <CCardBody>
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
      {toast && toast.show && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            minWidth: 300,
          }}
        >
          <CAlert color={toast.color} className="shadow-sm border-0">
            {toast.message}
          </CAlert>
        </div>
      )}
    </CCard>
  )
}

export default Pastures
