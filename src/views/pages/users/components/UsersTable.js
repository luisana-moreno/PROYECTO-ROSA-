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
  CBadge,
  CAlert,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilCheckCircle } from '@coreui/icons'
import { usePagination } from '../../../../hooks/usePagination'

const UsersTable = ({
  users,
  setCurrentUser,
  setEditVisible,
  setDeleteVisible,
  setReactivateVisible,
}) => {
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(users, 10)
  const indexOfFirstUser = (currentPage - 1) * 10

  // Función para obtener el color del badge según el rol
  const getRoleBadgeColor = (roleName) => {
    const roleColors = {
      administrador: 'danger',
      veterinario: 'success',
      empleado: 'info',
      cliente: 'warning',
    }
    return roleColors[roleName?.toLowerCase()] || 'secondary'
  }

  return (
    <>
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>N°</CTableHeaderCell>
            <CTableHeaderCell>Nombre Completo</CTableHeaderCell>
            <CTableHeaderCell>Correo</CTableHeaderCell>
            <CTableHeaderCell>Teléfono</CTableHeaderCell>
            <CTableHeaderCell>Rol</CTableHeaderCell>
            <CTableHeaderCell>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentData.map((usr, index) => (
            <CTableRow key={usr.ttr_idusuar}>
              <CTableDataCell>{indexOfFirstUser + index + 1}</CTableDataCell>
              <CTableDataCell>
                <strong>
                  {usr?.ttr_nombrel || ''} {usr?.ttr_apellid || ''}
                </strong>
              </CTableDataCell>
              <CTableDataCell>{usr?.ttr_correoe || ''}</CTableDataCell>
              <CTableDataCell>{usr?.ttr_telefon || ''}</CTableDataCell>
              <CTableDataCell>
                <CBadge color={getRoleBadgeColor(usr?.ttr_nombrec)}>
                  {usr?.ttr_nombrec || 'Sin rol'}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentUser({
                      ttr_idusuar: usr.ttr_idusuar,
                      nombre: usr.ttr_nombrel,
                      apellido: usr.ttr_apellid,
                      correo: usr.ttr_correoe,
                      telefono: usr.ttr_telefon,
                      idRol: usr.ttr_idrolus,
                      contrasena: '',
                    })
                    setEditVisible(true)
                  }}
                >
                  <CIcon icon={cilPencil} size="sm" className="me-1" />
                  Editar
                </CButton>
                {usr.ttrEstado === 'INACTIVO' ? (
                  <CButton
                    color="success"
                    size="sm"
                    onClick={() => {
                      setCurrentUser(usr)
                      setReactivateVisible(true)
                    }}
                    style={{ color: 'white' }}
                  >
                    <CIcon icon={cilCheckCircle} size="sm" className="me-1" />
                    Reactivar
                  </CButton>
                ) : (
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setCurrentUser(usr)
                      setDeleteVisible(true)
                    }}
                  >
                    <CIcon icon={cilTrash} size="sm" className="me-1" />
                    Desactivar
                  </CButton>
                )}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {users.length === 0 && (
        <CAlert color="info">No hay usuarios registrados en el sistema.</CAlert>
      )}

      {/* Paginación */}
      {users.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination aria-label="Navegación de usuarios">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </CPaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <CPaginationItem
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </CPaginationItem>
          </CPagination>
        </div>
      )}
    </>
  )
}

export default UsersTable
