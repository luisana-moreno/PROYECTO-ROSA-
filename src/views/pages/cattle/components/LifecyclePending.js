import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CBadge,
  CAlert,
  CSpinner,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilArrowRight, cilAnimal, cilReload } from '@coreui/icons'
import { cattleService } from '../../../../api/cattleService'
import { toast } from 'react-toastify'

const LifecyclePending = ({ onTransitionConfirmed }) => {
  const [transitions, setTransitions] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmingId, setConfirmingId] = useState(null)
  const [confirmingAll, setConfirmingAll] = useState(false)

  useEffect(() => {
    loadTransitions()
  }, [])

  const loadTransitions = async () => {
    try {
      setLoading(true)
      const data = await cattleService.getLifecyclePending()
      setTransitions(data)
    } catch (error) {
      console.error('Error al cargar transiciones:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async (bovinoId, newEtapaId, numeroBovino, etapaNueva) => {
    try {
      setConfirmingId(bovinoId)
      await cattleService.confirmLifecycleTransition(bovinoId, newEtapaId)
      toast.success(`Animal #${numeroBovino} promovido a "${etapaNueva}"`)
      setTransitions((prev) => prev.filter((t) => t.ttr_idbovino !== bovinoId))
      if (onTransitionConfirmed) onTransitionConfirmed()
    } catch (error) {
      console.error('Error al confirmar:', error)
      toast.error('Error al confirmar transición: ' + error.message)
    } finally {
      setConfirmingId(null)
    }
  }

  const handleConfirmAll = async () => {
    try {
      setConfirmingAll(true)
      const result = await cattleService.confirmAllLifecycleTransitions()
      toast.success(`${result.updated} transiciones confirmadas exitosamente`)
      setTransitions([])
      if (onTransitionConfirmed) onTransitionConfirmed()
    } catch (error) {
      console.error('Error al confirmar todas:', error)
      toast.error('Error: ' + error.message)
    } finally {
      setConfirmingAll(false)
    }
  }

  const getEtapaColor = (etapa) => {
    const name = (etapa || '').toLowerCase()
    if (name.includes('becerro') || name.includes('lactante')) return 'info'
    if (name.includes('destetado') || name.includes('destete')) return 'primary'
    if (name.includes('maut')) return 'warning'
    if (name.includes('novilla') || name.includes('torete')) return 'success'
    if (name.includes('vaca') || name.includes('toro')) return 'danger'
    return 'secondary'
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('es-ES')
  }

  if (loading) {
    return (
      <CCard className="mb-4 border-0 shadow-sm">
        <CCardBody className="text-center py-4">
          <CSpinner color="success" />
          <p className="mt-2 text-muted">Analizando ciclo de vida del ganado...</p>
        </CCardBody>
      </CCard>
    )
  }

  if (transitions.length === 0) return null

  return (
    <CCard className="mb-4 border-0 shadow-sm" style={{ borderLeft: '4px solid #f9b115' }}>
      <CCardHeader
        className="d-flex justify-content-between align-items-center"
        style={{ background: 'linear-gradient(135deg, #fff9e6 0%, #fff 100%)' }}
      >
        <div className="d-flex align-items-center">
          <CIcon icon={cilAnimal} className="me-2 text-warning" size="lg" />
          <div>
            <strong>Transiciones de Etapa Pendientes</strong>
            <CBadge color="warning" className="ms-2">
              {transitions.length}
            </CBadge>
          </div>
        </div>
        <div className="d-flex gap-2">
          <CButton color="light" size="sm" onClick={loadTransitions}>
            <CIcon icon={cilReload} className="me-1" />
            Actualizar
          </CButton>
          {transitions.length > 1 && (
            <CButton
              color="success"
              size="sm"
              className="text-white"
              onClick={handleConfirmAll}
              disabled={confirmingAll}
            >
              {confirmingAll ? (
                <CSpinner size="sm" className="me-1" />
              ) : (
                <CIcon icon={cilCheckCircle} className="me-1" />
              )}
              Confirmar Todas ({transitions.length})
            </CButton>
          )}
        </div>
      </CCardHeader>
      <CCardBody>
        {/* <CAlert color="info" className="py-2 mb-3 border-0 small">
          <strong>ℹ️ Sistema Semiautomático:</strong> Estos animales han alcanzado la edad para
          cambiar de etapa. Confirme cada transición manualmente.
        </CAlert> */}
        <CRow>
          {transitions.map((t) => (
            <CCol xs={12} sm={6} lg={4} key={t.ttr_idbovino} className="mb-3">
              <CCard
                className="h-100 border-0 shadow-sm"
                style={{
                  transition: 'transform 0.2s',
                  cursor: 'default',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <CCardBody className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-0 fw-bold">
                        <CIcon icon={cilAnimal} className="me-1 text-success" />
                        Animal #{t.ttr_numerobv}
                      </h6>
                      <small className="text-muted">
                        {t.ttr_sexo || 'Sin sexo'} · {t.raza_nombre || 'Sin raza'}
                      </small>
                    </div>
                    <CBadge color="dark" shape="rounded-pill">
                      {t.edad_meses} meses
                    </CBadge>
                  </div>

                  <div className="d-flex align-items-center justify-content-center my-3 gap-2">
                    <CBadge color={getEtapaColor(t.etapa_actual_nombre)} className="px-3 py-2">
                      {t.etapa_actual_nombre || 'Sin etapa'}
                    </CBadge>
                    <CIcon icon={cilArrowRight} className="text-muted" />
                    <CBadge
                      color={getEtapaColor(t.etapa_sugerida_nombre)}
                      className="px-3 py-2"
                      style={{ fontWeight: 'bold' }}
                    >
                      {t.etapa_sugerida_nombre}
                    </CBadge>
                  </div>

                  <div className="small text-muted mb-2">
                    <div>Nacimiento: {formatDate(t.ttr_fecnacim)}</div>
                    {t.ttr_pesokilo && <div>Peso: {t.ttr_pesokilo} kg</div>}
                    {t.madre_numero && <div>Madre: #{t.madre_numero}</div>}
                  </div>

                  <CTooltip content={`Promover a ${t.etapa_sugerida_nombre}`} placement="top">
                    <CButton
                      color="success"
                      className="w-100 text-white"
                      size="sm"
                      onClick={() =>
                        handleConfirm(
                          t.ttr_idbovino,
                          t.etapa_sugerida_id,
                          t.ttr_numerobv,
                          t.etapa_sugerida_nombre,
                        )
                      }
                      disabled={confirmingId === t.ttr_idbovino}
                    >
                      {confirmingId === t.ttr_idbovino ? (
                        <CSpinner size="sm" />
                      ) : (
                        <>
                          <CIcon icon={cilCheckCircle} className="me-1" />
                          Confirmar Transición
                        </>
                      )}
                    </CButton>
                  </CTooltip>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default LifecyclePending
