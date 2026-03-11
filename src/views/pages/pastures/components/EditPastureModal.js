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

const EditSectionOne = ({
  currentPasture,
  setCurrentPasture,
  estadosPotrero,
  tiposMantenimiento,
}) => (
  <div>
    <h6 className="text-success mb-3 fw-bold">Información General</h6>
    <CRow className="g-3">
      <CCol md={6}>
        <CFormLabel>Código del Potrero</CFormLabel>
        <CFormInput
          placeholder="Código"
          value={currentPasture?.ttr_codpotre || ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, ttr_codpotre: e.target.value })}
        />
      </CCol>
      <CCol md={6}>
        <CFormLabel>Estado</CFormLabel>
        <CFormSelect
          value={currentPasture?.ttr_idestpot || ''}
          onChange={(e) => {
            setCurrentPasture({ ...currentPasture, ttr_idestpot: parseInt(e.target.value) || null })
          }}
        >
          <option value="">Seleccione el estado</option>
          {estadosPotrero
            .filter((estado) => estado.tma_nomestp !== 'Mantenimiento')
            .map((estado) => (
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
          value={currentPasture?.ttr_idtipman || ''}
          onChange={(e) => {
            setCurrentPasture({ ...currentPasture, ttr_idtipman: parseInt(e.target.value) || null })
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

      {/* Nuevo Campo: Duración del Mantenimiento */}
      {currentPasture?.ttr_idestpot ===
        estadosPotrero.find((e) => e.tma_nomestp === 'Mantenimiento')?.tma_idestpo && (
        <CCol md={6}>
          <CFormLabel>Duración (Días)</CFormLabel>
          <CFormInput
            type="number"
            min="1"
            placeholder="Ej. 15"
            value={currentPasture?.duracion || ''}
            onChange={(e) =>
              setCurrentPasture({ ...currentPasture, duracion: parseInt(e.target.value) })
            }
          />
          {currentPasture?.duracion > 0 && (
            <small className="text-muted">
              Hasta:{' '}
              {new Date(
                new Date().setDate(new Date().getDate() + (currentPasture.duracion || 0)),
              ).toLocaleDateString()}
            </small>
          )}
        </CCol>
      )}
      <CCol md={6}>
        <CFormLabel>Fecha de Mantenimiento</CFormLabel>
        <CFormInput
          type="date"
          value={currentPasture?.ttr_fechamnt ? currentPasture.ttr_fechamnt.split('T')[0] : ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, ttr_fechamnt: e.target.value })}
        />
      </CCol>
    </CRow>
    <CRow className="g-3 mt-3">
      <CCol md={12}>
        <CFormLabel>Descripción</CFormLabel>
        <CFormInput
          placeholder="Lote, Responsable u otras notas..."
          value={currentPasture?.ttr_descripc || ''}
          onChange={(e) => setCurrentPasture({ ...currentPasture, ttr_descripc: e.target.value })}
        />
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
      size="lg"
      backdrop="static"
    >
      <CModalHeader>
        <CModalTitle>Editar Potrero</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <EditSectionOne
          currentPasture={currentPasture}
          setCurrentPasture={setCurrentPasture}
          estadosPotrero={estadosPotrero}
          tiposMantenimiento={tiposMantenimiento}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setEditVisible(false)}>
          Cancelar
        </CButton>
        <CButton color="success" className="text-white" onClick={handleEditPasture}>
          Guardar Cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditPastureModal
