import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CCard, CButton, CCardBody, CCardHeader, CAlert } from '@coreui/react'

import { useCattle } from './hooks/useCattle'
import CattleTable from './components/CattleTable'
import AddCattleModal from './components/AddCattleModal'
import EditCattleModal from './components/EditCattleModal'
import DeleteCattleModal from './components/DeleteCattleModal'
import ViewCattleModal from './components/ViewCattleModal'

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
    razas,
    colores,
    etapas,
    estados,
    toast,
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
      </CCardHeader>

      <CCardBody>
        <CattleTable
          cattle={cattle}
          setCurrentCattle={setCurrentCattle}
          setEditVisible={setEditVisible}
          setDeleteVisible={setDeleteVisible}
          setViewVisible={setViewVisible}
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

      {toast.show && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            minWidth: 300,
          }}
        >
          <CAlert color={toast.color} className="text-center m-0">
            {toast.message}
          </CAlert>
        </div>
      )}
    </CCard>
  )
}

export default Cattle
