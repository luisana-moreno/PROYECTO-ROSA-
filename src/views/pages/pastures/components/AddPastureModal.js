import React from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CFormLabel,
} from '@coreui/react'

const SectionOne = ({ addPasture, setAddPasture, estadosPotrero, tiposMantenimiento }) => (
  <div>
    <h6 className="text-success mb-3 fw-bold">Información General</h6>
    <CRow className="g-3">
      <CCol md={6}>
        <CFormLabel>Código del Potrero</CFormLabel>
        <CFormInput
          placeholder="Ej: A-01"
          value={addPasture.ttr_codpotre || ''}
          onChange={(e) => setAddPasture({ ...addPasture, ttr_codpotre: e.target.value })}
        />
      </CCol>
      <CCol md={6}>
        <CFormLabel>Estado</CFormLabel>
        <CFormSelect
          value={addPasture.ttr_idestpot || ''}
          onChange={(e) => {
            setAddPasture({ ...addPasture, ttr_idestpot: parseInt(e.target.value) || null })
          }}
        >
          <option value="">Seleccione el estado</option>
          {estadosPotrero.map((estado) => (
            <option key={estado.tma_idestpo} value={estado.tma_idestpo}>
              {estado.tma_nomestp}
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </CRow>

    <h6 className="text-success mb-3 mt-4 fw-bold">Detalles de Mantenimiento</h6>
    <CRow className="g-3">
      <CCol md={6}>
        <CFormLabel>Tipo de Mantenimiento</CFormLabel>
        <CFormSelect
          value={addPasture.ttr_idtipman || ''}
          onChange={(e) => {
            setAddPasture({ ...addPasture, ttr_idtipman: parseInt(e.target.value) || null })
          }}
        >
          <option value="">Seleccione el tipo</option>
          {tiposMantenimiento.map((tipo) => (
            <option key={tipo.tma_idtipma} value={tipo.tma_idtipma}>
              {tipo.tma_nomtipm}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol md={6}>
        <CFormLabel>Fecha de Mantenimiento</CFormLabel>
        <CFormInput
          type="date"
          value={addPasture.ttr_fechamnt || ''}
          onChange={(e) => setAddPasture({ ...addPasture, ttr_fechamnt: e.target.value })}
        />
      </CCol>
    </CRow>
    <CRow className="g-3 mt-3">
      <CCol md={12}>
        <CFormLabel>Descripción</CFormLabel>
        <CFormInput
          placeholder="Lote, Responsable u otras notas..."
          value={addPasture.ttr_descripc || ''}
          onChange={(e) => setAddPasture({ ...addPasture, ttr_descripc: e.target.value })}
        />
      </CCol>
    </CRow>
  </div>
)

const AddPastureModal = ({
  visible,
  setVisible,
  addPasture,
  setAddPasture,
  handleAddPasture,
  estadosPotrero,
  tiposMantenimiento,
}) => {
  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => setVisible(false)}
      size="lg"
      backdrop="static"
    >
      <CModalHeader>
        <CModalTitle>Registrar Potrero</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <SectionOne
          addPasture={addPasture}
          setAddPasture={setAddPasture}
          estadosPotrero={estadosPotrero}
          tiposMantenimiento={tiposMantenimiento}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancelar
        </CButton>
        <CButton color="success" className="text-white" onClick={handleAddPasture}>
          Guardar Potrero
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddPastureModal
