/**
 * Utilidades para Control de Acceso Basado en Roles
 */

import { PERMISSIONS, ROUTE_PERMISSIONS } from '../config/permissions'

/**
 * Obtiene el rol del usuario desde localStorage
 * @returns {number|null} ID del rol del usuario
 */
export const getUserRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.tipo_usuario || null
  } catch (error) {
    console.error('Error getting user role:', error)
    return null
  }
}

/**
 * Verifica si el usuario tiene un permiso específico
 * @param {number} userRole - ID del rol del usuario
 * @param {string} permission - Nombre del permiso (ej: 'CATTLE_CREATE')
 * @returns {boolean} true si tiene permiso, false si no
 */
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false
  return PERMISSIONS[permission]?.includes(userRole) || false
}

/**
 * Verifica si el usuario puede acceder a una ruta
 * @param {number} userRole - ID del rol del usuario
 * @param {string} routePath - Ruta a verificar (ej: '/employee')
 * @returns {boolean} true si puede acceder, false si no
 */
export const canAccessRoute = (userRole, routePath) => {
  if (!userRole || !routePath) return false

  const permission = ROUTE_PERMISSIONS[routePath]
  if (!permission) return true // Si no hay permiso definido, permitir acceso

  return hasPermission(userRole, permission)
}

/**
 * Verifica si el usuario actual tiene un permiso
 * @param {string} permission - Nombre del permiso
 * @returns {boolean} true si tiene permiso, false si no
 */
export const currentUserHasPermission = (permission) => {
  const userRole = getUserRole()
  return hasPermission(userRole, permission)
}

/**
 * Verifica si el usuario actual puede acceder a una ruta
 * @param {string} routePath - Ruta a verificar
 * @returns {boolean} true si puede acceder, false si no
 */
export const currentUserCanAccessRoute = (routePath) => {
  const userRole = getUserRole()
  return canAccessRoute(userRole, routePath)
}

/**
 * Filtra una lista de rutas según los permisos del usuario
 * @param {Array} routes - Array de objetos de ruta
 * @param {number} userRole - ID del rol del usuario
 * @returns {Array} Rutas filtradas
 */
export const filterRoutesByRole = (routes, userRole) => {
  if (!userRole) return []

  return routes.filter((route) => {
    if (!route.roles) return true // Si no tiene roles definidos, permitir
    return route.roles.includes(userRole)
  })
}

export default {
  getUserRole,
  hasPermission,
  canAccessRoute,
  currentUserHasPermission,
  currentUserCanAccessRoute,
  filterRoutesByRole,
}
