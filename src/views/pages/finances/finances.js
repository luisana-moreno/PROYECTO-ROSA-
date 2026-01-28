import React, { useState, useEffect } from 'react'
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
import { cilPlus, cilList, cilChart, cilSettings } from '@coreui/icons'
import VentasList from './components/VentasList'
import VentaForm from './components/VentaForm'
import FacturaModal from './components/FacturaModal'
import EditVentaModal from './components/EditVentaModal'
import ConfiguracionModal from './components/ConfiguracionModal'
import useVentas from './hooks/useVentas'

const Finances = () => {
  const [activeTab, setActiveTab] = useState('ventas')
  const { ventas, loading, fetchVentas, getVentaById } = useVentas()
  const [facturaModalVisible, setFacturaModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [configModalVisible, setConfigModalVisible] = useState(false)
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null)

  // Estado de Configuración (Inicializado desde localStorage o default)
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('financesConfig')
    return savedConfig ? JSON.parse(savedConfig) : { tasaCambio: 60, precioLeche: 0.5 }
  })

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig)
    localStorage.setItem('financesConfig', JSON.stringify(newConfig))
  }

  const handleViewVenta = async (venta) => {
    try {
      // Obtener detalles completos de la venta
      const ventaCompleta = await getVentaById(venta.ttr_idfactur)
      setVentaSeleccionada(ventaCompleta)
      setFacturaModalVisible(true)
    } catch (error) {
      console.error('Error al cargar venta:', error)
    }
  }

  const handleEditVenta = (venta) => {
    setVentaSeleccionada(venta)
    setEditModalVisible(true)
  }

  const handleVentaCreated = () => {
    // Recargar lista de ventas
    fetchVentas()
    // Cambiar a tab de ventas
    setActiveTab('ventas')
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Gestión de Ventas</h4>
            <div>
              <CButton
                color="info"
                variant="outline"
                className="me-2"
                onClick={() => setConfigModalVisible(true)}
              >
                <CIcon icon={cilSettings} className="me-2" />
                Configuración
              </CButton>
              <CButton color="success" onClick={() => setActiveTab('nueva')}>
                <CIcon icon={cilPlus} className="me-2" />
                Nueva Venta
              </CButton>
            </div>
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
              <VentaForm
                onVentaCreated={handleVentaCreated}
                config={config} // Pasar configuración
              />
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

      {/* Modal de Factura */}
      <FacturaModal
        visible={facturaModalVisible}
        onClose={() => setFacturaModalVisible(false)}
        venta={ventaSeleccionada}
        onPaymentSuccess={fetchVentas}
      />

      {/* Modal de Edición */}
      <EditVentaModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        venta={ventaSeleccionada}
        onUpdateSuccess={fetchVentas}
      />

      {/* Modal de Configuración */}
      <ConfiguracionModal
        visible={configModalVisible}
        onClose={() => setConfigModalVisible(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </>
  )
}

export default Finances
