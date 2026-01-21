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
    bovinos: {
      total: 0,
      en_finca: 0,
      hembras: 0,
      machos: 0,
      terneros: 0,
      novillas: 0,
      vacas: 0,
      toros: 0,
    },
    leche: { litros_hoy: 0, litros_semana: 0, litros_semana_anterior: 0, promedio_semana: 0 },
    potreros: { total: 0, ocupados: 0, disponibles: 0, mantenimiento: 0, porcentaje_ocupacion: 0 },
    insumos: { total_items: 0, low_stock: 0, near_expiry: 0 },
    vacunacion: { total_proximas: 0, proximas_semana: 0, vencidas: 0 },
    prenez: { total_prenadas: 0, partos_proximos: 0, partos_semana: 0 },
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

  console.log(data)

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
      <CRow className="mb-4">
        <CCol xs={12} sm={6} lg={3}>
          {/* Bovinos Totales con desglose */}
          <StatCard
            title="Bovinos Activos / Totales"
            value={`${data.bovinos.en_finca} / ${data.bovinos.total}`}
            icon={<i className="cil-cow" style={{ fontSize: '2rem' }}></i>}
            color="#2eb85c"
            description={`♀ ${data.bovinos.hembras} | ♂ ${data.bovinos.machos}`}
          />
        </CCol>

        <CCol xs={12} sm={6} lg={3}>
          {/* Leche Esta Semana con tendencia */}
          <StatCard
            title="Leche Esta Semana"
            value={`${Number(data.leche.litros_semana).toFixed(0)} L`}
            icon={<CIcon icon={cilDrop} size="xl" />}
            color="#3399ff"
            description={
              data.leche.litros_semana_anterior > 0
                ? data.leche.litros_semana > data.leche.litros_semana_anterior
                  ? `↑ +${(((data.leche.litros_semana - data.leche.litros_semana_anterior) / data.leche.litros_semana_anterior) * 100).toFixed(1)}%`
                  : `↓ ${(((data.leche.litros_semana - data.leche.litros_semana_anterior) / data.leche.litros_semana_anterior) * 100).toFixed(1)}%`
                : `Hoy: ${Number(data.leche.litros_hoy).toFixed(1)} L`
            }
          />
        </CCol>

        <CCol xs={12} sm={6} lg={3}>
          {/* Potreros en Uso */}
          <StatCard
            title="Potreros en Uso"
            value={`${data.potreros.ocupados}/${data.potreros.total}`}
            icon={<CIcon icon={cilHome} size="xl" />}
            color="#f9b115"
            description={`${data.potreros.porcentaje_ocupacion || 0}% ocupación`}
          />
        </CCol>

        <CCol xs={12} sm={6} lg={3}>
          {/* Vacunas Pendientes */}
          <StatCard
            title="Vacunas Pendientes"
            value={data.vacunacion.total_proximas}
            icon={<CIcon icon={cilWarning} size="xl" />}
            color={data.vacunacion.vencidas > 0 ? '#e55353' : '#3399ff'}
            description={
              data.vacunacion.vencidas > 0
                ? `⚠️ ${data.vacunacion.vencidas} vencidas`
                : `${data.vacunacion.proximas_semana} esta semana`
            }
          />
        </CCol>
      </CRow>

      {/* --- KPIs SECUNDARIOS --- */}
      <CRow className="mb-4">
        <CCol xs={12} sm={6} lg={6}>
          {/* Vacas Preñadas */}
          <StatCard
            title="Vacas Preñadas"
            value={data.prenez.total_prenadas}
            icon={<i className="cil-heart" style={{ fontSize: '2rem' }}></i>}
            color="#e55353"
            description={`${data.prenez.partos_proximos} partos próximos (30d)`}
          />
        </CCol>

        <CCol xs={12} sm={6} lg={6}>
          {/* Bovino Top del Mes */}
          <StatCard
            title="Top Productor (Mes)"
            value={data.top_bovine.numero}
            icon={<i className="cil-star" style={{ fontSize: '2rem' }}></i>}
            color="#f9b115"
            description={`${Number(data.top_bovine.total_litros || 0).toFixed(1)} L totales`}
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
