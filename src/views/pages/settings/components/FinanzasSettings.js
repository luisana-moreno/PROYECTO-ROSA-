import React from 'react'
import { CRow, CCol } from '@coreui/react'
import GenericSettingsTable from './GenericSettingsTable'

const FinanzasSettings = ({
  tiposPago,
  createTipoPago,
  updateTipoPago,
  deleteTipoPago,
  tiposVenta,
  createTipoVenta,
  updateTipoVenta,
  deleteTipoVenta,
  estadosFactura,
  createEstadoFactura,
  updateEstadoFactura,
  deleteEstadoFactura,
}) => {
  return (
    <>
      <CRow>
        <CCol md={6}>
          <GenericSettingsTable
            title="Tipos de Pago"
            items={tiposPago}
            onCreate={createTipoPago}
            onUpdate={updateTipoPago}
            onDelete={deleteTipoPago}
            itemLabel="Tipo de Pago"
          />
        </CCol>
        <CCol md={6}>
          <GenericSettingsTable
            title="Tipos de Venta"
            items={tiposVenta}
            onCreate={createTipoVenta}
            onUpdate={updateTipoVenta}
            onDelete={deleteTipoVenta}
            itemLabel="Tipo de Venta"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6}>
          <GenericSettingsTable
            title="Estados de Factura"
            items={estadosFactura}
            onCreate={createEstadoFactura}
            onUpdate={updateEstadoFactura}
            onDelete={deleteEstadoFactura}
            itemLabel="Estado de Factura"
          />
        </CCol>
      </CRow>
    </>
  )
}

export default FinanzasSettings
