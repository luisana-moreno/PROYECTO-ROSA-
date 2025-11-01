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
  CAlert,
  CSpinner,
} from '@coreui/react'

const CheckInOut = ({ employees, onCheckIn, loading }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [message, setMessage] = useState(null)

  const handleCheckIn = async () => {
    if (!selectedEmployeeId) {
      setMessage({ type: 'warning', text: 'Selecciona un empleado' })
      return
    }

    await onCheckIn(selectedEmployeeId, 'entrada')
    setMessage({ type: 'success', text: 'Entrada registrada ✓' })
    setSelectedEmployeeId('')
    setTimeout(() => setMessage(null), 3000)
  }

  const handleCheckOut = async () => {
    if (!selectedEmployeeId) {
      setMessage({ type: 'warning', text: 'Selecciona un empleado' })
      return
    }

    await onCheckIn(selectedEmployeeId, 'salida')
    setMessage({ type: 'info', text: 'Salida registrada ✓' })
    setSelectedEmployeeId('')
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5 className="mb-0">Registro de Entrada/Salida</h5>
      </CCardHeader>
      <CCardBody>
        {message && (
          <CAlert
            color={message.type}
            className="mb-3"
            dismissible
            onClose={() => setMessage(null)}
          >
            {message.text}
          </CAlert>
        )}

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
                  {emp.name} ({emp.position})
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
      </CCardBody>
    </CCard>
  )
}

export default CheckInOut
