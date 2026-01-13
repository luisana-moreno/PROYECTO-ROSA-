import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilUser } from '@coreui/icons'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'

import { useUsers } from './hooks/useUsers'
import UsersTable from './components/UsersTable'
import AddUserModal from './components/AddUserModal'
import EditUserModal from './components/EditUserModal'
import DeleteUserModal from './components/DeleteUserModal'
import UserFilters from './components/UserFilters'
import ReactivateUserModal from './components/ReactivateUserModal'

const Users = () => {
  const {
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    deleteVisible,
    setDeleteVisible,
    currentUser,
    setCurrentUser,
    deleteConfirmation,
    setDeleteConfirmation,
    users,
    addUserForm,
    setAddUserForm,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    roles,
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    filteredUsers,
    // Reactivación
    reactivateVisible,
    setReactivateVisible,
    reactivateConfirmation,
    setReactivateConfirmation,
    handleReactivateUser,
    filterStatus,
    setFilterStatus,
  } = useUsers()

  return (
    <>
      {/* Header Card con descripción */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex align-items-center">
                <CIcon icon={cilUser} className="me-2" size="lg" style={{ color: '#28a745' }} />
                <strong>Gestión de Usuarios</strong>
              </div>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis mb-0">
                Administra los usuarios del sistema. Crea, edita y elimina cuentas de usuario,
                asigna roles y controla el acceso a diferentes módulos de la aplicación.
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
              <strong>Lista de Usuarios</strong>
              <CButton color="success" onClick={() => setVisible(!visible)}>
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Usuario
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CNav variant="tabs" className="mb-3">
                <CNavItem>
                  <CNavLink
                    active={filterStatus === 'ACTIVO'}
                    onClick={() => setFilterStatus('ACTIVO')}
                    style={{ cursor: 'pointer', color: filterStatus === 'ACTIVO' ? '#2eb85c' : '' }}
                  >
                    Activos
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    active={filterStatus === 'INACTIVO'}
                    onClick={() => setFilterStatus('INACTIVO')}
                    style={{
                      cursor: 'pointer',
                      color: filterStatus === 'INACTIVO' ? '#e55353' : '',
                    }}
                  >
                    Inactivos
                  </CNavLink>
                </CNavItem>
              </CNav>

              {/* Filtros de búsqueda */}
              <UserFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterRole={filterRole}
                setFilterRole={setFilterRole}
                roles={roles}
              />

              {/* Tabla de usuarios */}
              <UsersTable
                users={filteredUsers}
                setCurrentUser={setCurrentUser}
                setEditVisible={setEditVisible}
                setDeleteVisible={setDeleteVisible}
                setReactivateVisible={setReactivateVisible}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modales */}
      <AddUserModal
        visible={visible}
        setVisible={setVisible}
        addUserForm={addUserForm}
        setAddUserForm={setAddUserForm}
        handleAddUser={handleAddUser}
        roles={roles}
      />
      <EditUserModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        handleEditUser={handleEditUser}
        roles={roles}
      />
      <DeleteUserModal
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        handleDeleteUser={handleDeleteUser}
      />
      <ReactivateUserModal
        reactivateVisible={reactivateVisible}
        setReactivateVisible={setReactivateVisible}
        reactivateConfirmation={reactivateConfirmation}
        setReactivateConfirmation={setReactivateConfirmation}
        handleReactivateUser={handleReactivateUser}
      />
    </>
  )
}

export default Users
