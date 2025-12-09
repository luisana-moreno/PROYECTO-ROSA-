import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsC,
  CButtonGroup,
  CButton,
} from '@coreui/react'
import { CChartBar, CChartPie, CChartLine } from '@coreui/react-chartjs'
import { dashboardService } from 'src/api/dashboardService'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    bovinos: { total: 0, en_finca: 0, hembras: 0, machos: 0 },
    leche: { litros_hoy: 0, litros_semana: 0, promedio_semana: 0 },
    potreros: { total: 0, ocupados: 0, disponibles: 0, mantenimiento: 0 },
    insumos: { total_items: 0, low_stock: 0, near_expiry: 0 },
    produccion_historial: [],
  })

  // Estado para filtro de barras
  const [filtroBarra, setFiltroBarra] = useState('dia')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    const result = await dashboardService.getDashboardData()
    if (result) {
      setData(result)
    }
    setLoading(false)
  }

  // Procesar datos para el gráfico de historial
  const historialLabels = data.produccion_historial.map((item) => item.fecha)
  const historialData = data.produccion_historial.map((item) => Number(item.litros))

  // Configuración de datos y etiquetas según filtro
  const dataBarra = {
    dia: {
      labels: historialLabels.length > 0 ? historialLabels : ['Sin datos'],
      data: historialData.length > 0 ? historialData : [0],
      label: 'Litros (Últimos días)',
      color: '#4f5d73',
    },
    // Mock data para otros filtros por ahora, ya que el backend solo devuelve historial diario reciente
    semana: {
      labels: ['Semana Actual'],
      data: [data.leche.litros_semana],
      label: 'Litros por semana',
      color: '#39f',
    },
    mes: {
      labels: ['Mes Actual'],
      data: [Number(data.leche.litros_semana) * 4], // Estimado
      label: 'Litros por mes',
      color: '#2eb85c',
    },
    año: {
      labels: ['2025'],
      data: [Number(data.leche.litros_semana) * 52], // Estimado
      label: 'Litros por año',
      color: '#f9b115',
    },
  }

  // Datos para Gráfico de Ganado (Pastel)
  const ganadoChartData = {
    labels: ['Hembras', 'Machos'],
    datasets: [
      {
        data: [Number(data.bovinos.hembras), Number(data.bovinos.machos)],
        backgroundColor: ['#e55353', '#39f'],
      },
    ],
  }

  // Datos para Gráfico de Potreros (Pastel/Dona)
  const potrerosChartData = {
    labels: ['Ocupados', 'Disponibles', 'Mantenimiento'],
    datasets: [
      {
        data: [
          Number(data.potreros.ocupados),
          Number(data.potreros.disponibles),
          Number(data.potreros.mantenimiento),
        ],
        backgroundColor: ['#e55353', '#2eb85c', '#f9b115'],
      },
    ],
  }

  if (loading) return <div className="text-center p-5">Cargando Dashboard...</div>

  return (
    <>
      {/* --- KPIs PRINCIPALES --- */}
      <CRow className="mb-4">
        <CCol xs={12} md={3}>
          <CWidgetStatsC
            style={{ backgroundColor: '#026100' }}
            className="mb-3"
            icon={
              <span className="text-white-50">
                <i className="cil-cow" />
              </span>
            }
            value={
              <span style={{ color: '#fff' }}>
                {data.bovinos.en_finca} / {data.bovinos.total}
              </span>
            }
            title={<span style={{ color: '#fff' }}>Bovinos en Finca / Total</span>}
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CWidgetStatsC
            style={{ backgroundColor: '#207a00' }}
            className="mb-3"
            icon={
              <span className="text-white-50">
                <i className="cil-drop" />
              </span>
            }
            value={
              <span style={{ color: '#fff' }}>{Number(data.leche.litros_hoy).toFixed(1)} L</span>
            }
            title={<span style={{ color: '#fff' }}>Producción Hoy</span>}
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CWidgetStatsC
            style={{ backgroundColor: Number(data.insumos.low_stock) > 0 ? '#f9b115' : '#2eb85c' }}
            className="mb-3"
            icon={
              <span className="text-white-50">
                <i className="cil-warning" />
              </span>
            }
            value={<span style={{ color: '#fff' }}>{data.insumos.low_stock}</span>}
            title={<span style={{ color: '#fff' }}>Insumos Stock Bajo</span>}
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CWidgetStatsC
            style={{ backgroundColor: '#321fdb' }}
            className="mb-3"
            icon={
              <span className="text-white-50">
                <i className="cil-home" />
              </span>
            }
            value={
              <span
                style={{ color: '#fff' }}
              >{`${data.potreros.ocupados} / ${Number(data.potreros.total)}`}</span>
            }
            title={<span style={{ color: '#fff' }}>Potreros Ocupados</span>}
          />
        </CCol>
      </CRow>

      {/* --- GRÁFICOS --- */}
      <CRow>
        {/* Gráfico 1: Producción de Leche (Barras) */}
        <CCol md={6} xl={6}>
          <CCard className="mb-4" style={{ minHeight: 350 }}>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <span>Producción de Leche (Histórico)</span>
              {/* Botones de filtro visuales (funcionalidad limitada por API actual) */}
            </CCardHeader>
            <CCardBody style={{ height: 300 }}>
              <CChartBar
                data={{
                  labels: dataBarra.dia.labels,
                  datasets: [
                    {
                      label: 'Litros',
                      backgroundColor: '#2eb85c',
                      data: dataBarra.dia.data,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        {/* Gráfico 2: Distribución de Ganado (Dona) */}
        <CCol md={6} xl={3}>
          <CCard className="mb-4" style={{ minHeight: 350 }}>
            <CCardHeader>Composición del Hato</CCardHeader>
            <CCardBody
              className="d-flex justify-content-center align-items-center"
              style={{ height: 300 }}
            >
              <div style={{ width: '100%', height: '100%' }}>
                <CChartPie
                  data={ganadoChartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Gráfico 3: Estado de Potreros (Dona) */}
        <CCol md={6} xl={3}>
          <CCard className="mb-4" style={{ minHeight: 350 }}>
            <CCardHeader>Estado de Potreros</CCardHeader>
            <CCardBody
              className="d-flex justify-content-center align-items-center"
              style={{ height: 300 }}
            >
              <div style={{ width: '100%', height: '100%' }}>
                <CChartPie
                  data={potrerosChartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
