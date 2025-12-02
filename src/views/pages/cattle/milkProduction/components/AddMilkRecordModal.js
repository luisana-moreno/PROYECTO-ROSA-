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

export const AddMilkRecordModal = ({
  visible,
  setVisible,
  newRecord,
  setNewRecord,
  handleAddRecord,
  days,
}) => {
  return (
    <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Agregar Registro</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormSelect
              value={newRecord.type}
              onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
            >
              <option value="Bovino">Bovino</option>
              <option value="Lote">Lote</option>
            </CFormSelect>
            <small className="text-muted">Seleccione el tipo de registro.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              placeholder={newRecord.type === 'Bovino' ? 'Número de Bovino' : 'Número de Lote'}
              value={newRecord.identifier}
              onChange={(e) => setNewRecord({ ...newRecord, identifier: e.target.value })}
            />
            <small className="text-muted">
              {newRecord.type === 'Bovino'
                ? 'Ingrese el número de bovino.'
                : 'Ingrese el número de lote.'}
            </small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormSelect
              value={newRecord.day}
              onChange={(e) => setNewRecord({ ...newRecord, day: e.target.value })}
            >
              <option value="">Seleccione el día</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </option>
              ))}
            </CFormSelect>
            <small className="text-muted">Seleccione el día de la semana.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="number"
              placeholder="Cantidad de Litros"
              value={newRecord.liters}
              onChange={(e) => setNewRecord({ ...newRecord, liters: e.target.value })}
            />
            <small className="text-muted">Ingrese la cantidad de litros producidos.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              type="time"
              placeholder="Inicio Mañana"
              value={newRecord.morningStart}
              onChange={(e) => setNewRecord({ ...newRecord, morningStart: e.target.value })}
            />
            <small className="text-muted">Ingrese la hora de inicio del ordeño en la mañana.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="time"
              placeholder="Fin Mañana"
              value={newRecord.morningEnd}
              onChange={(e) => setNewRecord({ ...newRecord, morningEnd: e.target.value })}
            />
            <small className="text-muted">
              Ingrese la hora de finalización del ordeño en la mañana.
            </small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              type="time"
              placeholder="Inicio Tarde"
              value={newRecord.afternoonStart}
              onChange={(e) => setNewRecord({ ...newRecord, afternoonStart: e.target.value })}
            />
            <small className="text-muted">Ingrese la hora de inicio del ordeño en la tarde.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="time"
              placeholder="Fin Tarde"
              value={newRecord.afternoonEnd}
              onChange={(e) => setNewRecord({ ...newRecord, afternoonEnd: e.target.value })}
            />
            <small className="text-muted">
              Ingrese la hora de finalización del ordeño en la tarde.
            </small>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={handleAddRecord}>
          Agregar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
