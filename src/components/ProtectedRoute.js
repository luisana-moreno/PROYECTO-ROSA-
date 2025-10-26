import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CSpinner } from '@coreui/react'

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading, hasRole } = useAuth()

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  if (!user) {
    // Usuario no autenticado, redirigir a la página de login
    return <Navigate to="/login" replace />
  }

  if (roles && !hasRole(roles)) {
    // Usuario autenticado pero sin el rol requerido, redirigir a 404 o una página de acceso denegado
    return <Navigate to="/404" replace /> // O a una página de "Acceso Denegado"
  }

  return children
}

export default ProtectedRoute
