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

const EditEstadoPotreroModal = ({
  visible,
  setVisible,
  currentEstadoPotrero,
  updateEstadoPotrero,
}) => {
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    if (currentEstadoPotrero) {
      setNombre(currentEstadoPotrero.tma_nomestp)
    }
  }, [currentEstadoPotrero])

  const handleSave = async () => {
    try {
      await updateEstadoPotrero(currentEstadoPotrero.tma_idestpo, nombre)
      setVisible(false)
    } catch (error) {
      // El toast ya se maneja en useSettings
    }
  }

  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={() => setVisible(false)}
      backdrop="static"
    >
      <CModalHeader>
        <CModalTitle>Editar Estado de Potrero</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          type="text"
          placeholder="Nombre del Estado"
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

export default EditEstadoPotreroModal
