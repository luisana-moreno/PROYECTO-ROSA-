import React, { useState, useEffect } from 'react'
import { CFormInput, CListGroup, CListGroupItem, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

const VaccineSearchSelect = ({
  vaccines,
  selectedVaccineName,
  onSelectVaccine,
  onAddVaccine,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedVaccineName || '')
  const [filteredVaccines, setFilteredVaccines] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setSearchTerm(selectedVaccineName || '')
  }, [selectedVaccineName])

  useEffect(() => {
    if (searchTerm) {
      setFilteredVaccines(
        vaccines.filter(
          (vac) => vac && vac.nombre && vac.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
      setShowDropdown(true)
    } else {
      setFilteredVaccines(vaccines)
      setShowDropdown(false)
    }
  }, [searchTerm, vaccines])

  const handleSelect = (vaccine) => {
    onSelectVaccine(vaccine.nombre)
    setSearchTerm(vaccine.nombre)
    setShowDropdown(false)
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    onSelectVaccine(e.target.value) // Actualizar el formData.vaccine con el texto actual
  }

  const handleAddClick = () => {
    onAddVaccine() // Ya no se pasa searchTerm
    setShowDropdown(false)
  }

  return (
    <div className="position-relative d-flex align-items-center">
      <CFormInput
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        className="me-2"
      />
      <CButton className="button-no-hover-green" onClick={handleAddClick}>
        Agregar
      </CButton>
      {showDropdown && filteredVaccines.length > 0 && (
        <CListGroup className="position-absolute w-100" style={{ zIndex: 1000, top: '100%' }}>
          {filteredVaccines.map((vac) => (
            <CListGroupItem
              key={vac.id}
              onClick={() => handleSelect(vac)}
              active={vac.nombre === selectedVaccineName}
              className="cursor-pointer"
            >
              {vac.nombre}
            </CListGroupItem>
          ))}
        </CListGroup>
      )}
    </div>
  )
}

VaccineSearchSelect.propTypes = {
  vaccines: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedVaccineName: PropTypes.string,
  onSelectVaccine: PropTypes.func.isRequired,
  onAddVaccine: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default VaccineSearchSelect
