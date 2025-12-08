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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { toast } from 'react-toastify'
import { formatDateToYYYYMMDD } from 'src/utils/dateFormatter'

const EditCattleModal = ({
  editVisible,
  setEditVisible,
  currentCattle,
  setCurrentCattle,
  handleEditCattle,
  razas,
  colores,
  etapas,
  estados,
}) => {
  const today = new Date().toISOString().split('T')[0]

  const validateForm = () => {
    if (
      !currentCattle.ttrNumerobv ||
      !currentCattle.ttrIdrazabo ||
      !currentCattle.ttrFecnacim ||
      !currentCattle.ttrIdcolorb ||
      !currentCattle.ttrPesokilo ||
      !currentCattle.ttrIdetapav ||
      !currentCattle.ttrIdestadb
    ) {
      toast.error('Todos los campos obligatorios deben ser llenados.')
      return false
    }

    if (new Date(currentCattle.ttrFecnacim) > new Date(today)) {
      toast.error('La fecha de nacimiento no puede ser una fecha futura.')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      handleEditCattle()
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={() => setEditVisible(false)}
      backdrop="static"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Editar Bovino</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Número de Arete *</CFormLabel>
              <CFormInput
                placeholder="Número de arete"
                value={currentCattle?.ttrNumerobv || ''}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrNumerobv: e.target.value })
                }
                required
              />
              <small className="text-muted">Código de identificación del bovino</small>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Fecha de Nacimiento *</CFormLabel>
              <CFormInput
                type="date"
                value={formatDateToYYYYMMDD(currentCattle?.ttrFecnacim) || ''}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrFecnacim: e.target.value })
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
                value={String(currentCattle?.ttrIdrazabo || '')}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrIdrazabo: Number(e.target.value) })
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
                value={String(currentCattle?.ttrIdcolorb || '')}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrIdcolorb: Number(e.target.value) })
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
                value={currentCattle?.ttrPesokilo || ''}
                onChange={(e) =>
                  setCurrentCattle({
                    ...currentCattle,
                    ttrPesokilo: parseFloat(e.target.value) || '',
                  })
                }
                step="0.01"
                min="0"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Etapa *</CFormLabel>
              <CFormSelect
                value={String(currentCattle?.ttrIdetapav || '')}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrIdetapav: Number(e.target.value) })
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
                value={String(currentCattle?.ttrIdestadb || '')}
                onChange={(e) =>
                  setCurrentCattle({ ...currentCattle, ttrIdestadb: Number(e.target.value) })
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
          <CButton color="secondary" onClick={() => setEditVisible(false)}>
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

export default EditCattleModal
