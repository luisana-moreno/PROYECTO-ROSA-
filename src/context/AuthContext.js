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
      const { token } = await authLogin(credentials.correo, credentials.contrasena) // Llama a la función login del servicio y obtiene solo el token
      const profileResponse = await getProfile(token) // Llama a getProfile con el token
      const userProfile = profileResponse // profileResponse ya es el objeto del usuario

      const userData = {
        token: token,
        role: userProfile.role, // Mapea 'role' del perfil
        name: userProfile.nombre_completo, // Usa 'nombre_completo' del perfil
        id: userProfile.id,
        email: userProfile.email,
        telefono: userProfile.telefono,
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

  const hasRole = (roles) => {
    if (!user || !user.role) return false
    const userRoleLower = user.role.toLowerCase()
    if (Array.isArray(roles)) {
      return roles.map((role) => role.toLowerCase()).includes(userRoleLower)
    }
    return userRoleLower === roles.toLowerCase()
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
