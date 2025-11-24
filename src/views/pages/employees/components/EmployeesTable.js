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
} from '@coreui/react'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter' // Importa la función de formato

const EmployeesTable = ({
  employees,
  indexOfFirstEmployee,
  setEditVisible,
  setDeleteVisible,
  setViewVisible,
  setCurrentEmployee,
  employeesPerPage,
  currentPage,
  paginate,
}) => {
  console.log(employees)
  return (
    <>
      <CTable hover responsive className="shadow-sm">
        <CTableHead className="table-header-custom">
          <CTableRow>
            <CTableHeaderCell className="text-green">N°</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Nombre Completo</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Cargo</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Fecha de Contrato</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Teléfono</CTableHeaderCell>
            <CTableHeaderCell className="text-green">Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employees.map((employee, index) => (
            <CTableRow key={employee.ttr_idemplo || index}>
              <CTableDataCell>{indexOfFirstEmployee + index + 1}</CTableDataCell>
              <CTableDataCell>
                {`${employee?.ttr_nombrel || ''} ${employee?.ttr_apellid || ''}`}
              </CTableDataCell>
              <CTableDataCell>{employee?.cargonombre || ''}</CTableDataCell>
              <CTableDataCell>{formatDateToDDMMYYYY(employee?.ttr_feccont)}</CTableDataCell>
              <CTableDataCell>{employee?.ttr_telefon || ''}</CTableDataCell>
              <CTableDataCell>
                <div className="d-flex">
                  <CButton
                    className="me-2 mb-2"
                    size="sm"
                    color="info"
                    variant="outline"
                    onClick={() => {
                      setCurrentEmployee(employee)
                      setViewVisible(true)
                    }}
                  >
                    Visualizar
                  </CButton>
                  <CButton
                    className="me-2 mb-2"
                    size="sm"
                    color="info"
                    variant="outline"
                    onClick={() => {
                      setCurrentEmployee(employee)
                      setEditVisible(true)
                    }}
                  >
                    Editar
                  </CButton>
                  <CButton
                    className="me-2 mb-2"
                    size="sm"
                    color="danger"
                    variant="outline"
                    onClick={() => {
                      setCurrentEmployee(employee)
                      setDeleteVisible(true)
                    }}
                  >
                    Eliminar
                  </CButton>
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CPagination
        align="center"
        aria-label="Page navigation example"
        className="custom-pagination"
      >
        {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }, (_, i) => (
          <CPaginationItem
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </CPaginationItem>
        ))}
      </CPagination>
    </>
  )
}

export default EmployeesTable
