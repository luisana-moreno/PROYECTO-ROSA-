import React from 'react'
import {
  CForm,
  CButton,
  CButtonGroup,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import MastitisDetalle from '../MastitisDetalle'
import { getIconByCode, getColorByCode, getOpcionesResultado } from '../utils'
import SearchableSelect from './SearchableSelect'

const ControlForm = ({
  tiposControl,
  tipoSeleccionado,
  setTipoSeleccionado,
  aplicacion,
  setAplicacion,
  formData,
  setFormData,
  bovinos,
  lotes,
  empleados,
  tiposVacuna,
  handleSubmit,
  loading,
  resetFormulario,
  mastitisDetalle,
  setMastitisDetalle,
  onBovinoChange,
  onLoteChange,
}) => {
  const opcionesResultado = tipoSeleccionado
    ? getOpcionesResultado(tipoSeleccionado.tma_codigo)
    : null

  // console.log(empleados)
  return (
    <>
      <div className="mb-4">
        <CFormLabel>Seleccione el tipo de control a realizar:</CFormLabel>
        <CButtonGroup role="group" className="w-100">
          {tiposControl.map((tipo) => (
            <CButton
              key={tipo.tma_idtipcon}
              color={
                tipoSeleccionado?.tma_idtipcon === tipo.tma_idtipcon
                  ? getColorByCode(tipo.tma_codigo)
                  : 'secondary'
              }
              variant={tipoSeleccionado?.tma_idtipcon === tipo.tma_idtipcon ? '' : 'outline'}
              onClick={() => setTipoSeleccionado(tipo)}
              className="d-flex align-items-center justify-content-center"
            >
              <CIcon icon={getIconByCode(tipo.tma_codigo)} className="me-2" />
              {tipo.tma_nombre}
            </CButton>
          ))}
        </CButtonGroup>
      </div>

      {tipoSeleccionado && (
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3 d-flex gap-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="aplicacion"
                id="appIndividual"
                checked={aplicacion === 'INDIVIDUAL'}
                onChange={() => setAplicacion('INDIVIDUAL')}
              />
              <label className="form-check-label" htmlFor="appIndividual">
                Aplicación Individual
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="aplicacion"
                id="appLote"
                checked={aplicacion === 'LOTE'}
                onChange={() => setAplicacion('LOTE')}
                disabled={tipoSeleccionado.tma_requieredetalle}
              />
              <label className="form-check-label" htmlFor="appLote">
                Aplicación Por Lote{' '}
                {tipoSeleccionado.tma_requieredetalle && '(No disponible para este tipo)'}
              </label>
            </div>
          </div>

          <CRow className="mb-3">
            <CCol md={6}>
              {aplicacion === 'INDIVIDUAL' ? (
                <>
                  <CFormLabel htmlFor="bovino">Bovino *</CFormLabel>
                  <SearchableSelect
                    id="bovino"
                    value={formData.ttr_idbovino}
                    onChange={(val) => {
                      setFormData({ ...formData, ttr_idbovino: val })
                      onBovinoChange && onBovinoChange(val)
                    }}
                    options={bovinos.map((b) => ({
                      value: b.ttr_idbovino,
                      label: `N°- ${b.ttr_numerobv}`,
                    }))}
                    placeholder="Buscar bovino..."
                  />
                </>
              ) : (
                <>
                  <CFormLabel htmlFor="loteSelect">Lote *</CFormLabel>
                  <SearchableSelect
                    id="loteSelect"
                    value={formData.ttr_idlote}
                    onChange={(val) => {
                      setFormData({ ...formData, ttr_idlote: val })
                      onLoteChange && onLoteChange(val)
                    }}
                    options={lotes.map((l) => ({
                      value: l.tma_idlote,
                      label: `${l.tma_nomlote} (${l.cantidad_bovinos || 0} bovinos)`,
                    }))}
                    placeholder="Buscar lote..."
                  />
                </>
              )}
            </CCol>

            <CCol md={3}>
              <CFormLabel htmlFor="fecha">Fecha *</CFormLabel>
              <CFormInput
                type="date"
                id="fecha"
                value={formData.ttr_fechacon}
                onChange={(e) => setFormData({ ...formData, ttr_fechacon: e.target.value })}
              />
            </CCol>

            <CCol md={3}>
              <CFormLabel htmlFor="empleado">Empleado *</CFormLabel>
              <SearchableSelect
                id="empleado"
                value={formData.ttr_idempldo}
                onChange={(val) => setFormData({ ...formData, ttr_idempldo: val })}
                options={empleados.map((e) => ({
                  value: e.ttr_idemplo,
                  label: `${e.ttr_nombrel} ${e.ttr_apellid}`,
                }))}
                placeholder="Buscar empleado..."
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel htmlFor="producto">Producto *</CFormLabel>
              {tipoSeleccionado?.tma_codigo === 'VACUNACION' ? (
                <CFormSelect
                  id="producto"
                  value={formData.ttr_producto}
                  onChange={(e) => setFormData({ ...formData, ttr_producto: e.target.value })}
                >
                  <option value="">Seleccione vacuna...</option>
                  {tiposVacuna.map((tv) => (
                    <option key={tv.id} value={tv.nombre}>
                      {tv.nombre}
                    </option>
                  ))}
                </CFormSelect>
              ) : (
                <CFormInput
                  type="text"
                  id="producto"
                  value={formData.ttr_producto}
                  onChange={(e) => setFormData({ ...formData, ttr_producto: e.target.value })}
                  placeholder="Nombre del producto"
                />
              )}
            </CCol>

            <CCol md={2}>
              <CFormLabel htmlFor="lote">Lote</CFormLabel>
              <CFormInput
                type="text"
                id="lote"
                value={formData.ttr_lote}
                onChange={(e) => setFormData({ ...formData, ttr_lote: e.target.value })}
                placeholder="Lote"
              />
            </CCol>

            <CCol md={3}>
              <CFormLabel htmlFor="dosis">Dosis *</CFormLabel>
              <div className="d-flex">
                <CFormInput
                  type="number"
                  step="0.1"
                  min="0"
                  id="dosis"
                  value={formData.ttr_dosis ? parseFloat(formData.ttr_dosis) : ''}
                  onChange={(e) => {
                    const val = e.target.value
                    const unidad = formData.ttr_dosis
                      ? formData.ttr_dosis.replace(/[\d.]+\s*/, '') || 'ml'
                      : 'ml'
                    setFormData({ ...formData, ttr_dosis: `${val} ${unidad}` })
                  }}
                  placeholder="0"
                  className="me-1"
                />
                <CFormSelect
                  style={{ width: '80px' }}
                  value={
                    formData.ttr_dosis ? formData.ttr_dosis.replace(/[\d.]+\s*/, '') || 'ml' : 'ml'
                  }
                  onChange={(e) => {
                    const val = formData.ttr_dosis ? parseFloat(formData.ttr_dosis) || 0 : 0
                    setFormData({ ...formData, ttr_dosis: `${val} ${e.target.value}` })
                  }}
                >
                  <option value="ml">ml</option>
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                  <option value="cc">cc</option>
                  <option value="unid">unid</option>
                </CFormSelect>
              </div>
            </CCol>

            <CCol md={3}>
              <CFormLabel htmlFor="via">Vía de Administración *</CFormLabel>
              <CFormSelect
                id="via"
                value={formData.ttr_viaadmin}
                onChange={(e) => setFormData({ ...formData, ttr_viaadmin: e.target.value })}
              >
                <option value="">Seleccione...</option>
                {tipoSeleccionado?.tma_codigo === 'MASTITIS' ? (
                  <>
                    <option value="Intramamaria">Intramamaria</option>
                    <option value="Tópico">Tópico</option>
                    <option value="Inyectable">Inyectable</option>
                  </>
                ) : (
                  <>
                    <option value="Intramuscular">Intramuscular</option>
                    <option value="Subcutánea">Subcutánea</option>
                    <option value="Oral">Oral</option>
                    <option value="Intravenosa">Intravenosa</option>
                    <option value="Intrauterina">Intrauterina</option>
                    <option value="Tópico">Tópico</option>
                    <option value="Intramamaria">Intramamaria</option>
                    <option value="Intranasal">Intranasal</option>
                    <option value="Inyectable">Inyectable</option>
                  </>
                )}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel htmlFor="resultado">Resultado *</CFormLabel>
              {opcionesResultado ? (
                <CFormSelect
                  id="resultado"
                  value={formData.ttr_resultado}
                  onChange={(e) => setFormData({ ...formData, ttr_resultado: e.target.value })}
                >
                  <option value="">Seleccione...</option>
                  {opcionesResultado.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </CFormSelect>
              ) : (
                <CFormInput
                  type="text"
                  id="resultado"
                  value={formData.ttr_resultado}
                  onChange={(e) => setFormData({ ...formData, ttr_resultado: e.target.value })}
                  placeholder="ej: Exitoso"
                />
              )}
            </CCol>

            <CCol md={4}>
              <CFormLabel htmlFor="proxfech">Próximo Control</CFormLabel>
              <CFormInput
                type="date"
                id="proxfech"
                value={formData.ttr_proxfech}
                onChange={(e) => setFormData({ ...formData, ttr_proxfech: e.target.value })}
              />
            </CCol>

            <CCol md={4}>
              <CFormLabel htmlFor="observa">Observaciones</CFormLabel>
              <CFormTextarea
                id="observa"
                rows={1}
                value={formData.ttr_observa}
                onChange={(e) => setFormData({ ...formData, ttr_observa: e.target.value })}
                placeholder="Observaciones adicionales"
              />
            </CCol>
          </CRow>

          {tipoSeleccionado.tma_requieredetalle && (
            <MastitisDetalle detalle={mastitisDetalle} onChange={setMastitisDetalle} />
          )}

          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
            <CButton type="button" color="secondary" variant="outline" onClick={resetFormulario}>
              Limpiar
            </CButton>
            <CButton
              type="submit"
              color={getColorByCode(tipoSeleccionado.tma_codigo)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CSpinner component="span" size="sm" aria-hidden="true" className="me-2" />
                  Guardando...
                </>
              ) : (
                <>
                  <CIcon icon={cilPlus} className="me-2" />
                  Guardar Control
                </>
              )}
            </CButton>
          </div>
        </CForm>
      )}
    </>
  )
}

export default ControlForm
