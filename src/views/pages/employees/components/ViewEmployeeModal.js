'use client'
import { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CBadge,
  CListGroup,
  CListGroupItem,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilPhone,
  cilLocationPin,
  cilCalendar,
  cilBriefcase,
  cilCloudDownload,
} from '@coreui/icons'
import { formatDateToDDMMYYYY } from '../../../../utils/dateFormatter'

const ViewEmployeeModal = ({ viewVisible, setViewVisible, currentEmployee }) => {
  const [generating, setGenerating] = useState(false)

  if (!currentEmployee) return null
  console.log(currentEmployee)

  const fullName = `${currentEmployee.ttrNombrel} ${currentEmployee.ttrApellid}`.toUpperCase()

  const handleGenerateBadge = async () => {
    setGenerating(true)
    try {
      // Llamar al endpoint del backend
      const response = await fetch(
        `http://localhost:5000/api/empleados/${currentEmployee.id}/generate-badge`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/pdf',
          },
        },
      )

      if (!response.ok) {
        throw new Error('Error al generar carnet')
      }

      // Descargar el PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `carnet-${currentEmployee.ttrDocumen}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      console.log('Carnet generado exitosamente')
    } catch (error) {
      console.error('Error al generar carnet:', error)
      alert('Error al generar el carnet. Por favor, intenta nuevamente.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={viewVisible}
      onClose={() => setViewVisible(false)}
      size="lg"
      backdrop="static"
    >
      <CModalHeader
        closeButton
        style={{
          backgroundColor: 'rgb(45, 129, 30)',
          borderColor: 'rgb(45, 129, 30)',
        }}
        className="text-white border-0"
      >
        <CModalTitle className="fw-bold">
          <CIcon icon={cilUser} className="me-2" />
          Información del Empleado
        </CModalTitle>
      </CModalHeader>

      <CModalBody className="p-4">
        <CCard className="border-0 shadow-sm mb-4 bg-light">
          <CCardBody className="p-4">
            <CRow className="align-items-center">
              <CCol md="8">
                <h5 className="mb-1 text-dark fw-bold">{fullName}</h5>
                <CBadge color="info" className="me-2 py-2 px-3 fs-6">
                  <CIcon icon={cilBriefcase} className="me-1" />
                  {currentEmployee.cargoNombre}
                </CBadge>
              </CCol>
              <CCol md="4" className="text-end">
                <small className="text-muted">ID: {currentEmployee.ttrDocumen}</small>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <CCard className="border-0 shadow-sm mb-4">
          <CCardBody className="p-4">
            <h6 className="mb-3 text-dark fw-bold border-bottom pb-2">Información Personal</h6>
            <CListGroup flush>
              <CListGroupItem className="border-0 px-0 py-2">
                <CRow className="align-items-center">
                  <CCol md="4" className="fw-bold text-muted">
                    <CIcon icon={''} className="me-2" />
                    Número de Documento:
                  </CCol>
                  <CCol md="8">
                    <span className="text-dark">{currentEmployee.ttrDocumen}</span>
                  </CCol>
                </CRow>
              </CListGroupItem>

              <CListGroupItem className="border-0 px-0 py-2">
                <CRow className="align-items-center">
                  <CCol md="4" className="fw-bold text-muted">
                    <CIcon icon={cilCalendar} className="me-2" />
                    Fecha de Nacimiento:
                  </CCol>
                  <CCol md="8">
                    <span className="text-dark">
                      {formatDateToDDMMYYYY(currentEmployee.ttrFecnaci)}
                    </span>
                  </CCol>
                </CRow>
              </CListGroupItem>

              <CListGroupItem className="border-0 px-0 py-2">
                <CRow className="align-items-center">
                  <CCol md="4" className="fw-bold text-muted">
                    <CIcon icon={cilPhone} className="me-2" />
                    Teléfono:
                  </CCol>
                  <CCol md="8">
                    <span className="text-dark">{currentEmployee.ttrTelefon}</span>
                  </CCol>
                </CRow>
              </CListGroupItem>

              <CListGroupItem className="border-0 px-0 py-2">
                <CRow className="align-items-center">
                  <CCol md="4" className="fw-bold text-muted">
                    <CIcon icon={cilLocationPin} className="me-2" />
                    Dirección:
                  </CCol>
                  <CCol md="8">
                    <span className="text-dark">{currentEmployee.ttrDirecci}</span>
                  </CCol>
                </CRow>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>

        <CCard className="border-0 shadow-sm mb-4">
          <CCardBody className="p-4">
            <h6 className="mb-3 text-dark fw-bold border-bottom pb-2">Información Contractual</h6>
            <CRow>
              <CCol md="6">
                <div className="mb-3">
                  <small className="text-muted d-block mb-1 fw-bold">
                    <CIcon icon={cilCalendar} className="me-1" />
                    Fecha de Contrato
                  </small>
                  <span className="text-dark fw-bold">
                    {formatDateToDDMMYYYY(currentEmployee.ttrFeccont)}
                  </span>
                </div>
              </CCol>
              <CCol md="6">
                <div className="mb-3">
                  <small className="text-muted d-block mb-1 fw-bold">
                    <CIcon icon={cilBriefcase} className="me-1" />
                    Cargo
                  </small>
                  <span className="text-dark fw-bold">{currentEmployee.cargoNombre}</span>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>

      <CModalFooter className="border-top bg-light">
        <CButton color="primary" onClick={handleGenerateBadge} disabled={generating}>
          {generating ? (
            <>
              <CSpinner size="sm" className="me-2" />
              Generando...
            </>
          ) : (
            <>
              <CIcon icon={cilCloudDownload} className="me-2" />
              Generar Carnet
            </>
          )}
        </CButton>
        <CButton color="secondary" onClick={() => setViewVisible(false)}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ViewEmployeeModal
