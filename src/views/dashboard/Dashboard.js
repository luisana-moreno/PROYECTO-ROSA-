<<<<<<< HEAD
import React, { useState } from 'react'
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CWidgetStatsC, CButtonGroup, CButton,
} from '@coreui/react'
import {
  CChartBar, CChartPie, CChartLine,
} from '@coreui/react-chartjs'

const Dashboard = () => {
  // Datos de ejemplo
  const lecheDiaria = [120, 135, 140, 130, 150, 160, 155]
  const lecheSemanal = [900, 950, 1000, 980]
  const lecheMensual = [4000, 4200, 4100, 4300, 4400, 4500]
  const lecheAnual = [50000, 52000, 51000, 53000]
  const totalBovinos = 5
  const ganadoTratamiento = 8
  const potrerosUso = 6
  const potrerosDisponibles = 4
  const ingresos = [1200, 1300, 1100, 1400, 1500, 1600, 1700, 1800, 1750, 1650, 1550, 1450, 1350, 1250, 1150, 1250, 1350, 1450, 1550, 1650, 1750, 1850, 1950, 2050, 2150, 2250, 2350, 2450, 2550, 2650]
  const egresos = [800, 900, 850, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250]

  // Estado para filtro de barras
  const [filtroBarra, setFiltroBarra] = useState('dia')

  // Configuración de datos y etiquetas según filtro
  const dataBarra = {
    dia: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      data: lecheDiaria,
      label: 'Litros por día',
      color: '#4f5d73',
    },
    semana: {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      data: lecheSemanal,
      label: 'Litros por semana',
      color: '#39f',
    },
    mes: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      data: lecheMensual,
      label: 'Litros por mes',
      color: '#2eb85c',
    },
    año: {
      labels: ['2021', '2022', '2023', '2024'],
      data: lecheAnual,
      label: 'Litros por año',
      color: '#f9b115',
    },
  }

  return (
    <>
      <CRow className="mb-4" >
        <CCol xs={12} md={4}>
          <CWidgetStatsC style={{ backgroundColor: '#026100' }}
            className="mb-3"
            icon={<span className="text-white-50"><i className="cil-cow" /></span>}

            value={<span style={{ color: '#fff' }}>{totalBovinos}</span>}
            title={<span style={{ color: '#fff' }}>Total de bovinos activos</span>}
          />
        </CCol>
        <CCol xs={12} md={4}>

          <CWidgetStatsC style={{ backgroundColor: '#207a00' }}
            className="mb-3"
            icon={<span className="text-white-50"><i className="cil-medical-cross" /></span>}

            value={<span style={{ color: '#fff' }}>{ganadoTratamiento}</span>}
            title={<span style={{ color: '#fff' }}>Ganado con tratamiento activo</span>}
          />
        </CCol>
        <CCol xs={12} md={4}>
          <CWidgetStatsC style={{ backgroundColor: '' }}
            className="mb-3"
            icon={<span className="text-white-50"><i className="cil-home" /></span>}
            color="success text-white"
            value={<span style={{ color: '#fff' }}>{`${potrerosUso} / ${potrerosUso + potrerosDisponibles}`}</span>}
            title={<span style={{ color: '#fff' }}>Potreros en uso / disponibles</span>}
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6} xl={4}>
          <CCard className="mb-4" style={{ minHeight: 350 }}>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <span>Producción de leche</span>
              <CButtonGroup>
                <CButton
                  style={{
                    backgroundColor: filtroBarra === 'dia' ? 'green' : '#e0e0e0',
                    borderColor: filtroBarra === 'dia' ? 'green' : '#ccc',
                    color: filtroBarra === 'dia' ? '#fff' : '#000',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = filtroBarra === 'dia' ? '#90ee90' : '#f0f0f0')} // Más pálido al pasar el cursor
                  onMouseLeave={(e) => (e.target.style.backgroundColor = filtroBarra === 'dia' ? 'green' : '#e0e0e0')} // Restaurar color original
                  size="sm"
                  onClick={() => setFiltroBarra('dia')}
                >
                  Día
                </CButton>
                <CButton
                  style={{
                    backgroundColor: filtroBarra === 'semana' ? 'blue' : '#e0e0e0',
                    borderColor: filtroBarra === 'semana' ? 'blue' : '#ccc',
                    color: filtroBarra === 'semana' ? '#fff' : '#000',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = filtroBarra === 'semana' ? '#add8e6' : '#f0f0f0')} // Más pálido al pasar el cursor
                  onMouseLeave={(e) => (e.target.style.backgroundColor = filtroBarra === 'semana' ? 'blue' : '#e0e0e0')} // Restaurar color original
                  size="sm"
                  onClick={() => setFiltroBarra('semana')}
                >
                  Semana
                </CButton>
                <CButton
                  style={{
                    backgroundColor: filtroBarra === 'mes' ? 'orange' : '#e0e0e0',
                    borderColor: filtroBarra === 'mes' ? 'orange' : '#ccc',
                    color: filtroBarra === 'mes' ? '#fff' : '#000',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = filtroBarra === 'mes' ? '#ffd580' : '#f0f0f0')} // Más pálido al pasar el cursor
                  onMouseLeave={(e) => (e.target.style.backgroundColor = filtroBarra === 'mes' ? 'orange' : '#e0e0e0')} // Restaurar color original
                  size="sm"
                  onClick={() => setFiltroBarra('mes')}
                >
                  Mes
                </CButton>
                <CButton
                  style={{
                    backgroundColor: filtroBarra === 'año' ? 'purple' : '#e0e0e0',
                    borderColor: filtroBarra === 'año' ? 'purple' : '#ccc',
                    color: filtroBarra === 'año' ? '#fff' : '#000',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = filtroBarra === 'año' ? '#dda0dd' : '#f0f0f0')} // Más pálido al pasar el cursor
                  onMouseLeave={(e) => (e.target.style.backgroundColor = filtroBarra === 'año' ? 'purple' : '#e0e0e0')} // Restaurar color original
                  size="sm"
                  onClick={() => setFiltroBarra('año')}
                >
                  Año
                </CButton>
              </CButtonGroup>
            </CCardHeader>
            <CCardBody style={{ height: 220 }}>
              <CChartBar
                data={{
                  labels: dataBarra[filtroBarra].labels,
                  datasets: [
                    {
                      label: dataBarra[filtroBarra].label,
                      backgroundColor: dataBarra[filtroBarra].color,
                      data: dataBarra[filtroBarra].data,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={180}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6} xl={4}>
          <CCard className="mb-4" style={{ minHeight: 350 }}>
            <CCardHeader>Producción en el mes </CCardHeader>
            <CCardBody className="d-flex justify-content-center align-items-center" style={{ height: 220 }}>
              <div style={{ width: 240, height: 240 }}>
                <CChartPie
                  data={{
                    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                    datasets: [
                      {
                        data: lecheSemanal,
                        backgroundColor: ['#39f', '#2eb85c', '#e55353', '#f9b115'],
                      },
                    ]
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                    maintainAspectRatio: false,
                  }}
                  height={180}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={12} xl={4}>
          <CCard className="mb-4" style={{ minHeight: 350 }}>
            <CCardHeader>finanzas Mensuales</CCardHeader>
            <CCardBody style={{ height: 220 }}>
              <CChartBar
                data={{
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Litros por mes',
                      backgroundColor: '#2eb85c',
                      data: lecheMensual,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={180}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6}>
          <CCard className="mb-4" style={{ minHeight: 350 }}>
            <CCardHeader>Potreros en mantenimiento</CCardHeader>
            <CCardBody className="d-flex justify-content-center align-items-center" style={{ height: 220 }}>
              {/* AQUÍ puedes modificar el tamaño cambiando width y height */}
              <div style={{ width: 240, height: 240 }}>
                <CChartPie
                  data={{
                    labels: ['2021', '2022', '2023', '2024'],
                    datasets: [
                      {
                        data: lecheAnual,
                        backgroundColor: ['#321fdb', '#f9b115', '#e55353', '#2eb85c'],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' } },
                    maintainAspectRatio: false,
                  }}
                  height={240} // <-- AQUÍ también puedes modificar el tamaño
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className="mb-4" style={{ minHeight: 350 }}>
            <CCardHeader>Ingresos vs Egresos (línea diaria/semanal/mensual)</CCardHeader>
            <CCardBody style={{ height: 220 }}>
              <CChartLine
                data={{
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Mensual',
                      backgroundColor: 'rgba(50,31,219,0.2)',
                      borderColor: '#321fdb',
                      data: lecheMensual,
                      fill: true,
                    },
                    {
                      label: 'Semanal (promedio)',
                      backgroundColor: 'rgba(46,184,92,0.2)',
                      borderColor: '#2eb85c',
                      data: lecheSemanal.concat([0, 0]),
                      fill: false,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: true } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={180}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
=======
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
>>>>>>> master
