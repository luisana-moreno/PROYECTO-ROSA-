import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
                      />
                    </CInputGroup>

                    <CRow>
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
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

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
    </div>
  )
}

export default Login
