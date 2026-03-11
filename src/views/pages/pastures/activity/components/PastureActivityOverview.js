import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CButton,
  CFormSelect,
} from '@coreui/react'
import PropTypes from 'prop-types'

const PastureActivityOverview = ({
  pastures,
  pastureStates,
  handleUpdatePastureStatus,
  handleViewHistory,
  loading,
}) => {
  const getBadgeColor = (tma_nomestp) => {
    if (tma_nomestp === 'Disponible') return 'success'
    if (tma_nomestp === 'En mantenimiento') return 'warning'
    if (tma_nomestp === 'En uso') return 'danger'
    return 'secondary'
  }

  return (
    <div className="table-responsive">
      <CTable hover responsive>
        <CTableHead className="table-light">
          <CTableRow>
            <CTableHeaderCell>Potrero</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {pastures.map((pasture) => (
            <CTableRow key={pasture.id}>
              <CTableDataCell>
                <strong>{pasture.codigo}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <CFormSelect
                  size="sm"
                  value={pasture.ttr_idestpot || ''}
                  onChange={(e) => handleUpdatePastureStatus(pasture.id, parseInt(e.target.value))}
                  disabled={loading}
                >
                  <option value="">Seleccione estado</option>
                  {pastureStates.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.nombre}
                    </option>
                  ))}
                </CFormSelect>
                {pasture.tma_nomestp && (
                  <div className="mt-1">
                    <CBadge color={getBadgeColor(pasture.tma_nomestp)} shape="rounded-pill">
                      {pasture.tma_nomestp}
                    </CBadge>
                  </div>
                )}
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  size="sm"
                  color="info"
                  variant="outline"
                  onClick={() => handleViewHistory(pasture)}
                  disabled={loading}
                >
                  Ver Historial
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

PastureActivityOverview.propTypes = {
  pastures: PropTypes.array.isRequired,
  pastureStates: PropTypes.array.isRequired,
  handleUpdatePastureStatus: PropTypes.func.isRequired,
  handleViewHistory: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default PastureActivityOverview
