import React, { useState, useMemo } from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CAlert,
  CSpinner,
  CFormSelect,
  CPagination,
  CPaginationItem,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import PropTypes from 'prop-types'

/**
 * StandardTable - Componente de tabla reutilizable con paginación y estilos consistentes
 *
 * @param {Array} columns - Columnas de la tabla [{key, label, render?}]
 * @param {Array} data - Datos a mostrar
 * @param {Boolean} loading - Estado de carga
 * @param {String} emptyMessage - Mensaje cuando no hay datos
 * @param {Boolean} searchable - Habilitar búsqueda
 * @param {String} searchPlaceholder - Placeholder del buscador
 * @param {Function} renderActions - Función para renderizar acciones por fila
 * @param {Number} defaultItemsPerPage - Items por página por defecto
 * @param {String} rowKey - Key para identificar cada fila
 */
const StandardTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No hay registros disponibles.',
  searchable = false,
  searchPlaceholder = 'Buscar...',
  renderActions,
  defaultItemsPerPage = 10,
  rowKey = 'id',
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar datos por término de búsqueda
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data
    return data.filter((item) =>
      columns.some((col) => {
        const value = item[col.key]
        if (value == null) return false
        return String(value).toLowerCase().includes(searchTerm.toLowerCase())
      }),
    )
  }, [data, searchTerm, columns])

  // Calcular paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Resetear página cuando cambian los datos o filtros
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, itemsPerPage, data.length])

  // Generar números de página
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <CSpinner color="success" />
        <p className="mt-2 text-muted">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="standard-table-container">
      {/* Header con búsqueda y selector de items por página */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        {searchable && (
          <CInputGroup style={{ maxWidth: '300px' }}>
            <CInputGroupText>
              <CIcon icon={cilSearch} />
            </CInputGroupText>
            <CFormInput
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CInputGroup>
        )}

        <div className="d-flex align-items-center gap-2">
          <small className="text-muted">Mostrar:</small>
          <CFormSelect
            size="sm"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            style={{ width: 'auto' }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </CFormSelect>
          <small className="text-muted">registros</small>
        </div>
      </div>

      {/* Tabla */}
      <CTable striped hover responsive className="align-middle border rounded shadow-sm">
        <CTableHead className="bg-success text-white">
          <CTableRow>
            {columns.map((col) => (
              <CTableHeaderCell
                key={col.key}
                className="text-white"
                style={{ backgroundColor: '#2eb85c' }}
              >
                {col.label}
              </CTableHeaderCell>
            ))}
            {renderActions && (
              <CTableHeaderCell
                className="text-white text-center"
                style={{ backgroundColor: '#2eb85c', width: '150px' }}
              >
                Acciones
              </CTableHeaderCell>
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {paginatedData.map((item, index) => (
            <CTableRow key={item[rowKey] || index}>
              {columns.map((col) => (
                <CTableDataCell key={col.key}>
                  {col.render ? col.render(item[col.key], item) : (item[col.key] ?? '-')}
                </CTableDataCell>
              ))}
              {renderActions && (
                <CTableDataCell className="text-center">{renderActions(item)}</CTableDataCell>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Mensaje vacío */}
      {filteredData.length === 0 && (
        <CAlert color="info" className="text-center mt-3">
          {searchTerm ? `No se encontraron resultados para "${searchTerm}"` : emptyMessage}
        </CAlert>
      )}

      {/* Footer con información y paginación */}
      {filteredData.length > 0 && (
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-2">
          <small className="text-muted">
            Mostrando {startIndex + 1} - {Math.min(endIndex, filteredData.length)} de{' '}
            {filteredData.length} registros
            {searchTerm && ` (filtrado de ${data.length} total)`}
          </small>

          {totalPages > 1 && (
            <CPagination size="sm" aria-label="Paginación">
              <CPaginationItem
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                aria-label="Primera página"
              >
                «
              </CPaginationItem>
              <CPaginationItem
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                aria-label="Anterior"
              >
                ‹
              </CPaginationItem>

              {getPageNumbers().map((page) => (
                <CPaginationItem
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </CPaginationItem>
              ))}

              <CPaginationItem
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-label="Siguiente"
              >
                ›
              </CPaginationItem>
              <CPaginationItem
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                aria-label="Última página"
              >
                »
              </CPaginationItem>
            </CPagination>
          )}
        </div>
      )}
    </div>
  )
}

StandardTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  renderActions: PropTypes.func,
  defaultItemsPerPage: PropTypes.number,
  rowKey: PropTypes.string,
}

export default StandardTable
