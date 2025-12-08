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
  CFormLabel,
  CRow,
  CFormSelect,
  CForm,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { toast } from 'react-toastify'

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

  const handleSubmit = (e) => {
    e.preventDefault()
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
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Nuevo Bovino</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <CAlert color="info" className="mb-4">
            <strong>Información:</strong> Complete todos los campos para registrar un nuevo bovino.
          </CAlert>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Número de Arete *</CFormLabel>
              <CFormInput
                placeholder="Ingrese el número de arete"
                value={addCattleForm.numeroBovino}
                onChange={(e) =>
                  setAddCattleForm({ ...addCattleForm, numeroBovino: e.target.value })
                }
                required
              />
              <small className="text-muted">Código de identificación del bovino</small>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Fecha de Nacimiento *</CFormLabel>
              <CFormInput
                type="date"
                value={addCattleForm.fechaNacimiento}
                onChange={(e) =>
                  setAddCattleForm({ ...addCattleForm, fechaNacimiento: e.target.value })
                }
                max={today}
                required
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Raza *</CFormLabel>
              <CFormSelect
                value={addCattleForm.idRazaBovino}
                onChange={(e) =>
                  setAddCattleForm({ ...addCattleForm, idRazaBovino: Number(e.target.value) })
                }
                required
              >
                <option value="">Seleccione la raza</option>
                {razas.map((raza) => (
                  <option key={raza.tmaIdrazab} value={String(raza.tmaIdrazab)}>
                    {raza.tmaNomraza}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Color *</CFormLabel>
              <CFormSelect
                value={addCattleForm.idColorBovino}
                onChange={(e) =>
                  setAddCattleForm({ ...addCattleForm, idColorBovino: Number(e.target.value) })
                }
                required
              >
                <option value="">Seleccione el color</option>
                {colores.map((color) => (
                  <option key={color.tmaIdcolbo} value={String(color.tmaIdcolbo)}>
                    {color.tmaNomcolb}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Peso (Kg) *</CFormLabel>
              <CFormInput
                type="number"
                placeholder="Peso en kilogramos"
                value={addCattleForm.pesoKilo}
                onChange={(e) =>
                  setAddCattleForm({ ...addCattleForm, pesoKilo: parseFloat(e.target.value) || '' })
                }
                step="0.01"
                min="0"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Etapa *</CFormLabel>
              <CFormSelect
                value={addCattleForm.idEtapaBovino}
                onChange={(e) =>
                  setAddCattleForm({ ...addCattleForm, idEtapaBovino: Number(e.target.value) })
                }
                required
              >
                <option value="">Seleccione la etapa</option>
                {etapas.map((etapa) => (
                  <option key={etapa.tmaIdetabo} value={String(etapa.tmaIdetabo)}>
                    {etapa.tmaNometab}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Estado *</CFormLabel>
              <CFormSelect
                value={addCattleForm.idEstadoBovino}
                onChange={(e) =>
                  setAddCattleForm({ ...addCattleForm, idEstadoBovino: Number(e.target.value) })
                }
                required
              >
                <option value="">Seleccione el estado</option>
                {estados.map((estado) => (
                  <option key={estado.tmaIdestbo} value={String(estado.tmaIdestbo)}>
                    {estado.tmaNomestb}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="success" type="submit">
            <CIcon icon={cilSave} className="me-2" />
            Guardar Bovino
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default AddCattleModal
