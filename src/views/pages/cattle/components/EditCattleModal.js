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
      !currentCattle.ttr_numerobv ||
      !currentCattle.ttr_idrazabo ||
      !currentCattle.ttr_fecnacim ||
      !currentCattle.ttr_idcolorb ||
      !currentCattle.ttr_pesokilo ||
      !currentCattle.ttr_idetapav ||
      !currentCattle.ttr_idestadb
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
          <h4 className="text-green mt-1 me-5">Cattle Data</h4>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              placeholder="Numero de Arete"
              aria-label="Numero de Arete"
              value={currentCattle?.ttr_numerobv || ''}
              onChange={(e) => setCurrentCattle({ ...currentCattle, ttr_numerobv: e.target.value })}
            />
            <small className="text-muted">Ingrese el codigo del bovino.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="date"
              placeholder="Fecha de Nacimiento"
              value={currentCattle?.ttr_fecnacim || ''}
              onChange={(e) => setCurrentCattle({ ...currentCattle, ttr_fecnacim: e.target.value })}
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
              value={currentCattle?.ttr_idrazabo || ''}
              onChange={(e) => setCurrentCattle({ ...currentCattle, ttr_idrazabo: e.target.value })}
            >
              <option value="">Seleccione la Raza</option>
              {razas.map((raza) => (
                <option key={raza.tma_idrazab} value={raza.tma_idrazab}>
                  {raza.tma_nomraza}
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
              value={currentCattle?.ttr_idcolorb || ''}
              onChange={(e) => setCurrentCattle({ ...currentCattle, ttr_idcolorb: e.target.value })}
            >
              <option value="">Seleccione el Color</option>
              {colores.map((color) => (
                <option key={color.tma_idcolbo} value={color.tma_idcolbo}>
                  {color.tma_nomcolb}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Please add cattle color.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              className="modal-name custom-select"
              type="number"
              placeholder="Weight"
              value={currentCattle?.ttr_pesokilo || ''}
              onChange={(e) =>
                setCurrentCattle({
                  ...currentCattle,
                  ttr_pesokilo: parseFloat(e.target.value) || '',
                })
              }
            />
            <small className="text-muted">Please add cattle weigth.</small>
          </CCol>
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              placeholder="Etapa"
              aria-label="Etapa"
              value={currentCattle?.ttr_idetapav || ''}
              onChange={(e) => setCurrentCattle({ ...currentCattle, ttr_idetapav: e.target.value })}
            >
              <option value="">Seleccione la Etapa</option>
              {etapas.map((etapa) => (
                <option key={etapa.tma_idetabo} value={etapa.tma_idetabo}>
                  {etapa.tma_nometab}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Please add cattle stage.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormSelect
              className="modal-name custom-select"
              placeholder="Statu Cattle"
              value={currentCattle?.ttr_idestadb || ''}
              onChange={(e) => setCurrentCattle({ ...currentCattle, ttr_idestadb: e.target.value })}
            >
              <option value="">Status cattle</option>
              {estados.map((estado) => (
                <option key={estado.tma_idestbo} value={estado.tma_idestbo}>
                  {estado.tma_nomestb}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Please add statu cattle.</small>
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
