import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard')) // Asegúrate de que este archivo exista
const Employee = React.lazy(() => import('./views/pages/employees/employees')) // Asegúrate de que este archivo exista
const Users = React.lazy(() => import('./views/pages/users/users'))
const Cattle = React.lazy(() => import('./views/pages/cattle/cattle'))
// Control de Sanidad - Módulo completo
const DashboardSanidad = React.lazy(() => import('./views/pages/sanidad/DashboardSanidad'))
const ControlesIndex = React.lazy(() => import('./views/pages/sanidad/controles/ControlesIndex'))

const PrenezIndex = React.lazy(() => import('./views/pages/sanidad/prenez/PrenezIndex'))
const VisitasIndex = React.lazy(() => import('./views/pages/sanidad/visitas/VisitasIndex'))
const PlanesIndex = React.lazy(() => import('./views/pages/sanidad/planes/PlanesIndex'))
const ReportesIndex = React.lazy(() => import('./views/pages/sanidad/reportes/ReportesIndex'))
const NotificationsIndex = React.lazy(
  () => import('./views/pages/notifications/NotificationsIndex'),
)
const Client = React.lazy(() => import('./views/pages/client/client'))
const Finances = React.lazy(() => import('./views/pages/finances/finances'))
const Inventory = React.lazy(() => import('./views/pages/inventory/index'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Pastures = React.lazy(() => import('./views/pages/pastures/pastures'))
const PastureActivityModule = React.lazy(() => import('./views/pages/pastures/activity')) // Nuevo módulo
const LotRegistration = React.lazy(() => import('./views/pages/lots'))
const MilkProduction = React.lazy(() => import('./views/pages/cattle/milkProduction'))
const Asisten = React.lazy(() => import('./views/pages/employees/asisten'))
const Expbov = React.lazy(() => import('./views/pages/cattle/expbov'))
const Settings = React.lazy(() => import('./views/pages/settings/Settings')) // Añadido para el módulo de configuración
const Profile = React.lazy(() => import('./views/pages/profile')) // Añadido para el perfil de usuario

const routes = [
  { path: '/login', exact: true, name: 'Login', element: Login }, // La ruta '/' ahora redirige en App.js
  {
    path: '/dashboard',
    exact: true,
    name: 'Dashboard',
    element: Dashboard,
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 9], // Todos los roles
  },
  {
    path: '/employee',
    exact: true,
    name: 'Employee',
    element: Employee,
    roles: [1, 3, 9], // Admin, Superadmin, Secretaria
  },
  { path: '/users', exact: true, name: 'Users', element: Users, roles: [3] }, // Solo Superadmin
  {
    path: '/cattle',
    exact: true,
    name: 'Cattle',
    element: Cattle,
    roles: [1, 3, 4, 6, 7, 8], // Admin, Superadmin, Obrero Campo, Encargado Potreros, Ordeñador, Operario General
  },
  // Control de Sanidad - Rutas del módulo completo
  {
    path: '/sanidad',
    exact: true,
    name: 'Control de Sanidad',
    element: DashboardSanidad,
    roles: [1, 3, 4, 8], // Admin, Superadmin, Obrero Campo, Operario General
  },
  {
    path: '/sanidad/dashboard',
    exact: true,
    name: 'Dashboard Sanidad',
    element: DashboardSanidad,
    roles: [1, 3, 4, 8],
  },
  {
    path: '/sanidad/controles',
    exact: true,
    name: 'Controles Sanitarios',
    element: ControlesIndex,
    roles: [1, 3, 4, 8],
  },

  {
    path: '/sanidad/prenez',
    exact: true,
    name: 'Gestión de Preñez',
    element: PrenezIndex,
    roles: [1, 3, 4], // Admin, Superadmin, Obrero Campo
  },
  {
    path: '/sanidad/visitas-veterinarias',
    exact: true,
    name: 'Visitas Veterinarias',
    element: VisitasIndex,
    roles: [1, 3, 4],
  },
  {
    path: '/sanidad/planes-vacunacion',
    exact: true,
    name: 'Planes de Vacunación',
    element: PlanesIndex,
    roles: [1, 3, 4],
  },
  {
    path: '/sanidad/reportes',
    exact: true,
    name: 'Reportes de Sanidad',
    element: ReportesIndex,
    roles: [1, 3, 4, 8],
  },
  {
    path: '/notifications',
    exact: true,
    name: 'Notificaciones',
    element: NotificationsIndex,
    roles: [1, 2, 3, 4, 5, 8], // Disponible para la mayoría
  },
  {
    path: '/client',
    exact: true,
    name: 'Client',
    element: Client,
    roles: [1, 3, 9], // Admin, Superadmin, Secretaria
  },
  { path: '/finances', exact: true, name: 'Finances', element: Finances, roles: [1, 3, 9] }, // Admin, Superadmin, Secretaria (Ventas)
  {
    path: '/inventory',
    exact: true,
    name: 'Inventory',
    element: Inventory,
    roles: [1, 3, 9], // Admin, Superadmin, Secretaria
  },
  {
    path: '/pastures',
    exact: true,
    name: 'Pastures',
    element: Pastures,
    roles: [1, 3, 4, 6, 8], // Admin, Superadmin, Obrero Campo, Encargado Potreros, Operario General
  },
  {
    path: '/pastures/activity',
    exact: true,
    name: 'PastureActivityModule',
    element: PastureActivityModule,
    roles: [1, 3, 4, 6, 8],
  },
  {
    path: '/lots',
    exact: true,
    name: 'LotRegistration',
    element: LotRegistration,
    roles: [1, 3, 4, 6, 8], // Admin, Superadmin, Obrero Campo, Encargado Potreros, Operario General
  },
  {
    path: '/milkProduction',
    exact: true,
    name: 'MilkProduction',
    element: MilkProduction,
    roles: [1, 3, 4, 7, 8], // Admin, Superadmin, Obrero Campo, Ordeñador, Operario General
  },
  {
    path: '/asisten',
    exact: true,
    name: 'Asisten',
    element: Asisten,
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 9], // Todos pueden ver su asistencia
  },
  {
    path: '/expbov',
    exact: true,
    name: 'Expbov',
    element: React.lazy(() => import('./views/pages/cattle/expbov')),
    roles: [1, 3, 4, 8], // Admin, Superadmin, Obrero Campo, Operario General
  },
  {
    path: '/settings',
    exact: true,
    name: 'Settings',
    element: Settings,
    roles: [1, 3], // Admin, Superadmin
  },
  {
    path: '/profile',
    exact: true,
    name: 'Profile',
    element: Profile,
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 9], // Todos los roles pueden acceder a su perfil
  },
]

export default routes
