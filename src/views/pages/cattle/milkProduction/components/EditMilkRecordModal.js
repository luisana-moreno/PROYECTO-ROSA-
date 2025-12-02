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

export const EditMilkRecordModal = ({
  editVisible,
  setEditVisible,
  currentRecord,
  setCurrentRecord,
  handleEditRecord,
  days,
}) => {
  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={() => setEditVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Editar Registro</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormSelect
              value={currentRecord?.type || ''}
              onChange={(e) => setCurrentRecord({ ...currentRecord, type: e.target.value })}
            >
              <option value="Bovino">Bovino</option>
              <option value="Lote">Lote</option>
            </CFormSelect>
            <small className="text-muted">Seleccione el tipo de registro.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              placeholder={currentRecord?.type === 'Bovino' ? 'Número de Bovino' : 'Número de Lote'}
              value={currentRecord?.identifier || ''}
              onChange={(e) => setCurrentRecord({ ...currentRecord, identifier: e.target.value })}
            />
            <small className="text-muted">
              {currentRecord?.type === 'Bovino'
                ? 'Ingrese el número de bovino.'
                : 'Ingrese el número de lote.'}
            </small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormSelect
              value={currentRecord?.day || ''}
              onChange={(e) => setCurrentRecord({ ...currentRecord, day: e.target.value })}
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
              value={currentRecord?.liters || ''}
              onChange={(e) => setCurrentRecord({ ...currentRecord, liters: e.target.value })}
            />
            <small className="text-muted">Ingrese la cantidad de litros producidos.</small>
          </CCol>
        </CRow>
        <CRow className="g-3 mt-2">
          <CCol md={6}>
            <CFormInput
              type="time"
              placeholder="Inicio Mañana"
              value={currentRecord?.morningStart || ''}
              onChange={(e) => setCurrentRecord({ ...currentRecord, morningStart: e.target.value })}
            />
            <small className="text-muted">Ingrese la hora de inicio del ordeño en la mañana.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="time"
              placeholder="Fin Mañana"
              value={currentRecord?.morningEnd || ''}
              onChange={(e) => setCurrentRecord({ ...currentRecord, morningEnd: e.target.value })}
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
              value={currentRecord?.afternoonStart || ''}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, afternoonStart: e.target.value })
              }
            />
            <small className="text-muted">Ingrese la hora de inicio del ordeño en la tarde.</small>
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="time"
              placeholder="Fin Tarde"
              value={currentRecord?.afternoonEnd || ''}
              onChange={(e) => setCurrentRecord({ ...currentRecord, afternoonEnd: e.target.value })}
            />
            <small className="text-muted">
              Ingrese la hora de finalización del ordeño en la tarde.
            </small>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={handleEditRecord}>
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
