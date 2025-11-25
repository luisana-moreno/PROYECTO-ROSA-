'use client'

import { useEffect, useState, useCallback } from 'react'
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
import { cilPlus, cilX, cilTrash } from '@coreui/icons'
import { toast } from 'react-toastify'
import { formatDateToYYYYMMDD, formatDateToDDMMYYYY } from '../../../../utils/dateFormatter' // Importar funciones específicas
import CustomTableModal from '../../../../components/CustomTableModal' // Importar CustomTableModal

const LotDetailsModal = ({
  visible,
  onClose,
  lot,
  allBovines,
  allPastures,
  activeBovinesInLot, // Bovinos activos actualmente en este lote
  bovinesInLot, // Historial de asignaciones de bovinos al lote (incluye finalizados)
  loading,
  fetchActiveBovinesInLot,
  fetchBovinesInLot, // Renombrado para historial
  addBovinesToLot,
  removeBovineFromLot,
}) => {
  const [activeTab, setActiveTab] = useState('activeBovines')
  const [selectedBovinesToAdd, setSelectedBovinesToAdd] = useState([])
  const [assignmentDate, setAssignmentDate] = useState(formatDateToYYYYMMDD(new Date())) // Usar formatDateToYYYYMMDD
  const [visibleCattleSelectionModal, setVisibleCattleSelectionModal] = useState(false) // Nuevo estado para el modal de selección de bovinos

  useEffect(() => {
    if (visible && lot) {
      fetchActiveBovinesInLot(lot.id) // Usar lot.id que ya está mapeado
      fetchBovinesInLot(lot.id) // Cargar historial completo de asignaciones
      setSelectedBovinesToAdd([])
      setAssignmentDate(formatDateToYYYYMMDD(new Date())) // Usar formatDateToYYYYMMDD
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
      lot.id, // Usar lot.id
      null, // No se selecciona potrero desde este modal, enviar null
      selectedBovinesToAdd.map((b) => b.id), // Obtener solo los IDs de los objetos seleccionados
      assignmentDate,
    )
    setSelectedBovinesToAdd([])
    setAssignmentDate(formatDateToYYYYMMDD(new Date())) // Usar formatDateToYYYYMMDD
  }

  const handleRemoveBovine = async (idBovino) => {
    if (!lot) {
      toast.error('No se ha seleccionado un lote.')
      return
    }
    if (window.confirm('¿Está seguro de desasociar este bovino del lote?')) {
      await removeBovineFromLot(lot.idlote, idBovino)
    }
  }

  const handleSelectBovinesFromModal = (selected) => {
    setSelectedBovinesToAdd(selected)
  }

  // Columnas para CustomTableModal de bovinos
  const cattleColumns = [
    { key: 'numerobv', label: 'Número' },
    { key: 'razanombre', label: 'Raza' },
    { key: 'pesokilo', label: 'Peso (Kg)' },
    { key: 'etapanombre', label: 'Etapa' },
    { key: 'estadonombre', label: 'Estado' },
  ]

  // Opciones de potrero (removidas)

  return (
    <>
      <CModal visible={visible} onClose={onClose} size="xl">
        <CModalHeader closeButton>
          <CModalTitle>Detalles del Lote: {lot?.nombre}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CNav variant="tabs" className="mb-3">
            <CNavItem>
              <CNavLink
                active={activeTab === 'activeBovines'}
                onClick={() => setActiveTab('activeBovines')}
              >
                Bovinos Activos ({activeBovinesInLot.length})
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeTab === 'assignBovines'}
                onClick={() => setActiveTab('assignBovines')}
              >
                Asignar Bovinos
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
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
                <CTable bordered hover responsive size="sm">
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
                        <CTableDataCell>{bovine.numerobovino}</CTableDataCell>
                        <CTableDataCell>{bovine.codpotrero}</CTableDataCell>
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
                <p className="text-muted">No hay bovinos activos en este lote.</p>
              )}
            </CTabPane>

            {/* Pestaña: Asignar Bovinos */}
            <CTabPane visible={activeTab === 'assignBovines'}>
              <CRow className="g-3 mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="selectBovines">Bovinos Seleccionados:</CFormLabel>
                  <CButton
                    color="info"
                    size="sm"
                    onClick={() => setVisibleCattleSelectionModal(true)}
                    disabled={loading}
                  >
                    Seleccionar Bovinos ({selectedBovinesToAdd.length})
                  </CButton>
                  <ul className="list-unstyled mt-2">
                    {selectedBovinesToAdd.map((bovine) => (
                      <li key={bovine.id}>{`Bovino ${bovine.numerobv}`}</li>
                    ))}
                  </ul>
                </CCol>
                <CCol md={6}>
                  {' '}
                  {/* Cambiado a md={6} ya que se eliminó la columna del potrero */}
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
              <CButton
                className="button-no-hover-green text-white"
                onClick={handleAddBovines}
                disabled={loading || selectedBovinesToAdd.length === 0}
              >
                <CIcon icon={cilPlus} className="me-2" />
                {loading ? 'Asignando...' : 'Asignar Bovinos al Lote'}
              </CButton>
            </CTabPane>

            {/* Pestaña: Historial de Asignaciones */}
            <CTabPane visible={activeTab === 'history'}>
              {loading ? (
                <p>Cargando historial de asignaciones...</p>
              ) : bovinesInLot.length > 0 ? (
                <CTable bordered hover responsive size="sm">
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
                        <CTableDataCell>{item.numerobovino}</CTableDataCell>
                        <CTableDataCell>{item.razanombre}</CTableDataCell>
                        <CTableDataCell>{item.codpotrero}</CTableDataCell>
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
                <p className="text-muted">No hay historial de asignaciones para este lote.</p>
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
