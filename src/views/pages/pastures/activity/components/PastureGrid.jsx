'use client'
import { CCard, CCardBody, CBadge } from '@coreui/react'
import './PastureGrid.css'

const PastureGrid = ({ pastures, selectedPasture, onSelectPasture, pastureStatus }) => {
  const getStatusColor = (potreroId) => {
    const status = pastureStatus[potreroId]
    if (!status) return 'secondary'

    const nombreEstado = status.estado_nombre || status.tma_nomestp || ''

    // Estados explícitos de la BD
    if (nombreEstado === 'Ocupado' || nombreEstado === 'En uso') return 'danger'
    if (nombreEstado === 'Mantenimiento') return 'info'
    if (nombreEstado === 'En Recuperación') return 'warning'
    if (nombreEstado === 'Disponible') return 'success'

    // Fallback por si el nombre no coincide exactamente o es calculado
    if (status.ocupado_hoy) return 'danger'

    return 'success'
  }

  const getStatusText = (potreroId) => {
    const status = pastureStatus[potreroId]
    if (!status) return 'Desconocido'

    const nombreEstado = status.estado_nombre || status.tma_nomestp || ''

    if (nombreEstado === 'Ocupado' || nombreEstado === 'En uso') return 'OCUPADO'
    if (nombreEstado === 'Mantenimiento') return 'MANTENIMIENTO'
    if (nombreEstado === 'En Recuperación') return 'EN RECUPERACIÓN'
    if (nombreEstado === 'Disponible') return 'DISPONIBLE'

    if (status.ocupado_hoy) return 'OCUPADO'

    return 'DISPONIBLE'
  }

  return (
    <div className="pasture-grid-container mb-4">
      <h5 className="mb-3">Mapa de Potreros</h5>
      <div className="pasture-grid">
        {pastures.map((pasture) => {
          const id = pasture.ttrIdpotrer || pasture.ttr_idpotrer
          const codigo = pasture.ttrCodpotre || pasture.ttr_codpotre || pasture.codigo
          const color = getStatusColor(id)

          return (
            <CCard
              key={id}
              className={`pasture-card ${selectedPasture?.ttr_idpotrer === id ? 'selected' : ''} border-${color}`}
              onClick={() => onSelectPasture(pasture)}
              style={{
                cursor: 'pointer',
                borderWidth: selectedPasture?.ttr_idpotrer === id ? '3px' : '1px',
              }}
            >
              <CCardBody className="text-center p-3">
                <h6 className="mb-2">{codigo}</h6>
                <CBadge color={color}>{getStatusText(id)}</CBadge>
                {pastureStatus[id]?.ultima_rotacion && (
                  <p className="small mt-2 mb-0 text-muted">
                    Uso: {new Date(pastureStatus[id].ultima_rotacion).toLocaleDateString()}
                  </p>
                )}
              </CCardBody>
            </CCard>
          )
        })}
      </div>
    </div>
  )
}

export default PastureGrid
