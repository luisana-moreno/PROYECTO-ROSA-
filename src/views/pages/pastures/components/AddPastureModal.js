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
} from '@coreui/react'

const SectionOne = ({ addPasture, setAddPasture, estadosPotrero, tiposMantenimiento }) => (
  <div>
    <CRow className="g-3 mt-2">
      <h4 className="text-green mt-1 me-5">Registrar Potrero</h4>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Código del Potrero"
          aria-label="Código del Potrero"
          value={addPasture.ttr_codpotre || ''}
          onChange={(e) => setAddPasture({ ...addPasture, ttr_codpotre: e.target.value })}
        />
        <small className="text-muted">Ingrese el código del potrero.</small>
      </CCol>
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="Estado"
          aria-label="Estado"
          value={addPasture.ttr_idestpot || ''}
          onChange={(e) => {
            console.log('Valor seleccionado para estado:', e.target.value)
            setAddPasture({ ...addPasture, ttr_idestpot: parseInt(e.target.value) || null })
          }}
        >
          <option value="">Seleccione el estado</option>
          {estadosPotrero.map((estado) => {
            console.log(
              'Estado de Potrero - ID:',
              estado.tma_idestpo, // Corregido: tma_idestpo
              'Nombre:',
              estado.tma_nomestp,
            )
            return (
              <option key={estado.tma_idestpo} value={estado.tma_idestpo}>
                {estado.tma_nomestp}
              </option>
            )
          })}
        </CFormSelect>
        <small className="text-muted">Seleccione el estado del potrero.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="Tipo de Mantenimiento"
          aria-label="Tipo de Mantenimiento"
          value={addPasture.ttr_idtipman || ''}
          onChange={(e) => {
            console.log('Valor seleccionado para tipo de mantenimiento:', e.target.value)
            setAddPasture({ ...addPasture, ttr_idtipman: parseInt(e.target.value) || null })
          }}
        >
          <option value="">Seleccione el tipo de mantenimiento</option>
          {tiposMantenimiento.map((tipo) => {
            console.log(
              'Tipo de Mantenimiento - ID:',
              tipo.tma_idtipma,
              'Nombre:',
              tipo.tma_nomtipm,
            )
            return (
              <option key={tipo.tma_idtipma} value={tipo.tma_idtipma}>
                {tipo.tma_nomtipm}
              </option>
            )
          })}
        </CFormSelect>
        <small className="text-muted">Seleccione el tipo de mantenimiento.</small>
      </CCol>
      <CCol md={6}>
        <CFormInput
          type="date"
          className="modal-name custom-select"
          placeholder="Fecha de Mantenimiento"
          aria-label="Fecha de Mantenimiento"
          value={addPasture.ttr_fechamnt || ''}
          onChange={(e) => setAddPasture({ ...addPasture, ttr_fechamnt: e.target.value })}
        />
        <small className="text-muted">Ingrese la fecha del último mantenimiento.</small>
      </CCol>
    </CRow>
    <CRow className="g-3 mt-2">
      <CCol md={12}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Descripción (Lote y Responsable)"
          aria-label="Descripción"
          value={addPasture.ttr_descripc || ''}
          onChange={(e) => setAddPasture({ ...addPasture, ttr_descripc: e.target.value })}
        />
        <small className="text-muted">
          Ingrese la descripción del potrero (ej. lote y responsable).
        </small>
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
    <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Registrar Potrero</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <SectionOne
          addPasture={addPasture}
          setAddPasture={setAddPasture}
          estadosPotrero={estadosPotrero}
          tiposMantenimiento={tiposMantenimiento}
        />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={handleAddPasture}>
          Agregar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddPastureModal
