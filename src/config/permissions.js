/**
 * Configuración de Roles y Permisos
 * Sistema de Control de Acceso Basado en Roles (RBAC)
 */

// Definición de Roles
export const ROLES = {
  SUPERADMIN: 3,
  ADMIN: 1,
  SECRETARIA: 9,
  OPERARIO_GENERAL: 8,
  ORDENADOR: 7,
  ENCARGADO_POTREROS: 6,
  OBRERO_TEMPORAL: 5,
  OBRERO_CAMPO: 4,
  EMPLEADO: 2,
}

// Matriz de Permisos por Módulo
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: [1, 2, 3, 4, 5, 6, 7, 8, 9],

  // Bovinos (Cattle)
  CATTLE_VIEW: [1, 3, 4, 6, 7, 8],
  CATTLE_CREATE: [1, 3, 4, 8],
  CATTLE_EDIT: [1, 3, 4, 8],
  CATTLE_DELETE: [1, 3],
  CATTLE_EXPEDIENT: [1, 3, 4, 8],

  // Empleados (Employee)
  EMPLOYEE_VIEW: [1, 3, 9],
  EMPLOYEE_CREATE: [1, 3],
  EMPLOYEE_EDIT: [1, 3],
  EMPLOYEE_DELETE: [3],
  EMPLOYEE_BADGE: [1, 3, 9],

  // Usuarios (Users)
  USER_VIEW: [3],
  USER_CREATE: [3],
  USER_EDIT: [3],
  USER_DELETE: [3],

  // Ventas (Sales)
  SALES_VIEW: [1, 3, 9],
  SALES_CREATE: [1, 3, 9],
  SALES_EDIT: [1, 3],
  SALES_DELETE: [1, 3],
  SALES_INVOICE: [1, 3, 9],

  // Sanidad (Health)
  HEALTH_VIEW: [1, 3, 4, 8],
  HEALTH_CONTROLS: [1, 3, 4, 8],
  HEALTH_PREGNANCY: [1, 3, 4],
  HEALTH_VISITS: [1, 3, 4],
  HEALTH_PLANS: [1, 3, 4],
  HEALTH_REPORTS: [1, 3, 4, 8],

  // Potreros (Pastures)
  PASTURE_VIEW: [1, 3, 4, 6, 8],
  PASTURE_CREATE: [1, 3, 6],
  PASTURE_EDIT: [1, 3, 6],
  PASTURE_ACTIVITIES: [1, 3, 4, 6, 8],

  // Inventario (Inventory)
  INVENTORY_VIEW: [1, 3, 9],
  INVENTORY_CREATE: [1, 3, 9],
  INVENTORY_EDIT: [1, 3],
  INVENTORY_DELETE: [1, 3],

  // Asistencia (Attendance)
  ATTENDANCE_VIEW_OWN: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ATTENDANCE_VIEW_ALL: [1, 3, 9],
  ATTENDANCE_REGISTER: [1, 2, 3, 4, 5, 6, 7, 8, 9],

  // Clientes (Clients)
  CLIENT_VIEW: [1, 3, 9],
  CLIENT_CREATE: [1, 3, 9],
  CLIENT_EDIT: [1, 3, 9],
  CLIENT_DELETE: [1, 3],

  // Lotes (Lots)
  LOT_VIEW: [1, 3, 4, 6, 8],
  LOT_CREATE: [1, 3, 4, 8],
  LOT_EDIT: [1, 3, 4, 8],
  LOT_DELETE: [1, 3],

  // Producción Lechera (Milk Production)
  MILK_VIEW: [1, 3, 4, 7, 8],
  MILK_REGISTER: [1, 3, 7, 8],
  MILK_EDIT: [1, 3, 4],
  MILK_DELETE: [1, 3],
}

// Mapeo de rutas a permisos
export const ROUTE_PERMISSIONS = {
  '/dashboard': 'DASHBOARD_VIEW',
  '/cattle': 'CATTLE_VIEW',
  '/employee': 'EMPLOYEE_VIEW',
  '/users': 'USER_VIEW',
  '/finances': 'SALES_VIEW',
  '/sanidad': 'HEALTH_VIEW',
  '/sanidad/controles': 'HEALTH_CONTROLS',
  '/sanidad/prenez': 'HEALTH_PREGNANCY',
  '/sanidad/visitas-veterinarias': 'HEALTH_VISITS',
  '/sanidad/planes-vacunacion': 'HEALTH_PLANS',
  '/sanidad/reportes': 'HEALTH_REPORTS',
  '/pastures': 'PASTURE_VIEW',
  '/inventory': 'INVENTORY_VIEW',
  '/asisten': 'ATTENDANCE_VIEW_OWN',
  '/client': 'CLIENT_VIEW',
  '/lots': 'LOT_VIEW',
  '/milk-production': 'MILK_VIEW',
}

export default { ROLES, PERMISSIONS, ROUTE_PERMISSIONS }
