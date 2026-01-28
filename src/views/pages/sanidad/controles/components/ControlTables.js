import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CBadge,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { usePagination } from '../../../../../hooks/usePagination'
import { getColorByCode } from '../utils'

const ControlTables = ({ aplicacion, formData, controles, controlesLote }) => {
  const [modalBovinosVisible, setModalBovinosVisible] = useState(false)
  const [bovinosEnControl, setBovinosEnControl] = useState([])

  // Helper para agrupar controles de lote
  const getControlesLoteAgrupados = () => {
    if (!controlesLote || controlesLote.length === 0) return []

    const grupos = {}
    controlesLote.forEach((c) => {
      const key = `${c.ttr_fechacon}_${c.ttr_idtipcon}_${c.ttr_producto}`
      if (!grupos[key]) {
        grupos[key] = {
          ...c,
          total_animales: 0,
          lista_animales: [],
        }
      }
      grupos[key].total_animales += 1
      grupos[key].lista_animales.push(c)
    })
    return Object.values(grupos).sort((a, b) => new Date(b.ttr_fechacon) - new Date(a.ttr_fechacon))
  }

  const loteItems = getControlesLoteAgrupados()
  const pagIndividual = usePagination(controles || [], 10)
  const pagLote = usePagination(loteItems || [], 10)

  const handleVerDetalleLote = (grupo) => {
    setBovinosEnControl(grupo.lista_animales)
    setModalBovinosVisible(true)
  }

  return (
    <>
      {/* TABLA INDIVIDUAL */}
      {aplicacion === 'INDIVIDUAL' && formData.ttr_idbovino && controles.length > 0 && (
        <div className="mt-4">
          <h5>Historial de Controles (Bovino)</h5>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>Tipo</CTableHeaderCell>
                <CTableHeaderCell>Producto</CTableHeaderCell>
                <CTableHeaderCell>Resultado</CTableHeaderCell>
                <CTableHeaderCell>Próximo</CTableHeaderCell>
                <CTableHeaderCell>Detalles</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {pagIndividual.currentData.map((control) => (
                <CTableRow key={control.ttr_idcontsa}>
                  <CTableDataCell>
                    {new Date(control.ttr_fechacon).toLocaleDateString()}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={control.tipo_color}>{control.tipo_nombre}</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{control.ttr_producto || '-'}</CTableDataCell>
                  <CTableDataCell>{control.ttr_resultado || '-'}</CTableDataCell>
                  <CTableDataCell>
                    {control.ttr_proxfech
                      ? new Date(control.ttr_proxfech).toLocaleDateString()
                      : '-'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {(control.ttr_cuarto1 ||
                      control.ttr_cuarto2 ||
                      control.ttr_cuarto3 ||
                      control.ttr_cuarto4) && (
                      <small>
                        Cuartos: {control.ttr_cuarto1 && '1'} {control.ttr_cuarto2 && '2'}{' '}
                        {control.ttr_cuarto3 && '3'} {control.ttr_cuarto4 && '4'}
                      </small>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          {pagIndividual.pageCount > 1 && (
            <CPagination align="center" className="mt-3">
              <CPaginationItem
                disabled={pagIndividual.currentPage === 1}
                onClick={() => pagIndividual.goToPage(1)}
              >
                Primera
              </CPaginationItem>
              <CPaginationItem
                disabled={pagIndividual.currentPage === 1}
                onClick={() => pagIndividual.prevPage()}
              >
                Anterior
              </CPaginationItem>
              {pagIndividual.getPaginationGroup().map((item, index) => (
                <CPaginationItem
                  key={index}
                  active={pagIndividual.currentPage === item}
                  onClick={() => pagIndividual.goToPage(item)}
                >
                  {item}
                </CPaginationItem>
              ))}
              <CPaginationItem
                disabled={pagIndividual.currentPage === pagIndividual.pageCount}
                onClick={() => pagIndividual.nextPage()}
              >
                Siguiente
              </CPaginationItem>
              <CPaginationItem
                disabled={pagIndividual.currentPage === pagIndividual.pageCount}
                onClick={() => pagIndividual.goToPage(pagIndividual.pageCount)}
              >
                Última
              </CPaginationItem>
            </CPagination>
          )}
        </div>
      )}

      {/* TABLA POR LOTE */}
      {aplicacion === 'LOTE' && formData.ttr_idlote && loteItems.length > 0 && (
        <div className="mt-4">
          <h5>Historial de Controles (Lote)</h5>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>Tipo</CTableHeaderCell>
                <CTableHeaderCell>Producto</CTableHeaderCell>
                <CTableHeaderCell>Detalles</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {pagLote.currentData.map((grupo, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    {new Date(grupo.ttr_fechacon).toLocaleDateString()}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={grupo.tipo_color}>{grupo.tipo_nombre}</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{grupo.ttr_producto || '-'}</CTableDataCell>
                  <CTableDataCell>Aplicado a {grupo.total_animales} bovinos</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVerDetalleLote(grupo)}
                    >
                      Ver Bovinos
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          {pagLote.pageCount > 1 && (
            <CPagination align="center" className="mt-3">
              <CPaginationItem
                disabled={pagLote.currentPage === 1}
                onClick={() => pagLote.goToPage(1)}
              >
                Primera
              </CPaginationItem>
              <CPaginationItem
                disabled={pagLote.currentPage === 1}
                onClick={() => pagLote.prevPage()}
              >
                Anterior
              </CPaginationItem>
              {pagLote.getPaginationGroup().map((item, index) => (
                <CPaginationItem
                  key={index}
                  active={pagLote.currentPage === item}
                  onClick={() => pagLote.goToPage(item)}
                >
                  {item}
                </CPaginationItem>
              ))}
              <CPaginationItem
                disabled={pagLote.currentPage === pagLote.pageCount}
                onClick={() => pagLote.nextPage()}
              >
                Siguiente
              </CPaginationItem>
              <CPaginationItem
                disabled={pagLote.currentPage === pagLote.pageCount}
                onClick={() => pagLote.goToPage(pagLote.pageCount)}
              >
                Última
              </CPaginationItem>
            </CPagination>
          )}
        </div>
      )}

      {/* MODAL DETALLES LOTE */}
      <CModal visible={modalBovinosVisible} onClose={() => setModalBovinosVisible(false)}>
        <CModalHeader>
          <CModalTitle>Detalle de Aplicación en Lote</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {bovinosEnControl.length > 0 ? (
            <CTable small hover bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Bovino</CTableHeaderCell>
                  <CTableHeaderCell>Resultado</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {bovinosEnControl.map((c) => (
                  <CTableRow key={c.ttr_idcontsa}>
                    <CTableDataCell>
                      {c.numero_bovino ? `N°- ${c.numero_bovino}` : `ID: ${c.ttr_idbovino}`}
                    </CTableDataCell>
                    <CTableDataCell>{c.ttr_resultado}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          ) : (
            <p className="text-center text-muted">No se encontraron detalles de bovinos.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalBovinosVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ControlTables
