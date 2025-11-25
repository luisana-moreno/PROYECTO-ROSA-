import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { toast } from 'react-toastify'
import { exportCattleExpedientPdf } from '../../../../api/cattleService' // Asegúrate de que esta ruta sea correcta

const ExpBovModal = ({ expBovVisible, setExpBovVisible, currentCattle }) => {
  const handleExportPdf = async () => {
    if (!currentCattle || !currentCattle.TTR_IDBOVINO) {
      toast.error('No se ha seleccionado ningún bovino para exportar.')
      return
    }
    try {
      toast.info('Generando PDF, por favor espere...')
      const response = await exportCattleExpedientPdf(currentCattle.TTR_IDBOVINO)
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `expediente-bovino-${currentCattle.TTR_NUMEROBV}.pdf`)
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
        <CModalTitle>Expediente del Bovino: {currentCattle?.TTR_NUMEROBV}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {currentCattle ? (
          <div>
            <CRow className="mb-3">
              <CCol md={6}>
                <strong>Raza:</strong> {currentCattle.raza_nombre}
              </CCol>
              <CCol md={6}>
                <strong>Color:</strong> {currentCattle.color_nombre}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <strong>Fecha de Nacimiento:</strong>{' '}
                {moment(currentCattle.TTR_FECNACIM).format('DD/MM/YYYY')}
              </CCol>
              <CCol md={6}>
                <strong>Peso:</strong> {currentCattle.TTR_PESOKILO} kg
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <strong>Etapa:</strong> {currentCattle.etapa_nombre}
              </CCol>
              <CCol md={6}>
                <strong>Estado:</strong> {currentCattle.estado_nombre}
              </CCol>
            </CRow>
            {/* Aquí podrías añadir más detalles si currentCattle ya viene con ellos */}
            {/* Por ahora, el detalle completo viene del PDF, esto es solo un resumen */}
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
