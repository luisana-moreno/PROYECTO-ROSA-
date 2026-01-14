import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilGroup } from '@coreui/icons'
import { CCard, CButton, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react'

import { useClients } from './useClients'
import ClientTable from './ClientTable'
import AddClientModal from './AddClientModal'
import EditClientModal from './EditClientModal'
import DeleteClientModal from './DeleteClientModal'
import ClientFilters from './components/ClientFilters'

const Client = () => {
  const {
    visibleClient,
    setVisibleClient,
    editVisibleClient,
    setEditVisibleClient,
    deleteVisibleClient,
    setDeleteVisibleClient,
    currentClient,
    setCurrentClient,
    deleteConfirmationClient,
    setDeleteConfirmationClient,
    clients,
    addClientForm,
    setAddClientForm,
    handleAddClient,
    handleEditClient,
    handleDeleteClient,
    searchTerm,
    setSearchTerm,
    filteredClients,
    activeTab,
    setActiveTab,
    handleReactivateClient,
  } = useClients()

  return (
    <>
      {/* Header Card con descripción */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex align-items-center">
                <CIcon icon={cilGroup} className="me-2" size="lg" style={{ color: '#28a745' }} />
                <strong>Gestión de Clientes</strong>
              </div>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis mb-0">
                Administra la cartera de clientes. Registra compradores, gestiona información de
                contacto y mantén un seguimiento de las relaciones comerciales.
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
              <strong>Lista de Clientes</strong>
              <CButton color="success" onClick={() => setVisibleClient(true)}>
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Cliente
              </CButton>
            </CCardHeader>
            <CCardBody>
              {/* Filtros de búsqueda */}
              <ClientFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

              {/* Tabla de clientes */}
              <ClientTable
                clients={filteredClients}
                setCurrentClient={setCurrentClient}
                setEditVisibleClient={setEditVisibleClient}
                setDeleteVisibleClient={setDeleteVisibleClient}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onReactivate={handleReactivateClient}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modales */}
      <AddClientModal
        visible={visibleClient}
        setVisible={setVisibleClient}
        addClient={addClientForm}
        setAddClient={setAddClientForm}
        handleAddClient={handleAddClient}
      />
      <EditClientModal
        editVisible={editVisibleClient}
        setEditVisible={setEditVisibleClient}
        currentClient={currentClient}
        setCurrentClient={setCurrentClient}
        handleEditClient={handleEditClient}
      />
      <DeleteClientModal
        deleteVisible={deleteVisibleClient}
        setDeleteVisible={setDeleteVisibleClient}
        deleteConfirmationClient={deleteConfirmationClient}
        setDeleteConfirmationClient={setDeleteConfirmationClient}
        handleDeleteClient={handleDeleteClient}
      />
    </>
  )
}

export default Client
