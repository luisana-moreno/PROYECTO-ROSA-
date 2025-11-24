import React, { useState, useEffect } from 'react'
import { CFormInput, CListGroup, CListGroupItem } from '@coreui/react'
import PropTypes from 'prop-types'

const EmployeeSearchSelect = ({ employees, selectedEmployeeId, onSelectEmployee, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  // Sincronizar searchTerm con el empleado seleccionado desde las props
  useEffect(() => {
    const employee = employees.find((emp) => emp.id === selectedEmployeeId)
    if (employee) {
      setSearchTerm(`${employee.ttrNombrel} ${employee.ttrApellid}`)
    } else {
      setSearchTerm('') // Limpiar si no hay empleado seleccionado o no se encuentra
    }
  }, [selectedEmployeeId, employees])

  useEffect(() => {
    if (searchTerm) {
      setFilteredEmployees(
        employees.filter((emp) => {
          const nombre = emp.ttrNombrel ? emp.ttrNombrel.toLowerCase() : ''
          const apellido = emp.ttrApellid ? emp.ttrApellid.toLowerCase() : ''
          const cargo = emp.cargoNombre ? emp.cargoNombre.toLowerCase() : ''
          const lowerCaseSearchTerm = searchTerm.toLowerCase()

          return (
            nombre.includes(lowerCaseSearchTerm) ||
            apellido.includes(lowerCaseSearchTerm) ||
            cargo.includes(lowerCaseSearchTerm)
          )
        }),
      )
      setShowDropdown(true)
    } else {
      setFilteredEmployees(employees)
      setShowDropdown(false)
    }
  }, [searchTerm, employees])

  const handleSelect = (employee) => {
    onSelectEmployee(employee.id) // Usar emp.id que es el ttr_idemplo mapeado
    setSearchTerm(`${employee.ttrNombrel} ${employee.ttrApellid}`)
    setShowDropdown(false)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    // Limpiar el empleado seleccionado solo si el texto no coincide con el empleado actual
    const currentEmployee = employees.find((emp) => emp.id === selectedEmployeeId)
    if (
      !currentEmployee ||
      `${currentEmployee.ttrNombrel} ${currentEmployee.ttrApellid}` !== value
    ) {
      onSelectEmployee('')
    }
  }

  const selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId)

  return (
    <div className="position-relative">
      <CFormInput
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Delay to allow click on dropdown item
      />
      {showDropdown && filteredEmployees.length > 0 && (
        <CListGroup className="position-absolute w-100" style={{ zIndex: 1000 }}>
          {filteredEmployees.map((emp, index) => (
            <CListGroupItem
              key={emp.id || `${emp.ttrNombrel}-${emp.ttrApellid}-${index}`} // Usar key más robusta con emp.id
              onClick={() => handleSelect(emp)}
              active={emp.id === selectedEmployeeId}
              className="cursor-pointer"
            >
              {emp.ttrNombrel} {emp.ttrApellid} {emp.cargoNombre ? `(${emp.cargoNombre})` : ''}
            </CListGroupItem>
          ))}
        </CListGroup>
      )}
      {selectedEmployee && !showDropdown && (
        <small className="text-muted">
          Empleado seleccionado: {selectedEmployee.ttrNombrel} {selectedEmployee.ttrApellid}
          {selectedEmployee.cargoNombre ? ` (${selectedEmployee.cargoNombre})` : ''}
        </small>
      )}
    </div>
  )
}

EmployeeSearchSelect.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedEmployeeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelectEmployee: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default EmployeeSearchSelect
