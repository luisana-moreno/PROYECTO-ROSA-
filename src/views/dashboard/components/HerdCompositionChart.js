import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const COLORS = ['#3399ff', '#e55353', '#f9b115', '#2eb85c']

const HerdCompositionChart = ({ hembras, machos }) => {
  const data = [
    { name: 'Hembras', value: Number(hembras) },
    { name: 'Machos', value: Number(machos) },
  ].filter((item) => item.value > 0)

  // Si no hay datos detallados, mostrar placeholder
  const displayData = data.length > 0 ? data : [{ name: 'Sin datos', value: 1 }]
  const displayColors = data.length > 0 ? COLORS : ['#e9ecef']

  return (
    <CCard className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px', minHeight: '350px' }}>
      <CCardHeader className="bg-transparent border-0 pt-4 px-4">
        <h5 className="mb-0">Composición del rebaño</h5>
      </CCardHeader>
      <CCardBody style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={displayColors[index % displayColors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value, name === 'Sin datos' ? '' : name]}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="text-center mt-n5 position-absolute top-50 start-50 translate-middle pt-4">
          <div className="text-medium-emphasis small">Total</div>
          <div className="fs-4 fw-bold">{Number(hembras) + Number(machos)}</div>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default HerdCompositionChart
