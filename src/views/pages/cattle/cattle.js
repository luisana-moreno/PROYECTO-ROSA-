import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CCard, CButton, CCardBody, CCardHeader } from '@coreui/react'

import { useCattle } from './hooks/useCattle'
import CattleTable from './components/CattleTable'
import AddCattleModal from './components/AddCattleModal'
import EditCattleModal from './components/EditCattleModal'
import DeleteCattleModal from './components/DeleteCattleModal'
import ViewCattleModal from './components/ViewCattleModal'
import ExpBovModal from './components/ExpBovModal' // Importa el nuevo modal de expediente
import CattleFilters from './components/CattleFilters' // Importa el nuevo componente de filtros

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
    expBovVisible, // Nuevo estado
    setExpBovVisible, // Nuevo setter
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
    handleViewExpBov, // Nueva función
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
  } = useCattle()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Registro de Ganado
          <CButton
            className="button-no-hover-green text-white"
            onClick={() => setVisible(!visible)}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Bovino
          </CButton>
        </h4>
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
      </CCardHeader>
      <CCardBody>
        <CattleTable
          cattle={filteredCattle}
          setCurrentCattle={setCurrentCattle}
          setEditVisible={setEditVisible}
          setDeleteVisible={setDeleteVisible}
          setViewVisible={setViewVisible}
          handleViewExpBov={handleViewExpBov} // Pasa la nueva función
        />
      </CCardBody>
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
      {console.log(
        'Cattle.js: Rendering ExpBovModal with expBovVisible:',
        expBovVisible,
        'and currentCattle:',
        currentCattle,
      )}
      <ExpBovModal // Nuevo modal de expediente
        expBovVisible={expBovVisible}
        setExpBovVisible={setExpBovVisible}
        currentCattle={currentCattle}
      />
    </CCard>
  )
}

export default Cattle
