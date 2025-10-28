import React from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const UsersTable = ({ users, setCurrentUser, setEditVisible, setDeleteVisible }) => {
  console.log(users)
  return (
    <CTable hover responsive className="shadow-sm">
      <CTableHead className="table-header-custom">
        <CTableRow>
          <CTableHeaderCell className="text-green">Nombre</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Apellido</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Correo</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Telefono</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Cargo</CTableHeaderCell>
          <CTableHeaderCell className="text-green">Acciones</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {users.map((usr) => (
          <CTableRow key={usr.ttr_idusuar}>
            <CTableDataCell>{usr?.ttr_nombrel || ''}</CTableDataCell>
            <CTableDataCell>{usr?.ttr_apellid || ''}</CTableDataCell>
            <CTableDataCell>{usr?.ttr_correoe || ''}</CTableDataCell>
            <CTableDataCell>{usr?.ttr_telefon || ''}</CTableDataCell>
            <CTableDataCell>{usr?.ttr_nombrec || ''}</CTableDataCell>
            <CTableDataCell>
              <div className="d-flex">
                <CButton
                  className="me-2 mb-2"
                  size="sm"
                  color="info"
                  variant="outline"
                  onClick={() => {
                    setCurrentUser({
                      ttr_idusuar: usr.ttr_idusuar,
                      nombre: usr.ttr_nombrel,
                      apellido: usr.ttr_apellid,
                      correo: usr.ttr_correoe,
                      telefono: usr.ttr_telefon,
                      idRol: usr.ttr_idrolus,
                      contrasena: '', // La contraseña no se carga para edición por seguridad
                    })
                    setEditVisible(true)
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
                    setCurrentUser(usr)
                    setDeleteVisible(true)
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
  )
}

export default UsersTable
