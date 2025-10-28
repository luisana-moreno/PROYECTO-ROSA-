import { useState, useEffect } from 'react'
import { userService } from 'src/api/userService'
import { roleService } from 'src/api/roleService' // Importar roleService

export const useUsers = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([]) // Declarar estado para roles
  const [addUserForm, setAddUserForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    idRol: '',
    contrasena: '',
  })

  useEffect(() => {
    fetchUsers()
    fetchRoles() // Llamar a fetchRoles al montar el componente
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
      setUsers([]) // Asegura que 'users' siempre sea un array
      // Aquí podrías añadir un estado para mostrar un mensaje de error en la UI
    }
  }

  const handleAddUser = async () => {
    try {
      const newUser = await userService.createUser(addUserForm)
      if (newUser) {
        setUsers([...users, newUser])
        setAddUserForm({
          nombre: '',
          apellido: '',
          correo: '',
          telefono: '',
          idRol: '',
          contrasena: '',
        })
        setVisible(false)
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error)
      // Manejo de errores para el usuario
    }
  }

  const handleEditUser = async () => {
    if (!currentUser || !currentUser.ttr_idusuar) {
      console.error('No user selected for editing.')
      return
    }
    try {
      const updated = await userService.updateUser(currentUser.ttr_idusuar, currentUser)
      if (updated) {
        setUsers(users.map((u) => (u.ttr_idusuar === updated.ttr_idusuar ? updated : u)))
        setEditVisible(false)
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      // Manejo de errores para el usuario
    }
  }

  const handleDeleteUser = async () => {
    if (!currentUser || !currentUser.ttr_idusuar) {
      console.error('No user selected for deletion.')
      return
    }
    if (deleteConfirmation === 'confirmar') {
      try {
        await userService.deleteUser(currentUser.ttr_idusuar)
        setUsers(users.filter((u) => u.ttr_idusuar !== currentUser.ttr_idusuar))
        setDeleteVisible(false)
        setDeleteConfirmation('')
      } catch (error) {
        console.error('Error al eliminar usuario:', error)
        // Manejo de errores para el usuario
      }
    } else {
      console.error('Delete confirmation failed.')
      // Mensaje al usuario de que la confirmación es incorrecta
    }
  }

  const fetchRoles = async () => {
    try {
      const data = await roleService.getRoles()
      setRoles(data)
    } catch (error) {
      console.error('Error al cargar roles:', error)
      setRoles([])
    }
  }

  return {
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
    setUsers, // Podría ser útil para actualizaciones directas si es necesario
    addUserForm,
    setAddUserForm,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    roles, // Estado de roles de usuario
  }
}
