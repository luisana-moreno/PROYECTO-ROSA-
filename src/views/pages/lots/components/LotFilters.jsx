'use client'
import { CFormInput, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const LotFilters = ({ searchTerm, setSearchTerm }) => {
  return (
    <CRow className="mb-3">
      <CCol md="6">
        <div className="input-group">
          <span className="input-group-text">
            <CIcon icon={cilSearch} />
          </span>
          <CFormInput
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CCol>
    </CRow>
  )
}

export default LotFilters
