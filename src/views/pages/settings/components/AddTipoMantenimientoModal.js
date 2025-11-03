import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
} from '@coreui/react'

const AddTipoMantenimientoModal = ({ visible, setVisible, createTipoMantenimiento }) => {
  const [nombre, setNombre] = useState('')

  const handleAdd = async () => {
    try {
      await createTipoMantenimiento(nombre)
      setNombre('')
      setVisible(false)
    } catch (error) {
      // El toast ya se maneja en useSettings
    }
  }

  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Agregar Tipo de Mantenimiento</CModalTitle>
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
        <CButton color="primary" onClick={handleAdd}>
          Agregar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default AddTipoMantenimientoModal
