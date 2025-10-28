import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard')) // Asegúrate de que este archivo exista
const Employee = React.lazy(() => import('./views/pages/employees/employees')) // Asegúrate de que este archivo exista
const Users = React.lazy(() => import('./views/pages/users/users'))
const Cattle = React.lazy(() => import('./views/pages/cattle/cattle'))
const Vaccination = React.lazy(() => import('./views/pages/cattle/vaccination'))
const Client = React.lazy(() => import('./views/pages/client/client'))
const Finances = React.lazy(() => import('./views/pages/finances/finances'))
const Inventory = React.lazy(() => import('./views/pages/inventory/inventory'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Pastures = React.lazy(() => import('./views/pages/pastures/pastures'))
const ActivePastures = React.lazy(() => import('./views/pages/pastures/activePastures'))
const MilkProduction = React.lazy(() => import('./views/pages/cattle/milkProduction'))
const Asisten = React.lazy(() => import('./views/pages/employees/asisten'))
const Expbov = React.lazy(() => import('./views/pages/cattle/expbov'))

const routes = [
  { path: '/login', exact: true, name: 'Login', element: Login }, // La ruta '/' ahora redirige en App.js
  {
    path: '/dashboard',
    exact: true,
    name: 'Dashboard',
    element: Dashboard,
    roles: ['administrador', 'veterinario', 'empleado', 'cliente'],
  },
  {
    path: '/employee',
    exact: true,
    name: 'Employee',
    element: Employee,
    roles: ['administrador', 'empleado'],
  },
  { path: '/users', exact: true, name: 'Users', element: Users, roles: ['administrador'] },
  {
    path: '/cattle',
    exact: true,
    name: 'Cattle',
    element: Cattle,
    roles: ['administrador', 'veterinario'],
  },
  {
    path: '/vaccination',
    exact: true,
    name: 'Vaccination',
    element: Vaccination,
    roles: ['administrador', 'veterinario'],
  },
  {
    path: '/client',
    exact: true,
    name: 'Client',
    element: Client,
    roles: ['administrador', 'cliente'],
  },
  { path: '/finances', exact: true, name: 'Finances', element: Finances, roles: ['administrador'] },
  {
    path: '/inventory',
    exact: true,
    name: 'Inventory',
    element: Inventory,
    roles: ['administrador', 'empleado'],
  },
  {
    path: '/pastures',
    exact: true,
    name: 'Pastures',
    element: Pastures,
    roles: ['administrador', 'veterinario'],
  },
  {
    path: '/activepastures',
    exact: true,
    name: 'ActivePastures',
    element: ActivePastures,
    roles: ['administrador', 'veterinario'],
  },
  {
    path: '/milkProduction',
    exact: true,
    name: 'MilkProduction',
    element: MilkProduction,
    roles: ['administrador', 'veterinario'],
  },
  {
    path: '/asisten',
    exact: true,
    name: 'Asisten',
    element: Asisten,
    roles: ['administrador', 'empleado'],
  },
  {
    path: '/expbov',
    exact: true,
    name: 'Expbov',
    element: React.lazy(() => import('./views/pages/cattle/expbov')),
    roles: ['administrador', 'veterinario'],
  },
]

export default routes
