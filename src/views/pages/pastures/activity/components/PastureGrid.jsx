'use client'
import { CCard, CCardBody, CBadge } from '@coreui/react'
import './PastureGrid.css'

const PastureGrid = ({ pastures, selectedPasture, onSelectPasture, pastureStatus }) => {
  const getStatusColor = (potreroId) => {
    const status = pastureStatus[potreroId]
    if (!status) return 'secondary'

    if (status.ocupado_hoy) return 'danger' // Ocupado
    if (status.tma_nomestp === 'Mantenimiento') return 'info' // Mantenimiento

    // Calcular descanso si hay última rotación
    if (status.ultima_rotacion) {
      const ag = new Date(status.ultima_rotacion)
      const now = new Date()
      const diff = Math.ceil(Math.abs(now - ag) / (1000 * 60 * 60 * 24))
      if (diff >= 30) return 'success' // Descansado
      return 'warning' // En recuperación
    }

    return 'success' // Nunca usado -> Disponible
  }

  const getStatusText = (potreroId) => {
    const status = pastureStatus[potreroId]
    if (!status) return 'Desconocido'
    if (status.ocupado_hoy) return 'OCUPADO'
    if (status.tma_nomestp === 'Mantenimiento') return 'MANTENIMIENTO'
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
