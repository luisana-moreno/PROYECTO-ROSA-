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

const ClientTypeSelection = ({ clientType, setClientType }) => (
  <CRow className="g-3 mt-2">
    <h4 className="text-green mt-1 me-5">Seleccione Tipo de Cliente</h4>
    <CCol md={12}>
      <CFormSelect
        className="modal-name custom-select"
        placeholder="Tipo de Cliente"
        aria-label="tipo de Cliente"
        value={clientType || ''}
        onChange={(e) => setClientType(e.target.value)}
      >
        <option value={''}>Seleccione el Tipo de Cliente</option>
        <option value={'Company'}>Juridico</option>
        <option value={'Person'}>Natural</option>
      </CFormSelect>
      <small className="text-muted">Seleccione el tipo de cliente.</small>
    </CCol>
  </CRow>
)

const PersonClientFields = ({ addClient, setAddClient }) => (
  <>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Nombre"
          aria-label="Nombre"
          value={addClient.firts_name}
          onChange={(e) => setAddClient({ ...addClient, firts_name: e.target.value })}
        />
        <small className="text-muted">Ingrese el nombre.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Apellido"
          aria-label="Apellido"
          value={addClient.Firts_Las_Name}
          onChange={(e) => setAddClient({ ...addClient, Firts_Las_Name: e.target.value })}
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
          value={addClient.Document_Number}
          onChange={(e) => setAddClient({ ...addClient, Document_Number: e.target.value })}
        />
        <small className="text-muted">Ingrese el numero de documento.</small>
      </CCol>
    </CRow>
  </>
)

const CompanyClientFields = ({ addClient, setAddClient }) => (
  <>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Nombre de la Empresa"
          aria-label="Nombre de la Empresa"
          value={addClient.company_name}
          onChange={(e) => setAddClient({ ...addClient, company_name: e.target.value })}
        />
        <small className="text-muted">Ingrese nombre de la empresa.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Rif"
          aria-label="Rif"
          value={addClient.Rif}
          onChange={(e) => setAddClient({ ...addClient, Rif: e.target.value })}
        />
        <small className="text-muted">Ingrese el rif.</small>
      </CCol>
    </CRow>
  </>
)

const CommonClientFields = ({ addClient, setAddClient }) => (
  <>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Telefono"
          aria-label="Telefono"
          value={addClient.Phone}
          onChange={(e) => setAddClient({ ...addClient, Phone: e.target.value })}
        />
        <small className="text-muted">Ingrese el numero de telefono.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Direccion"
          aria-label="Direccion"
          value={addClient.Address}
          onChange={(e) => setAddClient({ ...addClient, Address: e.target.value })}
        />
        <small className="text-muted">Ingrese la direccion.</small>
      </CCol>
      <CCol md={12}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="email"
          aria-label="email"
          value={addClient.email}
          onChange={(e) => setAddClient({ ...addClient, email: e.target.value })}
        />
        <small className="text-muted">Ingrese el email.</small>
      </CCol>
    </CRow>
  </>
)

const AddClientModal = ({ visible, setVisible, addClient, setAddClient, handleAddClient }) => {
  const [clientTypeSelected, setClientTypeSelected] = useState('')

  useEffect(() => {
    if (!visible) {
      setClientTypeSelected('') // Resetear la selección cuando el modal se cierra
      setAddClient({
        client_type: '',
        company_name: '',
        firts_name: '',
        Firts_Las_Name: '',
        Document_Number: '',
        Rif: '',
        Phone: '',
        Address: '',
        email: '',
      })
    }
  }, [visible, setAddClient])

  const handleClientTypeChange = (type) => {
    setClientTypeSelected(type)
    setAddClient((prev) => ({ ...prev, client_type: type }))
  }

  const validateForm = () => {
    if (!clientTypeSelected) {
      toast.error('Debe seleccionar un tipo de cliente.')
      return false
    }

    if (clientTypeSelected === 'Company') {
      if (!addClient.company_name) {
        toast.error('El nombre de la empresa es requerido.')
        return false
      }
      if (!addClient.Rif) {
        toast.error('El Rif es requerido.')
        return false
      }
    } else if (clientTypeSelected === 'Person') {
      if (!addClient.firts_name) {
        toast.error('El nombre es requerido.')
        return false
      }
      if (!addClient.Firts_Las_Name) {
        toast.error('El apellido es requerido.')
        return false
      }
      if (!addClient.Document_Number) {
        toast.error('El número de documento es requerido.')
        return false
      }
    }

    if (!addClient.Phone) {
      toast.error('El teléfono es requerido.')
      return false
    } else if (!/^\d{11}$/.test(addClient.Phone)) {
      toast.error('El teléfono debe tener 11 dígitos numéricos.')
      return false
    }
    if (!addClient.Address) {
      toast.error('La dirección es requerida.')
      return false
    }
    if (!addClient.email) {
      toast.error('El email es requerido.')
      return false
    } else if (!/\S+@\S+\.\S+/.test(addClient.email)) {
      toast.error('El email no es válido.')
      return false
    }

    return true
  }

  const handleAddClientWithValidation = () => {
    if (validateForm()) {
      handleAddClient()
    }
  }

  return (
    <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">Datos del cliente</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <ClientTypeSelection
          clientType={clientTypeSelected}
          setClientType={handleClientTypeChange}
        />

        {clientTypeSelected === 'Person' && (
          <PersonClientFields addClient={addClient} setAddClient={setAddClient} />
        )}
        {clientTypeSelected === 'Company' && (
          <CompanyClientFields addClient={addClient} setAddClient={setAddClient} />
        )}

        {clientTypeSelected && (
          <CommonClientFields addClient={addClient} setAddClient={setAddClient} />
        )}
      </CModalBody>
      <CModalFooter>
        <CButton
          className="button-no-hover-green text-white"
          onClick={handleAddClientWithValidation}
          disabled={!clientTypeSelected} // Deshabilitar el botón si no se ha seleccionado el tipo de cliente
        >
          Agregar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddClientModal
