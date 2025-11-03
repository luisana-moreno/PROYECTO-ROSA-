import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
} from '@coreui/react'

const EditTipoMantenimientoModal = ({
  visible,
  setVisible,
  currentTipoMantenimiento,
  updateTipoMantenimiento,
}) => {
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    if (currentTipoMantenimiento) {
      setNombre(currentTipoMantenimiento.tma_nomtipm)
    }
  }, [currentTipoMantenimiento])

  const handleSave = async () => {
    try {
      await updateTipoMantenimiento(currentTipoMantenimiento.tma_idtipma, nombre)
      setVisible(false)
    } catch (error) {
      // El toast ya se maneja en useSettings
    }
  }

  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Editar Tipo de Mantenimiento</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          type="text"
          placeholder="Nombre del Tipo de Mantenimiento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditTipoMantenimientoModal
