import React, { useState } from 'react'
import {
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAlert,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilUser, cilBuilding } from '@coreui/icons'

const ClientTable = ({
  clients,
  setCurrentClient,
  setEditVisibleClient,
  setDeleteVisibleClient,
  activeTab,
  setActiveTab,
  openReactivateModal,
}) => {
  // Estado local para sub-tabs (Natural/Juridico)
  const [clientTypeTab, setClientTypeTab] = useState(1)

  const naturalClients = clients.filter((client) => client.client_type === 'Person')
  const juridicalClients = clients.filter((client) => client.client_type === 'Company')

  const handleEdit = (client) => {
    setCurrentClient({
      id: client.ttr_idclient,
      client_type: client.client_type,
      company_name: client.ttr_nomcompa,
      firts_name: client.ttr_nombrecl,
      Firts_Las_Name: client.ttr_apellido,
      Document_Number: client.ttr_documecl,
      Rif: client.ttr_documecl, // Ajuste para que coincida con modelo
      Phone: client.ttr_telefono,
      Address: client.ttr_direccio,
      email: client.ttr_correocl,
      ...client, // Keep original fields too
    })
    setEditVisibleClient(true)
  }

  const handleDelete = (client) => {
    setCurrentClient({ ...client, id: client.ttr_idclient })
    setDeleteVisibleClient(true)
  }

  console.log(clients)

  return (
    <>
      <CNav variant="tabs" role="tablist" className="mb-3">
        <CNavItem>
          <CNavLink
            active={activeTab === 'active'}
            onClick={() => setActiveTab('active')}
            style={{ cursor: 'pointer' }}
          >
            Activos
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeTab === 'inactive'}
            onClick={() => setActiveTab('inactive')}
            style={{ cursor: 'pointer' }}
          >
            Inactivos
          </CNavLink>
        </CNavItem>
      </CNav>

      <CNav variant="pills" role="tablist" className="mb-3 border-bottom pb-2">
        <CNavItem>
          <CNavLink
            active={clientTypeTab === 1}
            onClick={() => setClientTypeTab(1)}
            style={{ cursor: 'pointer' }}
          >
            <CIcon icon={cilUser} className="me-2" />
            Personas Naturales
            <CBadge color={activeTab === 'active' ? 'success' : 'secondary'} className="ms-2">
              {naturalClients.length}
            </CBadge>
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={clientTypeTab === 2}
            onClick={() => setClientTypeTab(2)}
            style={{ cursor: 'pointer' }}
          >
            <CIcon icon={cilBuilding} className="me-2" />
            Personas Jurídicas
            <CBadge color={activeTab === 'active' ? 'success' : 'secondary'} className="ms-2">
              {juridicalClients.length}
            </CBadge>
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent>
        {/* Tab Personas Naturales */}
        <CTabPane role="tabpanel" visible={clientTypeTab === 1}>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre Completo</CTableHeaderCell>
                <CTableHeaderCell>Documento</CTableHeaderCell>
                <CTableHeaderCell>Teléfono</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Dirección</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {naturalClients.map((client) => (
                <CTableRow key={client.ttr_idclient}>
                  <CTableDataCell>
                    <strong>
                      {client?.ttr_nombrecl || ''} {client?.ttr_apellido || ''}
                    </strong>
                  </CTableDataCell>
                  <CTableDataCell>{client?.ttr_documecl || '-'}</CTableDataCell>
                  <CTableDataCell>{client?.ttr_telefono || '-'}</CTableDataCell>
                  <CTableDataCell>{client?.ttr_correocl || '-'}</CTableDataCell>
                  <CTableDataCell>{client?.ttr_direccio || '-'}</CTableDataCell>
                  <CTableDataCell>
                    {activeTab === 'active' ? (
                      <>
                        <CButton
                          color="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(client)}
                          title="Editar"
                        >
                          <CIcon icon={cilPencil} size="sm" className="me-1" />
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(client)}
                          title="Desactivar"
                        >
                          <CIcon icon={cilTrash} size="sm" className="me-1" />
                        </CButton>
                      </>
                    ) : (
                      <CButton
                        color="success"
                        size="sm"
                        className="text-white"
                        onClick={() => openReactivateModal(client)}
                        title="Reactivar"
                      >
                        Reactivar
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          {naturalClients.length === 0 && (
            <CAlert color="info">
              No hay clientes naturales {activeTab === 'active' ? 'activos' : 'inactivos'}.
            </CAlert>
          )}
        </CTabPane>

        {/* Tab Personas Jurídicas */}
        <CTabPane role="tabpanel" visible={clientTypeTab === 2}>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Nombre de la Empresa</CTableHeaderCell>
                <CTableHeaderCell>RIF</CTableHeaderCell>
                <CTableHeaderCell>Teléfono</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Dirección</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {juridicalClients.map((client) => (
                <CTableRow key={client.ttr_idclient}>
                  <CTableDataCell>
                    <strong>{client?.ttr_nomcompa || '-'}</strong>
                  </CTableDataCell>
                  <CTableDataCell>{client?.ttr_documecl || '-'}</CTableDataCell>
                  <CTableDataCell>{client?.ttr_telefono || '-'}</CTableDataCell>
                  <CTableDataCell>{client?.ttr_correocl || '-'}</CTableDataCell>
                  <CTableDataCell>{client?.ttr_direccio || '-'}</CTableDataCell>
                  <CTableDataCell>
                    {activeTab === 'active' ? (
                      <>
                        <CButton
                          color="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(client)}
                          title="Editar"
                        >
                          <CIcon icon={cilPencil} size="sm" className="me-1" />
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={() => handleDelete(client)}
                          title="Desactivar"
                        >
                          <CIcon icon={cilTrash} size="sm" className="me-1" />
                        </CButton>
                      </>
                    ) : (
                      <CButton
                        color="success"
                        size="sm"
                        className="text-white"
                        onClick={() => openReactivateModal(client)}
                        title="Reactivar"
                      >
                        Reactivar
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          {juridicalClients.length === 0 && (
            <CAlert color="info">
              No hay clientes jurídicos {activeTab === 'active' ? 'activos' : 'inactivos'}.
            </CAlert>
          )}
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default ClientTable
