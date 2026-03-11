import React, { useState, useRef, useEffect } from 'react'
import { CFormInput, CFormLabel } from '@coreui/react'
import './SearchableSelect.css'

const SearchableSelect = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Buscar...',
  displayKey = 'label',
  valueKey = 'value',
  emptyMessage = 'Sin resultados',
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState(options)
  const wrapperRef = useRef(null)

  // Filtrar opciones según búsqueda
  useEffect(() => {
    if (searchTerm) {
      const filtered = options.filter((option) =>
        option[displayKey]?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredOptions(filtered)
    } else {
      setFilteredOptions(options)
    }
  }, [searchTerm, options, displayKey])

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Obtener el texto mostrado del valor seleccionado
  const getDisplayText = () => {
    if (!value) return ''
    const selected = options.find((opt) => opt[valueKey] === value)
    return selected ? selected[displayKey] : ''
  }

  const handleSelect = (option) => {
    onChange(option[valueKey])
    setSearchTerm('')
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange(null)
    setSearchTerm('')
    setIsOpen(false)
  }

  return (
    <div className="searchable-select-wrapper" ref={wrapperRef}>
      {label && <CFormLabel>{label}</CFormLabel>}

      <div className="searchable-select-container">
        <CFormInput
          type="text"
          placeholder={value ? getDisplayText() : placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="searchable-select-input"
        />

        {value && !isOpen && (
          <button
            type="button"
            className="searchable-select-clear"
            onClick={handleClear}
            title="Limpiar selección"
          >
            ×
          </button>
        )}

        {isOpen && (
          <div className="searchable-select-dropdown">
            {filteredOptions.length > 0 ? (
              <>
                <div className="searchable-select-option" onClick={handleClear}>
                  <em className="text-muted">-- Sin selección --</em>
                </div>
                {filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`searchable-select-option ${
                      option[valueKey] === value ? 'selected' : ''
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {option[displayKey]}
                  </div>
                ))}
              </>
            ) : (
              <div className="searchable-select-empty">{emptyMessage}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchableSelect
