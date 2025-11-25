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

  const handleChange = (e) => {
    setAddEmployee({ ...addEmployee, [e.target.name]: e.target.value })
  }

  const handleDocumentChange = (e) => {
    setAddEmployee({ ...addEmployee, ttrDocumen: e.target.value.replace(/\D/g, '') })
  }

  const handlePhoneChange = (e) => {
    setAddEmployee({ ...addEmployee, ttrTelefon: e.target.value.replace(/\D/g, '') })
  }

  const handlePositionChange = (e) => {
    setAddEmployee({
      ...addEmployee,
      ttrIdcargp: e.target.value === '' ? '' : parseInt(e.target.value, 10),
    })
  }

  const handleAddEmployeeWithValidation = () => {
    handleAddEmployee()
  }

  const handleCloseModal = () => {
    setVisible(false)
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
              name="ttrNombrel"
              value={addEmployee.ttrNombrel}
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
              value={addEmployee.ttrApellid}
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
              value={addEmployee.ttrDocumen}
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
              name="ttrFecnaci"
              value={addEmployee.ttrFecnaci}
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
              name="ttrTelefon"
              value={addEmployee.ttrTelefon}
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
              name="ttrDirecci"
              value={addEmployee.ttrDirecci}
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
              name="ttrFeccont"
              value={addEmployee.ttrFeccont}
              onChange={handleChange}
              max={today}
            />
            <small className="text-muted">Ingrese la fecha de Contrato.</small>
          </CCol>

          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              aria-label="Cargo"
              name="ttrIdcargp"
              value={addEmployee.ttrIdcargp}
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
