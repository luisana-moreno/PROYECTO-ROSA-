import React, { useState, useEffect, useRef } from 'react'
import { CFormInput, CListGroup, CListGroupItem } from '@coreui/react'

const SearchableSelect = ({
  options = [],
  value,
  onChange,
  placeholder = 'Seleccione...',
  label = 'Buscar...',
  id,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  // Sync searchTerm with selected value only when not editing
  useEffect(() => {
    if (value && options.length > 0) {
      const selected = options.find((opt) => opt.value == value)
      if (selected) {
        setSearchTerm(selected.label)
      }
    } else if (!value) {
      setSearchTerm('')
    }
  }, [value, options])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
        // Reset search term to selected value if closed without selection
        if (value) {
          const selected = options.find((opt) => opt.value == value)
          if (selected) {
            setSearchTerm(selected.label)
          }
        } else {
          setSearchTerm('')
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef, value, options])

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelect = (option) => {
    onChange(option.value)
    setSearchTerm(option.label)
    setIsOpen(false)
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
    // Optional: Clear selection if user clears input, or keep it?
    // Usually standard combobox clears value if text doesn't match,
    // but here we just let them filter. If they leave it invalid, we might want to handle that.
    // For now, let's keep it simple.
    if (e.target.value === '') {
      onChange('')
    }
  }

  return (
    <div className="position-relative" ref={wrapperRef}>
      <CFormInput
        type="text"
        id={id}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {isOpen && filteredOptions.length > 0 && (
        <CListGroup
          className="position-absolute w-100 shadow-sm"
          style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
        >
          {filteredOptions.map((option) => (
            <CListGroupItem
              key={option.value}
              action
              onClick={() => handleSelect(option)}
              style={{ cursor: 'pointer' }}
            >
              {option.label}
            </CListGroupItem>
          ))}
        </CListGroup>
      )}
      {isOpen && filteredOptions.length === 0 && searchTerm !== '' && (
        <div
          className="position-absolute w-100 p-2 bg-white border rounded shadow-sm text-center text-muted"
          style={{ zIndex: 1000 }}
        >
          No se encontraron resultados
        </div>
      )}
    </div>
  )
}

export default SearchableSelect
