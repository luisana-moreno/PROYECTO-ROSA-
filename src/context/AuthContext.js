import React, { createContext, useState, useEffect, useContext } from 'react'
import { login as authLogin, getProfile } from '../api/authService' // Importa las funciones específicas
import { jwtDecode } from 'jwt-decode' // Importa jwtDecode

const AuthContext = createContext(null)

// Función para verificar si el token ha expirado
const isTokenExpired = (token) => {
  if (!token) return true
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000 // Tiempo actual en segundos
    return decoded.exp < currentTime
  } catch (error) {
    console.error('Error decoding token:', error)
    return true // Si hay un error al decodificar, consideramos que el token no es válido
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    // No redirigimos aquí, la redirección se manejará en el componente que llama a logout
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser && storedUser.token) {
          if (isTokenExpired(storedUser.token)) {
            console.log('Token expirado. Cerrando sesión automáticamente.')
            logout() // Cierra la sesión si el token ha expirado
          } else {
            setUser(storedUser)
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage', error)
        logout() // En caso de error, también cierra la sesión
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (credentials) => {
    setLoading(true)
    try {
      console.log(credentials)

      const { token, user: userProfile } = await authLogin(
        credentials.correo,
        credentials.contrasena,
      ) // Obtiene token y user del login

      const userData = {
        token: token,
        roleId: userProfile.ttr_idrolus, // Almacenar el ID del rol
        roleName: userProfile.rol_nombre, // Asegúrate de que 'rol_nombre' es el campo correcto para el rol
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
