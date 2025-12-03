import React from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CFormLabel,
} from '@coreui/react'

export const EditMilkRecordModal = ({
  editVisible,
  setEditVisible,
  currentRecord,
  setCurrentRecord,
  handleEditRecord,
}) => {
  return (
    <CModal
      alignment="center"
      scrollable
      visible={editVisible}
      onClose={() => setEditVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Editar Registro de Producción Individual</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {currentRecord && (
          <>
            <CFormLabel>Bovino ID: {currentRecord.ttr_idbovlec}</CFormLabel>
            <CFormLabel>Número de Bovino: {currentRecord.bovino_numero}</CFormLabel>
            <CFormLabel>Lote: {currentRecord.nombre_lote}</CFormLabel>
            <CFormLabel>Fecha de Producción: {currentRecord.ttr_fechapro}</CFormLabel>
            <CFormInput
              type="number"
              label="Litros Producidos"
              value={currentRecord.ttr_litrsprd || ''}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, ttr_litrsprd: parseFloat(e.target.value) })
              }
            />
          </>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton className="button-no-hover-green text-white" onClick={handleEditRecord}>
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
