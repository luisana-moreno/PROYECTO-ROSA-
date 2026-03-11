import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilContact,
  cilSpeedometer,
  cilPeople,
<<<<<<< HEAD
  cilAnimal,                  
=======
  cilAnimal,
>>>>>>> master
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
<<<<<<< HEAD
  cilGraph
=======
  cilGraph,
  cilSettings, // Añadido para el módulo de configuración
  cilMedicalCross, // Añadido para Control de Sanidad
  cilBell, // Añadido para Notificaciones
>>>>>>> master
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Panel de Control',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
<<<<<<< HEAD
  },
//creado
{
  component: CNavTitle,
  name: 'Modulos',
},
{
  component: CNavGroup,
  name: 'Gestion de Usuarios',
  icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  items: [
    {
      component: CNavItem,
      name: 'Registro de Usuarios',
      to: '/users',
      icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />
  }
]
},
{
  component: CNavGroup,
  name: 'Gestion de Empleados',
  icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  items: [
    {
      component: CNavItem,
      name: 'Registro de Empleados',
      to: '/employee',
      icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'asistencia',
    to: '/asisten',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />
}
]
},

{
  component: CNavGroup,
  name: 'Gestion de Clientes',
  icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  items: [
    {
      component: CNavItem,
      name: 'Registro de Clientes',
      to: '/client',
      icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />
  }
]
},
=======
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Todos los roles
  },
  {
    component: CNavItem,
    name: 'Notificaciones',
    to: '/notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Todos
    badge: {
      color: 'danger',
      text: '!',
    },
  },
  {
    component: CNavTitle,
    name: 'Modulos',
  },
  {
    component: CNavGroup,
    name: 'Gestion de Usuarios',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: [1, 3], // 1=Admin, 3=Superadmin
    items: [
      {
        component: CNavItem,
        name: 'Registro de Usuarios',
        to: '/users',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
        roles: [1, 3], // 1=Admin, 3=Superadmin
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Gestion de Empleados',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    roles: [1, 3, 9], // 1=Admin, 3=Superadmin, 9=Secretaria
    items: [
      {
        component: CNavItem,
        name: 'Registro de Empleados',
        to: '/employee',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
        roles: [1, 3, 9], // 1=Admin, 3=Superadmin, 9=Secretaria
      },
      {
        component: CNavItem,
        name: 'Control de Asistencia',
        to: '/asisten',
        icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
        roles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Todos, para ver su propia asistencia
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Gestion de Clientes',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    roles: [1, 3, 9], // 1=Admin, 3=Superadmin, 9=Secretaria
    items: [
      {
        component: CNavItem,
        name: 'Registro de Clientes',
        to: '/client',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
        roles: [1, 3, 9], // 1=Admin, 3=Superadmin, 9=Secretaria
      },
    ],
  },
>>>>>>> master
  {
    component: CNavGroup,
    name: 'Control de Ganado',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
<<<<<<< HEAD
=======
    roles: [1, 3, 4, 6, 7, 8, 10], // 1=Admin, 3=Superadmin, 4=Obrero Campo, 6=Encargado, 7=Ordeñador, 8=Operario, 10=Vet
>>>>>>> master
    items: [
      {
        component: CNavItem,
        name: 'Registro de Ganado',
        to: '/cattle',
<<<<<<< HEAD
        icon: <CIcon icon={cilAnimal} customClassName="nav-icon" />
    },
    {
      component: CNavItem,
      name: 'Registro de Vacunas',
      to: '/vaccination',
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />
    },
    {
      component: CNavItem,
      name: 'Expediente Bovino',
      to: '/expmed',
      icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />
    },
    {
      component: CNavItem,
      name: 'Produccion de Leche',
      to: '/milkProduction',
      icon: <CIcon icon={cilGraph} customClassName="nav-icon" />
    }
  ]
  },

  {
    component: CNavGroup,
    name: 'Gestion de Potreros',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,  
=======
        icon: <CIcon icon={cilAnimal} customClassName="nav-icon" />,
        roles: [1, 3, 4, 6, 7, 8, 10],
      },
      {
        component: CNavGroup,
        name: 'Control de Sanidad',
        icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
        roles: [1, 3, 4, 8, 10], // 1=Admin, 3=Superadmin, 4=Obrero Campo, 8=Operario, 10=Vet
        items: [
          {
            component: CNavItem,
            name: 'Dashboard',
            to: '/sanidad/dashboard',
            roles: [1, 3, 4, 8, 10],
          },
          {
            component: CNavItem,
            name: 'Controles Sanitarios',
            to: '/sanidad/controles',
            roles: [1, 3, 4, 8, 10],
          },
          {
            component: CNavItem,
            name: 'Gestión de Preñez',
            to: '/sanidad/prenez',
            roles: [1, 3, 4, 10],
          },
          {
            component: CNavItem,
            name: 'Visitas Veterinarias',
            to: '/sanidad/visitas-veterinarias',
            roles: [1, 3, 4, 10],
          },
          {
            component: CNavItem,
            name: 'Planes de Vacunación',
            to: '/sanidad/planes-vacunacion',
            roles: [1, 3, 4, 10],
          },
          {
            component: CNavItem,
            name: 'Reportes',
            to: '/sanidad/reportes',
            roles: [1, 3, 4, 8, 10],
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Registro de Lotes',
        to: '/lots',
        icon: <CIcon icon={cilAnimal} customClassName="nav-icon" />,
        roles: [1, 3, 4, 6, 8],
      },
      {
        component: CNavItem,
        name: 'Produccion de Leche',
        to: '/milkProduction',
        icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
        roles: [1, 3, 4, 7, 8],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Gestion de Potreros',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    roles: [1, 3, 4, 6, 8],
>>>>>>> master
    items: [
      {
        component: CNavItem,
        name: 'Registro de Potreros',
        to: '/pastures',
<<<<<<< HEAD
        icon: <CIcon icon={cilTerrain} customClassName="nav-icon" />
    }
    ,
    {
      component: CNavItem,
      name: 'Actividad de Potreros',
      to: '/activepastures',
      icon: <CIcon icon={cilRain} customClassName="nav-icon" />
  }
  ]
=======
        icon: <CIcon icon={cilTerrain} customClassName="nav-icon" />,
        roles: [1, 3, 4, 6, 8, 10],
      },
      {
        component: CNavItem,
        name: 'Actividad de Potreros',
        to: '/pastures/activity',
        icon: <CIcon icon={cilRain} customClassName="nav-icon" />,
        roles: [1, 3, 4, 6, 8, 10],
      },
    ],
>>>>>>> master
  },

  {
    component: CNavGroup,
    name: 'Gestion de Inventario',
    icon: <CIcon icon={cibCodesandbox} customClassName="nav-icon" />,
<<<<<<< HEAD
=======
    roles: [1, 2, 3, 9], // 1=Admin, 2=Empleado, 3=Superadmin, 9=Secretaria
>>>>>>> master
    items: [
      {
        component: CNavItem,
        name: 'Registro de Productos',
        to: '/inventory',
<<<<<<< HEAD
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />
    }
  ]
=======
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
        roles: [1, 2, 3, 9],
      },
    ],
>>>>>>> master
  },
  {
    component: CNavGroup,
    name: 'Gestion de Ventas',
<<<<<<< HEAD
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,  
=======
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    roles: [1, 3, 9], // 1=Admin, 3=Superadmin, 9=Secretaria
>>>>>>> master
    items: [
      {
        component: CNavItem,
        name: 'Registro de Ventas',
        to: '/finances',
<<<<<<< HEAD
        icon: <CIcon icon={cilCash} customClassName="nav-icon" />
    }
  ]
=======
        icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
        roles: [1, 3, 9],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Configuración',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    roles: [1, 3], // 1=Admin, 3=Superadmin
    items: [
      {
        component: CNavItem,
        name: 'Configuración de la Aplicación',
        to: '/settings',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
        roles: [1, 3],
      },
    ],
>>>>>>> master
  },
]

export default _nav
