import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CRow,
  CCol,
  CBadge,
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const ViewEmployeeModal = ({ viewVisible, setViewVisible, currentEmployee }) => {
  const [generating, setGenerating] = useState(false)

  if (!currentEmployee) return null

  const fullName = `${currentEmployee.ttrNombrel} ${currentEmployee.ttrApellid}`

  const handleGenerateBadge = async () => {
    setGenerating(true)
    try {
      const response = await fetch(`${API_URL}/empleados/${currentEmployee.id}/generate-badge`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      })

      if (!response.ok) {
        throw new Error('Error al generar carnet')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `carnet-${currentEmployee.ttrDocumen}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al generar carnet:', error)
      alert('Error al generar el carnet. Por favor, intenta nuevamente.')
    } finally {
      setGenerating(false)
    }
  }

  // Función para obtener el color del badge según el cargo
  const getPositionBadgeColor = (positionName) => {
    const positionColors = {
      gerente: 'danger',
      veterinario: 'success',
      trabajador: 'info',
      supervisor: 'warning',
      administrador: 'primary',
    }
    return positionColors[positionName?.toLowerCase()] || 'secondary'
  }

  const InfoRow = ({ icon, label, value }) => (
    <CRow className="mb-3 align-items-center">
      <CCol xs={5} className="text-medium-emphasis">
        <CIcon icon={icon} className="me-2" />
        <small>
          <strong>{label}</strong>
        </small>
      </CCol>
      <CCol xs={7}>
        <span>{value || '-'}</span>
      </CCol>
    </CRow>
  )

  return (
    <CModal
      alignment="center"
      scrollable
      visible={viewVisible}
      onClose={() => setViewVisible(false)}
      size="lg"
      backdrop="static"
    >
      <CModalHeader style={{ backgroundColor: '#28a745', color: 'white' }}>
        <CModalTitle>
          <CIcon icon={cilUser} className="me-2" />
          Información del Empleado
        </CModalTitle>
      </CModalHeader>

      <CModalBody className="p-4">
        {/* Header con nombre y cargo */}
        <div className="text-center mb-4 pb-4 border-bottom">
          <div className="mb-3">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#28a745',
                color: 'white',
              }}
            >
              <CIcon icon={cilUser} size="3xl" />
            </div>
          </div>
          <h4 className="mb-2">{fullName}</h4>
          <CBadge
            color={getPositionBadgeColor(currentEmployee.cargoNombre)}
            className="px-3 py-2"
            style={{ fontSize: '0.9rem' }}
          >
            <CIcon icon={cilBriefcase} className="me-2" />
            {currentEmployee.cargoNombre}
          </CBadge>
        </div>

        {/* Información Personal */}
        <div className="mb-4">
          <h6 className="text-success mb-3">
            <strong>Información Personal</strong>
          </h6>
          <InfoRow icon={'cilIdCard'} label="Documento" value={currentEmployee.ttrDocumen} />
          <InfoRow
            icon={cilCalendar}
            label="Fecha de Nacimiento"
            value={formatDateToDDMMYYYY(currentEmployee.ttrFecnaci)}
          />
          <InfoRow icon={cilPhone} label="Teléfono" value={currentEmployee.ttrTelefon} />
          <InfoRow icon={cilLocationPin} label="Dirección" value={currentEmployee.ttrDirecci} />
        </div>

        {/* Información Contractual */}
        <div>
          <h6 className="text-success mb-3">
            <strong>Información Contractual</strong>
          </h6>
          <InfoRow
            icon={cilCalendar}
            label="Fecha de Contrato"
            value={formatDateToDDMMYYYY(currentEmployee.ttrFeccont)}
          />
          <InfoRow icon={cilBriefcase} label="Cargo Actual" value={currentEmployee.cargoNombre} />
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="success" onClick={handleGenerateBadge} disabled={generating}>
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
