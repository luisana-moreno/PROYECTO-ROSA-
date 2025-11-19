import React from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CCol,
  CFormInput,
  CRow,
  CFormSelect,
} from '@coreui/react'
import { toast } from 'react-toastify' // Importa toast de react-toastify

const AddCattleModal = ({
  visible,
  setVisible,
  addCattleForm,
  setAddCattleForm,
  handleAddCattle,
  razas,
  colores,
  etapas,
  estados,
}) => {
  const today = new Date().toISOString().split('T')[0]

  const validateForm = () => {
    if (
      !addCattleForm.numeroBovino ||
      !addCattleForm.idRazaBovino ||
      !addCattleForm.fechaNacimiento ||
      !addCattleForm.idColorBovino ||
      !addCattleForm.pesoKilo ||
      !addCattleForm.idEtapaBovino ||
      !addCattleForm.idEstadoBovino
    ) {
      toast.error('Todos los campos obligatorios deben ser llenados.')
      return false
    }

    if (new Date(addCattleForm.fechaNacimiento) > new Date(today)) {
      toast.error('La fecha de nacimiento no puede ser una fecha futura.')
      return false
    }

    return true
  }

  const handleAddCattleWithValidation = () => {
    if (validateForm()) {
      handleAddCattle()
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => setVisible(false)}
      backdrop="static"
    >
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">Datos del Bovino</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <CRow className="g-3 mt-2">
          <h4 className="text-green mt-1 me-5">Registro del Bovino</h4>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Numero de Arete"
              aria-label="Numero de Arete"
              value={addCattleForm.numeroBovino}
              onChange={(e) => setAddCattleForm({ ...addCattleForm, numeroBovino: e.target.value })}
            />
            <small className="text-muted">Ingrese el codigo del bovino.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="date"
              placeholder="Fecha de Nacimiento"
              value={addCattleForm.fechaNacimiento}
              onChange={(e) =>
                setAddCattleForm({ ...addCattleForm, fechaNacimiento: e.target.value })
              }
              max={today}
            />
            <small className="text-muted">Ingrese la fecha.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              placeholder="Raza"
              aria-label="Raza"
              value={addCattleForm.idRazaBovino}
              onChange={(e) =>
                setAddCattleForm({ ...addCattleForm, idRazaBovino: Number(e.target.value) })
              }
            >
              <option value="">Seleccione la Raza</option>
              {razas.map((raza) => (
                <option key={raza.tmaIdrazab} value={String(raza.tmaIdrazab)}>
                  {raza.tmaNomraza}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Ingrese la raza.</small>
          </CCol>
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              placeholder="Color"
              aria-label="Color"
              value={addCattleForm.idColorBovino}
              onChange={(e) =>
                setAddCattleForm({ ...addCattleForm, idColorBovino: Number(e.target.value) })
              }
            >
              <option value="">Seleccione el Color</option>
              {colores.map((color) => (
                <option key={color.tmaIdcolbo} value={String(color.tmaIdcolbo)}>
                  {color.tmaNomcolb}
                  {console.log(color)}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Ingrese el color del bovino.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="number"
              placeholder="Peso"
              value={addCattleForm.pesoKilo}
              onChange={(e) =>
                setAddCattleForm({ ...addCattleForm, pesoKilo: parseFloat(e.target.value) || '' })
              }
            />
            <small className="text-muted">Ingrese el peso del bovino.</small>
          </CCol>
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              placeholder="Etapa"
              aria-label="Etapa"
              value={addCattleForm.idEtapaBovino}
              onChange={(e) =>
                setAddCattleForm({ ...addCattleForm, idEtapaBovino: Number(e.target.value) })
              }
            >
              <option value="">Seleccione la Etapa</option>
              {etapas.map((etapa) => (
                <option key={etapa.tmaIdetabo} value={String(etapa.tmaIdetabo)}>
                  {etapa.tmaNometab}
                  {console.log(etapa)}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Ingrese la etapa del bovino.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              placeholder="Estado del Bovino"
              value={addCattleForm.idEstadoBovino}
              onChange={(e) =>
                setAddCattleForm({ ...addCattleForm, idEstadoBovino: Number(e.target.value) })
              }
            >
              <option value="">Estado del bovino</option>
              {estados.map((estado) => (
                <option key={estado.tmaIdestbo} value={String(estado.tmaIdestbo)}>
                  {estado.tmaNomestb}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Ingrese el estado del bovino.</small>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          className="button-no-hover-green text-white"
          onClick={handleAddCattleWithValidation}
        >
          Agregar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddCattleModal
