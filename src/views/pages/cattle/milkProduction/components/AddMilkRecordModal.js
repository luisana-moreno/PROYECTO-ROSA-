'use client'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CFormLabel,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CCard,
  CCardBody,
  CBadge,
} from '@coreui/react'

export const AddMilkRecordModal = ({
  visible,
  setVisible,
  lots,
  selectedLotId,
  setSelectedLotId,
  productionDate,
  setProductionDate,
  bovinesInSelectedLot,
  individualBovineProduction,
  setIndividualBovineProduction,
  handleAddRecord,
  isLoading, // Recibir isLoading como prop
}) => {
  const handleIndividualLitersChange = (bovineId, liters) => {
    setIndividualBovineProduction((prev) => ({
      ...prev,
      [bovineId]: liters,
    }))
  }

  const today = new Date().toISOString().split('T')[0]

  const totalLiters = Object.values(individualBovineProduction).reduce((sum, val) => {
    return sum + (Number.parseFloat(val) || 0)
  }, 0)

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => setVisible(false)}
      size="lg"
    >
      <CModalHeader closeButton>
        <CModalTitle>Registrar Producción de Leche por Lote</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="g-3 mb-4">
          <CCol md={6}>
            <CFormLabel htmlFor="selectLot" className="fw-bold">
              Seleccionar Lote
            </CFormLabel>
            <CFormSelect
              id="selectLot"
              value={selectedLotId}
              onChange={(e) => setSelectedLotId(e.target.value)}
            >
              <option value="">Seleccione un lote</option>
              {lots.map((lot) => (
                <option key={lot.id} value={lot.id}>
                  {lot.nombre}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="productionDate" className="fw-bold">
              Fecha de Producción
            </CFormLabel>
            <CFormInput
              id="productionDate"
              type="date"
              value={productionDate}
              onChange={(e) => setProductionDate(e.target.value)}
              max={today}
            />
          </CCol>
        </CRow>

        {selectedLotId && bovinesInSelectedLot.length > 0 && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Producción Individual por Bovino</h6>
              <CBadge color="primary">Total: {totalLiters.toFixed(2)} L</CBadge>
            </div>

            <div
              style={{
                maxHeight: '400px',
                overflowY: 'auto',
                overflowX: 'hidden',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
              }}
            >
              <CTable hover responsive className="mb-0">
                <CTableHead position="sticky" style={{ top: 0 }}>
                  <CTableRow color="light">
                    <CTableHeaderCell scope="col" style={{ width: '15%' }}>
                      Nº Bovino
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: '25%' }}>
                      Raza
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: '30%' }}>
                      Producción (Litros)
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ width: '15%', textAlign: 'center' }}>
                      Acción
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {bovinesInSelectedLot.map((bovine) => (
                    <CTableRow key={bovine.idBovino} className="align-middle">
                      <CTableDataCell>
                        <strong>{bovine.numeroBovino}</strong>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="info">{bovine.razaNombre}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          placeholder="0.00"
                          step="0.1"
                          min="0"
                          value={individualBovineProduction[bovine.idBovino] || ''}
                          onChange={(e) =>
                            handleIndividualLitersChange(bovine.idBovino, e.target.value)
                          }
                          style={{ maxWidth: '120px' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {individualBovineProduction[bovine.idBovino] && (
                          <CBadge color="success">
                            {individualBovineProduction[bovine.idBovino]} L
                          </CBadge>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </div>
        )}

        {selectedLotId && bovinesInSelectedLot.length === 0 && (
          <CCard className="border-warning">
            <CCardBody>
              <p className="text-warning mb-0">No hay bovinos activos en este lote.</p>
            </CCardBody>
          </CCard>
        )}

        {!selectedLotId && (
          <CCard className="border-info">
            <CCardBody>
              <p className="text-info mb-0">Seleccione un lote para ver los bovinos activos.</p>
            </CCardBody>
          </CCard>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancelar
        </CButton>
        <CButton
          color="success"
          onClick={handleAddRecord}
          disabled={
            !selectedLotId || bovinesInSelectedLot.length === 0 || totalLiters === 0 || isLoading
          } // Deshabilitar si está cargando
        >
          {isLoading ? 'Agregando...' : `Agregar Producción (${totalLiters.toFixed(2)} L)`}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
