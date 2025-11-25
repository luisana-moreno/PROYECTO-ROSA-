"use client"
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react"

const PastureHistoryModal = ({ visible, onClose, history, pasture, loading }) => {
  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader closeButton>
        <h5>Historial de {pasture?.codigo}</h5>
      </CModalHeader>
      <CModalBody>
        {loading ? (
          <p>Cargando historial...</p>
        ) : history.length > 0 ? (
          <CTable bordered hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Lote</CTableHeaderCell>
                <CTableHeaderCell>Fecha Inicio</CTableHeaderCell>
                <CTableHeaderCell>Fecha Fin</CTableHeaderCell>
                <CTableHeaderCell>Bovinos</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {history.map((item, idx) => (
                <CTableRow key={idx}>
                  <CTableDataCell>{item.lote}</CTableDataCell>
                  <CTableDataCell>{item.fechaInicio}</CTableDataCell>
                  <CTableDataCell>{item.fechaFin || "Activo"}</CTableDataCell>
                  <CTableDataCell>{item.bovinos}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <p className="text-muted">No hay registros en el historial</p>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default PastureHistoryModal
