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
            logout()
          } else {
            // Decodificar el token para obtener toda la información del usuario
            const decoded = jwtDecode(storedUser.token)

            // Reconstruir el objeto user con la información del token
            setUser({
              token: storedUser.token,
              id: decoded.id,
              roleId: decoded.roleId,
              email: decoded.email,
              name: decoded.name,
              roleName: decoded.roleName,
            })
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage', error)
        logout()
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (credentials) => {
    setLoading(true)
    try {
      const { token } = await authLogin(credentials.correo, credentials.contrasena)

      // Decodificar el token para obtener la información del usuario
      const decoded = jwtDecode(token)

      // Guardar solo datos esenciales en localStorage
      const userData = {
        token: token,
        id: decoded.id,
        roleId: decoded.roleId,
      }

      localStorage.setItem('user', JSON.stringify(userData))

      // En el estado del contexto, incluir toda la información decodificada
      setUser({
        ...userData,
        email: decoded.email,
        name: decoded.name,
        roleName: decoded.roleName,
      })

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
