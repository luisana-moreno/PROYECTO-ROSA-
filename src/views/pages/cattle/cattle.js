import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilAnimal } from '@coreui/icons'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'

import { useCattle } from './hooks/useCattle'
import CattleTable from './components/CattleTable'
import AddCattleModal from './components/AddCattleModal'
import EditCattleModal from './components/EditCattleModal'
import DeleteCattleModal from './components/DeleteCattleModal'
import ViewCattleModal from './components/ViewCattleModal'
import ExpBovModal from './components/ExpBovModal'
import CattleFilters from './components/CattleFilters'
import ReactivateCattleModal from './components/ReactivateCattleModal'

const Cattle = () => {
  const {
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    deleteVisible,
    setDeleteVisible,
    viewVisible,
    setViewVisible,
    expBovVisible,
    setExpBovVisible,
    currentCattle,
    setCurrentCattle,
    deleteConfirmation,
    setDeleteConfirmation,
    cattle,
    addCattleForm,
    setAddCattleForm,
    handleAddCattle,
    handleEditCattle,
    handleDeleteCattle,
    handleViewExpBov,
    razas,
    colores,
    etapas,
    estados,
    searchTerm,
    setSearchTerm,
    filterRaza,
    setFilterRaza,
    filterColor,
    setFilterColor,
    filterEtapa,
    setFilterEtapa,
    filterEstado,
    setFilterEstado,
    filteredCattle,
    // Reactivation
    reactivateVisible,
    setReactivateVisible,
    reactivateConfirmation,
    setReactivateConfirmation,
    handleReactivateCattle,
    filterStatus,
    setFilterStatus,
  } = useCattle()

  return (
    <>
      {/* Header Card con descripción */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex align-items-center">
                <CIcon icon={cilAnimal} className="me-2" size="lg" style={{ color: '#28a745' }} />
                <strong>Gestión de Ganado</strong>
              </div>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis mb-0">
                Administra el inventario bovino de la finca. Registra animales, controla razas,
                etapas de vida, estados de salud y mantén un seguimiento completo del ganado.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Contenido Principal */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Registro de Bovinos</strong>
              <CButton color="success" onClick={() => setVisible(!visible)}>
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Bovino
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CNav variant="tabs" className="mb-3">
                <CNavItem>
                  <CNavLink
                    active={filterStatus === '3'}
                    onClick={() => setFilterStatus('3')}
                    style={{ cursor: 'pointer', color: filterStatus === '3' ? '#2eb85c' : '' }}
                  >
                    Activos
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    active={filterStatus === '1'}
                    onClick={() => setFilterStatus('1')}
                    style={{
                      cursor: 'pointer',
                      color: filterStatus === '1' ? '#e55353' : '',
                    }}
                  >
                    Inactivos
                  </CNavLink>
                </CNavItem>
              </CNav>

              {/* Filtros de búsqueda */}
              <CattleFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterRaza={filterRaza}
                setFilterRaza={setFilterRaza}
                filterColor={filterColor}
                setFilterColor={setFilterColor}
                filterEtapa={filterEtapa}
                setFilterEtapa={setFilterEtapa}
                filterEstado={filterEstado}
                setFilterEstado={setFilterEstado}
                razas={razas}
                colores={colores}
                etapas={etapas}
                estados={estados}
              />

              {/* Tabla de ganado */}
              <CattleTable
                cattle={filteredCattle}
                setCurrentCattle={setCurrentCattle}
                setEditVisible={setEditVisible}
                setDeleteVisible={setDeleteVisible}
                setViewVisible={setViewVisible}
                handleViewExpBov={handleViewExpBov}
                setReactivateVisible={setReactivateVisible}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modales */}
      <AddCattleModal
        visible={visible}
        setVisible={setVisible}
        addCattleForm={addCattleForm}
        setAddCattleForm={setAddCattleForm}
        handleAddCattle={handleAddCattle}
        razas={razas}
        colores={colores}
        etapas={etapas}
        estados={estados}
      />
      <EditCattleModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
        currentCattle={currentCattle}
        setCurrentCattle={setCurrentCattle}
        handleEditCattle={handleEditCattle}
        razas={razas}
        colores={colores}
        etapas={etapas}
        estados={estados}
      />
      <DeleteCattleModal
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        handleDeleteCattle={handleDeleteCattle}
      />
      <ViewCattleModal
        viewVisible={viewVisible}
        setViewVisible={setViewVisible}
        currentCattle={currentCattle}
      />
      <ExpBovModal
        expBovVisible={expBovVisible}
        setExpBovVisible={setExpBovVisible}
        currentCattle={currentCattle}
      />
      <ReactivateCattleModal
        reactivateVisible={reactivateVisible}
        setReactivateVisible={setReactivateVisible}
        reactivateConfirmation={reactivateConfirmation}
        setReactivateConfirmation={setReactivateConfirmation}
        handleReactivateCattle={handleReactivateCattle}
      />
    </>
  )
}

export default Cattle
