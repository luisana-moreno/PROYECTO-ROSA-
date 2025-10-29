import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { toast } from 'react-toastify'

const EditClientTypeSelection = ({ clientType, setClientType, isEditingExistingClient }) => (
  <CRow className="g-3 mt-2">
    <h4 className="text-green mt-1 me-5">Seleccione Tipo de Cliente</h4>
    <CCol md={12}>
      <CFormSelect
        className="modal-name custom-select"
        placeholder="Tipo de Cliente"
        aria-label="tipo de Cliente"
        value={clientType || ''}
        onChange={(e) => setClientType(e.target.value)}
        disabled={isEditingExistingClient} // Deshabilitar si ya es un cliente existente
      >
        <option value={''}>Seleccione el Tipo de Cliente</option>
        <option value={'Company'}>Juridico</option>
        <option value={'Person'}>Natural</option>
      </CFormSelect>
      <small className="text-muted">Seleccione el tipo de cliente.</small>
    </CCol>
  </CRow>
)

const EditPersonClientFields = ({ currentClient, setCurrentClient }) => (
  <>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Nombre"
          aria-label="Nombre"
          value={currentClient?.firts_name || ''}
          onChange={(e) => setCurrentClient({ ...currentClient, firts_name: e.target.value })}
        />
        <small className="text-muted">Ingrese el nombre.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Apellido"
          aria-label="Apellido"
          value={currentClient?.Firts_Las_Name || ''}
          onChange={(e) => setCurrentClient({ ...currentClient, Firts_Las_Name: e.target.value })}
        />
        <small className="text-muted">Ingrese el apellido.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Numero de Documento"
          aria-label="Numero de Documento"
          value={currentClient?.Document_Number || ''}
          onChange={(e) => setCurrentClient({ ...currentClient, Document_Number: e.target.value })}
        />
        <small className="text-muted">Ingrese el numero de documento.</small>
      </CCol>
    </CRow>
  </>
)

const EditCompanyClientFields = ({ currentClient, setCurrentClient }) => (
  <>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Nombre de la Empresa"
          aria-label="Nombre de la Empresa"
          value={currentClient?.company_name || ''}
          onChange={(e) => setCurrentClient({ ...currentClient, company_name: e.target.value })}
        />
        <small className="text-muted">Ingrese el nombre de la empresa.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Rif"
          aria-label="Rif"
          value={currentClient?.Rif || ''}
          onChange={(e) => setCurrentClient({ ...currentClient, Rif: e.target.value })}
        />
        <small className="text-muted">Ingrese el rif.</small>
      </CCol>
    </CRow>
  </>
)

const EditCommonClientFields = ({ currentClient, setCurrentClient }) => (
  <>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Telefono"
          aria-label="Telefono"
          value={currentClient?.Phone || ''}
          onChange={(e) => setCurrentClient({ ...currentClient, Phone: e.target.value })}
        />
        <small className="text-muted">Ingrese el telefono.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Direccion"
          aria-label="Direccion"
          value={currentClient?.Address || ''}
          onChange={(e) => setCurrentClient({ ...currentClient, Address: e.target.value })}
        />
        <small className="text-muted">Ingrese la direccion.</small>
      </CCol>
      <CCol md={12}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Email"
          aria-label="Email"
          value={currentClient?.email || ''}
          onChange={(e) => setCurrentClient({ ...currentClient, email: e.target.value })}
        />
        <small className="text-muted">Ingrese el email.</small>
      </CCol>
    </CRow>
  </>
)

const EditClientModal = ({
  editVisible,
  setEditVisible,
  currentClient,
  setCurrentClient,
  handleEditClient,
}) => {
  const [clientTypeSelected, setClientTypeSelected] = useState('')

  useEffect(() => {
    if (editVisible && currentClient) {
      setClientTypeSelected(currentClient.client_type || '')
    } else if (!editVisible) {
      setClientTypeSelected('') // Resetear la selección cuando el modal se cierra
    }
  }, [editVisible, currentClient])

  const handleClientTypeChange = (type) => {
    setClientTypeSelected(type)
    setCurrentClient((prev) => ({ ...prev, client_type: type }))
  }

  const validateForm = () => {
    if (!clientTypeSelected) {
      toast.error('El tipo de cliente es requerido.')
      return false
    }

    if (clientTypeSelected === 'Company') {
      if (!currentClient.company_name) {
        toast.error('El nombre de la empresa es requerido.')
        return false
      }
      if (!currentClient.Rif) {
        toast.error('El Rif es requerido.')
        return false
      }
    } else if (clientTypeSelected === 'Person') {
      if (!currentClient.firts_name) {
        toast.error('El nombre es requerido.')
        return false
      }
      if (!currentClient.Firts_Las_Name) {
        toast.error('El apellido es requerido.')
        return false
      }
      if (!currentClient.Document_Number) {
        toast.error('El número de documento es requerido.')
        return false
      }
    }

    if (!currentClient.Phone) {
      toast.error('El teléfono es requerido.')
      return false
    } else if (!/^\d{11}$/.test(currentClient.Phone)) {
      toast.error('El teléfono debe tener 11 dígitos numéricos.')
      return false
    }
    if (!currentClient.Address) {
      toast.error('La dirección es requerida.')
      return false
    }
    if (!currentClient.email) {
      toast.error('El email es requerido.')
      return false
    } else if (!/\S+@\S+\.\S+/.test(currentClient.email)) {
      toast.error('El email no es válido.')
      return false
    }

    return true
  }

  const handleEditClientWithValidation = () => {
    if (validateForm()) {
      handleEditClient()
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={() => setEditVisible(false)}
    >
      <CModalHeader className="modal-module">
        <CModalTitle className="text-white">Editar Datos del cliente</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <EditClientTypeSelection
          clientType={clientTypeSelected}
          setClientType={handleClientTypeChange}
          isEditingExistingClient={!!currentClient?.client_type}
        />

        {clientTypeSelected === 'Person' && (
          <EditPersonClientFields
            currentClient={currentClient}
            setCurrentClient={setCurrentClient}
          />
        )}
        {clientTypeSelected === 'Company' && (
          <EditCompanyClientFields
            currentClient={currentClient}
            setCurrentClient={setCurrentClient}
          />
        )}

        {clientTypeSelected && (
          <EditCommonClientFields
            currentClient={currentClient}
            setCurrentClient={setCurrentClient}
          />
        )}
      </CModalBody>
      <CModalFooter>
        <CButton
          className="button-no-hover-green text-white"
          onClick={handleEditClientWithValidation}
          disabled={!clientTypeSelected}
        >
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditClientModal
