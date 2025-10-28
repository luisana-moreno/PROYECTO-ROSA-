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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logo from 'src/assets/images/finca/fincalogo.png' // Importa el logo
import { useAuth } from '../../../context/AuthContext' // Importa useAuth
import { toast } from 'react-toastify' // Importa toast de react-toastify

const Login = () => {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth() // Usa la función login del AuthContext
  // const addToast = useToast() // Ya no se usa useToast

  useEffect(() => {
    document.body.classList.add('login-page')
    // No limpiar el token aquí, AuthContext se encarga de la persistencia
    return () => {
      document.body.classList.remove('login-page')
    }
  }, [])

  const handleSubmit = async () => {
    if (!correo || !contrasena) {
      toast.warning('Por favor, completa todos los campos.')
      return
    }

    try {
      const success = await login({ correo, contrasena }) // Llama a la función login del contexto
      if (success) {
        toast.success('Bienvenido al sistema.')
        navigate('/dashboard')
      } else {
        toast.error('Credenciales inválidas o error al iniciar sesión.')
      }
    } catch (error) {
      toast.error(error.message || 'Error al iniciar sesión.')
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center login-vignette">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Acceso</h1>
                    <p className="text-medium-emphasis">Iniciar sesión en su cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Correo electrónico"
                        autoComplete="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSubmit()
                          }
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton className="px-4 btn-custom-green" onClick={handleSubmit}>
                          Acceder
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0 text-white">
                          ¿Has olvidado tu contraseña?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-custom-green py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center d-flex align-items-center justify-content-center">
                  <div
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: '20px',
                      display: 'inline-block',
                    }}
                  >
                    <CImage src={logo} fluid width={150} />
                  </div>
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
