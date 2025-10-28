import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CCard, CButton, CCardBody, CCardHeader } from '@coreui/react'

import { useUsers } from './hooks/useUsers'
import UsersTable from './components/UsersTable'
import AddUserModal from './components/AddUserModal'
import EditUserModal from './components/EditUserModal'
import DeleteUserModal from './components/DeleteUserModal'

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
    roles, // Obtener roles del hook
  } = useUsers()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Gestion de Usuarios
          <CButton
            className="button-no-hover-green text-white"
            onClick={() => setVisible(!visible)}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Usuario
          </CButton>
        </h4>
      </CCardHeader>
      <CCardBody>
        <UsersTable
          users={users}
          setCurrentUser={setCurrentUser}
          setEditVisible={setEditVisible}
          setDeleteVisible={setDeleteVisible}
        />
      </CCardBody>

      <AddUserModal
        visible={visible}
        setVisible={setVisible}
        addUserForm={addUserForm}
        setAddUserForm={setAddUserForm}
        handleAddUser={handleAddUser}
        roles={roles} // Pasar roles al modal de agregar
      />

      <EditUserModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        handleEditUser={handleEditUser}
        roles={roles} // Pasar roles al modal de editar
      />

      <DeleteUserModal
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        handleDeleteUser={handleDeleteUser}
      />
    </CCard>
  )
}

export default Users
