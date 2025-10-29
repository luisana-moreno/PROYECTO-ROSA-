import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CCard, CButton, CCardBody, CCardHeader } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify' // Importa ToastContainer y toast
import 'react-toastify/dist/ReactToastify.css' // Importa los estilos de react-toastify

import { useEmployees } from './hooks/useEmployees'
import EmployeesTable from './components/EmployeesTable'
import AddEmployeeModal from './components/AddEmployeeModal'
import EditEmployeeModal from './components/EditEmployeeModal'
import DeleteEmployeeModal from './components/DeleteEmployeeModal'
import ViewEmployeeModal from './components/ViewEmployeeModal'

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
      </CCardHeader>
      <CCardBody>
        <EmployeesTable
          employees={currentEmployees}
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
      <ToastContainer /> {/* Reemplaza CAlert con ToastContainer */}
    </CCard>
  )
}

export default Employees
