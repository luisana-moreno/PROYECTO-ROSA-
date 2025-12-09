'use client'
import { CForm, CFormLabel, CFormSelect, CFormInput, CButton, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckAlt, cilX } from '@coreui/icons'

const PastureActivityForm = ({
  selectedPasture,
  selectedLot,
  setSelectedLot,
  startDate,
  setStartDate,
  turno,
  setTurno,
  observaciones,
  setObservaciones,
  lots,
  onAssign,
  loading,
}) => {
  // Helpers para props pasadas
  const onTurnoChange = setTurno
  const onObservacionesChange = setObservaciones
  return (
    <CForm className="mb-4">
      <div className="mb-3">
        <CFormLabel>Potrero Seleccionado</CFormLabel>
        <CFormInput
          type="text"
          value={
            selectedPasture
              ? selectedPasture.codigo || selectedPasture.ttr_codpotre
              : 'Seleccione un potrero del mapa'
          }
          disabled
          readOnly
        />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="selectLot">Lote a Rotar</CFormLabel>
        <CFormSelect
          id="selectLot"
          value={selectedLot ? selectedLot.id || selectedLot.tmaIdlote : ''}
          onChange={(e) => {
            const val = Number(e.target.value)
            setSelectedLot(lots.find((l) => (l.id || l.tmaIdlote) === val))
          }}
          disabled={!selectedPasture || loading}
        >
          <option value="">Seleccione un lote</option>
          {lots.map((l) => (
            <option key={l.id || l.tmaIdlote} value={l.id || l.tmaIdlote}>
              {l.nombre || l.tmaNomlote} {l.bovinos ? `(${l.bovinos} actuales)` : ''}
            </option>
          ))}
        </CFormSelect>
      </div>

      <CRow className="mb-3">
        <CCol md={6}>
          <CFormLabel htmlFor="startDate">Fecha de Rotación</CFormLabel>
          <CFormInput
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={!selectedPasture || loading}
          />
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="turno">Turno</CFormLabel>
          <CFormSelect
            id="turno"
            value={turno}
            onChange={(e) => onTurnoChange && onTurnoChange(e.target.value)}
            disabled={!selectedPasture || loading}
          >
            <option value="AM">Mañana (AM)</option>
            <option value="PM">Tarde (PM)</option>
            <option value="DIA_COMPLETO">Día Completo</option>
          </CFormSelect>
        </CCol>
      </CRow>

      <div className="mb-3">
        <CFormLabel>Observaciones</CFormLabel>
        <CFormInput
          component="textarea"
          rows={2}
          value={observaciones}
          onChange={(e) => onObservacionesChange && onObservacionesChange(e.target.value)}
        />
      </div>

      <CRow className="g-2">
        <CCol xs="auto">
          <CButton
            className="button-no-hover-green text-white"
            onClick={onAssign}
            disabled={!selectedPasture || !selectedLot || !startDate || loading}
          >
            <CIcon icon={cilCheckAlt} className="me-2" />
            {loading ? 'Registrando...' : 'Registrar Rotación'}
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default PastureActivityForm
