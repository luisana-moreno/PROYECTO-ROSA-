import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import { helpFetch } from 'src/helpper/helpFetch'
const { get, post, put, del } = helpFetch()
import {
  cilPlus,
} from '@coreui/icons'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CFormSelect,
  CTableBody,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const SectionOne = ({ addClient, setAddClient }) => (
  <div>
    <CRow className="g-3 mt-2">
      <h4 className="text-green mt-1 me-5">Datos del Cliente</h4>
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="Tipo de Cliente"
          aria-label="tipo de Cliente"
          value={addClient.client_type || ''}
          onChange={(e) => setAddClient({ ...addClient, client_type: e.target.value })}
        >
          <option value={''}>Tipo de Cliente</option>
          <option value={'Company'}>Juridico</option>
          <option value={'Person'}>Natural</option>
        </CFormSelect>
        <small className="text-muted">Ingrese el tipo de cliente.</small>
      </CCol>
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
    </CRow>
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
          placeholder="numero de documento"
          aria-label="numero de documento"
          value={addClient.Document_Number}
          onChange={(e) => setAddClient({ ...addClient, Document_Number: e.target.value })}
        />
        <small className="text-muted">Ingrese el numero de documento.</small>
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
  </div>
)

const EditSectionOne = ({ currentClient, setCurrentClient }) => (
  <div>
    <CRow className="g-3 mt-2">
      <h4 className="text-green mt-1 me-5">Datos del cliente</h4>
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="Client Type"
          aria-label="Client Type"
          value={currentClient?.client_type || ''}
          onChange={(e) => setCurrentClient({ ...currentClient, client_type: e.target.value })}
        >
          <option value={''}>Tipo de cliente</option>
          <option value={'Company'}>Juridico</option>
          <option value={'Person'}>Natural</option>
        </CFormSelect>
        <small className="text-muted">Ingrese el tipo de cliente.</small>
      </CCol>
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
    </CRow>
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
  </div>
)

const Client = () => {
  const [visibleClient, setVisibleClient] = useState(false)
  const [editVisibleClient, setEditVisibleClient] = useState(false)
  const [deleteVisibleClient, setDeleteVisibleClient] = useState(false)
  const [currentSectionClient, setCurrentSectionClient] = useState(0)
  const [currentEditSectionClient, setCurrentEditSectionClient] = useState(0)
  const [activeKey, setActiveKey] = useState(1)
  const [currentClient, setCurrentClient] = useState(null)
  const [deleteConfirmationClient, setDeleteConfirmationClient] = useState('')
  const [client, setClient] = useState([
    { id: 1, client_type: 'Person', company_name: '', firts_name: 'Juan', Firts_Las_Name: 'Perez', Document_Number: '12345678', Rif: '', Phone: '111-222-3333', Address: 'Calle Falsa 123', email: 'juan.perez@example.com' },
    { id: 2, client_type: 'Company', company_name: 'Tech Solutions', firts_name: '', Firts_Las_Name: '', Document_Number: '', Rif: 'J-12345678-9', Phone: '444-555-6666', Address: 'Av. Principal 456', email: 'contact@techsolutions.com' },
    { id: 3, client_type: 'Person', company_name: '', firts_name: 'Maria', Firts_Las_Name: 'Gomez', Document_Number: '87654321', Rif: '', Phone: '777-888-9999', Address: 'Urb. El Bosque', email: 'maria.gomez@example.com' },
    { id: 4, client_type: 'Company', company_name: 'Global Corp', firts_name: '', Firts_Las_Name: '', Document_Number: '', Rif: 'G-98765432-1', Phone: '333-222-1111', Address: 'Centro Comercial', email: 'info@globalcorp.com' },
  ])
  const [addClient, setAddClient] = useState({
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
  const [currentPagePerson, setCurrentPagePerson] = useState(1)
  const [currentPageCompany, setCurrentPageCompany] = useState(1)
  const [clientsPerPage] = useState(10)

  // Get current clients for pagination
  const indexOfLastClientPerson = currentPagePerson * clientsPerPage
  const indexOfFirstClientPerson = indexOfLastClientPerson - clientsPerPage
  const currentClientsPerson = client.filter(c => c.client_type === 'Person').slice(indexOfFirstClientPerson, indexOfLastClientPerson)

  const indexOfLastClientCompany = currentPageCompany * clientsPerPage
  const indexOfFirstClientCompany = indexOfLastClientCompany - clientsPerPage
  const currentClientsCompany = client.filter(c => c.client_type === 'Company').slice(indexOfFirstClientCompany, indexOfLastClientCompany)

  // Change page
  const paginatePerson = (pageNumber) => setCurrentPagePerson(pageNumber)
  const paginateCompany = (pageNumber) => setCurrentPageCompany(pageNumber)

  // Cargar clientes al iniciar
  useEffect(() => {
    get('client').then(data => {
      if (data && data.length > 0) {
        setClient(data)
      } else {
        setClient([
          { id: 1, client_type: 'Person', company_name: '', firts_name: 'Juan', Firts_Las_Name: 'Perez', Document_Number: '12345678', Rif: '', Phone: '111-222-3333', Address: 'Calle Falsa 123', email: 'juan.perez@example.com' },
          { id: 2, client_type: 'Company', company_name: 'Tech Solutions', firts_name: '', Firts_Las_Name: '', Document_Number: '', Rif: 'J-12345678-9', Phone: '444-555-6666', Address: 'Av. Principal 456', email: 'contact@techsolutions.com' },
          { id: 3, client_type: 'Person', company_name: '', firts_name: 'Maria', Firts_Las_Name: 'Gomez', Document_Number: '87654321', Rif: '', Phone: '777-888-9999', Address: 'Urb. El Bosque', email: 'maria.gomez@example.com' },
          { id: 4, client_type: 'Company', company_name: 'Global Corp', firts_name: '', Firts_Las_Name: '', Document_Number: '', Rif: 'G-98765432-1', Phone: '333-222-1111', Address: 'Centro Comercial', email: 'info@globalcorp.com' },
        ]);
      }
    })
  }, [])

  const sections = [
    <SectionOne addClient={addClient} setAddClient={setAddClient} />
  ]
  const editsections = [
    <EditSectionOne currentClient={currentClient} setCurrentClient={setCurrentClient} />
  ]

  // Agregar cliente
  const handleAddClient = () => {
    post('client', addClient).then(newClient => {
      if (newClient) setClient([...client, newClient])
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
      setVisibleClient(false)
    })
  }

  // Editar cliente
  const handleEditClient = () => {
    if (!currentClient || !currentClient.id) {
      console.error('No Client selected for editing.')
      return
    }
    put('client', currentClient.id, currentClient).then(updated => {
      if (updated) setClient(client.map(c => c.id === updated.id ? updated : c))
      setEditVisibleClient(false)
    })
  }

  // Eliminar cliente
  const handleDeleteClient = () => {
    if (!currentClient || !currentClient.id) {
      console.error('No Client selected for deletion.')
      return
    }
    if (deleteConfirmationClient === 'confirmar') {
      del('client', currentClient.id).then(() => {
        setClient(client.filter(c => c.id !== currentClient.id))
        setDeleteVisibleClient(false)
      })
    } else {
      console.error('Delete confirmation failed.')
    }
  }

  return (
    <CCard>
      <CCardHeader>
        <h4 className=" typography-color-title  mb-0 d-flex justify-content-between align-items-center">
          Registro de Clientes
          <CButton
            className="button-no-hover-green  text-white"
            onClick={() => setVisibleClient(true)}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Cliente
          </CButton>
        </h4>
      </CCardHeader>

      <CCardBody>
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink
              className={`c-nav-link ${activeKey === 1 ? 'active' : ''}`}
              active={activeKey === 1}
              onClick={() => setActiveKey(1)}
            >
              Natural
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              className={`c-nav-link ${activeKey === 2 ? 'active' : ''}`}
              active={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              Juridico
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
            <CTable hover responsive className="shadow-sm">
              <CTableHead className="table-header-custom">
                <CTableRow>
                  <CTableHeaderCell className="text-green">N°</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Nombre</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Apellido</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Numero de Documento</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Telefono</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Direccion</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Email</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentClientsPerson
                  .map((client, index) => (
                    <CTableRow key={client.id}>
                      <CTableDataCell>{indexOfFirstClientPerson + index + 1}</CTableDataCell>
                      <CTableDataCell>{client?.firts_name || ''} </CTableDataCell>
                      <CTableDataCell>{client?.Firts_Las_Name || ''} </CTableDataCell>
                      <CTableDataCell>{client?.Document_Number || ''} </CTableDataCell>
                      <CTableDataCell>{client?.Phone || ''} </CTableDataCell>
                      <CTableDataCell>{client?.Address || ''} </CTableDataCell>
                      <CTableDataCell>{client?.email || ''} </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex">
                          <CButton
                            className="me-2 mb-2"
                            size="sm"
                            color="info"
                            variant="outline"
                            onClick={() => {
                              setCurrentClient(client)
                              setEditVisibleClient(true)
                            }}
                          >
                            Editar
                          </CButton>
                          <CButton
                            className="me-2 mb-2"
                            size="sm"
                            color="danger"
                            variant="outline"
                            onClick={() => {
                              setCurrentClient(client)
                              setDeleteVisibleClient(true)
                            }}
                          >
                            Eliminar
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <CPagination align="center" aria-label="Page navigation example">
              {Array.from({ length: Math.ceil(client.filter(c => c.client_type === 'Person').length / clientsPerPage) }, (_, i) => (
                <CPaginationItem
                  key={i + 1}
                  active={i + 1 === currentPagePerson}
                  onClick={() => paginatePerson(i + 1)}
                >
                  {i + 1}
                </CPaginationItem>
              ))}
            </CPagination>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
            <CTable hover responsive className="shadow-sm">
              <CTableHead className="table-header-custom">
                <CTableRow>
                  <CTableHeaderCell className="text-green">N°</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Nombre de la Empresa</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Rif</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Telefono</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Direccion</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Email</CTableHeaderCell>
                  <CTableHeaderCell className="text-green">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentClientsCompany
                  .map((client, index) => (
                    <CTableRow key={client.id}>
                      <CTableDataCell>{indexOfFirstClientCompany + index + 1}</CTableDataCell>
                      <CTableDataCell>{client?.company_name || ''}</CTableDataCell>
                      <CTableDataCell>{client?.Rif || ''}</CTableDataCell>
                      <CTableDataCell>{client?.Phone || ''}</CTableDataCell>
                      <CTableDataCell>{client?.Address || ''}</CTableDataCell>
                      <CTableDataCell>{client?.email || ''}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex">
                          <CButton
                            className="me-2 mb-2"
                            size="sm"
                            color="info"
                            variant="outline"
                            onClick={() => {
                              setCurrentClient(client)
                              setEditVisibleClient(true)
                            }}
                          >
                            Editar
                          </CButton>
                          <CButton
                            className="me-2 mb-2"
                            size="sm"
                            color="danger"
                            variant="outline"
                            onClick={() => {
                              setCurrentClient(client)
                              setDeleteVisibleClient(true)
                            }}
                          >
                            Eliminar
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <CPagination align="center" aria-label="Page navigation example">
              {Array.from({ length: Math.ceil(client.filter(c => c.client_type === 'Company').length / clientsPerPage) }, (_, i) => (
                <CPaginationItem
                  key={i + 1}
                  active={i + 1 === currentPageCompany}
                  onClick={() => paginateCompany(i + 1)}
                >
                  {i + 1}
                </CPaginationItem>
              ))}
            </CPagination>
          </CTabPane>
        </CTabContent>
      </CCardBody>
      <CModal
        alignment="center"
        scrollable
        visible={visibleClient}
        onClose={() => setVisibleClient(false)}
        className="modern-modal"
      >
        <CModalHeader className="modern-modal-header">
          <CModalTitle className="modern-modal-title">Datos del cliente</CModalTitle>
        </CModalHeader>
        <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {sections[currentSectionClient]}
        </CModalBody>
        <CModalFooter className="modern-modal-footer">
          <CButton className="button-no-hover-green text-white" onClick={handleAddClient}>
            Agregar
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        alignment="center"
        scrollable
        visible={editVisibleClient}
        onClose={() => setEditVisibleClient(false)}
        className="modern-modal"
      >
        <CModalHeader className="modern-modal-header">
          <CModalTitle className="modern-modal-title">Editar Datos del cliente</CModalTitle>
        </CModalHeader>
        <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {editsections[currentEditSectionClient]}
        </CModalBody>
        <CModalFooter className="modern-modal-footer">
          <CButton className="button-no-hover-green text-white" onClick={handleEditClient}>
            Guardar cambios
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={deleteVisibleClient} onClose={() => setDeleteVisibleClient(false)} className="modern-modal">
        <CModalHeader className="modern-modal-header">
          <CModalTitle className="modern-modal-title">Eliminar cliente</CModalTitle>
        </CModalHeader>
        <CModalBody className="modern-modal-body">
          <h6>Por favor escriba "confirmar" para eliminar el cliente</h6>
          <CFormInput
            placeholder="confirmar"
            className="modal-border"
            value={deleteConfirmationClient}
            onChange={(e) => setDeleteConfirmationClient(e.target.value)}
          />
        </CModalBody>
        <CModalFooter className="modern-modal-footer">
          <CButton className="button-no-hover-green" onClick={() => setDeleteVisibleClient(false)}>
            <h6 className="typography-color">Salir</h6>
          </CButton>
          <CButton className="button-no-hover-green" onClick={handleDeleteClient}>
            <h6 className="typography-color">Eliminar</h6>
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}
export default Client
