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
  const [searchTerm, setSearchTerm] = useState('') // Nuevo estado para el término de búsqueda
  const [filterRole, setFilterRole] = useState('') // Nuevo estado para el filtro por rol

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
      const mappedUsers = data.map((user) => ({
        ...user,
        ttrEstado: user.ttr_estado || 'ACTIVO',
      }))
      setUsers(mappedUsers)
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
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
      // Manejo de errores de validación del backend
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message) // Muestra el mensaje de error específico del backend
      } else {
        toast.error(error.message || 'Error al agregar usuario.')
      }
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
      // Excluir el campo de contraseña ya que no está en el formulario de edición
      const { contrasena, ...userDataWithoutPassword } = currentUser
      const updated = await userService.updateUser(currentUser.ttr_idusuar, userDataWithoutPassword)
      if (updated) {
        fetchUsers() // Recargar la lista de usuarios
        setEditVisible(false)
        toast.info('Usuario actualizado correctamente.')
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error) // Mantener console.error para depuración interna
      // Manejo de errores de validación del backend
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message) // Muestra el mensaje de error específico del backend
      } else {
        toast.error(error.message || 'Error al actualizar usuario.')
      }
    }
  }

  // Reactivate Logic
  const [reactivateVisible, setReactivateVisible] = useState(false)
  const [reactivateConfirmation, setReactivateConfirmation] = useState('')
  const [filterStatus, setFilterStatus] = useState('ACTIVO') // Nuevo estado para filtro Activo/Inactivo

  const handleReactivateUser = async () => {
    if (!currentUser || !currentUser.ttr_idusuar) {
      toast.warning('No user selected for reactivation.')
      return
    }
    if (reactivateConfirmation === 'reactivar') {
      try {
        await userService.reactivateUser(currentUser.ttr_idusuar)
        // Actualizar la lista localmente
        const updatedUsers = users.map((u) =>
          u.ttr_idusuar === currentUser.ttr_idusuar ? { ...u, ttrEstado: 'ACTIVO' } : u,
        )
        setUsers(updatedUsers)
        setReactivateVisible(false)
        setReactivateConfirmation('')
        setFilterStatus('ACTIVO') // Switch back to active tab
        toast.success('Usuario reactivado exitosamente')
      } catch (error) {
        toast.error(error.message || 'Error al reactivar usuario.')
      }
    } else {
      toast.warning('Debe escribir "reactivar" para confirmar')
    }
  }

  // Update handleDelete to be local optimistic or re-fetch
  const handleDeleteUser = async () => {
    if (!currentUser || !currentUser.ttr_idusuar) {
      toast.warning('No se ha seleccionado ningún usuario para eliminar.')
      return
    }
    if (deleteConfirmation === 'confirmar') {
      try {
        await userService.deleteUser(currentUser.ttr_idusuar)
        // Update local state to reflect soft delete
        const updatedUsers = users.map((u) =>
          u.ttr_idusuar === currentUser.ttr_idusuar ? { ...u, ttrEstado: 'INACTIVO' } : u,
        )
        setUsers(updatedUsers)
        setDeleteVisible(false)
        setDeleteConfirmation('')
        toast.error('Usuario desactivado exitosamente')
      } catch (error) {
        console.error('Error al eliminar usuario:', error)
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
      console.error('Error al cargar roles:', error)
      toast.error(error.message || 'Error al cargar roles.')
      setRoles([])
    }
  }

  const filteredUsers = users.filter((user) => {
    const userName = user.ttr_nombrel ? user.ttr_nombrel.trim().toLowerCase() : ''
    const userApellido = user.ttr_apellid ? user.ttr_apellid.trim().toLowerCase() : ''
    const userCorreo = user.ttr_correoe ? user.ttr_correoe.trim().toLowerCase() : ''

    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    const matchesSearchTerm = searchTerm
      ? userName.includes(lowerCaseSearchTerm) ||
        userApellido.includes(lowerCaseSearchTerm) ||
        userCorreo.includes(lowerCaseSearchTerm)
      : true
    const matchesRole = filterRole ? user.ttr_idrolus === parseInt(filterRole, 10) : true
    const matchesStatus = filterStatus ? user.ttrEstado === filterStatus : true

    return matchesSearchTerm && matchesRole && matchesStatus
  })

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
    setUsers,
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
  }
}
