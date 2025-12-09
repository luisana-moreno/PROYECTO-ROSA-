import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
                      />
                    </CInputGroup>

                    <CRow>
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
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
