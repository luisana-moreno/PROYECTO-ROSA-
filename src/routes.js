import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard')); // Asegúrate de que este archivo exista
const Employee = React.lazy(() => import('./views/pages/employees/employees')); // Asegúrate de que este archivo exista
const Users = React.lazy(() => import('./views/pages/users/users'));
const Cattle = React.lazy(() => import('./views/pages/cattle/cattle'));
const Vaccination = React.lazy(() => import('./views/pages/cattle/vaccination'));
const Client = React.lazy(() => import('./views/pages/client/client'));
const Finances = React.lazy(() => import('./views/pages/finances/finances'));
const Inventory = React.lazy(() => import('./views/pages/inventory/inventory'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Pastures = React.lazy(() => import('./views/pages/pastures/pastures'));
const ActivePastures = React.lazy(() => import('./views/pages/pastures/activePastures'));
const MilkProduction = React.lazy(() => import('./views/pages/cattle/milkProduction'));
const Asisten = React.lazy(() => import('./views/pages/employees/asisten'));
const Expbov = React.lazy(() => import('./views/pages/cattle/expbov')); 

const routes = [
  { path: '/', exact: true, name: 'Login', element: Login },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/employee', exact: true, name: 'Employee', element: Employee },
  { path: '/users', exact: true, name: 'Users', element: Users },
  { path: '/cattle', exact: true, name: 'Cattle', element: Cattle },
  { path: '/vaccination', exact: true, name: 'Vaccination', element: Vaccination },
  { path: '/client', exact: true, name: 'Client', element: Client },
  { path: '/finances', exact: true, name: 'Finances', element: Finances },
  { path: '/inventory', exact: true, name: 'Inventory', element: Inventory },
  { path: '/pastures', exact: true, name: 'Pastures', element: Pastures },
  { path: '/activepastures', exact: true, name: 'ActivePastures', element: ActivePastures },
  { path: '/milkProduction', exact: true, name: 'MilkProduction', element: MilkProduction },
  {path: '/asisten', exact: true, name: 'Asisten', element: Asisten },
  {path: '/expbov', exact: true, name: 'Expbov', element: React.lazy(() => import('./views/pages/cattle/expbov')) },
];

export default routes;