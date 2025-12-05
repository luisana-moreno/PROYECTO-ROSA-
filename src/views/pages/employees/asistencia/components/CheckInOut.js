'use client'

import { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CFormSelect,
  CSpinner,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { toast } from 'react-toastify'
import QRScanner from './QRScanner'
import { attendanceService } from '../../../../../api/attendanceService'

const CheckInOut = ({ employees, onCheckIn, loading }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [processingQR, setProcessingQR] = useState(false)

  const handleCheckIn = async () => {
    if (!selectedEmployeeId) {
      toast.warning('Selecciona un empleado para registrar la entrada.')
      return
    }

    await onCheckIn(selectedEmployeeId, 'entrada')
    setSelectedEmployeeId('')
  }

  const handleCheckOut = async () => {
    if (!selectedEmployeeId) {
      toast.warning('Selecciona un empleado para registrar la salida.')
      return
    }

    await onCheckIn(selectedEmployeeId, 'salida')
    setSelectedEmployeeId('')
  }

  const handleQRScan = async (qrCode) => {
    setProcessingQR(true)
    try {
      const result = await attendanceService.qrCheckIn(qrCode)

      // Mostrar mensaje de éxito
      const tipoRegistro = result.type === 'entrada' ? 'Entrada' : 'Salida'
      const mensaje = `✅ ${tipoRegistro} registrada: ${result.employee.name} - ${result.time}`

      if (result.type === 'salida' && result.hoursWorked) {
        toast.success(`${mensaje}\nHoras trabajadas: ${result.hoursWorked}`, {
          autoClose: 5000,
        })
      } else {
        toast.success(mensaje, { autoClose: 5000 })
      }

      // Refrescar datos si hay callback
      if (onCheckIn) {
        // Pequeño delay para que el backend procese
        setTimeout(() => {
          window.location.reload() // Recargar para actualizar la tabla
        }, 1500)
      }
    } catch (error) {
      console.error('Error al procesar QR:', error)
      toast.error(error.message || 'Error al procesar código QR')
    } finally {
      setProcessingQR(false)
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5 className="mb-0">Registro de Entrada/Salida</h5>
      </CCardHeader>
      <CCardBody>
        {/* Tabs de navegación */}
        <CNav variant="tabs" role="tablist" className="mb-3">
          <CNavItem>
            <CNavLink
              active={activeTab === 0}
              onClick={() => setActiveTab(0)}
              style={{ cursor: 'pointer' }}
            >
              Registro Manual
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 1}
              onClick={() => setActiveTab(1)}
              style={{ cursor: 'pointer' }}
            >
              Escanear QR
            </CNavLink>
          </CNavItem>
        </CNav>

        {/* Contenido de tabs */}
        <CTabContent>
          {/* Tab Manual */}
          <CTabPane visible={activeTab === 0}>
            <CRow className="g-3">
              <CCol md={6}>
                <CFormSelect
                  label="Seleccionar Empleado"
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  disabled={loading}
                >
                  <option value="">-- Elige un empleado --</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.ttrNombrel} {emp.ttrApellid} ({emp.cargoNombre})
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={6}>
                <label className="form-label">&nbsp;</label>
                <div className="d-flex gap-2">
                  <CButton
                    color="success"
                    variant="outline"
                    className="flex-grow-1"
                    onClick={handleCheckIn}
                    disabled={loading || !selectedEmployeeId}
                  >
                    {loading ? <CSpinner size="sm" className="me-2" /> : null}
                    Entrada
                  </CButton>
                  <CButton
                    color="danger"
                    variant="outline"
                    className="flex-grow-1"
                    onClick={handleCheckOut}
                    disabled={loading || !selectedEmployeeId}
                  >
                    {loading ? <CSpinner size="sm" className="me-2" /> : null}
                    Salida
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CTabPane>

          {/* Tab QR Scanner */}
          <CTabPane visible={activeTab === 1}>
            {processingQR && (
              <div className="text-center mb-3">
                <CSpinner color="primary" />
                <p className="mt-2">Procesando código QR...</p>
              </div>
            )}
            <QRScanner onScanSuccess={handleQRScan} />
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default CheckInOut
