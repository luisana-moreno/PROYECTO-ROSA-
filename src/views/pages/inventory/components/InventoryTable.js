import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilFilter } from '@coreui/icons'
import {
  CButton,
  CCol,
  CFormSelect,
  CRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { formatDateToDDMMYYYY } from '../../../../utils/dateFormatter'

const InventoryTable = ({
  filters,
  setFilters,
  activeKey,
  setActiveKey,
  filteredInventory,
  setCurrentInventory,
  setEditVisibleInventory,
  setDeleteVisibleInventory,
  categoriasInsumo = [], // Asegurar que categoriasInsumo sea un array
}) => {
  return (
    <>
      <CRow className="mb-3">
        <CCol md={3}>
          <CFormSelect
            className="modal-name custom-select"
            placeholder="Tipo"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Filtrar por tipo</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CFormSelect
            className="modal-name custom-select"
            placeholder="Categoría"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">Filtrar por categoría</option>
            {categoriasInsumo.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={3}>
          <CButton
            className="button-no-hover-green text-white"
            onClick={() => setFilters({ type: '', category: '', date: '' })}
          >
            <CIcon icon={cilFilter} className="me-2" />
            Limpiar Filtros
          </CButton>
        </CCol>
      </CRow>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            Ingresos
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            Egresos
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane visible={activeKey === 1}>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Tipo</CTableHeaderCell>
                <CTableHeaderCell>Categoría</CTableHeaderCell>
                <CTableHeaderCell>Nombre Insumo</CTableHeaderCell>
                <CTableHeaderCell>Cantidad</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Vencimiento</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredInventory
                .filter((item) => item.type === 'Ingreso')
                .map((item) => (
                  <CTableRow key={`ingreso-${item.id}`}>
                    <CTableDataCell>{item.type}</CTableDataCell>
                    <CTableDataCell>{item.categoriaNombre}</CTableDataCell>
                    <CTableDataCell>{item.ttrNominsum}</CTableDataCell>
                    <CTableDataCell>{item.ttrCantidad}</CTableDataCell>
                    <CTableDataCell>{formatDateToDDMMYYYY(item.ttrFechaven)}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex">
                        <CButton
                          className="me-2 mb-2"
                          size="sm"
                          color="info"
                          variant="outline"
                          onClick={() => {
                            setCurrentInventory(item)
                            setEditVisibleInventory(true)
                          }}
                        >
                          Editar
                        </CButton>
                        <CButton
                          className="me-2 mb-2"
                          size="sm"
                          color="danger"
                          variant="outline"
                          onClick={() => {
                            setCurrentInventory(item)
                            setDeleteVisibleInventory(true)
                          }}
                        >
                          Eliminar
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CTabPane>
        <CTabPane visible={activeKey === 2}>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Tipo</CTableHeaderCell>
                <CTableHeaderCell>ID Empleado</CTableHeaderCell>
                <CTableHeaderCell>Fecha de Pago</CTableHeaderCell>
                <CTableHeaderCell>ID Tipo Pago</CTableHeaderCell>
                <CTableHeaderCell>ID Nómina Ref.</CTableHeaderCell>
                <CTableHeaderCell>ID Pago Ref.</CTableHeaderCell>
                <CTableHeaderCell>Fecha Creación</CTableHeaderCell>
                <CTableHeaderCell>Fecha Actualización</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredInventory
                .filter((item) => item.type === 'Egreso')
                .map((item) => (
                  <CTableRow key={`egreso-${item.id}`}>
                    <CTableDataCell>{item.type}</CTableDataCell>
                    <CTableDataCell>{item.idempreg}</CTableDataCell>
                    <CTableDataCell>{formatDateToDDMMYYYY(item.fechpago)}</CTableDataCell>
                    <CTableDataCell>{item.idtippag}</CTableDataCell>
                    <CTableDataCell>{item.idnomref}</CTableDataCell>
                    <CTableDataCell>{item.idpagref}</CTableDataCell>
                    <CTableDataCell>{formatDateToDDMMYYYY(item.fechcrea)}</CTableDataCell>
                    <CTableDataCell>{formatDateToDDMMYYYY(item.fechupda)}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex">
                        <CButton
                          className="me-2 mb-2"
                          size="sm"
                          color="info"
                          variant="outline"
                          onClick={() => {
                            setCurrentInventory(item)
                            setEditVisibleInventory(true)
                          }}
                        >
                          Editar
                        </CButton>
                        <CButton
                          className="me-2 mb-2"
                          size="sm"
                          color="danger"
                          variant="outline"
                          onClick={() => {
                            setCurrentInventory(item)
                            setDeleteVisibleInventory(true)
                          }}
                        >
                          Eliminar
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default InventoryTable
