import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CCard, CButton, CCardBody, CCardHeader } from '@coreui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useClients } from './useClients'
import ClientTable from './ClientTable'
import AddClientModal from './AddClientModal'
import EditClientModal from './EditClientModal'
import DeleteClientModal from './DeleteClientModal'

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
  } = useClients()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Registro de Clientes
          <CButton
            className="button-no-hover-green text-white"
            onClick={() => setVisibleClient(true)}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Cliente
          </CButton>
        </h4>
      </CCardHeader>

      <CCardBody>
        <ClientTable
          clients={clients}
          setCurrentClient={setCurrentClient}
          setEditVisibleClient={setEditVisibleClient}
          setDeleteVisibleClient={setDeleteVisibleClient}
        />
      </CCardBody>

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
      <ToastContainer />
    </CCard>
  )
}

export default Client
