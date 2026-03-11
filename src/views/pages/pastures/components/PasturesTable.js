import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { usePagination } from '../../../../hooks/usePagination'

const PasturesTable = ({ pastures, setCurrentPasture, setEditVisible, setDeleteVisible }) => {
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(pastures, 10)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponible':
        return 'success'
      case 'En uso':
      case 'Ocupado':
        return 'danger'
      case 'En mantenimiento':
      case 'Mantenimiento':
        return 'warning'
      case 'En Recuperación':
        return 'info' // O quizás 'warning' dependiendo del gusto, pero 'info' diferencia bien
      default:
        return 'secondary'
    }
  }

  return (
    <>
      <CTable hover responsive className="align-middle">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Código Potrero</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell>Descripción</CTableHeaderCell>
            <CTableHeaderCell>Fecha Mantenimiento</CTableHeaderCell>
            <CTableHeaderCell className="text-end">Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentData.map((pasture) => (
            <CTableRow key={pasture.ttr_idpotrer}>
              <CTableDataCell className="fw-semibold text-black">
                {pasture.ttr_codpotre}
              </CTableDataCell>
              <CTableDataCell>
                <CBadge color={getStatusColor(pasture.tma_nomestp)}>{pasture.tma_nomestp}</CBadge>
              </CTableDataCell>
              <CTableDataCell>
                {pasture.ttr_descripc}
                {pasture.ttr_fecfinmnt && new Date(pasture.ttr_fecfinmnt) > new Date() && (
                  <div className="small text-danger">
                    Fin Mantenimiento: {new Date(pasture.ttr_fecfinmnt).toLocaleDateString()}
                  </div>
                )}
              </CTableDataCell>
              <CTableDataCell>{new Date(pasture.ttr_fechamnt).toLocaleDateString()}</CTableDataCell>
              <CTableDataCell className="text-end">
                <CButton
                  color="warning"
                  size="sm"
                  className="me-2 text-white"
                  title="Editar"
                  onClick={() => {
                    setCurrentPasture(pasture)
                    setEditVisible(true)
                  }}
                >
                  <CIcon icon={cilPencil} />
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  title="Eliminar"
                  onClick={() => {
                    setCurrentPasture(pasture)
                    setDeleteVisible(true)
                  }}
                >
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {pastures.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination aria-label="Navegación de potreros">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </CPaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <CPaginationItem
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </CPaginationItem>
          </CPagination>
        </div>
      )}
    </>
  )
}

export default PasturesTable
