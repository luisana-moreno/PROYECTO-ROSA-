import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPeople } from '@coreui/icons'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'

import { useEmployees } from './hooks/useEmployees'
import EmployeesTable from './components/EmployeesTable'
import AddEmployeeModal from './components/AddEmployeeModal'
import EditEmployeeModal from './components/EditEmployeeModal'
import DeleteEmployeeModal from './components/DeleteEmployeeModal'
import ViewEmployeeModal from './components/ViewEmployeeModal'
import EmployeeFilters from './components/EmployeeFilters'
import ReactivateEmployeeModal from './components/ReactivateEmployeeModal'

const Employees = () => {
  const {
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    deleteVisible,
    setDeleteVisible,
    viewVisible,
    setViewVisible,
    currentEmployee,
    setCurrentEmployee,
    deleteConfirmation,
    setDeleteConfirmation,
    employees,
    addEmployeeForm,
    setAddEmployeeForm,
    handleAddEmployee,
    handleEditEmployee,
    handleDeleteEmployee,
    currentEmployees,
    indexOfFirstEmployee,
    employeesPerPage,
    currentPage,
    paginate,
    positions,
    searchTerm,
    setSearchTerm,
    filterPosition,
    setFilterPosition,
    filteredEmployees,
    originalEmployee,
    filterStatus,
    setFilterStatus,
    // Reactivación
    reactivateVisible,
    setReactivateVisible,
    reactivateConfirmation,
    setReactivateConfirmation,
    handleReactivateEmployee,
  } = useEmployees()

  return (
    <>
      {/* Header Card con descripción */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex align-items-center">
                <CIcon icon={cilPeople} className="me-2" size="lg" style={{ color: '#28a745' }} />
                <strong>Gestión de Empleados</strong>
              </div>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis mb-0">
                Administra el personal de la finca. Registra empleados, asigna cargos, controla
                asistencia y gestiona la información laboral del equipo de trabajo.
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Contenido Principal */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Lista de Empleados</strong>
              <CButton color="success" onClick={() => setVisible(!visible)}>
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Empleado
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CNav variant="tabs" className="mb-3">
                <CNavItem>
                  <CNavLink
                    active={filterStatus === 'ACTIVO'}
                    onClick={() => setFilterStatus('ACTIVO')}
                    style={{ cursor: 'pointer', color: filterStatus === 'ACTIVO' ? '#2eb85c' : '' }}
                  >
                    Activos
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    active={filterStatus === 'INACTIVO'}
                    onClick={() => setFilterStatus('INACTIVO')}
                    style={{
                      cursor: 'pointer',
                      color: filterStatus === 'INACTIVO' ? '#e55353' : '',
                    }}
                  >
                    Inactivos
                  </CNavLink>
                </CNavItem>
              </CNav>

              {/* Filtros de búsqueda */}
              <EmployeeFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterPosition={filterPosition}
                setFilterPosition={setFilterPosition}
                positions={positions}
              />

              {/* Tabla de empleados */}
              <EmployeesTable
                employees={currentEmployees} // Use currentEmployees for pagination
                indexOfFirstEmployee={indexOfFirstEmployee}
                setEditVisible={setEditVisible}
                setDeleteVisible={setDeleteVisible}
                setReactivateVisible={setReactivateVisible}
                setViewVisible={setViewVisible}
                setCurrentEmployee={setCurrentEmployee}
                employeesPerPage={employeesPerPage}
                currentPage={currentPage}
                paginate={paginate}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modales */}
      <AddEmployeeModal
        visible={visible}
        setVisible={setVisible}
        addEmployee={addEmployeeForm}
        setAddEmployee={setAddEmployeeForm}
        handleAddEmployee={handleAddEmployee}
        positions={positions}
      />
      <EditEmployeeModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
        currentEmployee={currentEmployee}
        setCurrentEmployee={setCurrentEmployee}
        handleEditEmployee={handleEditEmployee}
        positions={positions}
        originalEmployee={originalEmployee}
      />
      <DeleteEmployeeModal
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        handleDeleteEmployee={handleDeleteEmployee}
      />
      <ReactivateEmployeeModal
        reactivateVisible={reactivateVisible}
        setReactivateVisible={setReactivateVisible}
        reactivateConfirmation={reactivateConfirmation}
        setReactivateConfirmation={setReactivateConfirmation}
        handleReactivateEmployee={handleReactivateEmployee}
      />
      <ViewEmployeeModal
        viewVisible={viewVisible}
        setViewVisible={setViewVisible}
        currentEmployee={currentEmployee}
      />
    </>
  )
}

export default Employees
