import React from 'react'
import { Navigate } from 'react-router-dom'

const DashboardSanidad = React.lazy(() => import('./DashboardSanidad'))
const VacunacionesIndex = React.lazy(() => import('./vacunaciones/VacunacionesIndex'))
const PrenezIndex = React.lazy(() => import('./prenez/PrenezIndex'))
const VisitasIndex = React.lazy(() => import('./visitas/VisitasIndex'))
const PlanesIndex = React.lazy(() => import('./planes/PlanesIndex'))
const ReportesIndex = React.lazy(() => import('./reportes/ReportesIndex'))

const sanidadRoutes = [
  {
    path: '/sanidad',
    exact: true,
    name: 'Sanidad',
    element: <Navigate to="/sanidad/dashboard" replace />,
  },
  { path: '/sanidad/dashboard', name: 'Dashboard Sanidad', element: <DashboardSanidad /> },
  { path: '/sanidad/vacunaciones', name: 'Vacunaciones', element: <VacunacionesIndex /> },
  { path: '/sanidad/prenez', name: 'Gestión de Preñez', element: <PrenezIndex /> },
  {
    path: '/sanidad/visitas-veterinarias',
    name: 'Visitas Veterinarias',
    element: <VisitasIndex />,
  },
  { path: '/sanidad/planes-vacunacion', name: 'Planes de Vacunación', element: <PlanesIndex /> },
  { path: '/sanidad/reportes', name: 'Reportes', element: <ReportesIndex /> },
]

export default sanidadRoutes
