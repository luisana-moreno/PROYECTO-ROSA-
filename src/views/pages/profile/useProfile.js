import { useState } from 'react'
import { userService } from '../../../api/userService'
import { useAuth } from '../../../context/AuthContext'

/**
 * Hook personalizado para manejar la lógica del perfil de usuario
 */
export const useProfile = () => {
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  /**
   * Actualizar perfil del usuario
   */
  const updateProfile = async (profileData) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await userService.updateProfile(user.token, profileData)

      // Actualizar el contexto de autenticación con los nuevos datos
      const updatedUser = {
        token: user.token,
        id: user.id,
        roleId: user.roleId,
        email: response.user.ttr_correoe,
        name: `${response.user.ttr_nombrel} ${response.user.ttr_apellid}`,
        roleName: response.user.ttr_nombrec || user.roleName,
      }

      // Guardar solo datos esenciales en localStorage
      const essentialData = {
        token: user.token,
        id: user.id,
        roleId: user.roleId,
      }
      localStorage.setItem('user', JSON.stringify(essentialData))

      // Actualizar el contexto con toda la información
      setUser(updatedUser)

      setSuccess(response.message || 'Perfil actualizado exitosamente')
      return true
    } catch (err) {
      setError(err.message || 'Error al actualizar perfil')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Cambiar contraseña del usuario
   */
  const changePassword = async (passwordData) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await userService.changePassword(user.token, passwordData)
      setSuccess(response.message || 'Contraseña cambiada exitosamente')
      return true
    } catch (err) {
      setError(err.message || 'Error al cambiar contraseña')
      return false
    } finally {
      setLoading(false)
    }
  }

  /**
   * Limpiar mensajes de error y éxito
   */
  const clearMessages = () => {
    setError(null)
    setSuccess(null)
  }

  return {
    user,
    loading,
    error,
    success,
    updateProfile,
    changePassword,
    clearMessages,
  }
}
