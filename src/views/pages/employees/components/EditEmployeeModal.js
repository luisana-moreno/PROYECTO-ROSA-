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

const EditEmployeeModal = ({
  editVisible,
  setEditVisible,
  currentEmployee,
  setCurrentEmployee,
  handleEditEmployee,
  positions,
}) => {
  const validateForm = () => {
    if (
      !currentEmployee.ttr_nombrel ||
      !currentEmployee.ttr_apellid ||
      !currentEmployee.ttr_documen ||
      !currentEmployee.ttr_fecnaci ||
      !currentEmployee.ttr_telefon ||
      !currentEmployee.ttr_direcci ||
      !currentEmployee.ttr_feccont ||
      !currentEmployee.ttr_idcargp ||
      !currentEmployee.Contact_Person
    ) {
      toast.error('Todos los campos obligatorios deben ser llenados.')
      return false
    }
    return true
  }

  const handleEditEmployeeWithValidation = () => {
    if (validateForm()) {
      handleEditEmployee()
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={() => setEditVisible(false)}
      className="modern-modal"
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
              placeholder="primer nombre"
              aria-label="primer nombre"
              value={currentEmployee?.ttr_nombrel || ''}
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, ttr_nombrel: e.target.value })
              }
            />
            <small className="text-muted">Ingrese el primer nombre.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="segundo nombre"
              aria-label="segundo nombre"
              value={currentEmployee?.ttr_nomsegu || ''}
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, ttr_nomsegu: e.target.value })
              }
            />
            <small className="text-muted">Ingrese el segundo nombre.</small>
          </CCol>

          <CRow className="employees-las-name g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                placeholder="primer apellido"
                aria-label="primer apellido"
                value={currentEmployee?.ttr_apellid || ''}
                onChange={(e) =>
                  setCurrentEmployee({ ...currentEmployee, ttr_apellid: e.target.value })
                }
              />
              <small className="text-muted">Ingrese el primer Apellido.</small>
            </CCol>

            <CCol md={6}>
              <CFormInput
                className="modal-name custom-select"
                placeholder="segundo apellido"
                aria-label="segundo apellido"
                value={currentEmployee?.ttr_apesegu || ''}
                onChange={(e) =>
                  setCurrentEmployee({ ...currentEmployee, ttr_apesegu: e.target.value })
                }
              />
              <small className="text-muted">Ingrese el segundo Apellido.</small>
            </CCol>
          </CRow>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="numero de documento"
              aria-label="numero de documento"
              value={currentEmployee?.ttr_documen || ''}
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, ttr_documen: e.target.value })
              }
            />
            <small className="text-muted">Ingrese el numero de documento.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="date"
              placeholder="fecha de nacimiento"
              aria-label="fecha de nacimiento"
              value={currentEmployee?.ttr_fecnaci || ''}
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, ttr_fecnaci: e.target.value })
              }
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
              value={currentEmployee?.ttr_telefon || ''}
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, ttr_telefon: e.target.value })
              }
            />
            <small className="text-muted">Ingrese el numero de telefono.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Direccion"
              aria-label="Direccion"
              value={currentEmployee?.ttr_direcci || ''}
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, ttr_direcci: e.target.value })
              }
            />
            <small className="text-muted">Ingrese la direccion.</small>
          </CCol>

          <CCol md={6}>
            <CFormInput
              className="modal-nam custom-selecte"
              type="date"
              placeholder="Fecha de Contrato"
              aria-label="Fecha de Contrato"
              value={currentEmployee?.ttr_feccont || ''}
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, ttr_feccont: e.target.value })
              }
            />
            <small className="text-muted">Ingrese la fecha de contrato.</small>
          </CCol>
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              aria-label="cargo"
              value={currentEmployee?.ttr_idcargp || ''}
              onChange={(e) =>
                setCurrentEmployee({
                  ...currentEmployee,
                  ttr_idcargp: e.target.value === '' ? '' : parseInt(e.target.value, 10),
                })
              }
            >
              <option key="default-position-edit" value="">
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
              value={currentEmployee?.Contact_Person || ''}
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, Contact_Person: e.target.value })
              }
            />
            <small className="text-muted">Ingrese la persona de contacto.</small>
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
