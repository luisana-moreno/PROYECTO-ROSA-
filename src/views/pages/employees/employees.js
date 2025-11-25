import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CCard, CButton, CCardBody, CCardHeader } from '@coreui/react'

import { useEmployees } from './hooks/useEmployees'
import EmployeesTable from './components/EmployeesTable'
import AddEmployeeModal from './components/AddEmployeeModal'
import EditEmployeeModal from './components/EditEmployeeModal'
import DeleteEmployeeModal from './components/DeleteEmployeeModal'
import ViewEmployeeModal from './components/ViewEmployeeModal'
import EmployeeFilters from './components/EmployeeFilters' // Importar el nuevo componente de filtros

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
    searchTerm, // Nuevo estado de búsqueda
    setSearchTerm, // Nuevo setter de búsqueda
    filterPosition, // Nuevo estado de filtro por cargo
    setFilterPosition, // Nuevo setter de filtro por cargo
    filteredEmployees, // Empleados filtrados
    originalEmployee, // Obtener el originalEmployee del hook
  } = useEmployees()

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Gestion de Empleados
          <CButton
            className="button-no-hover-green text-white"
            onClick={() => setVisible(!visible)}
          >
            <CIcon icon={cilPlus} className="me-2" />
            Agregar Empleado
          </CButton>
        </h4>
        <EmployeeFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterPosition={filterPosition}
          setFilterPosition={setFilterPosition}
          positions={positions}
        />
      </CCardHeader>
      <CCardBody>
        <EmployeesTable
          employees={filteredEmployees}
          indexOfFirstEmployee={indexOfFirstEmployee}
          setEditVisible={setEditVisible}
          setDeleteVisible={setDeleteVisible}
          setViewVisible={setViewVisible}
          setCurrentEmployee={setCurrentEmployee}
          employeesPerPage={employeesPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </CCardBody>
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
      <ViewEmployeeModal
        viewVisible={viewVisible}
        setViewVisible={setViewVisible}
        currentEmployee={currentEmployee}
      />
    </CCard>
  )
}

export default Employees
