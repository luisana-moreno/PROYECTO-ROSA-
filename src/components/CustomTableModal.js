import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import PropTypes from 'prop-types'

const CustomTableModal = ({
  visible,
  onClose,
  data = [], // Valor predeterminado
  columns = [], // Valor predeterminado
  onSelect,
  selectedItems: initialSelectedItems,
  setSelectedItems,
  title,
  searchPlaceholder,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [internalSelectedItems, setInternalSelectedItems] = useState(initialSelectedItems || [])

  useEffect(() => {
    setInternalSelectedItems(initialSelectedItems || [])
  }, [initialSelectedItems])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCheckboxChange = (item) => {
    setInternalSelectedItems((prevSelected) => {
      if (prevSelected.some((selected) => selected.id === item.id)) {
        return prevSelected.filter((selected) => selected.id !== item.id)
      } else {
        return [...prevSelected, item]
      }
    })
  }

  const handleSave = () => {
    onSelect(internalSelectedItems)
    onClose()
  }

  const filteredData = data.filter((item) =>
    columns.some((col) => String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose} size="lg">
      <CModalHeader className="modal-module">
        <CModalTitle className="typography-color">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <CFormInput
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-3"
        />
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell></CTableHeaderCell>
              {/* Checkbox column */}
              {columns.map((col) => (
                <CTableHeaderCell key={col.key}>{col.label}</CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredData.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>
                  <CFormCheck
                    checked={internalSelectedItems.some((selected) => selected.id === item.id)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                </CTableDataCell>
                {columns.map((col) => (
                  <CTableDataCell key={col.key}>{item[col.key]}</CTableDataCell>
                ))}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton className="button-no-hover-green text-white" onClick={handleSave}>
          Seleccionar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

CustomTableModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  setSelectedItems: PropTypes.func,
  title: PropTypes.string,
  searchPlaceholder: PropTypes.string,
}

export default CustomTableModal
