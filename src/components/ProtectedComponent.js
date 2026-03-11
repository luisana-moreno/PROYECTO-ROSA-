/**
 * Componente de Orden Superior (HOC) para proteger elementos UI según permisos
 */

import React from 'react'
import PropTypes from 'prop-types'
import { currentUserHasPermission } from '../utils/permissions'

/**
 * Componente que renderiza children solo si el usuario tiene el permiso requerido
 * @param {string} permission - Nombre del permiso requerido
 * @param {ReactNode} children - Elementos a renderizar si tiene permiso
 * @param {ReactNode} fallback - Elemento a renderizar si NO tiene permiso (opcional)
 */
const ProtectedComponent = ({ permission, children, fallback = null }) => {
  if (!permission) {
    console.warn('ProtectedComponent: No permission specified')
    return children
  }

  const hasAccess = currentUserHasPermission(permission)

  if (!hasAccess) {
    return fallback
  }

  return <>{children}</>
}

ProtectedComponent.propTypes = {
  permission: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
}

export default ProtectedComponent
