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

const AddEmployeeModal = ({
  visible,
  setVisible,
  addEmployee,
  setAddEmployee,
  handleAddEmployee,
  positions,
}) => {
  const today = new Date().toISOString().split('T')[0]
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Resetear hasUnsavedChanges cuando el modal se cierra o se abre
  useEffect(() => {
    if (!visible) {
      setHasUnsavedChanges(false)
    }
  }, [visible])

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
    setAddEmployee({ ...addEmployee, [e.target.name]: e.target.value })
    setHasUnsavedChanges(true)
  }

  const handleDocumentChange = (e) => {
    setAddEmployee({ ...addEmployee, ttr_documen: e.target.value.replace(/\D/g, '') })
    setHasUnsavedChanges(true)
  }

  const handlePhoneChange = (e) => {
    setAddEmployee({ ...addEmployee, ttr_telefon: e.target.value.replace(/\D/g, '') })
    setHasUnsavedChanges(true)
  }

  const handlePositionChange = (e) => {
    setAddEmployee({
      ...addEmployee,
      ttr_idcargp: e.target.value === '' ? '' : parseInt(e.target.value, 10),
    })
    setHasUnsavedChanges(true)
  }

  const validateForm = () => {
    if (
      !addEmployee.ttr_nombrel ||
      !addEmployee.ttr_apellid ||
      !addEmployee.ttr_documen ||
      !addEmployee.ttr_fecnaci ||
      !addEmployee.ttr_telefon ||
      !addEmployee.ttr_direcci ||
      !addEmployee.ttr_feccont ||
      !addEmployee.ttr_idcargp
    ) {
      toast.error('Todos los campos obligatorios deben ser llenados.')
      return false
    }

    if (addEmployee.ttr_nombrel.length > 100) {
      toast.error('El nombre no puede exceder los 100 caracteres.')
      return false
    }
    if (addEmployee.ttr_apellid.length > 100) {
      toast.error('El apellido no puede exceder los 100 caracteres.')
      return false
    }
    if (addEmployee.ttr_documen.length > 8) {
      toast.error('El número de documento no puede exceder los 8 caracteres.')
      return false
    }
    if (addEmployee.ttr_telefon.length > 11) {
      toast.error('El teléfono no puede exceder los 11 caracteres.')
      return false
    }
    if (addEmployee.ttr_direcci.length > 255) {
      toast.error('La dirección no puede exceder los 255 caracteres.')
      return false
    }

    if (new Date(addEmployee.ttr_fecnaci) > new Date(today)) {
      toast.error('La fecha de nacimiento no puede ser una fecha futura.')
      return false
    }
    if (new Date(addEmployee.ttr_feccont) > new Date(today)) {
      toast.error('La fecha de contrato no puede ser una fecha futura.')
      return false
    }

    return true
  }

  const handleAddEmployeeWithValidation = () => {
    if (validateForm()) {
      handleAddEmployee()
      setHasUnsavedChanges(false) // Resetear después de guardar
    }
  }

  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres cerrar sin guardar?',
      )
      if (confirmClose) {
        setVisible(false)
      }
    } else {
      setVisible(false)
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={handleCloseModal}
      className="modern-modal"
      backdrop="static"
    >
      <CModalHeader className="modern-modal-header">
        <CModalTitle className="modern-modal-title">Registro de Empleados</CModalTitle>
      </CModalHeader>

      <CModalBody className="modern-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <CRow className="g-3 mt-2">
          <h4 className="text-green mt-1 me-5">Datos Personales del empleado</h4>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Nombre"
              aria-label="Nombre"
              name="ttr_nombrel"
              value={addEmployee.ttr_nombrel}
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
              name="ttr_apellid"
              value={addEmployee.ttr_apellid}
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
              name="ttr_documen"
              value={addEmployee.ttr_documen}
              onChange={handleDocumentChange}
              maxLength={8}
            />
            <small className="text-muted">Ingrese el numero de documento.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="date"
              aria-label="Fecha de nacimiento"
              placeholder="Fecha de nacimiento"
              name="ttr_fecnaci"
              value={addEmployee.ttr_fecnaci}
              onChange={handleChange}
              max={today}
            />
            <small className="text-muted">Ingrese la fecha de nacimiento.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Telefono"
              aria-label="Telefono"
              name="ttr_telefon"
              value={addEmployee.ttr_telefon}
              onChange={handlePhoneChange}
              maxLength={11}
            />
            <small className="text-muted">Ingrese el numero de Telefono.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Direccion"
              aria-label="Direccion"
              name="ttr_direcci"
              value={addEmployee.ttr_direcci}
              onChange={handleChange}
              maxLength={255}
            />
            <small className="text-muted">Ingrese la Direccion.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="date"
              placeholder="Fecha de Contrato"
              aria-label="Fecha de Contrato"
              name="ttr_feccont"
              value={addEmployee.ttr_feccont}
              onChange={handleChange}
              max={today}
            />
            <small className="text-muted">Ingrese la fecha de Contrato.</small>
          </CCol>

          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              aria-label="Cargo"
              name="ttr_idcargp"
              value={addEmployee.ttr_idcargp}
              onChange={handlePositionChange}
            >
              <option key="default-position-add" value="">
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
          onClick={handleAddEmployeeWithValidation}
        >
          Agregar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddEmployeeModal
