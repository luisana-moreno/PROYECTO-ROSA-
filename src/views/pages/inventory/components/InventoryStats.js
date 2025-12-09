import React from 'react'
import { CRow, CCol, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClipboard, cilWarning, cilCheckCircle } from '@coreui/icons'

const InventoryStats = ({ items }) => {
  const totalItems = items.length
  const lowStock = items.filter((i) => i.ttr_cantidad <= 5).length
  const expired = items.filter((i) => {
    if (!i.ttr_fechaven) return false
    return new Date(i.ttr_fechaven) < new Date()
  }).length

  return (
    <CRow className="mb-4 g-3">
      <CCol sm={6} lg={4}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CIcon icon={cilClipboard} height={24} />}
          padding={false}
          title="Total Insumos"
          value={totalItems}
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsF
          className="mb-3"
          color="warning"
          icon={<CIcon icon={cilWarning} height={24} />}
          padding={false}
          title="Stock Bajo"
          value={lowStock}
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsF
          className="mb-3"
          color="danger"
          icon={<CIcon icon={cilWarning} height={24} />}
          padding={false}
          title="Vencidos"
          value={expired}
        />
      </CCol>
    </CRow>
  )
}

export default InventoryStats
