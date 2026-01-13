import React from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CBadge,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilCheckCircle } from '@coreui/icons'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter'

const EmployeesTable = ({
  employees,
  indexOfFirstEmployee,
  setEditVisible,
  setDeleteVisible,
  setReactivateVisible,
  setViewVisible,
  setCurrentEmployee,
  employeesPerPage,
  currentPage,
  paginate,
}) => {
  // Función para obtener el color del badge según el cargo
  const getPositionBadgeColor = (positionName) => {
    const positionColors = {
      gerente: 'danger',
      veterinario: 'success',
      trabajador: 'info',
      supervisor: 'warning',
      administrador: 'primary',
    }
    return positionColors[positionName?.toLowerCase()] || 'secondary'
  }

  return (
    <>
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>N°</CTableHeaderCell>
            <CTableHeaderCell>Nombre Completo</CTableHeaderCell>
            <CTableHeaderCell>Cargo</CTableHeaderCell>
            <CTableHeaderCell>Fecha de Contrato</CTableHeaderCell>
            <CTableHeaderCell>Teléfono</CTableHeaderCell>
            <CTableHeaderCell>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employees.map((employee, index) => (
            <CTableRow key={employee.ttr_idemplo || employee.id || index}>
              <CTableDataCell>{indexOfFirstEmployee + index + 1}</CTableDataCell>
              <CTableDataCell>
                <strong>{`${employee?.ttrNombrel || ''} ${employee?.ttrApellid || ''}`}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <CBadge color={getPositionBadgeColor(employee?.cargoNombre)}>
                  {employee?.cargoNombre || 'Sin cargo'}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>{formatDateToDDMMYYYY(employee?.ttrFeccont)}</CTableDataCell>
              <CTableDataCell>{employee?.ttrTelefon || '-'}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="info"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentEmployee(employee)
                    setViewVisible(true)
                  }}
                >
                  <CIcon icon={'cilEye'} size="sm" className="me-1" />
                  Ver
                </CButton>
                <CButton
                  color="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentEmployee(employee)
                    setEditVisible(true)
                  }}
                >
                  <CIcon icon={cilPencil} size="sm" className="me-1" />
                  Editar
                </CButton>
                {employee.ttrEstado === 'INACTIVO' ? (
                  <CButton
                    color="success"
                    size="sm"
                    onClick={() => {
                      setCurrentEmployee(employee)
                      setReactivateVisible(true)
                    }}
                    style={{ color: 'white' }}
                  >
                    <CIcon icon={cilCheckCircle} size="sm" className="me-1" />
                    Reactivar
                  </CButton>
                ) : (
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setCurrentEmployee(employee)
                      setDeleteVisible(true)
                    }}
                  >
                    <CIcon icon={cilTrash} size="sm" className="me-1" />
                    Desactivar
                  </CButton>
                )}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {employees.length === 0 && (
        <CAlert color="info">No hay empleados registrados en el sistema.</CAlert>
      )}

      {/* Paginación */}
      {employees.length > employeesPerPage && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination aria-label="Navegación de empleados">
            <CPaginationItem disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
              Anterior
            </CPaginationItem>
            {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }, (_, i) => (
              <CPaginationItem
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === Math.ceil(employees.length / employeesPerPage)}
              onClick={() => paginate(currentPage + 1)}
            >
              Siguiente
            </CPaginationItem>
          </CPagination>
        </div>
      )}
    </>
  )
}

export default EmployeesTable
