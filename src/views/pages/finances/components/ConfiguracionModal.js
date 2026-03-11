import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormLabel,
  CFormInput,
  CRow,
  CCol,
} from '@coreui/react'
import { toast } from 'react-toastify'

const ConfiguracionModal = ({ visible, onClose, config, onSave }) => {
  const [localConfig, setLocalConfig] = useState(config)

  useEffect(() => {
    setLocalConfig(config)
  }, [config, visible])

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalConfig({
      ...localConfig,
      [name]: parseFloat(value) || 0,
    })
  }

  const handleSave = () => {
    if (localConfig.tasaCambio <= 0) {
      toast.error('La tasa de cambio debe ser mayor a 0')
      return
    }
    onSave(localConfig)
    onClose()
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader onClose={onClose}>
        <CModalTitle>Configuración Financiera</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow className="mb-3">
          <CCol>
            <CFormLabel>Tasa de Cambio (Bs/$)</CFormLabel>
            <CFormInput
              type="number"
              step="0.01"
              name="tasaCambio"
              value={localConfig.tasaCambio}
              onChange={handleChange}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol>
            <CFormLabel>Precio Leche ($/Litro)</CFormLabel>
            <CFormInput
              type="number"
              step="0.01"
              name="precioLeche"
              value={localConfig.precioLeche}
              onChange={handleChange}
            />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Guardar Configuración
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ConfiguracionModal
