import React from 'react'
import {
  CButton,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CBadge,
  CAlert,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilFolder, cilCheckCircle } from '@coreui/icons'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'
import { usePagination } from '../../../../hooks/usePagination'

const CattleTable = ({
  cattle,
  setCurrentCattle,
  setEditVisible,
  setDeleteVisible,
  setViewVisible,
  handleViewExpBov,
  setReactivateVisible,
}) => {
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(cattle, 10)

  // Función para obtener el color del badge según el estado
  const getEstadoBadgeColor = (estadoNombre) => {
    const estadoColors = {
      activo: 'success',
      vendido: 'info',
      muerto: 'danger',
      enfermo: 'warning',
    }
    return estadoColors[estadoNombre?.toLowerCase()] || 'secondary'
  }

  return (
    <>
      <div className="table-responsive">
        <CTable striped hover className="align-middle mb-0">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className="text-center">N° Bovino</CTableHeaderCell>
              <CTableHeaderCell>Raza</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Sexo</CTableHeaderCell>
              <CTableHeaderCell className="d-none d-md-table-cell">Fecha Nac.</CTableHeaderCell>
              <CTableHeaderCell className="d-none d-lg-table-cell">Color</CTableHeaderCell>
              <CTableHeaderCell className="d-none d-lg-table-cell text-center">
                Peso (Kg)
              </CTableHeaderCell>
              <CTableHeaderCell className="d-none d-md-table-cell">Etapa</CTableHeaderCell>
              <CTableHeaderCell className="d-none d-xl-table-cell">Fecha Registro</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Estado</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentData.map((cattleItem) => (
              <CTableRow key={cattleItem.ttrIdbovino}>
                <CTableDataCell className="text-center">
                  <strong className="text-black">{cattleItem?.ttrNumerobv || '-'}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <span className="fw-semibold">{cattleItem?.razaNombre || '-'}</span>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CBadge color={cattleItem?.ttrSexo === 'Macho' ? 'primary' : 'info'}>
                    {cattleItem?.ttrSexo || 'N/D'}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell className="d-none d-md-table-cell">
                  <small>{formatDateToDDMMYYYY(cattleItem?.ttrFecnacim) || '-'}</small>
                </CTableDataCell>
                <CTableDataCell className="d-none d-lg-table-cell">
                  {cattleItem?.colorNombre || '-'}
                </CTableDataCell>
                <CTableDataCell className="d-none d-lg-table-cell text-center">
                  <span className="badge bg-light text-dark border">
                    {cattleItem?.ttrPesokilo || '-'} kg
                  </span>
                </CTableDataCell>
                <CTableDataCell className="d-none d-md-table-cell">
                  {cattleItem?.etapaNombre || '-'}
                </CTableDataCell>
                <CTableDataCell className="d-none d-xl-table-cell">
                  <small className="text-muted">
                    {cattleItem?.ttrFeccreacion
                      ? formatDateToDDMMYYYY(cattleItem.ttrFeccreacion)
                      : '-'}
                  </small>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CBadge color={getEstadoBadgeColor(cattleItem?.estadoNombre)}>
                    {cattleItem?.estadoNombre || 'Sin estado'}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex flex-wrap flex-md-row gap-1 justify-content-center align-items-center">
                    {/* Botón Editar */}
                    <CButton
                      color="warning"
                      size="sm"
                      className="text-white"
                      onClick={() => {
                        setCurrentCattle(cattleItem)
                        setEditVisible(true)
                      }}
                      title="Editar bovino"
                    >
                      <CIcon icon={cilPencil} size="sm" className="d-md-none" />
                      <span className="d-none d-md-inline">
                        <CIcon icon={cilPencil} size="sm" className="me-1" />
                        Editar
                      </span>
                    </CButton>

                    {/* Botón Reactivar / Desactivar */}
                    {[1, 15].includes(cattleItem.ttrIdestadb) ? (
                      <CButton
                        color="success"
                        size="sm"
                        className="text-white"
                        onClick={() => {
                          setCurrentCattle(cattleItem)
                          setReactivateVisible(true)
                        }}
                        title="Reactivar bovino"
                      >
                        <CIcon icon={cilCheckCircle} size="sm" className="d-md-none" />
                        <span className="d-none d-md-inline">
                          <CIcon icon={cilCheckCircle} size="sm" className="me-1" />
                          Reactivar
                        </span>
                      </CButton>
                    ) : (
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => {
                          setCurrentCattle(cattleItem)
                          setDeleteVisible(true)
                        }}
                        title="Desactivar bovino"
                      >
                        <CIcon icon={cilTrash} size="sm" className="d-md-none" />
                        <span className="d-none d-md-inline">
                          <CIcon icon={cilTrash} size="sm" className="me-1" />
                          Desactivar
                        </span>
                      </CButton>
                    )}

                    {/* Botón Expediente */}
                    <CButton
                      color="success"
                      size="sm"
                      onClick={() => handleViewExpBov(cattleItem)}
                      title="Ver expediente"
                    >
                      <CIcon icon={cilFolder} size="sm" className="d-md-none" />
                      <span className="d-none d-md-inline">
                        <CIcon icon={cilFolder} size="sm" className="me-1" />
                        Expediente
                      </span>
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      {cattle.length === 0 && (
        <CAlert color="info" className="mt-3">
          <div className="d-flex align-items-center">
            <CIcon icon={cilFolder} size="lg" className="me-2" />
            <span>No hay bovinos registrados en el sistema.</span>
          </div>
        </CAlert>
      )}

      {cattle.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination aria-label="Navegación de bovinos">
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

export default CattleTable
