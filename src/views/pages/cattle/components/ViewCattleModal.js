import React from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CRow,
  CCol,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAnimal } from '@coreui/icons'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const ViewCattleModal = ({ viewVisible, setViewVisible, currentCattle }) => {
  if (!currentCattle) return null

  const getEstadoBadgeColor = (estadoNombre) => {
    const estadoColors = {
      activo: 'success',
      vendido: 'info',
      muerto: 'danger',
      enfermo: 'warning',
    }
    return estadoColors[estadoNombre?.toLowerCase()] || 'secondary'
  }

  const InfoRow = ({ label, value, badge = false, badgeColor }) => (
    <CRow className="mb-3 align-items-center">
      <CCol xs={5} className="text-medium-emphasis">
        <small>
          <strong>{label}</strong>
        </small>
      </CCol>
      <CCol xs={7}>
        {badge ? (
          <CBadge color={badgeColor} className="px-3 py-2">
            {value || '-'}
          </CBadge>
        ) : (
          <span>{value || '-'}</span>
        )}
      </CCol>
    </CRow>
  )

  return (
    <CModal
      alignment="center"
      scrollable
      visible={viewVisible}
      onClose={() => setViewVisible(false)}
      backdrop="static"
      size="lg"
    >
      <CModalHeader style={{ backgroundColor: '#28a745', color: 'white' }}>
        <CModalTitle>
          <CIcon icon={cilAnimal} className="me-2" />
          Detalles del Bovino
        </CModalTitle>
      </CModalHeader>
      <CModalBody className="p-4">
        {/* Header con número de arete */}
        <div className="text-center mb-4 pb-4 border-bottom">
          <div className="mb-3">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#28a745',
                color: 'white',
              }}
            >
              <CIcon icon={cilAnimal} size="3xl" />
            </div>
          </div>
          <h4 className="mb-2">
            Bovino #{currentCattle.ttrNumerobv || currentCattle.ttr_numerobv}
          </h4>
          <CBadge
            color={getEstadoBadgeColor(currentCattle.estadoNombre || currentCattle.estado_nombre)}
            className="px-3 py-2"
            style={{ fontSize: '0.9rem' }}
          >
            {currentCattle.estadoNombre || currentCattle.estado_nombre || 'Sin estado'}
          </CBadge>
        </div>

        {/* Información del Bovino */}
        <div className="mb-4">
          <h6 className="text-success mb-3">
            <strong>Información General</strong>
          </h6>
          <InfoRow label="Raza" value={currentCattle.razaNombre || currentCattle.raza_nombre} />
          <InfoRow label="Color" value={currentCattle.colorNombre || currentCattle.color_nombre} />
          <InfoRow
            label="Fecha de Nacimiento"
            value={formatDateToDDMMYYYY(currentCattle.ttrFecnacim || currentCattle.ttr_fecnacim)}
          />
          <InfoRow
            label="Peso (Kg)"
            value={currentCattle.ttrPesokilo || currentCattle.ttr_pesokilo}
          />
          <InfoRow label="Etapa" value={currentCattle.etapaNombre || currentCattle.etapa_nombre} />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setViewVisible(false)}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ViewCattleModal
