import React from 'react'
import {
  CCard, CCardHeader, CCardBody, CRow, CCol, CBadge
} from '@coreui/react'

const ActivePastures = () => {
  // Datos estáticos de ejemplo
  const pastures = [
    {
      id: '1',
      name: 'Potrero 1',
      state: 'Disponible',
      lot: 'Lote A',
      responsible: 'Juan Pérez'
    },
    {
      id: '2',
      name: 'Potrero 2',
      state: 'En mantenimiento',
      lot: 'Lote B',
      responsible: 'María Gómez'
    },
    {
      id: '3',
      name: 'Potrero 3',
      state: 'En uso',
      lot: 'Lote C',
      responsible: 'Carlos Moreno'
    }
  ]

  // Función para obtener el color según el estado
  const getBadgeColor = (state) => {
    if (state === 'Disponible') return 'success'
    if (state === 'En mantenimiento') return 'warning'
    if (state === 'En uso') return 'danger'
    return 'secondary'
  }

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0">Actividad de Potreros</h4>
      </CCardHeader>
      <CCardBody>
        <CRow>
          {pastures.map((pasture) => (
            <CCol md={4} key={pasture.id} className="mb-3">
              <div className="d-flex align-items-center border rounded p-3">
                <CBadge color={getBadgeColor(pasture.state)} className="me-3" style={{ width: 20, height: 20, borderRadius: '50%' }}>&nbsp;</CBadge>
                <div>
                  <strong>{pasture.name}</strong>
                  <div>
                    Estado: <span>{pasture.state}</span>
                  </div>
                  <div>
                    Lote: {pasture.lot}
                  </div>
                  <div>
                    Responsable: {pasture.responsible}
                  </div>
                </div>
              </div>
            </CCol>
          ))}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default ActivePastures