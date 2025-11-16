import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilContact,
  cilSpeedometer,
  cilPeople,
  cilAnimal,
  cilCalendar,
  cilUserFollow,
  cilClipboard,
  cilChart,
  cilTask,
  cilAddressBook,
  cibCodesandbox,
  cilCash,
  cilUser,
  cilTerrain,
  cilRain,
  cilGraph,
  cilSettings, // Añadido para el módulo de configuración
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Panel de Control',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    roles: [1, 2, 3, 4], // IDs de roles: 1=administrador, 2=veterinario, 3=empleado, 4=cliente
  },
  {
    component: CNavTitle,
    name: 'Modulos',
  },
  {
    component: CNavGroup,
    name: 'Gestion de Usuarios',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: [1], // ID de rol: 1=administrador
    items: [
      {
        component: CNavItem,
        name: 'Registro de Usuarios',
        to: '/users',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
        roles: [1], // ID de rol: 1=administrador
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Gestion de Empleados',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    roles: [1, 3], // IDs de roles: 1=administrador, 3=empleado
    items: [
      {
        component: CNavItem,
        name: 'Registro de Empleados',
        to: '/employee',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
        roles: [1, 3], // IDs de roles: 1=administrador, 3=empleado
      },
      {
        component: CNavItem,
        name: 'Control de Asistencia',
        to: '/asisten',
        icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
        roles: [1, 3], // IDs de roles: 1=administrador, 3=empleado
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestion de Clientes',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    roles: [1, 4], // IDs de roles: 1=administrador, 4=cliente
    items: [
      {
        component: CNavItem,
        name: 'Registro de Clientes',
        to: '/client',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
        roles: [1, 4], // IDs de roles: 1=administrador, 4=cliente
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Control de Ganado',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
    roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
    items: [
      {
        component: CNavItem,
        name: 'Registro de Ganado',
        to: '/cattle',
        icon: <CIcon icon={cilAnimal} customClassName="nav-icon" />,
        roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
      },
      {
        component: CNavItem,
        name: 'Registro de Vacunas',
        to: '/vaccination',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
        roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
      },
      {
        component: CNavItem,
        name: 'Produccion de Leche',
        to: '/milkProduction',
        icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
        roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestion de Potreros',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
    items: [
      {
        component: CNavItem,
        name: 'Registro de Potreros',
        to: '/pastures',
        icon: <CIcon icon={cilTerrain} customClassName="nav-icon" />,
        roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
      },
      {
        component: CNavItem,
        name: 'Actividad de Potreros',
        to: '/pastures/activity',
        icon: <CIcon icon={cilRain} customClassName="nav-icon" />,
        roles: [1, 2], // IDs de roles: 1=administrador, 2=veterinario
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestion de Inventario',
    icon: <CIcon icon={cibCodesandbox} customClassName="nav-icon" />,
    roles: [1, 3], // IDs de roles: 1=administrador, 3=empleado
    items: [
      {
        component: CNavItem,
        name: 'Registro de Productos',
        to: '/inventory',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
        roles: [1, 3], // IDs de roles: 1=administrador, 3=empleado
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Gestion de Ventas',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    roles: [1], // ID de rol: 1=administrador
    items: [
      {
        component: CNavItem,
        name: 'Registro de Ventas',
        to: '/finances',
        icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
        roles: [1], // ID de rol: 1=administrador
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Configuración',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    roles: [1], // Asumo que solo el administrador puede acceder a la configuración
    items: [
      {
        component: CNavItem,
        name: 'Configuración de la Aplicación',
        to: '/settings',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
        roles: [1],
      },
    ],
  },
]

export default _nav
