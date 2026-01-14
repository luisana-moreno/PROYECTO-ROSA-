'use client'
import { useState } from 'react'
import {
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CButton,
  CRow,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
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
  duration,
  setDuration,
  onFinalize,
  onRelease,
  tiposMantenimiento, // Nuevo prop
  onCreateMantenimiento, // Nuevo prop
}) => {
  // Helpers
  const onTurnoChange = setTurno
  const onObservacionesChange = setObservaciones
  const onDurationChange = setDuration ? (e) => setDuration(e.target.value) : null

  // Estado Local para tipo de actividad
  const [activityType, setActivityType] = useState('ROTACION') // 'ROTACION' | 'MANTENIMIENTO'
  const [selectedManteType, setSelectedManteType] = useState('')

  // Helpers de Estado
  const getStatusName = (p) => p.estado_potrero_nombre || p.tma_nomestp || ''
  const isStatus = (p, status) => getStatusName(p) === status

  const isOcupado =
    selectedPasture && (isStatus(selectedPasture, 'Ocupado') || isStatus(selectedPasture, 'En uso'))
  const isRecuperacion = selectedPasture && isStatus(selectedPasture, 'En Recuperación')
  const isMantenimiento = selectedPasture && isStatus(selectedPasture, 'Mantenimiento')
  const isDisponible = selectedPasture && !isOcupado && !isRecuperacion && !isMantenimiento

  // Reset al cambiar de potrero
  if (
    selectedPasture &&
    isDisponible &&
    activityType === 'MANTENIMIENTO' &&
    !selectedPasture.isDisponiblePrev
  ) {
    // Logic handling could go here or useEffect, simpler to just let user switch
  }

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

        {/* Alerta Mantenimiento (Bloqueante) */}
        {isMantenimiento && (
          <div className="alert alert-warning mt-2">
            <CIcon icon={cilX} className="me-2" />
            <strong>En Mantenimiento:</strong> No disponible.
            {selectedPasture.ttr_fecfinmnt &&
              new Date(selectedPasture.ttr_fecfinmnt) > new Date() && (
                <div>
                  Libre a partir de: {new Date(selectedPasture.ttr_fecfinmnt).toLocaleDateString()}
                </div>
              )}
          </div>
        )}

        {/* Alerta Ocupado (Informativa, permite Finalizar) */}
        {isOcupado && (
          <div className="alert alert-danger mt-2">
            <strong>¡Potrero Ocupado!</strong> Registre la salida del ganado para pasar a etapa de
            recuperación.
          </div>
        )}

        {/* Alerta Recuperación (Acción requerida) */}
        {isRecuperacion && (
          <div
            className="alert alert-info mt-2"
            style={{ backgroundColor: '#fff3cd', color: '#856404', borderColor: '#ffeeba' }}
          >
            <strong>En Recuperación:</strong> El pasto está descansando. Habilítelo cuando esté
            listo.
          </div>
        )}
      </div>

      {/* --- MODO: ASIGNAR (DISPONIBLE) --- */}
      {isDisponible && (
        <>
          {/* Selector de Tipo de Actividad */}
          <div className="d-flex mb-3 gap-2">
            <CButton
              color={activityType === 'ROTACION' ? 'success' : 'light'}
              className={activityType === 'ROTACION' ? 'text-white' : ''}
              onClick={() => setActivityType('ROTACION')}
            >
              Rotación (Ganado)
            </CButton>
            <CButton
              color={activityType === 'MANTENIMIENTO' ? 'info' : 'light'}
              className={activityType === 'MANTENIMIENTO' ? 'text-white' : ''}
              onClick={() => setActivityType('MANTENIMIENTO')}
            >
              Mantenimiento
            </CButton>
          </div>

          {/* --- SUB-MODO: ROTACIÓN --- */}
          {activityType === 'ROTACION' && (
            <>
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
                  <CFormLabel htmlFor="startDate">Fecha de Entrada</CFormLabel>
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
                <CRow>
                  <CCol md={6}>
                    <CFormLabel>Duración Estimada (Días)</CFormLabel>
                    <CFormInput
                      type="number"
                      min="1"
                      placeholder="Ej. 3"
                      value={duration || ''}
                      onChange={onDurationChange}
                      disabled={!selectedPasture || loading}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CFormLabel>Observaciones</CFormLabel>
                <CFormInput
                  component="textarea"
                  rows={2}
                  value={observaciones}
                  onChange={(e) => onObservacionesChange && onObservacionesChange(e.target.value)}
                  disabled={!selectedPasture || loading}
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
            </>
          )}

          {/* --- SUB-MODO: MANTENIMIENTO --- */}
          {activityType === 'MANTENIMIENTO' && (
            <div className="border p-3 rounded bg-light border-info">
              <h6 className="text-info fw-bold">Registrar Mantenimiento</h6>

              <div className="mb-3">
                <CFormLabel>Tipo de Mantenimiento</CFormLabel>
                <CFormSelect
                  value={selectedManteType}
                  onChange={(e) => setSelectedManteType(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Seleccione tipo...</option>
                  {tiposMantenimiento &&
                    tiposMantenimiento.map((t) => (
                      <option key={t.tma_idtipma} value={t.tma_idtipma}>
                        {t.tma_nomtipm}
                      </option>
                    ))}
                </CFormSelect>
              </div>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Fecha Inicio</CFormLabel>
                  <CFormInput
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    disabled={loading}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Duración (Días)</CFormLabel>
                  <CFormInput
                    type="number"
                    min="1"
                    placeholder="Ej. 15"
                    value={duration || ''}
                    onChange={onDurationChange}
                    disabled={loading}
                  />
                </CCol>
              </CRow>

              <div className="mb-3">
                <CFormLabel>Descripción / Observaciones</CFormLabel>
                <CFormInput
                  component="textarea"
                  rows={2}
                  value={observaciones}
                  onChange={(e) => onObservacionesChange(e.target.value)}
                  placeholder="Detalles del trabajo..."
                  disabled={loading}
                />
              </div>

              <CButton
                color="info"
                className="text-white"
                onClick={() =>
                  onCreateMantenimiento &&
                  onCreateMantenimiento({
                    idPotrero: selectedPasture.ttrIdpotrer || selectedPasture.ttr_idpotrer,
                    tipo: selectedManteType, // FIX: Controller expects 'tipo' not 'idTipoMantenimiento'
                    fecha: startDate,
                    descripcion: observaciones,
                    duracion: duration ? parseInt(duration) : 0,
                  })
                }
                disabled={loading || !selectedManteType || !duration}
              >
                <CIcon icon={cilCheckAlt} className="me-2" />
                Registrar Mantenimiento
              </CButton>
            </div>
          )}
        </>
      )}

      {/* --- MODO: FINALIZAR ROTACIÓN (OCUPADO) --- */}
      {isOcupado && (
        <div className="border p-3 rounded bg-light">
          <h6 className="text-danger">Finalizar Rotación Actual</h6>
          <div className="mb-3">
            <CFormLabel>Fecha de Salida (Real)</CFormLabel>
            <CFormInput
              type="date"
              value={startDate} // Reutilizamos startDate como fecha salida por simplicidad en UI, o podríamos usar otro state
              onChange={(e) => setStartDate(e.target.value)}
            />
            <div className="form-text">
              Esta fecha marcará la salida del lote y el inicio de recuperación.
            </div>
          </div>
          <div className="mb-3">
            <CFormLabel>Observaciones de Salida</CFormLabel>
            <CFormInput
              component="textarea"
              rows={2}
              value={observaciones}
              onChange={(e) => onObservacionesChange(e.target.value)}
              placeholder="Ej. Consumo total, pasto remanente bajo..."
            />
          </div>
          <CButton
            color="warning"
            className="text-white"
            onClick={() =>
              onFinalize &&
              onFinalize({
                idPotrero: selectedPasture.ttrIdpotrer || selectedPasture.ttr_idpotrer,
                fechaFin: startDate,
                alturaSalida: 0, // TODO: Agregar input si es necesario
                observaciones: observaciones,
              })
            }
            disabled={loading}
          >
            Finalizar y Pasar a Recuperación
          </CButton>
        </div>
      )}

      {/* --- MODO: LIBERAR (EN RECUPERACIÓN) --- */}
      {isRecuperacion && (
        <div className="border p-3 rounded bg-light border-warning">
          <h6 className="text-warning-emphasis">Habilitar Potrero</h6>
          <p>Si el pasto ha alcanzado la altura óptima, libérelo para nuevas rotaciones.</p>
          <CButton
            color="success"
            className="text-white"
            onClick={() =>
              onRelease && onRelease(selectedPasture.ttrIdpotrer || selectedPasture.ttr_idpotrer)
            }
            disabled={loading}
          >
            <CIcon icon={cilCheckAlt} className="me-2" />
            Habilitar (Disponible)
          </CButton>
        </div>
      )}
    </CForm>
  )
}

export default PastureActivityForm
