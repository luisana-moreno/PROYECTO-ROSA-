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

const EditSectionOne = ({
  currentPasture,
  setCurrentPasture,
  estadosPotrero,
  tiposMantenimiento,
}) => (
  <div>
    <CRow className="g-3 mt-2">
      <h4 className="text-green mt-1 me-5">Editar Potrero</h4>
      <CCol md={6}>
        <CFormInput
          className="modal-name custom-select"
          placeholder="Código del Potrero"
          aria-label="Código del Potrero"
          value={currentPasture?.ttr_codpotre || ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, ttr_codpotre: e.target.value })}
        />
        <small className="text-muted">Ingrese el código del potrero.</small>
      </CCol>
      <CCol md={6}>
        <CFormSelect
          className="modal-name custom-select"
          placeholder="Estado"
          aria-label="Estado"
          value={currentPasture?.ttr_idestpot || ''}
          onChange={(e) => {
            console.log('Valor seleccionado para estado (Edit):', e.target.value)
            setCurrentPasture({ ...currentPasture, ttr_idestpot: parseInt(e.target.value) || null })
          }}
        >
          <option value="">Seleccione el estado</option>
          {estadosPotrero.map((estado) => {
            console.log(
              'Estado de Potrero (Edit) - ID:',
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
          value={currentPasture?.ttr_idtipman || ''}
          onChange={(e) => {
            console.log('Valor seleccionado para tipo de mantenimiento (Edit):', e.target.value)
            setCurrentPasture({ ...currentPasture, ttr_idtipman: parseInt(e.target.value) || null })
          }}
        >
          <option value="">Seleccione el tipo de mantenimiento</option>
          {tiposMantenimiento.map((tipo) => {
            console.log(
              'Tipo de Mantenimiento (Edit) - ID:',
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
          value={currentPasture?.ttr_fechamnt ? currentPasture.ttr_fechamnt.split('T')[0] : ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, ttr_fechamnt: e.target.value })}
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
          value={currentPasture?.ttr_descripc || ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, ttr_descripc: e.target.value })}
        />
        <small className="text-muted">
          Ingrese la descripción del potrero (ej. lote y responsable).
        </small>
      </CCol>
    </CRow>
  </div>
)

const EditPastureModal = ({
  editVisible,
  setEditVisible,
  currentPasture,
  setCurrentPasture,
  handleEditPasture,
  estadosPotrero,
  tiposMantenimiento,
}) => {
  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={() => setEditVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Editar Potrero</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <EditSectionOne
          currentPasture={currentPasture}
          setCurrentPasture={setCurrentPasture}
          estadosPotrero={estadosPotrero}
          tiposMantenimiento={tiposMantenimiento}
        />
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={handleEditPasture}>
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditPastureModal
