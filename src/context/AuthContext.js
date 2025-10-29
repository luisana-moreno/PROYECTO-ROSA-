import React, { createContext, useState, useEffect, useContext } from 'react'
import { login as authLogin, getProfile } from '../api/authService' // Importa las funciones específicas

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser && storedUser.token) {
          // Aquí podrías validar el token con tu backend si es necesario
          // Por ahora, asumimos que el token es válido y cargamos el usuario
          setUser(storedUser)
        }
      } catch (error) {
        console.error('Error loading user from localStorage', error)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (credentials) => {
    setLoading(true)
    try {
      const { token, user: userProfile } = await authLogin(
        credentials.correo,
        credentials.contrasena,
      ) // Obtiene token y user del login

      const userData = {
        token: token,
        roleId: userProfile.ttr_idrolus, // Almacenar el ID del rol
        roleName: userProfile.tma_nomrolu, // Almacenar también el nombre del rol si es necesario para la UI
        name: userProfile.ttr_nombrel + ' ' + userProfile.ttr_apellid,
        id: userProfile.ttr_idusuar,
        email: userProfile.ttr_correoe,
        telefono: userProfile.ttr_telefon,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return true
    } catch (error) {
      console.error('Login failed', error)
      setUser(null)
      localStorage.removeItem('user')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const hasRole = (requiredRoleIds) => {
    if (!user || !user.roleId) return false
    const userRoleId = user.roleId
    if (Array.isArray(requiredRoleIds)) {
      return requiredRoleIds.includes(userRoleId)
    }
    return userRoleId === requiredRoleIds
  }

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
