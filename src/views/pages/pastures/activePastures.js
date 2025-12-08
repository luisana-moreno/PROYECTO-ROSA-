import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CBadge, CAlert } from '@coreui/react'
import { pastureService } from 'src/api/pastureService'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

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
    <CCard className="mb-4 shadow-sm border-0">
      <CCardHeader>
        <strong>Actividad de Potreros</strong>
      </CCardHeader>
      <CCardBody>
        <CRow>
          {pastures.length > 0 ? (
            pastures.map((pasture) => (
              <CCol md={4} key={pasture.ttr_idpotrer} className="mb-3">
                <div className="d-flex align-items-center border rounded p-3 shadow-sm h-100">
                  <CBadge
                    color={getBadgeColor(pasture.tma_nomestp)}
                    className="me-3 p-2"
                    shape="rounded-circle"
                    style={{ width: '15px', height: '15px' }}
                  >
                    <span className="visually-hidden">{pasture.tma_nomestp}</span>
                  </CBadge>
                  <div>
                    <strong className="text-success fs-5">{pasture.ttr_codpotre}</strong>
                    <div className="text-muted small">
                      Estado: <span className="fw-semibold text-dark">{pasture.tma_nomestp}</span>
                    </div>
                    <div className="text-muted small">{pasture.ttr_descripc}</div>
                    <div className="text-muted small mt-1">
                      <small>
                        Mantenimiento: {new Date(pasture.ttr_fechamnt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              </CCol>
            ))
          ) : (
            <CCol xs={12}>
              <CAlert color="info" className="border-0 shadow-sm">
                <CIcon icon={cilSearch} className="me-2" />
                No hay potreros activos (Disponibles o En uso) en este momento.
              </CAlert>
            </CCol>
          )}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default ActivePastures
