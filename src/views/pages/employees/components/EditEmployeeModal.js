import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CForm,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { toast } from 'react-toastify'

const EditEmployeeModal = ({
  editVisible,
  setEditVisible,
  currentEmployee,
  setCurrentEmployee,
  handleEditEmployee,
  positions,
  originalEmployee,
}) => {
  const today = new Date().toISOString().split('T')[0]
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Detectar cambios no guardados
  useEffect(() => {
    if (!editVisible) {
      setHasUnsavedChanges(false)
    } else {
      const isChanged = JSON.stringify(currentEmployee) !== JSON.stringify(originalEmployee)
      setHasUnsavedChanges(isChanged)
    }
  }, [editVisible, currentEmployee, originalEmployee])

  // Advertir sobre cambios no guardados al salir de la página
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault()
        event.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  const handleChange = (e) => {
    setCurrentEmployee({ ...currentEmployee, [e.target.name]: e.target.value })
    setHasUnsavedChanges(true)
  }

  const handleDocumentChange = (e) => {
    setCurrentEmployee({
      ...currentEmployee,
      ttrDocumen: e.target.value.replace(/\D/g, ''),
    })
    setHasUnsavedChanges(true)
  }

  const handlePhoneChange = (e) => {
    setCurrentEmployee({
      ...currentEmployee,
      ttrTelefon: e.target.value.replace(/\D/g, ''),
    })
    setHasUnsavedChanges(true)
  }

  const handlePositionChange = (e) => {
    setCurrentEmployee({
      ...currentEmployee,
      ttrIdcargp: e.target.value === '' ? '' : parseInt(e.target.value, 10),
    })
    setHasUnsavedChanges(true)
  }

  const validateForm = () => {
    if (
      !currentEmployee.ttrNombrel ||
      !currentEmployee.ttrApellid ||
      !currentEmployee.ttrDocumen ||
      !currentEmployee.ttrFecnaci ||
      !currentEmployee.ttrTelefon ||
      !currentEmployee.ttrDirecci ||
      !currentEmployee.ttrFeccont ||
      !currentEmployee.ttrIdcargp
    ) {
      toast.error('Todos los campos obligatorios deben ser llenados.')
      return false
    }

    if (currentEmployee.ttrNombrel.length > 100) {
      toast.error('El nombre no puede exceder los 100 caracteres.')
      return false
    }
    if (currentEmployee.ttrApellid.length > 100) {
      toast.error('El apellido no puede exceder los 100 caracteres.')
      return false
    }
    if (currentEmployee.ttrDocumen.length > 8) {
      toast.error('El número de documento no puede exceder los 8 caracteres.')
      return false
    }
    if (currentEmployee.ttrTelefon.length > 11) {
      toast.error('El teléfono no puede exceder los 11 caracteres.')
      return false
    }
    if (currentEmployee.ttrDirecci.length > 255) {
      toast.error('La dirección no puede exceder los 255 caracteres.')
      return false
    }

    if (new Date(currentEmployee.ttrFecnaci) > new Date(today)) {
      toast.error('La fecha de nacimiento no puede ser una fecha futura.')
      return false
    }
    if (new Date(currentEmployee.ttrFeccont) > new Date(today)) {
      toast.error('La fecha de contrato no puede ser una fecha futura.')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      handleEditEmployee()
      setHasUnsavedChanges(false)
    }
  }

  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres cerrar sin guardar?',
      )
      if (confirmClose) {
        setEditVisible(false)
      }
    } else {
      setEditVisible(false)
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={handleCloseModal}
      backdrop="static"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Editar Empleado</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {hasUnsavedChanges && (
            <CAlert color="warning" className="mb-4">
              <strong>Atención:</strong> Tienes cambios sin guardar.
            </CAlert>
          )}

          {/* Nombre y Apellido */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Nombre *</CFormLabel>
              <CFormInput
                placeholder="Ingrese el nombre"
                name="ttrNombrel"
                value={currentEmployee?.ttrNombrel || ''}
                onChange={handleChange}
                maxLength={100}
                required
              />
              <small className="text-muted">Máximo 100 caracteres</small>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Apellido *</CFormLabel>
              <CFormInput
                placeholder="Ingrese el apellido"
                name="ttrApellid"
                value={currentEmployee?.ttrApellid || ''}
                onChange={handleChange}
                maxLength={100}
                required
              />
              <small className="text-muted">Máximo 100 caracteres</small>
            </CCol>
          </CRow>

          {/* Documento y Fecha de Nacimiento */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Número de Documento *</CFormLabel>
              <CFormInput
                placeholder="Número de documento"
                name="ttrDocumen"
                value={currentEmployee?.ttrDocumen || ''}
                onChange={handleDocumentChange}
                maxLength={8}
                required
              />
              <small className="text-muted">Máximo 8 dígitos</small>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Fecha de Nacimiento *</CFormLabel>
              <CFormInput
                type="date"
                name="ttrFecnaci"
                value={currentEmployee?.ttrFecnaci || ''}
                onChange={handleChange}
                max={today}
                required
              />
            </CCol>
          </CRow>

          {/* Teléfono y Dirección */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Teléfono *</CFormLabel>
              <CFormInput
                placeholder="04121234567"
                name="ttrTelefon"
                value={currentEmployee?.ttrTelefon || ''}
                onChange={handlePhoneChange}
                maxLength={11}
                required
              />
              <small className="text-muted">Máximo 11 dígitos</small>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Dirección *</CFormLabel>
              <CFormInput
                placeholder="Ingrese la dirección"
                name="ttrDirecci"
                value={currentEmployee?.ttrDirecci || ''}
                onChange={handleChange}
                maxLength={255}
                required
              />
              <small className="text-muted">Máximo 255 caracteres</small>
            </CCol>
          </CRow>

          {/* Fecha de Contrato y Cargo */}
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Fecha de Contrato *</CFormLabel>
              <CFormInput
                type="date"
                name="ttrFeccont"
                value={currentEmployee?.ttrFeccont || ''}
                onChange={handleChange}
                max={today}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Cargo *</CFormLabel>
              <CFormSelect
                name="ttrIdcargp"
                value={currentEmployee?.ttrIdcargp || ''}
                onChange={handlePositionChange}
                required
              >
                <option value="">Seleccione el cargo</option>
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.nombre}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseModal}>
            Cancelar
          </CButton>
          <CButton color="success" type="submit">
            <CIcon icon={cilSave} className="me-2" />
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default EditEmployeeModal
