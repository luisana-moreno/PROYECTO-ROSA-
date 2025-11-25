import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CRow,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import { toast } from 'react-toastify'

const EditEmployeeModal = ({
  editVisible,
  setEditVisible,
  currentEmployee,
  setCurrentEmployee,
  handleEditEmployee,
  positions,
  originalEmployee, // Propiedad para almacenar el estado original del empleado
}) => {
  const today = new Date().toISOString().split('T')[0]
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Resetear hasUnsavedChanges cuando el modal se cierra o se abre
  useEffect(() => {
    if (!editVisible) {
      setHasUnsavedChanges(false)
    } else {
      // Comparar el currentEmployee con el originalEmployee para ver si hay cambios al abrir el modal
      const isChanged = JSON.stringify(currentEmployee) !== JSON.stringify(originalEmployee)
      setHasUnsavedChanges(isChanged)
    }
  }, [editVisible, currentEmployee, originalEmployee])

  // Manejar el evento antes de descargar la página (para advertir sobre cambios no guardados)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault()
        event.returnValue = '' // Mensaje estándar para la mayoría de los navegadores
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
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

  const handleEditEmployeeWithValidation = () => {
    if (validateForm()) {
      handleEditEmployee()
      setHasUnsavedChanges(false) // Resetear después de guardar
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
      className="modern-modal"
      backdrop="static"
    >
      <CModalHeader className="modern-modal-header">
        <CModalTitle className="modern-modal-title">Editar Empleado</CModalTitle>
      </CModalHeader>

      <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <CRow className="g-3 mt-2">
          <h4 className="text-green mt-1 me-5">Editar Datos Personales</h4>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Nombre"
              aria-label="Nombre"
              name="ttrNombrel"
              value={currentEmployee?.ttrNombrel || ''}
              onChange={handleChange}
              maxLength={100}
            />
            <small className="text-muted">Ingrese el nombre.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Apellido"
              aria-label="Apellido"
              name="ttrApellid"
              value={currentEmployee?.ttrApellid || ''}
              onChange={handleChange}
              maxLength={100}
            />
            <small className="text-muted">Ingrese el apellido.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Numero de documento"
              aria-label="Numero de documento"
              name="ttrDocumen"
              value={currentEmployee?.ttrDocumen || ''}
              onChange={handleDocumentChange}
              maxLength={8}
            />
            <small className="text-muted">Ingrese el numero de documento.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="date"
              placeholder="fecha de nacimiento"
              aria-label="fecha de nacimiento"
              name="ttrFecnaci"
              value={currentEmployee?.ttrFecnaci || ''}
              onChange={handleChange}
              max={today}
            />
            <small className="text-muted">Ingrese la fecha de nacimiento.</small>
          </CCol>
        </CRow>
        <CRow className="employees-las-name g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Telefono"
              aria-label="Telefono"
              name="ttrTelefon"
              value={currentEmployee?.ttrTelefon || ''}
              onChange={handlePhoneChange}
              maxLength={11}
            />
            <small className="text-muted">Ingrese el numero de telefono.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Direccion"
              aria-label="Direccion"
              name="ttrDirecci"
              value={currentEmployee?.ttrDirecci || ''}
              onChange={handleChange}
              maxLength={255}
            />
            <small className="text-muted">Ingrese la direccion.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="date"
              placeholder="Fecha de Contrato"
              aria-label="Fecha de Contrato"
              name="ttrFeccont"
              value={currentEmployee?.ttrFeccont || ''}
              onChange={handleChange}
              max={today}
            />
            <small className="text-muted">Ingrese la fecha de contrato.</small>
          </CCol>
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              aria-label="cargo"
              name="ttrIdcargp"
              value={currentEmployee?.ttrIdcargp || ''}
              onChange={handlePositionChange}
            >
              <option key="default-position-edit" value="">
                Seleccione el cargo
              </option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.nombre}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Ingrese el cargo.</small>
          </CCol>
        </CRow>
      </CModalBody>

      <CModalFooter className="modern-modal-footer">
        <CButton
          className="button-no-hover-green text-white"
          onClick={handleEditEmployeeWithValidation}
        >
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditEmployeeModal
