"use client"
import { CCard, CCardBody, CBadge } from "@coreui/react"
import "./PastureGrid.css"

const PastureGrid = ({ pastures, selectedPasture, onSelectPasture, pastureStatus }) => {
  const getStatusColor = (stateId) => {
    switch (stateId) {
      case 1:
        return "success"
      case 2:
        return "warning"
      case 3:
        return "danger"
      default:
        return "secondary"
    }
  }

  return (
    <div className="pasture-grid-container mb-4">
      <h5 className="mb-3">Potreros Disponibles</h5>
      <div className="pasture-grid">
        {pastures.map((pasture) => (
          <CCard
            key={pasture.id}
            className={`pasture-card ${selectedPasture?.id === pasture.id ? "selected" : ""}`}
            onClick={() => onSelectPasture(pasture)}
            style={{ cursor: "pointer" }}
          >
            <CCardBody className="text-center p-3">
              <h6 className="mb-2">{pasture.codigo}</h6>
              <CBadge color={getStatusColor(pastureStatus[pasture.id]?.stateId || 1)}>{pasture.estado}</CBadge>
              {pastureStatus[pasture.id]?.exitDate && (
                <p className="small mt-2 mb-0">Salida: {pastureStatus[pasture.id].exitDate}</p>
              )}
            </CCardBody>
          </CCard>
        ))}
      </div>
    </div>
  )
}

export default PastureGrid
