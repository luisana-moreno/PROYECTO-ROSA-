'use client'
import { useState } from 'react'
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
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilZoom } from '@coreui/icons'

const PastureHistoryModal = ({
  visible,
  onClose,
  history,
  pasture,
  loading,
  fetchHistoricalBovines,
}) => {
  const [bovinesModalVisible, setBovinesModalVisible] = useState(false)
  const [selectedRotationBovines, setSelectedRotationBovines] = useState([])
  const [loadingBovines, setLoadingBovines] = useState(false)

  const handleViewBovines = async (rotation) => {
    // Si la rotación tiene ID de lote, buscamos los bovinos de esa fecha
    if (!rotation.ttr_idlote && !rotation.lote_id) return

    setLoadingBovines(true)
    setBovinesModalVisible(true)
    try {
      const idLote = rotation.ttr_idlote || rotation.lote_id
      const date = rotation.date || rotation.ttr_fecha
      const bovines = await fetchHistoricalBovines(idLote, date)
      setSelectedRotationBovines(bovines)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingBovines(false)
    }
  }

  return (
    <>
      <CModal visible={visible} onClose={onClose} size="lg">
        <CModalHeader closeButton>
          <h5>Historial de {pasture?.codigo || pasture?.ttr_codpotre}</h5>
        </CModalHeader>
        <CModalBody>
          {loading ? (
            <p>Cargando historial...</p>
          ) : history.length > 0 ? (
            <CTable bordered hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                  <CTableHeaderCell>Tipo</CTableHeaderCell>
                  <CTableHeaderCell>Detalle (Lote/Actividad)</CTableHeaderCell>
                  <CTableHeaderCell>Observaciones</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {history.map((item, idx) => {
                  const date = new Date(item.date).toLocaleDateString()
                  const isRotation = item.type === 'ROTACION'
                  return (
                    <CTableRow key={idx} color={isRotation ? '' : 'light'}>
                      <CTableDataCell>{date}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={isRotation ? 'success' : 'info'}>{item.type}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        {isRotation ? (
                          <strong>Lote: {item.tma_nomlote || item.lote_nombre}</strong>
                        ) : (
                          <span>{item.tma_nomtipo || item.tipo_mantenimiento}</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.ttr_observac || item.ttr_detalles || '-'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {isRotation && (
                          <CButton
                            color="primary"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewBovines(item)}
                          >
                            <CIcon icon={cilZoom} /> Vacas
                          </CButton>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
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

      {/* Sub-modal para ver bovinos */}
      <CModal visible={bovinesModalVisible} onClose={() => setBovinesModalVisible(false)}>
        <CModalHeader closeButton>Bovinos en Lote (Histórico)</CModalHeader>
        <CModalBody>
          {loadingBovines ? (
            <div className="spinner-border text-primary" role="status"></div>
          ) : (
            <CTable small bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Número</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {selectedRotationBovines.length > 0 ? (
                  selectedRotationBovines.map((b) => (
                    <CTableRow key={b.id || b.ttr_idbovino || b.idBovino}>
                      <CTableDataCell>
                        <strong>{b.numeroBovino || b.ttr_numerobv}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell>No se encontraron bovinos</CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          )}
        </CModalBody>
      </CModal>
    </>
  )
}

export default PastureHistoryModal
