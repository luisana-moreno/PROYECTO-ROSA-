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
} from '@coreui/react'

const ClientTable = ({
  clients,
  setCurrentClient,
  setEditVisibleClient,
  setDeleteVisibleClient,
}) => {
  const [activeKey, setActiveKey] = useState(1)

  return (
    <>
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
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
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
              {clients
                .filter((client) => client.client_type === 'Person')
                .map((client) => (
                  <CTableRow key={client.ttr_idclient}>
                    <CTableDataCell>{client?.ttr_nombrecl || ''} </CTableDataCell>
                    <CTableDataCell>{client?.ttr_apellido || ''} </CTableDataCell>
                    <CTableDataCell>{client?.ttr_documecl || ''} </CTableDataCell>
                    <CTableDataCell>{client?.ttr_telefono || ''} </CTableDataCell>
                    <CTableDataCell>{client?.ttr_direccio || ''} </CTableDataCell>
                    <CTableDataCell>{client?.ttr_correocl || ''} </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex">
                        <CButton
                          className="me-2 mb-2"
                          size="sm"
                          color="info"
                          variant="outline"
                          onClick={() => {
                            setCurrentClient({
                              id: client.ttr_idclient,
                              client_type: client.client_type,
                              company_name: client.ttr_nomcompa,
                              firts_name: client.ttr_nombrecl,
                              Firts_Las_Name: client.ttr_apellido,
                              Document_Number: client.ttr_documecl,
                              Rif: client.ttr_documecl, // Asumiendo que Rif es ttr_documecl para empresas
                              Phone: client.ttr_telefono,
                              Address: client.ttr_direccio,
                              email: client.ttr_correocl,
                            })
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
                            setCurrentClient({
                              id: client.ttr_idclient,
                              client_type: client.client_type,
                              company_name: client.ttr_nomcompa,
                              firts_name: client.ttr_nombrecl,
                              Firts_Las_Name: client.ttr_apellido,
                              Document_Number: client.ttr_documecl,
                              Rif: client.ttr_documecl, // Asumiendo que Rif es ttr_documecl para empresas
                              Phone: client.ttr_telefono,
                              Address: client.ttr_direccio,
                              email: client.ttr_correocl,
                            })
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
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="text-green">Nombre de la Empresa</CTableHeaderCell>
                <CTableHeaderCell className="text-green">Rif</CTableHeaderCell>
                <CTableHeaderCell className="text-green">Telefono</CTableHeaderCell>
                <CTableHeaderCell className="text-green">Direccion</CTableHeaderCell>
                <CTableHeaderCell className="text-green">Email</CTableHeaderCell>
                <CTableHeaderCell className="text-green">Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {clients
                .filter((client) => client.client_type === 'Company')
                .map((client) => (
                  <CTableRow key={client.ttr_idclient}>
                    <CTableDataCell>{client?.ttr_nomcompa || ''}</CTableDataCell>
                    <CTableDataCell>{client?.ttr_documecl || ''}</CTableDataCell>
                    <CTableDataCell>{client?.ttr_telefono || ''}</CTableDataCell>
                    <CTableDataCell>{client?.ttr_direccio || ''}</CTableDataCell>
                    <CTableDataCell>{client?.ttr_correocl || ''}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex">
                        <CButton
                          className="me-2 mb-2"
                          size="sm"
                          color="info"
                          variant="outline"
                          onClick={() => {
                            setCurrentClient({
                              id: client.ttr_idclient,
                              client_type: client.client_type,
                              company_name: client.ttr_nomcompa,
                              firts_name: client.ttr_nombrecl,
                              Firts_Las_Name: client.ttr_apellido,
                              Document_Number: client.ttr_documecl,
                              Rif: client.ttr_documecl, // Asumiendo que Rif es ttr_documecl para empresas
                              Phone: client.ttr_telefono,
                              Address: client.ttr_direccio,
                              email: client.ttr_correocl,
                            })
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
                            setCurrentClient({
                              id: client.ttr_idclient,
                              client_type: client.client_type,
                              company_name: client.ttr_nomcompa,
                              firts_name: client.ttr_nombrecl,
                              Firts_Las_Name: client.ttr_apellido,
                              Document_Number: client.ttr_documecl,
                              Rif: client.ttr_documecl, // Asumiendo que Rif es ttr_documecl para empresas
                              Phone: client.ttr_telefono,
                              Address: client.ttr_direccio,
                              email: client.ttr_correocl,
                            })
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
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default ClientTable
