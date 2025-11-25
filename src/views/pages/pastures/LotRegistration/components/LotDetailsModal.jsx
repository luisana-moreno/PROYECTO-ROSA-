"use client"

import { useEffect } from "react"
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
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CBadge,
} from "@coreui/react"
import { useState } from "react"

const LotDetailsModal = ({
  visible,
  onClose,
  lot,
  bovinesInLot,
  movementHistory,
  loading,
  onFetchBovines,
  onFetchHistory,
}) => {
  const [activeTab, setActiveTab] = useState("bovines")

  useEffect(() => {
    if (visible && lot) {
      onFetchBovines(lot.id)
      onFetchHistory(lot.id)
    }
  }, [visible, lot, onFetchBovines, onFetchHistory])

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader closeButton>
        <h5>Detalles del Lote: {lot?.nombre}</h5>
      </CModalHeader>
      <CModalBody>
        <CNav variant="tabs" className="mb-3">
          <CNavItem>
            <CNavLink active={activeTab === "bovines"} onClick={() => setActiveTab("bovines")}>
              Bovinos ({bovinesInLot.length})
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === "history"} onClick={() => setActiveTab("history")}>
              Historial de Movimientos
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          <CTabPane visible={activeTab === "bovines"}>
            {loading ? (
              <p>Cargando bovinos...</p>
            ) : bovinesInLot.length > 0 ? (
              <CTable bordered hover responsive size="sm">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Número</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {bovinesInLot.map((bovine) => (
                    <CTableRow key={bovine.id}>
                      <CTableDataCell>{bovine.numero}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="success">{bovine.estado}</CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <p className="text-muted">No hay bovinos en este lote</p>
            )}
          </CTabPane>

          <CTabPane visible={activeTab === "history"}>
            {loading ? (
              <p>Cargando historial...</p>
            ) : movementHistory.length > 0 ? (
              <CTable bordered hover responsive size="sm">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Bovino</CTableHeaderCell>
                    <CTableHeaderCell>Acción</CTableHeaderCell>
                    <CTableHeaderCell>Fecha</CTableHeaderCell>
                    <CTableHeaderCell>Potrero</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {movementHistory.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>{item.bovino}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={item.accion === "Entrada" ? "success" : "warning"}>{item.accion}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{item.fecha}</CTableDataCell>
                      <CTableDataCell>{item.potrero}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <p className="text-muted">No hay movimientos registrados</p>
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
  )
}

export default LotDetailsModal
