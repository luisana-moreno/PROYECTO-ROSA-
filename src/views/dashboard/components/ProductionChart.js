import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const ProductionChart = ({ data }) => {
  return (
    <CCard className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
      <CCardHeader className="bg-transparent border-0 pt-4 px-4">
        <h5 className="mb-0">Tendencia de Producción (30 Días)</h5>
        <small className="text-medium-emphasis">Litros por día</small>
      </CCardHeader>
      <CCardBody style={{ height: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorLitros" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2eb85c" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2eb85c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="fecha"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) => [`${value} L`, 'Producción']}
              labelStyle={{ color: '#111827', fontWeight: 'bold' }}
            />
            <Area
              type="monotone"
              dataKey="litros"
              stroke="#2eb85c"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorLitros)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CCardBody>
    </CCard>
  )
}

export default ProductionChart
