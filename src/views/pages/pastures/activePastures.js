import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CBadge } from '@coreui/react'
import { pastureService } from 'src/api/pastureService'

const ActivePastures = () => {
  const [pastures, setPastures] = useState([])

  useEffect(() => {
    const fetchActivePastures = async () => {
      try {
        const allPastures = await pastureService.getAllPotreros()
        if (allPastures) {
          const formattedPastures = allPastures.map((p) => ({
            ttr_idpotrer: p.ttr_idpotrer,
            ttr_codpotre: p.ttr_codpotre,
            ttr_idestpot: p.ttr_idestpot,
            tma_nomestp: p.estado_potrero_nombre, // Nombre del estado para mostrar
            ttr_idtipman: p.ttr_idtipman,
            tma_nomtipm: p.tipo_mantenimiento_nombre, // Nombre del tipo de mantenimiento para mostrar
            ttr_fechamnt: p.ttr_fechamnt,
            ttr_descripc: p.ttr_descripc,
          }))
          // Filtrar potreros activos (ej. 'Disponible' o 'En uso')
          const active = formattedPastures.filter(
            (p) => p.tma_nomestp === 'Disponible' || p.tma_nomestp === 'En uso',
          )
          setPastures(active)
        }
      } catch (error) {
        console.error('Error al cargar potreros activos:', error)
        // Aquí podrías añadir un toast o un mensaje de error en la UI
      }
    }
    fetchActivePastures()
  }, [])

  // Función para obtener el color según el estado
  const getBadgeColor = (tma_nomestp) => {
    if (tma_nomestp === 'Disponible') return 'success'
    if (tma_nomestp === 'En mantenimiento') return 'warning'
    if (tma_nomestp === 'En uso') return 'danger'
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
            <CCol md={4} key={pasture.ttr_idpotrer} className="mb-3">
              <div className="d-flex align-items-center border rounded p-3">
                <CBadge
                  color={getBadgeColor(pasture.tma_nomestp)}
                  className="me-3"
                  style={{ width: 20, height: 20, borderRadius: '50%' }}
                >
                  &nbsp;
                </CBadge>
                <div>
                  <strong>{pasture.ttr_codpotre}</strong>
                  <div>
                    Estado: <span>{pasture.tma_nomestp}</span>
                  </div>
                  <div>Descripción: {pasture.ttr_descripc}</div>
                  <div>
                    Fecha Mantenimiento: {new Date(pasture.ttr_fechamnt).toLocaleDateString()}
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
