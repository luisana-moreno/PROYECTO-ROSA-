import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard')) // Asegúrate de que este archivo exista
const Employee = React.lazy(() => import('./views/pages/employees/employees')) // Asegúrate de que este archivo exista
const Users = React.lazy(() => import('./views/pages/users/users'))
const Cattle = React.lazy(() => import('./views/pages/cattle/cattle'))
const Vaccination = React.lazy(() => import('./views/pages/cattle/vaccination'))
const Client = React.lazy(() => import('./views/pages/client/client'))
const Finances = React.lazy(() => import('./views/pages/finances/finances'))
const Inventory = React.lazy(() => import('./views/pages/inventory/index'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Pastures = React.lazy(() => import('./views/pages/pastures/pastures'))
const PastureActivityModule = React.lazy(() => import('./views/pages/pastures/activity')) // Nuevo módulo
const MilkProduction = React.lazy(() => import('./views/pages/cattle/milkProduction'))
const Asisten = React.lazy(() => import('./views/pages/employees/asisten'))
const Expbov = React.lazy(() => import('./views/pages/cattle/expbov'))
const Settings = React.lazy(() => import('./views/pages/settings/Settings')) // Añadido para el módulo de configuración

const routes = [
  { path: '/login', exact: true, name: 'Login', element: Login }, // La ruta '/' ahora redirige en App.js
  {
    path: '/dashboard',
    exact: true,
    name: 'Dashboard',
    element: Dashboard,
    roles: [1, 2, 3, 4], // IDs de roles: 1=administrador, 2=veterinario, 3=empleado, 4=cliente
  },
  {
    path: '/employee',
    exact: true,
    name: 'Employee',
    element: Employee,
    roles: [1, 3], // IDs de roles: 1=administrador, 3=empleado
  },
  { path: '/users', exact: true, name: 'Users', element: Users, roles: [1] }, // ID de rol: 1=administrador
  {
    path: '/cattle',
    exact: true,
    name: 'Cattle',
    element: Cattle,
    roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
  },
  {
    path: '/vaccination',
    exact: true,
    name: 'Vaccination',
    element: Vaccination,
    roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
  },
  {
    path: '/client',
    exact: true,
    name: 'Client',
    element: Client,
    roles: [1, 4], // IDs de roles: 1=administrador, 4=cliente
  },
  { path: '/finances', exact: true, name: 'Finances', element: Finances, roles: [1] }, // ID de rol: 1=administrador
  {
    path: '/inventory',
    exact: true,
    name: 'Inventory',
    element: Inventory,
    roles: [1, 3], // IDs de roles: 1=administrador, 3=empleado
  },
  {
    path: '/pastures',
    exact: true,
    name: 'Pastures',
    element: Pastures,
    roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
  },
  {
    path: '/pastures/activity',
    exact: true,
    name: 'PastureActivityModule',
    element: PastureActivityModule,
    roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
  },
  {
    path: '/milkProduction',
    exact: true,
    name: 'MilkProduction',
    element: MilkProduction,
    roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
  },
  {
    path: '/asisten',
    exact: true,
    name: 'Asisten',
    element: Asisten,
    roles: [1, 3], // IDs de roles: 1=administrador, 3=empleado
  },
  {
    path: '/expbov',
    exact: true,
    name: 'Expbov',
    element: React.lazy(() => import('./views/pages/cattle/expbov')),
    roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
  },
  {
    path: '/settings',
    exact: true,
    name: 'Settings',
    element: Settings,
    roles: [1], // ID de rol: 1=administrador
  },
]

export default routes
