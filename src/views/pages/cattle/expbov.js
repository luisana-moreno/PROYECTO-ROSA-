import React, { useState, useEffect } from 'react' // Importar useState y useEffect
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
} from '@coreui/react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { toast } from 'react-toastify'
import { cattleService } from '../../../../api/cattleService'
import { regmedicosService } from '../../../../api/regmedicosService' // Importar servicio de registros médicos
import { prodlecheService } from '../../../../api/prodlecheService' // Importar servicio de producción de leche
import { lotService } from '../../../../api/lotService' // Importar servicio de lotes/potreros

const ExpBovModal = ({ expBovVisible, setExpBovVisible, currentCattle }) => {
  const [medicalRecords, setMedicalRecords] = useState([])
  const [milkProduction, setMilkProduction] = useState([])
  const [lotPastureHistory, setLotPastureHistory] = useState([])

  useEffect(() => {
    const loadCattleDetails = async () => {
      if (expBovVisible && currentCattle && currentCattle.id) {
        console.log('ExpBovModal: currentCattle:', currentCattle)
        try {
          const [records, production, history] = await Promise.all([
            regmedicosService.getRegistrosMedicosByBovinoId(currentCattle.id),
            prodlecheService.getMilkProductionByBovinoId(currentCattle.id),
            lotService.getLotPastureHistoryByBovinoId(currentCattle.id),
          ])
          setMedicalRecords(records)
          setMilkProduction(production)
          setLotPastureHistory(history)
        } catch (error) {
          console.error('Error al cargar detalles del bovino para el expediente:', error)
          toast.error('Error al cargar detalles del bovino.')
          setMedicalRecords([])
          setMilkProduction([])
          setLotPastureHistory([])
        }
      } else if (!expBovVisible) {
        // Limpiar datos cuando el modal se cierra
        setMedicalRecords([])
        setMilkProduction([])
        setLotPastureHistory([])
      }
    }
    loadCattleDetails()
  }, [expBovVisible, currentCattle])

  const handleExportPdf = async () => {
    if (!currentCattle || !currentCattle.id) {
      toast.error('No se ha seleccionado ningún bovino para exportar.')
      return
    }
    try {
      toast.info('Generando PDF, por favor espere...')
      const response = await cattleService.exportCattleExpedientPdf(currentCattle.id)
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `expediente-bovino-${currentCattle.ttrNumerobv || currentCattle.id}.pdf`,
      )
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('PDF generado y descargado exitosamente.')
      setExpBovVisible(false)
    } catch (error) {
      console.error('Error al exportar PDF:', error)
      toast.error('Error al generar el PDF del expediente.')
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      visible={expBovVisible}
      onClose={() => setExpBovVisible(false)}
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Expediente del Bovino: {currentCattle?.ttrNumerobv}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {currentCattle ? (
          <div>
            <CRow className="mb-3">
              <CCol md={6}>
                <strong>Raza:</strong> {currentCattle.razaNombre}
              </CCol>
              <CCol md={6}>
                <strong>Color:</strong> {currentCattle.colorNombre}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <strong>Fecha de Nacimiento:</strong>{' '}
                {moment(currentCattle.ttrFecnacim).format('DD/MM/YYYY')}
              </CCol>
              <CCol md={6}>
                <strong>Peso:</strong> {currentCattle.ttrPesokilo} kg
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <strong>Etapa:</strong> {currentCattle.etapaNombre}
              </CCol>
              <CCol md={6}>
                <strong>Estado:</strong> {currentCattle.estadoNombre}
              </CCol>
            </CRow>

            <div className="section mt-4">
              <h4>Registros Médicos</h4>
              {medicalRecords.length > 0 ? (
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Fecha Registro</CTableHeaderCell>
                      <CTableHeaderCell>Diagnóstico</CTableHeaderCell>
                      <CTableHeaderCell>Tratamiento</CTableHeaderCell>
                      <CTableHeaderCell>Vacuna</CTableHeaderCell>
                      <CTableHeaderCell>Empleado</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {medicalRecords.map((record, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          {moment(record.ttrFechareg).format('DD/MM/YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>{record.ttrDiagnost}</CTableDataCell>
                        <CTableDataCell>{record.tmaNomtrat}</CTableDataCell>
                        <CTableDataCell>{record.tmaNomtipv}</CTableDataCell>
                        <CTableDataCell>{`${record.employeeName} ${record.employeeLastName}`}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p>No hay registros médicos.</p>
              )}
            </div>

            <div className="section mt-4">
              <h4>Producción de Leche</h4>
              {milkProduction.length > 0 ? (
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Fecha Producción</CTableHeaderCell>
                      <CTableHeaderCell>Litros Producidos</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {milkProduction.map((record, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>
                          {moment(record.ttrFechapro).format('DD/MM/YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>{record.ttrLitsprd}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p>No hay registros de producción de leche.</p>
              )}
            </div>

            <div className="section mt-4">
              <h4>Historial de Lotes y Potreros (Últimos 5)</h4>
              {lotPastureHistory.length > 0 ? (
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Lote</CTableHeaderCell>
                      <CTableHeaderCell>Potrero</CTableHeaderCell>
                      <CTableHeaderCell>Fecha Inicio</CTableHeaderCell>
                      <CTableHeaderCell>Fecha Fin</CTableHeaderCell>
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
                          {history.ttrFechafin
                            ? moment(history.ttrFechafin).format('DD/MM/YYYY')
                            : 'Activo'}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p>No hay historial de lotes y potreros.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Seleccione un bovino para ver su expediente.</p>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setExpBovVisible(false)}>
          Cerrar
        </CButton>
        <CButton
          color="primary"
          className="button-no-hover-green text-white"
          onClick={handleExportPdf}
        >
          Exportar a PDF
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
