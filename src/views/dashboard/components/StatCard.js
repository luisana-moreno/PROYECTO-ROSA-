import React from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'

const StatCard = ({ title, value, icon, color, description }) => {
  return (
    <CCard className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <CCardBody className="p-4 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div
            className="d-flex align-items-center justify-content-center me-3"
            style={{
              backgroundColor: `${color}20`, // 20% opacity using hex
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              color: color,
            }}
          >
            {icon}
          </div>
          <div>
            <div className="text-medium-emphasis text-uppercase fw-semibold small">{title}</div>
            <div className="fs-4 fw-bold">{value}</div>
            {description && <div className="small text-medium-emphasis mt-1">{description}</div>}
          </div>
        </div>
      </CCardBody>
      {/* Optional: Add a subtle bottom border or progress bar-like indicator */}
      <div style={{ height: '4px', backgroundColor: color, width: '100%' }}></div>
    </CCard>
  )
}

export default StatCard
