import React, { useState, useEffect } from 'react'
import { CRow, CCol, CSpinner } from '@coreui/react'
import { cilDrop, cilWarning, cilHome } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// Importar servicio
import { dashboardService } from 'src/api/dashboardService'
import { generateMilkProductionReport } from 'src/utils/pdfReportGenerator'

// Importar nuevos componentes modulares
import StatCard from './components/StatCard'
import ProductionChart from './components/ProductionChart'
import HerdCompositionChart from './components/HerdCompositionChart'
import PastureStatusChart from './components/PastureStatusChart'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    bovinos: { total: 0, en_finca: 0, hembras: 0, machos: 0 },
    leche: { litros_hoy: 0, litros_semana: 0, promedio_semana: 0 },
    potreros: { total: 0, ocupados: 0, disponibles: 0, mantenimiento: 0 },
    insumos: { total_items: 0, low_stock: 0, near_expiry: 0 },
    produccion_historial: [],
    top_bovine: { numero: 'N/A', total_litros: 0 },
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const result = await dashboardService.getDashboardData()
      if (result) {
        setData(result)
      }
    } catch (error) {
      console.error('Error loading dashboard data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = () => {
    generateMilkProductionReport(data)
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  // Preparar datos para gráficos
  // El historial ya viene formateado [{fecha: 'YYYY-MM-DD', litros: N}] desde el backend (modificado a 30 días)
  const productionData =
    data.produccion_historial && data.produccion_historial.length > 0
      ? data.produccion_historial
      : []

  return (
    <div className="fade-in p-4" style={{ backgroundColor: '#ebedef', minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark mb-0">Panel de Control</h2>
        {/* Botón de Reporte (Placeholder por ahora) */}
        <button className="btn btn-primary" onClick={handleGenerateReport}>
          <CIcon icon={cilDrop} className="me-2" />
          Reporte de Producción
        </button>
      </div>

      {/* --- KPIs PRINCIPALES --- */}
      <CRow>
        <CCol xs={12} sm={6} lg={3}>
          {/* ... Bovinos en Finca ... */}
          <StatCard
            title="Bovinos en Finca"
            value={`${data.bovinos.en_finca} / ${data.bovinos.total}`}
            icon={<i className="cil-cow" style={{ fontSize: '2rem' }}></i>}
            color="#2eb85c"
            description="Total de animales registrados"
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          {/* ... Producción Hoy ... */}
          <StatCard
            title="Producción Hoy"
            value={`${Number(data.leche.litros_hoy).toFixed(1)} L`}
            icon={<CIcon icon={cilDrop} size="xl" />}
            color="#3399ff"
            description={`Promedio Semanal: ${Number(data.leche.promedio_semana).toFixed(1)} L`}
          />
        </CCol>

        {/* Nuevo Card: Top Bovine (Reemplaza o se suma a Alertas Insumos?) 
             El usuario quiere ver "cual es el bovino que mas produccion hizo".
             Lo pondremos en lugar de Insumos o agregamos una fila nueva?
             Mejor reemplazamos Insumos si no es prioritario, o lo movemos.
             Pongámoslo en el lugar de Insumos por ahora para probar, o agregamos 5ta columna?
             Bootstrap grid es de 12. 
             Vamos a mantener los 4 y cambiar Insumos por Top Bovine si el usuario está muy enfocado en leche.
             O mejor, ponemos Insumos y Potreros juntos?
             Dejemos Insumos (es importante) y Potreros (importante).
             Hagamos una nueva fila de KPIs secundarios o agregamos el Top Bovine destacado.
             
             Opción: Agregar Top Bovine como un KPI destacado adicional ancho o en el array.
             Voy a reemplazar "Alertas Insumos" momentáneamente con "Vaca Top (Mes)" a ver si le gusta, 
             o mejor, cambio el de "Ocupación Potreros" que es menos crítico en el día a día lechero.
             
             Decisión: Agregar una nueva tarjeta para Top Bovine y mover Insumos/Potreros.
             Haremos una fila de 5? No, 4 es estándar.
             Vamos a poner: Bovinos, Producción Hoy, Top Bovine, Insumos.
             Potreros lo bajamos al gráfico de estado.
         */}
        <CCol xs={12} sm={6} lg={3}>
          <StatCard
            title="Vaca Líder (Mes)"
            value={`#${data.top_bovine?.numero || 'N/A'}`}
            icon={<span className="fw-bold fs-3">🏆</span>} // Icono de trofeo o similar
            color="#f9b115"
            description={`${data.top_bovine?.total_litros || 0} Litros producidos`}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <StatCard
            title="Alertas Insumos"
            value={data.insumos.low_stock}
            icon={<CIcon icon={cilWarning} size="xl" />}
            color={Number(data.insumos.low_stock) > 0 ? '#e55353' : '#2eb85c'}
            description="Items con stock crítico"
          />
        </CCol>
      </CRow>

      {/* --- GRÁFICOS PRINCIPALES --- */}
      <CRow>
        {/* Gráfico de Tendencia de Producción (Área Grande) */}
        <CCol xs={12} lg={8}>
          <ProductionChart data={productionData} />
        </CCol>

        {/* Gráfico de Composición del Hato (Pie Chart) */}
        <CCol xs={12} lg={4}>
          <HerdCompositionChart hembras={data.bovinos.hembras} machos={data.bovinos.machos} />
        </CCol>
      </CRow>

      <CRow>
        {/* Gráfico de Estado de Potreros (Barras) */}
        <CCol xs={12}>
          <PastureStatusChart
            ocupados={data.potreros.ocupados}
            disponibles={data.potreros.disponibles}
            mantenimiento={data.potreros.mantenimiento}
          />
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
