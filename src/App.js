import React, { Suspense, useEffect } from 'react'
<<<<<<< HEAD
import { HashRouter, Route, Routes } from 'react-router-dom'
=======
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
>>>>>>> master
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'

<<<<<<< HEAD
=======
// Components
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify' // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Importa el CSS de react-toastify

>>>>>>> master
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
<<<<<<< HEAD
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 -center">
=======
  const { setColorMode } = useColorModes('light')
  const { user, loading } = useAuth()

  useEffect(() => {
    setColorMode('light')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
>>>>>>> master
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
<<<<<<< HEAD
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
=======
          <Route
            exact
            path="/"
            name="Home"
            element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
          />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            name="Home"
            element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer /> {/* Agrega ToastContainer al final de la aplicación */}
    </BrowserRouter>
>>>>>>> master
  )
}

export default App
