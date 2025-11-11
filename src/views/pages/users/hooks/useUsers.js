import { useState, useEffect } from 'react'
import { userService } from 'src/api/userService'
import { roleService } from 'src/api/roleService' // Importar roleService
import { toast } from 'react-toastify' // Importa toast de react-toastify

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

  // Función de validación
  const validateUserForm = (form, isEdit = false) => {
    if (!form.nombre) {
      toast.warning('El campo "Nombre" es requerido.')
      return false
    }
    if (!form.apellido) {
      toast.warning('El campo "Apellido" es requerido.')
      return false
    }
    if (!form.correo) {
      toast.warning('El campo "Correo" es requerido.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(form.correo)) {
      toast.warning('El formato del correo electrónico no es válido.')
      return false
    }
    if (!form.telefono) {
      toast.warning('El campo "Teléfono" es requerido.')
      return false
    }
    if (form.telefono.length !== 11) {
      toast.warning('El campo "Teléfono" debe tener exactamente 11 dígitos.')
      return false
    }
    if (!form.idRol) {
      toast.warning('El campo "Rol" es requerido.')
      return false
    }
    if (!isEdit && !form.contrasena) {
      toast.warning('El campo "Contraseña" es requerido para nuevos usuarios.')
      return false
    }
    // Puedes añadir más validaciones para la contraseña si es necesario
    return true
  }

  useEffect(() => {
    fetchUsers()
    fetchRoles() // Llamar a fetchRoles al montar el componente
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error al cargar usuarios:', error) // Mantener console.error para depuración interna
      toast.error(error.message || 'Error al cargar usuarios.')
      setUsers([]) // Asegura que 'users' siempre sea un array
    }
  }

  const handleAddUser = async () => {
    if (!validateUserForm(addUserForm)) {
      return
    }
    try {
      const newUser = await userService.createUser(addUserForm)
      if (newUser) {
        fetchUsers() // Recargar la lista de usuarios
        setAddUserForm({
          nombre: '',
          apellido: '',
          correo: '',
          telefono: '',
          idRol: '',
          contrasena: '',
        })
        setVisible(false)
        toast.success('Usuario agregado correctamente.')
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error) // Mantener console.error para depuración interna
      toast.error(error.message || 'Error al agregar usuario.')
    }
  }

  const handleEditUser = async () => {
    if (!currentUser || !currentUser.ttr_idusuar) {
      toast.warning('No se ha seleccionado ningún usuario para editar.')
      return
    }
    if (!validateUserForm(currentUser, true)) {
      return
    }
    try {
      const updated = await userService.updateUser(currentUser.ttr_idusuar, currentUser)
      if (updated) {
        fetchUsers() // Recargar la lista de usuarios
        setEditVisible(false)
        toast.info('Usuario actualizado correctamente.')
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error) // Mantener console.error para depuración interna
      toast.error(error.message || 'Error al actualizar usuario.')
    }
  }

  const handleDeleteUser = async () => {
    if (!currentUser || !currentUser.ttr_idusuar) {
      toast.warning('No se ha seleccionado ningún usuario para eliminar.')
      return
    }
    if (deleteConfirmation === 'confirmar') {
      try {
        await userService.deleteUser(currentUser.ttr_idusuar)
        setUsers(users.filter((u) => u.ttr_idusuar !== currentUser.ttr_idusuar))
        setDeleteVisible(false)
        setDeleteConfirmation('')
        toast.error('Usuario eliminado exitosamente.')
      } catch (error) {
        console.error('Error al eliminar usuario:', error) // Mantener console.error para depuración interna
        toast.error(error.message || 'Error al eliminar usuario.')
      }
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar.')
    }
  }

  const fetchRoles = async () => {
    try {
      const data = await roleService.getRoles()
      setRoles(data)
    } catch (error) {
      console.error('Error al cargar roles:', error) // Mantener console.error para depuración interna
      toast.error(error.message || 'Error al cargar roles.')
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
