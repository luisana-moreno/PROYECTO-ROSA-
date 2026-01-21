/**
 * Componente para proteger rutas según permisos de usuario
 */

import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getUserRole } from '../utils/permissions'

/**
 * Componente que protege rutas verificando si el usuario tiene el rol requerido
 * @param {React.Component} element - Componente a renderizar si tiene acceso
 * @param {Array<number>} roles - Array de IDs de roles permitidos
 */
const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const userRole = getUserRole()

  // Si no hay usuario logueado, redirigir a login
  if (!userRole) {
    return <Navigate to="/login" replace />
  }

  // Si no hay roles definidos, permitir acceso
  if (!roles || roles.length === 0) {
    return <Element {...rest} />
  }

  // Verificar si el rol del usuario está en la lista de roles permitidos
  if (!roles.includes(userRole)) {
    // Redirigir al dashboard si no tiene permiso
    return <Navigate to="/dashboard" replace />
  }

  return <Element {...rest} />
}

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  roles: PropTypes.arrayOf(PropTypes.number),
}

export default PrivateRoute
