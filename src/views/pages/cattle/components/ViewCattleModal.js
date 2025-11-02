import React from 'react'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'

const ViewCattleModal = ({ viewVisible, setViewVisible, currentCattle }) => {
  return (
    <CModal
      alignment="center"
      scrollable
      visible={viewVisible}
      onClose={() => setViewVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Detalles del Bovino</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {currentCattle ? (
          <>
            <p>
              <strong>Número de Arete:</strong> {currentCattle.ttr_numerobv}
            </p>
            <p>
              <strong>Raza:</strong> {currentCattle.raza_nombre}
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong> {currentCattle.ttr_fecnacim}
            </p>
            <p>
              <strong>Color:</strong> {currentCattle.color_nombre}
            </p>
            <p>
              <strong>Peso:</strong> {currentCattle.ttr_pesokilo}
            </p>
            <p>
              <strong>Etapa:</strong> {currentCattle.etapa_nombre}
            </p>
            <p>
              <strong>Estado:</strong> {currentCattle.estado_nombre}
            </p>
          </>
        ) : (
          <p>No hay detalles disponibles.</p>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={() => setViewVisible(false)}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ViewCattleModal
