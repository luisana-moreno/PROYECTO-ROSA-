import React from 'react'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'
import { formatDateToDDMMYYYY } from 'src/utils/dateFormatter' // Importa la función de formato

const ViewEmployeeModal = ({ viewVisible, setViewVisible, currentEmployee }) => {
  return (
    <CModal
      alignment="center"
      scrollable
      visible={viewVisible}
      onClose={() => setViewVisible(false)}
      className="modern-modal"
    >
      <CModalHeader className="modern-modal-header">
        <CModalTitle className="modern-modal-title">Detalles del Empleado</CModalTitle>
      </CModalHeader>
      <CModalBody className="modern-modal-body">
        {currentEmployee ? (
          <>
            <p>
              <strong>Nombre Completo:</strong>{' '}
              {`${currentEmployee.ttr_nombrel} ${currentEmployee.ttr_nomsegu} ${currentEmployee.ttr_apellid} ${currentEmployee.ttr_apesegu}`}
            </p>
            <p>
              <strong>Primer Nombre:</strong> {currentEmployee.ttr_nombrel}
            </p>
            <p>
              <strong>Segundo Nombre:</strong> {currentEmployee.ttr_nomsegu}
            </p>
            <p>
              <strong>Primer Apellido:</strong> {currentEmployee.ttr_apellid}
            </p>
            <p>
              <strong>Segundo Apellido:</strong> {currentEmployee.ttr_apesegu}
            </p>
            <p>
              <strong>Número de Documento:</strong> {currentEmployee.ttr_documen}
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong>{' '}
              {formatDateToDDMMYYYY(currentEmployee.ttr_fecnaci)}
            </p>
            <p>
              <strong>Teléfono:</strong> {currentEmployee.ttr_telefon}
            </p>
            <p>
              <strong>Dirección:</strong> {currentEmployee.ttr_direcci}
            </p>
            <p>
              <strong>Fecha de Contrato:</strong>{' '}
              {formatDateToDDMMYYYY(currentEmployee.ttr_feccont)}
            </p>
            <p>
              <strong>Cargo:</strong> {currentEmployee.cargo_nombre}
            </p>
            <p>
              <strong>Persona de Contacto:</strong> {currentEmployee.Contact_Person}
            </p>
          </>
        ) : (
          <p>No hay detalles disponibles.</p>
        )}
      </CModalBody>
      <CModalFooter className="modern-modal-footer">
        <CButton className="button-no-hover-green text-white" onClick={() => setViewVisible(false)}>
          Cerrar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ViewEmployeeModal
