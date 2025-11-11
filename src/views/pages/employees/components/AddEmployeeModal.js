import React from 'react'
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

  const validateForm = () => {
    if (
      !addEmployee.ttr_nombrel ||
      !addEmployee.ttr_apellid ||
      !addEmployee.ttr_documen ||
      !addEmployee.ttr_fecnaci ||
      !addEmployee.ttr_telefon ||
      !addEmployee.ttr_direcci ||
      !addEmployee.ttr_feccont ||
      !addEmployee.ttr_idcargp ||
      !addEmployee.Contact_Person
    ) {
      toast.error('Todos los campos obligatorios deben ser llenados.')
      return false
    }

    if (addEmployee.ttr_nombrel.length > 100) {
      toast.error('El primer nombre no puede exceder los 100 caracteres.')
      return false
    }
    if (addEmployee.ttr_nomsegu && addEmployee.ttr_nomsegu.length > 100) {
      toast.error('El segundo nombre no puede exceder los 100 caracteres.')
      return false
    }
    if (addEmployee.ttr_apellid.length > 100) {
      toast.error('El primer apellido no puede exceder los 100 caracteres.')
      return false
    }
    if (addEmployee.ttr_apesegu && addEmployee.ttr_apesegu.length > 100) {
      toast.error('El segundo apellido no puede exceder los 100 caracteres.')
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
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => setVisible(false)}
      className="modern-modal"
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
              placeholder="Primer Nombre"
              aria-label="primer nombre"
              value={addEmployee.ttr_nombrel}
              onChange={(e) => setAddEmployee({ ...addEmployee, ttr_nombrel: e.target.value })}
              maxLength={100}
            />
            <small className="text-muted">Ingrese el primer nombre.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Segundo Nombre"
              aria-label="segundo nombre"
              value={addEmployee.ttr_nomsegu}
              onChange={(e) => setAddEmployee({ ...addEmployee, ttr_nomsegu: e.target.value })}
              maxLength={100}
            />
            <small className="text-muted">Ingrese el segundo nombre.</small>
          </CCol>
        </CRow>
        <CRow className="employees-las-name g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Primer apellido"
              aria-label="Primer apellido"
              value={addEmployee.ttr_apellid}
              onChange={(e) => setAddEmployee({ ...addEmployee, ttr_apellid: e.target.value })}
              maxLength={100}
            />
            <small className="text-muted">Ingrese el primer apellido.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Segundo apellido"
              aria-label="Segundo apellido"
              value={addEmployee.ttr_apesegu}
              onChange={(e) => setAddEmployee({ ...addEmployee, ttr_apesegu: e.target.value })}
              maxLength={100}
            />
            <small className="text-muted">Ingrese el segundo apellido.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Numero de documento"
              aria-label="Numero de documento"
              value={addEmployee.ttr_documen}
              onChange={(e) => setAddEmployee({ ...addEmployee, ttr_documen: e.target.value })}
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
              value={addEmployee.ttr_fecnaci}
              onChange={(e) => setAddEmployee({ ...addEmployee, ttr_fecnaci: e.target.value })}
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
              value={addEmployee.ttr_telefon}
              onChange={(e) => setAddEmployee({ ...addEmployee, ttr_telefon: e.target.value })}
              maxLength={11}
            />
            <small className="text-muted">Ingrese el numero de Telefono.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Direccion"
              aria-label="Direccion"
              value={addEmployee.ttr_direcci}
              onChange={(e) => setAddEmployee({ ...addEmployee, ttr_direcci: e.target.value })}
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
              value={addEmployee.ttr_feccont}
              onChange={(e) => setAddEmployee({ ...addEmployee, ttr_feccont: e.target.value })}
              max={today}
            />
            <small className="text-muted">Ingrese la fecha de Contrato.</small>
          </CCol>

          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              aria-label="Cargo"
              value={addEmployee.ttr_idcargp}
              onChange={(e) =>
                setAddEmployee({
                  ...addEmployee,
                  ttr_idcargp: e.target.value === '' ? '' : parseInt(e.target.value, 10),
                })
              }
            >
              <option key="default-position-add" value="">
                Seleccione el cargo
              </option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.name}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Ingrese el cargo.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Persona de Contacto"
              aria-label="Persona de Contacto"
              value={addEmployee.Contact_Person}
              onChange={(e) => setAddEmployee({ ...addEmployee, Contact_Person: e.target.value })}
            />
            <small className="text-muted">Ingrese la persona de contacto.</small>
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
