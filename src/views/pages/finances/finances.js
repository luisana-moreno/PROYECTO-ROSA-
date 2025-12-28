import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilList, cilChart } from '@coreui/icons'
import VentasList from './components/VentasList'
import useVentas from './hooks/useVentas'
import useProductos from './hooks/useProductos'

const Finances = () => {
  const [activeTab, setActiveTab] = useState('ventas')
  const { ventas, loading, fetchVentas } = useVentas()
  const { insumos, bovinos } = useProductos()

  const handleViewVenta = (venta) => {
    console.log('Ver venta:', venta)
    // TODO: Implementar modal de vista de factura
  }

  const handleEditVenta = (venta) => {
    console.log('Editar venta:', venta)
    // TODO: Implementar modal de edición
  }

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Gestión de Ventas</h4>
          <CButton color="success" onClick={() => setActiveTab('nueva')}>
            <CIcon icon={cilPlus} className="me-2" />
            Nueva Venta
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        {/* Tabs de navegación */}
        <CNav variant="tabs" className="mb-3">
          <CNavItem>
            <CNavLink
              active={activeTab === 'ventas'}
              onClick={() => setActiveTab('ventas')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilList} className="me-2" />
              Ventas
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'nueva'}
              onClick={() => setActiveTab('nueva')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Nueva Venta
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'estadisticas'}
              onClick={() => setActiveTab('estadisticas')}
              style={{ cursor: 'pointer' }}
            >
              <CIcon icon={cilChart} className="me-2" />
              Estadísticas
            </CNavLink>
          </CNavItem>
        </CNav>

        {/* Contenido de tabs */}
        <CTabContent>
          {/* Tab de Ventas */}
          <CTabPane visible={activeTab === 'ventas'}>
            <VentasList
              ventas={ventas}
              loading={loading}
              onViewVenta={handleViewVenta}
              onEditVenta={handleEditVenta}
            />
          </CTabPane>

          {/* Tab de Nueva Venta */}
          <CTabPane visible={activeTab === 'nueva'}>
            <div className="text-center py-5">
              <h5>Formulario de Nueva Venta</h5>
              <p className="text-muted">En desarrollo...</p>
              <p className="text-muted">
                Productos disponibles: {insumos.length} insumos, {bovinos.length} bovinos
              </p>
            </div>
          </CTabPane>

          {/* Tab de Estadísticas */}
          <CTabPane visible={activeTab === 'estadisticas'}>
            <div className="text-center py-5">
              <h5>Estadísticas de Ventas</h5>
              <p className="text-muted">En desarrollo...</p>
            </div>
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default Finances
