import React, { useState } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const UsersTable = ({ users, setCurrentUser, setEditVisible, setDeleteVisible }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10) // Número de usuarios por página

  // Obtener usuarios actuales
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <CTable hover responsive className="shadow-sm">
        <CTableHead className="table-header-custom">
          <CTableRow>
            <CTableHeaderCell className="text-green">N°</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Nombre</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Apellido</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Correo</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Telefono</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Cargo</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentUsers.map((usr, index) => (
            <CTableRow key={usr.ttr_idusuar}>
              <CTableDataCell>{indexOfFirstUser + index + 1}</CTableDataCell>
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
      <CPagination
        align="center"
        aria-label="Page navigation example"
        className="custom-pagination"
      >
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
          <CPaginationItem
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => paginate(i + 1)}
            color="success"
          >
            {i + 1}
          </CPaginationItem>
        ))}
      </CPagination>
    </>
  )
}

export default UsersTable
