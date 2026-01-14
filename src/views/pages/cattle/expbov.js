import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
} from '@coreui/react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { toast } from 'react-toastify'
import { cattleService } from '../../../api/cattleService'
import * as sanidadService from '../../../api/sanidadService' // Usar servicio unificado
import { prodlecheService } from '../../../api/prodlecheService'
import { lotService } from '../../../api/lotService'
import { getIconByCode, getColorByCode } from '../sanidad/controles/utils' // Reutilizar utils si es posible, o duplicar lógica simple

const ExpBovModal = ({ expBovVisible, setExpBovVisible, currentCattle }) => {
  const [sanitaryControls, setSanitaryControls] = useState([])
  const [milkProduction, setMilkProduction] = useState([])
  const [lotPastureHistory, setLotPastureHistory] = useState([])

  useEffect(() => {
    const loadCattleDetails = async () => {
      if (expBovVisible && currentCattle && currentCattle.id) {
        try {
          const [controls, production, history] = await Promise.all([
            sanidadService.getControlesSanitariosByBovino(currentCattle.id),
            prodlecheService.getMilkProductionByBovinoId(currentCattle.id),
            lotService.getLotPastureHistoryByBovinoId(currentCattle.id),
          ])

          setSanitaryControls(controls || [])
          setMilkProduction(production)
          setLotPastureHistory(history)
        } catch (error) {
          console.error('Error al cargar expediente:', error)
          toast.error('Error al cargar detalles del bovino.')
          setSanitaryControls([])
          setMilkProduction([])
          setLotPastureHistory([])
        }
      } else if (!expBovVisible) {
        setSanitaryControls([])
        setMilkProduction([])
        setLotPastureHistory([])
      }
    }
    loadCattleDetails()
  }, [expBovVisible, currentCattle])

  const handleExportPdf = async () => {
    if (!currentCattle || !currentCattle.id) {
      toast.error('Seleccione un bovino.')
      return
    }
    try {
      toast.info('Generando PDF...')
      // Nota: El backend de exportPDF debe actualizarse también para consultar la nueva tabla si quiere incluir estos datos.
      // Por ahora mantenemos la llamada existente.
      const response = await cattleService.exportCattleExpedientPdf(currentCattle.id)
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `expediente-${currentCattle.ttrNumerobv}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('PDF descargado.')
    } catch (error) {
      console.error('Error PDF:', error)
      toast.error('Error al generar PDF.')
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={expBovVisible}
      onClose={() => setExpBovVisible(false)}
      size="xl"
    >
      <CModalHeader>
        <CModalTitle>Expediente Bovino: {currentCattle?.ttrNumerobv}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {currentCattle ? (
          <div>
            <CRow className="mb-4">
              <CCol md={3}>
                <strong>Raza:</strong> {currentCattle.razaNombre}
              </CCol>
              <CCol md={3}>
                <strong>Color:</strong> {currentCattle.colorNombre}
              </CCol>
              <CCol md={3}>
                <strong>Sexo:</strong> {currentCattle.tmaNomsexo}
              </CCol>
              <CCol md={3}>
                <strong>Peso:</strong> {currentCattle.ttrPesokilo} kg
              </CCol>
            </CRow>
            <CRow className="mb-4">
              <CCol md={3}>
                <strong>Nacimiento:</strong>{' '}
                {moment(currentCattle.ttrFecnacim).format('DD/MM/YYYY')}
              </CCol>
              <CCol md={3}>
                <strong>Etapa:</strong> {currentCattle.etapaNombre}
              </CCol>
              <CCol md={3}>
                <strong>Estado:</strong>{' '}
                <CBadge color={currentCattle.ttrIdestadob === 1 ? 'success' : 'danger'}>
                  {currentCattle.estadoNombre}
                </CBadge>
              </CCol>
            </CRow>

            <div className="section mt-4">
              <h5 className="border-bottom pb-2">
                Historial Sanitario (Vacunas, Tratamientos, Chequeos)
              </h5>
              {sanitaryControls.length > 0 ? (
                <CTable hover responsive small striped>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Fecha</CTableHeaderCell>
                      <CTableHeaderCell>Tipo</CTableHeaderCell>
                      <CTableHeaderCell>Producto / Detalle</CTableHeaderCell>
                      <CTableHeaderCell>Dosis / Vía</CTableHeaderCell>
                      <CTableHeaderCell>Resultado</CTableHeaderCell>
                      <CTableHeaderCell>Próxima Fecha</CTableHeaderCell>
                      <CTableHeaderCell>Responsable</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {sanitaryControls.map((control, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          {moment(control.ttr_fechacon).format('DD/MM/YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>
                          <strong>{control.tipo_nombre}</strong>
                        </CTableDataCell>
                        <CTableDataCell>
                          {control.ttr_producto || control.ttr_observa || '-'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {control.ttr_dosis
                            ? `${control.ttr_dosis} (${control.ttr_viaadmin})`
                            : '-'}
                        </CTableDataCell>
                        <CTableDataCell>{control.ttr_resultado || '-'}</CTableDataCell>
                        <CTableDataCell>
                          {control.ttr_proxfech
                            ? moment(control.ttr_proxfech).format('DD/MM/YYYY')
                            : '-'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {control.empleado_nombre
                            ? `${control.empleado_nombre} ${control.empleado_apellido}`
                            : '-'}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p className="text-muted">No hay registros sanitarios.</p>
              )}
            </div>

            <div className="section mt-4">
              <h5 className="border-bottom pb-2">Producción de Leche (Últimos Registros)</h5>
              {milkProduction.length > 0 ? (
                <CTable hover responsive small>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Fecha</CTableHeaderCell>
                      <CTableHeaderCell>Litros</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {milkProduction.slice(0, 10).map((record, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          {moment(record.ttrFechapro).format('DD/MM/YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>{record.ttrLitsprd} L</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p className="text-muted">No hay registros de leche.</p>
              )}
            </div>

            <div className="section mt-4">
              <h5 className="border-bottom pb-2">Historial de Ubicación</h5>
              {lotPastureHistory.length > 0 ? (
                <CTable hover responsive small>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Lote</CTableHeaderCell>
                      <CTableHeaderCell>Potrero</CTableHeaderCell>
                      <CTableHeaderCell>Desde</CTableHeaderCell>
                      <CTableHeaderCell>Hasta</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {lotPastureHistory.slice(0, 5).map((history, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{history.tmaNomlote}</CTableDataCell>
                        <CTableDataCell>{history.ttrCodpotre}</CTableDataCell>
                        <CTableDataCell>
                          {moment(history.ttrFechaini).format('DD/MM/YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>
                          {history.ttrFechafin ? (
                            moment(history.ttrFechafin).format('DD/MM/YYYY')
                          ) : (
                            <CBadge color="success">Actual</CBadge>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p className="text-muted">No hay historial de ubicación.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Seleccione un bovino.</p>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setExpBovVisible(false)}>
          Cerrar
        </CButton>
        <CButton color="primary" onClick={handleExportPdf}>
          Exportar PDF
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ExpBovModal.propTypes = {
  expBovVisible: PropTypes.bool.isRequired,
  setExpBovVisible: PropTypes.func.isRequired,
  currentCattle: PropTypes.object,
}

export default ExpBovModal
