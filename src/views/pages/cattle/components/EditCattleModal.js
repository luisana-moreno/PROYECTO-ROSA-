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
    return true
  }

  const handleEditCattleWithValidation = () => {
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
    >
      <CModalHeader className="modal-module">
        <CModalTitle className="text-white">Editar Bovino</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <CRow className="g-3 mt-2">
          <h4 className="text-green mt-1 me-5">Datos del Bovino</h4>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Número de Arete"
              aria-label="Número de Arete"
              value={currentCattle?.ttrNumerobv || ''}
              onChange={(e) => setCurrentCattle({ ...currentCattle, ttrNumerobv: e.target.value })}
            />
            <small className="text-muted">Ingrese el código del bovino.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="date"
              placeholder="Fecha de Nacimiento"
              value={formatDateToYYYYMMDD(currentCattle?.ttrFecnacim) || ''}
              onChange={(e) => setCurrentCattle({ ...currentCattle, ttrFecnacim: e.target.value })}
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
              value={String(currentCattle?.ttrIdrazabo || '')}
              onChange={(e) =>
                setCurrentCattle({ ...currentCattle, ttrIdrazabo: Number(e.target.value) })
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
              value={String(currentCattle?.ttrIdcolorb || '')}
              onChange={(e) =>
                setCurrentCattle({ ...currentCattle, ttrIdcolorb: Number(e.target.value) })
              }
            >
              <option value="">Seleccione el Color</option>
              {colores.map((color) => (
                <option key={color.tmaIdcolbo} value={String(color.tmaIdcolbo)}>
                  {color.tmaNomcolb}
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
              value={currentCattle?.ttrPesokilo || ''}
              onChange={(e) =>
                setCurrentCattle({
                  ...currentCattle,
                  ttrPesokilo: parseFloat(e.target.value) || '',
                })
              }
            />
            <small className="text-muted">Ingrese el peso del bovino.</small>
          </CCol>
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              placeholder="Etapa"
              aria-label="Etapa"
              value={String(currentCattle?.ttrIdetapav || '')}
              onChange={(e) =>
                setCurrentCattle({ ...currentCattle, ttrIdetapav: Number(e.target.value) })
              }
            >
              <option value="">Seleccione la Etapa</option>
              {etapas.map((etapa) => (
                <option key={etapa.tmaIdetabo} value={String(etapa.tmaIdetabo)}>
                  {etapa.tmaNometab}
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
              value={String(currentCattle?.ttrIdestadb || '')}
              onChange={(e) =>
                setCurrentCattle({ ...currentCattle, ttrIdestadb: Number(e.target.value) })
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
          onClick={handleEditCattleWithValidation}
        >
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditCattleModal
