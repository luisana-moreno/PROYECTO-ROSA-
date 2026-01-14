import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const PastureStatusChart = ({ ocupados, disponibles, mantenimiento }) => {
  const data = [
    { name: 'Ocupados', value: Number(ocupados), color: '#e55353' },
    { name: 'Disponibles', value: Number(disponibles), color: '#2eb85c' },
    { name: 'Mantenim.', value: Number(mantenimiento), color: '#f9b115' },
  ]

  return (
    <CCard className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px', minHeight: '350px' }}>
      <CCardHeader className="bg-transparent border-0 pt-4 px-4">
        <h5 className="mb-0">Estado de Potreros</h5>
      </CCardHeader>
      <CCardBody style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CCardBody>
    </CCard>
  )
}

export default PastureStatusChart
