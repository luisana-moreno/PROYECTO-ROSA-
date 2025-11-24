import React, { useState, useEffect } from 'react'
import { CFormInput, CListGroup, CListGroupItem, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

const TreatmentSearchSelect = ({
  treatments,
  selectedTreatmentName,
  onSelectTreatment,
  onAddTreatment,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedTreatmentName || '')
  const [filteredTreatments, setFilteredTreatments] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setSearchTerm(selectedTreatmentName || '')
  }, [selectedTreatmentName])

  useEffect(() => {
    if (searchTerm) {
      setFilteredTreatments(
        treatments.filter(
          (trat) =>
            trat && trat.nombre && trat.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
      setShowDropdown(true)
    } else {
      setFilteredTreatments(treatments)
      setShowDropdown(false)
    }
  }, [searchTerm, treatments])

  const handleSelect = (treatment) => {
    onSelectTreatment(treatment.nombre)
    setSearchTerm(treatment.nombre)
    setShowDropdown(false)
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    onSelectTreatment(e.target.value) // Actualizar el formData.treatment con el texto actual
  }

  const handleAddClick = () => {
    onAddTreatment() // Ya no se pasa searchTerm
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
      {showDropdown && filteredTreatments.length > 0 && (
        <CListGroup className="position-absolute w-100" style={{ zIndex: 1000, top: '100%' }}>
          {filteredTreatments.map((trat) => (
            <CListGroupItem
              key={trat.id}
              onClick={() => handleSelect(trat)}
              active={trat.nombre === selectedTreatmentName}
              className="cursor-pointer"
            >
              {trat.nombre}
            </CListGroupItem>
          ))}
        </CListGroup>
      )}
    </div>
  )
}

TreatmentSearchSelect.propTypes = {
  treatments: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTreatmentName: PropTypes.string,
  onSelectTreatment: PropTypes.func.isRequired,
  onAddTreatment: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default TreatmentSearchSelect
