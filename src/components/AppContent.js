import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
<<<<<<< HEAD
=======
import ProtectedRoute from './ProtectedRoute' // Importa ProtectedRoute
>>>>>>> master

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
<<<<<<< HEAD
                  element={<route.element />}
=======
                  element={
                    route.roles ? (
                      <ProtectedRoute roles={route.roles}>
                        <route.element />
                      </ProtectedRoute>
                    ) : (
                      <route.element />
                    )
                  }
>>>>>>> master
                />
              )
            )
          })}
<<<<<<< HEAD
          <Route path="/" element={<Navigate to="dashboard" replace />} />
=======
          {/* La redirección a /dashboard se maneja en App.js */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
>>>>>>> master
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
