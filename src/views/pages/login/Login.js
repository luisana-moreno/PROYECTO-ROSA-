<<<<<<< HEAD
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
=======
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
>>>>>>> master
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
<<<<<<< HEAD
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'


const Login = () => {
  const [visible, setVisible] = useState(false)
  return (

    <div
      className="login-background min-vh-100 d-flex flex-row align-items-center ">
      <CContainer>
        <CRow
          className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard
                className="login-color p-4">
                <CCardBody>
                  <CForm>
                    <h1
                      className='typography-color-title'>
                      Acceso
                    </h1>

                    <p
                      className="typography-color">
                      Iniciar sesión en su cuenta
                    </p>

                    <CInputGroup
                      className="mb-3">
                      <CInputGroupText>
                        <CIcon
                          icon={cilUser} />
                      </CInputGroupText>

                      <CFormInput
                        placeholder="email"
                        autoComplete="email" />
                    </CInputGroup>

                    <CInputGroup
                      className="mb-4">
                      <CInputGroupText>
                        <CIcon
                          icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="Contraseña"
                        placeholder="Contraseña"
                        autoComplete="current-password"
=======
  CImage,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilHttps } from '@coreui/icons'
import logo from 'src/assets/images/finca/fincalogo.png'
import { useAuth } from '../../../context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    document.body.classList.add('login-page')
    return () => {
      document.body.classList.remove('login-page')
    }
  }, [])

  const handleSubmit = async (e) => {
    e?.preventDefault()

    if (!correo || !contrasena) {
      toast.warning('Por favor, ingresa tu correo y contraseña.')
      return
    }

    setLoading(true)
    try {
      const success = await login({ correo, contrasena })
      if (success) {
        toast.success('¡Bienvenido de nuevo!')
        navigate('/dashboard')
      } else {
        toast.error('Credenciales incorrectas. Inténtalo de nuevo.')
      }
    } catch (error) {
      toast.error(error.message || 'Error de conexión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" d-flex flex-row align-items-center min-vh-100">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={7} xl={6}>
            <CCardGroup className="shadow-lg rounded-3 overflow-hidden ">
              <CCard className="p-4 border-0  ">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <div className="text-center mb-4">
                      <div
                        className="bg-white border-success border-4 d-inline-flex align-items-center justify-content-center  rounded-circle mb-3 p-3 shadow-sm"
                        style={{ width: '150px', height: '150px' }}
                      >
                        <CImage
                          src={logo}
                          fluid
                          style={{ maxHeight: '100px', width: '100px', height: '100px' }}
                        />
                      </div>
                      <h2 className="text-success fw-bold">Finca La LAGUNA.</h2>
                      <p className="text-medium-emphasis small">Sistema de Gestión Ganadera</p>
                    </div>

                    <h4 className="mb-3 text-center">Iniciar Sesión</h4>

                    <CInputGroup className="mb-3">
                      <CInputGroupText className="bg-light border-end-0 text-success">
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Correo electrónico"
                        autoComplete="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="border-start-0 bg-light"
                        style={{ boxShadow: 'none' }}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText className="bg-light border-end-0 text-success">
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className="border-start-0 bg-light"
                        style={{ boxShadow: 'none' }}
>>>>>>> master
                      />
                    </CInputGroup>

                    <CRow>
<<<<<<< HEAD
                      <CCol xs={6}>
                        <Link to="/dashboard">
                          <CButton
                            className="button-no-hover-green text-white mt-3">
                              Acceder 
                          </CButton>
                        </Link>
                      </CCol>

                      <CCol
                        xs={6}
                        className="text-right">

                        <CButton
                          color="link"
                          className="px-0"
                          onClick={() => setVisible(!visible)}>
                          ¿Has olvidado tu contraseña?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard
                className="login-card text-white bg-primary py-5">
                <CCardBody
                  className="text-center">
                  <div>
                    <h2
                      className='text-white'>
                      Registro
                    </h2>
                    <p>
                    Bienvenido al sistema de gestión de Finca La Laguna. Regístrese para comenzar.
                    </p>
                    <Link
                      to="/register">
                      <CButton
                        className="button-no-hover-green text-white mt-3">
                        Regístrate ahora!
                      </CButton>
                    </Link>
                  </div>
=======
                      <CCol xs={12}>
                        <CButton
                          color="success"
                          className="w-100 py-2 button-no-hover-green fw-semibold"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? 'Accediendo...' : 'Ingresar'}
                        </CButton>
                      </CCol>
                    </CRow>

                    <div className="mt-4 text-center"></div>
                  </CForm>
>>>>>>> master
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
<<<<<<< HEAD

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle
            className='typography-color-title'>
            Recupera tu contraseña
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <h6>
          Por favor ingrese su correo electrónico para restablecer su contraseña
          </h6>
          <CInputGroup
            className="button-no-hover-green text-white  mb-3">
            <CInputGroupText>
              <CIcon
                icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              placeholder="email"
              autoComplete="email" />
          </CInputGroup>
        </CModalBody>

        <CModalFooter>
          <CButton
            className='button-no-hover-green text-white '
            onClick={() => setVisible(false)}>
                Cerrar
          </CButton>

          <CButton
            className='button-no-hover-green text-white '>
              Guardar cambios
          </CButton>
        </CModalFooter>
      </CModal>
=======
>>>>>>> master
    </div>
  )
}

export default Login
