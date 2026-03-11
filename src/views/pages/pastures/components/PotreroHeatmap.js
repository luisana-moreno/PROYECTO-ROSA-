import React from 'react'
import { CCard, CCardBody, CCardHeader, CBadge, CRow, CCol, CButton, CTooltip } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilWarning, cilXCircle, cilDrop } from '@coreui/icons'

const PotreroHeatmap = ({ potreros, onPotreroClick }) => {
  const getStatusColor = (potrero) => {
    if (potrero.ocupado_hoy) return 'danger' // Rojo: Ocupado
    if (potrero.tma_nomestp === 'Mantenimiento') return 'info' // Azul: Mantenimiento

    // Calcular días de descanso
    const diasDescanso = getDaysSince(potrero.ultima_rotacion)
    if (diasDescanso >= 30) return 'success' // Verde: Listo (Descansado)
    return 'warning' // Amarillo: En recuperación
  }

  const getDaysSince = (dateString) => {
    if (!dateString) return 999 // Si nunca se usó, está descansado
    const lastDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today - lastDate)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <CRow>
      {potreros.map((potrero) => {
        const color = getStatusColor(potrero)
        const dias = getDaysSince(potrero.ultima_rotacion)

        return (
          <CCol xs={12} sm={6} md={4} lg={3} key={potrero.ttr_idpotrer} className="mb-3">
            <CCard
              className={`h-100 border-${color} shadow-sm`}
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => onPotreroClick(potrero)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <CCardHeader
                className={`bg-${color} text-white d-flex justify-content-between align-items-center`}
              >
                <strong>{potrero.ttr_codpotre}</strong>
                {potrero.ocupado_hoy && (
                  <CBadge color="light" textColor="danger">
                    OCUPADO
                  </CBadge>
                )}
              </CCardHeader>
              <CCardBody className="text-center">
                <div className="mb-2">
                  <strong>Estado:</strong> {potrero.tma_nomestp || potrero.estado_nombre}
                </div>
                {potrero.ultima_rotacion && (
                  <div className="mb-2">
                    <small className="text-medium-emphasis">Último uso:</small>
                    <br />
                    <strong>{new Date(potrero.ultima_rotacion).toLocaleDateString()}</strong>
                    <div className="text-muted small">({dias} días descanso)</div>
                  </div>
                )}
                {!potrero.ultima_rotacion && (
                  <div className="mb-2 text-success">
                    <em>Nunca usado (Disponible)</em>
                  </div>
                )}

                {potrero.tma_nomestp === 'Mantenimiento' && (
                  <div className="mt-2 text-info">
                    <CIcon icon={cilDrop} /> En Mantenimiento
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        )
      })}
    </CRow>
  )
}

export default PotreroHeatmap
