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

import { formatDateToDDMMYYYY } from '../../../../../utils/dateFormatter'

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
            <CFormLabel>
              Bovino ID: {currentRecord.idBovinoLeche || currentRecord.ttr_idbovlec}
            </CFormLabel>
            <CFormLabel>
              Número de Bovino: {currentRecord.bovinoNumero || currentRecord.bovino_numero}
            </CFormLabel>
            <CFormLabel>Lote: {currentRecord.nombreLote || currentRecord.nombre_lote}</CFormLabel>
            <CFormLabel>
              Fecha de Producción:{' '}
              {formatDateToDDMMYYYY(currentRecord.fechaProduccion || currentRecord.ttr_fechapro)}
            </CFormLabel>
            <CFormInput
              type="number"
              label="Litros Producidos"
              value={currentRecord.litrosProducidos || currentRecord.ttr_litrsprd || ''}
              onChange={(e) =>
                setCurrentRecord({
                  ...currentRecord,
                  litrosProducidos: parseFloat(e.target.value),
                  ttr_litrsprd: parseFloat(e.target.value), // Keep both synced just in case
                })
              }
            />
          </>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="success" className="text-white" onClick={handleEditRecord}>
          Guardar cambios
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
