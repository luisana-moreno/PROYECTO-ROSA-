'use client'

import { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CBadge,
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash } from '@coreui/icons'
import { toast } from 'react-toastify'
import { formatDateToYYYYMMDD, formatDateToDDMMYYYY } from '../../../../utils/dateFormatter'
import CustomTableModal from '../../../../components/CustomTableModal'

const LotDetailsModal = ({
  visible,
  onClose,
  lot,
  allBovines,
  allPastures,
  activeBovinesInLot,
  bovinesInLot,
  loading,
  fetchActiveBovinesInLot,
  fetchBovinesInLot,
  addBovinesToLot,
  removeBovineFromLot,
}) => {
  const [activeTab, setActiveTab] = useState('activeBovines')
  const [selectedBovinesToAdd, setSelectedBovinesToAdd] = useState([])
  const [assignmentDate, setAssignmentDate] = useState(formatDateToYYYYMMDD(new Date()))
  const [visibleCattleSelectionModal, setVisibleCattleSelectionModal] = useState(false)
  const [selectedPastureId, setSelectedPastureId] = useState('')

  useEffect(() => {
    if (visible && lot) {
      fetchActiveBovinesInLot(lot.id)
      fetchBovinesInLot(lot.id)
      setSelectedBovinesToAdd([])
      setAssignmentDate(formatDateToYYYYMMDD(new Date()))
      setSelectedPastureId('')
    }
  }, [visible, lot, fetchActiveBovinesInLot, fetchBovinesInLot])

  const handleAddBovines = async () => {
    if (!lot) {
      toast.error('No se ha seleccionado un lote.')
      return
    }
    if (selectedBovinesToAdd.length === 0) {
      toast.warning('Debe seleccionar al menos un bovino para asignar.')
      return
    }
    if (!assignmentDate) {
      toast.warning('Debe seleccionar una fecha de inicio de asignación.')
      return
    }

    await addBovinesToLot(
      lot.id,
      selectedPastureId || null,
      selectedBovinesToAdd.map((b) => b.id),
      assignmentDate,
    )
    setSelectedBovinesToAdd([])
    setAssignmentDate(formatDateToYYYYMMDD(new Date()))
    setSelectedPastureId('')
  }

  const handleRemoveBovine = async (idBovino) => {
    if (!lot) {
      toast.error('No se ha seleccionado un lote.')
      return
    }
    if (window.confirm('¿Está seguro de desasociar este bovino del lote?')) {
      await removeBovineFromLot(lot.id, idBovino)
    }
  }

  const handleSelectBovinesFromModal = (selected) => {
    setSelectedBovinesToAdd(selected)
  }

  const cattleColumns = [
    { key: 'ttrNumerobv', label: 'Número' },
    { key: 'razaNombre', label: 'Raza' },
    { key: 'ttrPesokilo', label: 'Peso (Kg)' },
    { key: 'etapaNombre', label: 'Etapa' },
    { key: 'estadoNombre', label: 'Estado' },
  ]

  return (
    <>
      <CModal visible={visible} onClose={onClose} size="xl" backdrop="static">
        <CModalHeader closeButton>
          <CModalTitle>Detalles del Lote: {lot?.nombre}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CNav variant="tabs" className="mb-3">
            <CNavItem>
              <CNavLink
                active={activeTab === 'activeBovines'}
                onClick={() => setActiveTab('activeBovines')}
                style={{ cursor: 'pointer' }}
              >
                Bovinos Activos ({activeBovinesInLot.length})
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeTab === 'assignBovines'}
                onClick={() => setActiveTab('assignBovines')}
                style={{ cursor: 'pointer' }}
              >
                Asignar Bovinos
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeTab === 'history'}
                onClick={() => setActiveTab('history')}
                style={{ cursor: 'pointer' }}
              >
                Historial de Asignaciones ({bovinesInLot.length})
              </CNavLink>
            </CNavItem>
          </CNav>

          <CTabContent>
            {/* Pestaña: Bovinos Activos */}
            <CTabPane visible={activeTab === 'activeBovines'}>
              {loading ? (
                <p>Cargando bovinos activos...</p>
              ) : activeBovinesInLot.length > 0 ? (
                <CTable hover responsive size="sm" className="align-middle" striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Número de Bovino</CTableHeaderCell>
                      <CTableHeaderCell>Potrero Actual</CTableHeaderCell>
                      <CTableHeaderCell>Fecha Inicio</CTableHeaderCell>
                      <CTableHeaderCell>Acciones</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {activeBovinesInLot.map((bovine) => (
                      <CTableRow key={bovine.idbovino}>
                        <CTableDataCell>
                          <strong>{bovine.numerobovino}</strong>
                        </CTableDataCell>
                        <CTableDataCell>{bovine.codpotrero || 'Sin Potrero'}</CTableDataCell>
                        <CTableDataCell>{formatDateToDDMMYYYY(bovine.fechainicio)}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => handleRemoveBovine(bovine.idbovino)}
                            disabled={loading}
                          >
                            <CIcon icon={cilTrash} className="me-1" />
                            Desasociar
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p className="text-muted p-3 text-center bg-light rounded">
                  No hay bovinos activos en este lote.
                </p>
              )}
            </CTabPane>

            {/* Pestaña: Asignar Bovinos */}
            <CTabPane visible={activeTab === 'assignBovines'}>
              <div className="p-3 border rounded shadow-sm bg-light mb-3">
                <h6 className="mb-3 fw-bold">Nueva Asignación</h6>
                <CRow className="g-3 mb-3">
                  <CCol md={6}>
                    <CFormLabel htmlFor="selectBovines" className="fw-semibold">
                      Bovinos a Asignar:
                    </CFormLabel>
                    <div className="d-grid gap-2">
                      <CButton
                        color="info"
                        className="text-white"
                        onClick={() => setVisibleCattleSelectionModal(true)}
                        disabled={loading}
                      >
                        <CIcon icon={cilPlus} className="me-2" />
                        Seleccionar Bovinos ({selectedBovinesToAdd.length})
                      </CButton>
                    </div>

                    {selectedBovinesToAdd.length > 0 && (
                      <div
                        className="mt-2 p-2 bg-white border rounded"
                        style={{ maxHeight: '150px', overflowY: 'auto' }}
                      >
                        <small className="text-muted d-block mb-1">Seleccionados:</small>
                        {selectedBovinesToAdd.map((bovine) => (
                          <CBadge
                            key={bovine.id}
                            color="success"
                            shape="rounded-pill"
                            className="me-1 mb-1"
                          >
                            {bovine.ttrNumerobv}
                          </CBadge>
                        ))}
                      </div>
                    )}
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="selectPasture">Potrero (Opcional)</CFormLabel>
                    <CFormSelect
                      id="selectPasture"
                      value={selectedPastureId}
                      onChange={(e) => setSelectedPastureId(e.target.value)}
                      disabled={loading}
                      className="mb-3"
                    >
                      <option value="">Seleccione un potrero</option>
                      {allPastures.map((pasture) => (
                        <option key={pasture.id} value={pasture.id}>
                          {pasture.codigo} - {pasture.nombre}
                        </option>
                      ))}
                    </CFormSelect>

                    <CFormLabel htmlFor="assignmentDate">Fecha de Inicio</CFormLabel>
                    <CFormInput
                      id="assignmentDate"
                      type="date"
                      value={assignmentDate}
                      onChange={(e) => setAssignmentDate(e.target.value)}
                      disabled={loading}
                    />
                  </CCol>
                </CRow>
                <div className="text-end">
                  <CButton
                    color="success"
                    className="text-white"
                    onClick={handleAddBovines}
                    disabled={loading || selectedBovinesToAdd.length === 0}
                  >
                    Confirmar Asignación
                  </CButton>
                </div>
              </div>
            </CTabPane>

            {/* Pestaña: Historial de Asignaciones */}
            <CTabPane visible={activeTab === 'history'}>
              {loading ? (
                <p>Cargando historial de asignaciones...</p>
              ) : bovinesInLot.length > 0 ? (
                <CTable hover responsive size="sm" className="align-middle" striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Número de Bovino</CTableHeaderCell>
                      <CTableHeaderCell>Raza</CTableHeaderCell>
                      <CTableHeaderCell>Potrero</CTableHeaderCell>
                      <CTableHeaderCell>Fecha Inicio</CTableHeaderCell>
                      <CTableHeaderCell>Fecha Fin</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {bovinesInLot.map((item) => (
                      <CTableRow key={item.idbovlotpot}>
                        <CTableDataCell>
                          <strong>{item.numerobovino}</strong>
                        </CTableDataCell>
                        <CTableDataCell>{item.razanombre}</CTableDataCell>
                        <CTableDataCell>{item.codpotrero || 'Sin Potrero'}</CTableDataCell>
                        <CTableDataCell>{formatDateToDDMMYYYY(item.fechainicio)}</CTableDataCell>
                        <CTableDataCell>
                          {item.fechafin ? (
                            formatDateToDDMMYYYY(item.fechafin)
                          ) : (
                            <CBadge color="info">Activo</CBadge>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p className="text-muted p-3 text-center bg-light rounded">
                  No hay historial de asignaciones para este lote.
                </p>
              )}
            </CTabPane>
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CustomTableModal
        visible={visibleCattleSelectionModal}
        onClose={() => setVisibleCattleSelectionModal(false)}
        data={allBovines}
        columns={cattleColumns}
        onSelect={handleSelectBovinesFromModal}
        selectedItems={selectedBovinesToAdd}
        title="Seleccionar Bovinos"
        searchPlaceholder="Buscar bovinos..."
      />
    </>
  )
}

export default LotDetailsModal
