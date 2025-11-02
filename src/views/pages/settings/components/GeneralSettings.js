import React from 'react'
import { CCard, CCardHeader, CCardBody, CFormInput, CRow, CCol } from '@coreui/react'

const GeneralSettings = () => {
  return (
    <CCard>
      <CCardHeader>
        <strong>Configuración General</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput
              type="text"
              id="companyName"
              label="Nombre de la Empresa"
              placeholder="Ingrese el nombre de la empresa"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput type="file" id="companyLogo" label="Logo de la Empresa" />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput type="file" id="companyBanner" label="Banner de la Empresa" />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default GeneralSettings
