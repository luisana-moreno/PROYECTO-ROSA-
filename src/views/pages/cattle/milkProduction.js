import React, { useState } from 'react'
import { helpFetch } from 'src/helpper/helpFetch'
const { get, post, put, del } = helpFetch()
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
} from '@coreui/react'
import { toast } from 'react-toastify' // Importa toast de react-toastify

const MilkProduction = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [milkRecords, setMilkRecords] = useState([
    {
      id: 1,
      type: 'Bovino',
      identifier: '1001',
      day: 'lunes',
      liters: 50,
      morningStart: '06:00',
      morningEnd: '08:00',
      afternoonStart: '14:00',
      afternoonEnd: '16:00',
    },
    {
      id: 2,
      type: 'Lote',
      identifier: 'Lote A',
      day: 'martes',
      liters: 120,
      morningStart: '06:00',
      morningEnd: '08:00',
      afternoonStart: '14:00',
      afternoonEnd: '16:00',
    },
  ])
  const [newRecord, setNewRecord] = useState({
    type: 'Bovino', // Bovino o Lote
    identifier: '',
    day: '',
    liters: '',
    morningStart: '',
    morningEnd: '',
    afternoonStart: '',
    afternoonEnd: '',
  })

  const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

  const handleAddRecord = () => {
    setMilkRecords([...milkRecords, { id: milkRecords.length + 1, ...newRecord }])
    setNewRecord({
      type: 'Bovino',
      identifier: '',
      day: '',
      liters: '',
      morningStart: '',
      morningEnd: '',
      afternoonStart: '',
      afternoonEnd: '',
    })
    setVisible(false)
    toast.success('Registro agregado correctamente')
  }

  const handleEditRecord = () => {
    setMilkRecords(
      milkRecords.map((record) => (record.id === currentRecord.id ? currentRecord : record)),
    )
    setEditVisible(false)
    toast.info('Registro editado correctamente')
  }

  const handleDeleteRecord = () => {
    if (deleteConfirmation === 'confirmar') {
      setMilkRecords(milkRecords.filter((record) => record.id !== currentRecord.id))
      setDeleteVisible(false)
      toast.error('Registro eliminado correctamente')
    } else {
      toast.warning('Debe escribir "confirmar" para eliminar')
    }
  }

  return (
    <CCard>
      <CCardHeader>
        <h4 className="typography-color-title mb-0 d-flex justify-content-between align-items-center">
          Registro de Producción de Leche
          <CButton className="button-no-hover-green text-white" onClick={() => setVisible(true)}>
            Agregar Registro
          </CButton>
        </h4>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Tipo</CTableHeaderCell>
              <CTableHeaderCell>Identificador</CTableHeaderCell>
              <CTableHeaderCell>Día</CTableHeaderCell>
              <CTableHeaderCell>Litros</CTableHeaderCell>
              <CTableHeaderCell>Inicio Mañana</CTableHeaderCell>
              <CTableHeaderCell>Fin Mañana</CTableHeaderCell>
              <CTableHeaderCell>Inicio Tarde</CTableHeaderCell>
              <CTableHeaderCell>Fin Tarde</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {milkRecords.map((record) => (
              <CTableRow key={record.id}>
                <CTableDataCell>{record.type}</CTableDataCell>
                <CTableDataCell>{record.identifier}</CTableDataCell>
                <CTableDataCell>{record.day}</CTableDataCell>
                <CTableDataCell>{record.liters}</CTableDataCell>
                <CTableDataCell>{record.morningStart}</CTableDataCell>
                <CTableDataCell>{record.morningEnd}</CTableDataCell>
                <CTableDataCell>{record.afternoonStart}</CTableDataCell>
                <CTableDataCell>{record.afternoonEnd}</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex">
                    <CButton
                      className="me-2 mb-2"
                      size="sm"
                      color="info"
                      variant="outline"
                      onClick={() => {
                        setCurrentRecord(record)
                        setEditVisible(true)
                      }}
                    >
                      Editar
                    </CButton>
                    <CButton
                      className="me-2 mb-2"
                      size="sm"
                      color="danger"
                      variant="outline"
                      onClick={() => {
                        setCurrentRecord(record)
                        setDeleteVisible(true)
                      }}
                    >
                      Eliminar
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para agregar registro */}
      <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Agregar Registro</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormSelect
                value={newRecord.type}
                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
              >
                <option value="Bovino">Bovino</option>
                <option value="Lote">Lote</option>
              </CFormSelect>
              <small className="text-muted">Seleccione el tipo de registro.</small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder={newRecord.type === 'Bovino' ? 'Número de Bovino' : 'Número de Lote'}
                value={newRecord.identifier}
                onChange={(e) => setNewRecord({ ...newRecord, identifier: e.target.value })}
              />
              <small className="text-muted">
                {newRecord.type === 'Bovino'
                  ? 'Ingrese el número de bovino.'
                  : 'Ingrese el número de lote.'}
              </small>
            </CCol>
          </CRow>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormSelect
                value={newRecord.day}
                onChange={(e) => setNewRecord({ ...newRecord, day: e.target.value })}
              >
                <option value="">Seleccione el día</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </option>
                ))}
              </CFormSelect>
              <small className="text-muted">Seleccione el día de la semana.</small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                placeholder="Cantidad de Litros"
                value={newRecord.liters}
                onChange={(e) => setNewRecord({ ...newRecord, liters: e.target.value })}
              />
              <small className="text-muted">Ingrese la cantidad de litros producidos.</small>
            </CCol>
          </CRow>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                type="time"
                placeholder="Inicio Mañana"
                value={newRecord.morningStart}
                onChange={(e) => setNewRecord({ ...newRecord, morningStart: e.target.value })}
              />
              <small className="text-muted">
                Ingrese la hora de inicio del ordeño en la mañana.
              </small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="time"
                placeholder="Fin Mañana"
                value={newRecord.morningEnd}
                onChange={(e) => setNewRecord({ ...newRecord, morningEnd: e.target.value })}
              />
              <small className="text-muted">
                Ingrese la hora de finalización del ordeño en la mañana.
              </small>
            </CCol>
          </CRow>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                type="time"
                placeholder="Inicio Tarde"
                value={newRecord.afternoonStart}
                onChange={(e) => setNewRecord({ ...newRecord, afternoonStart: e.target.value })}
              />
              <small className="text-muted">
                Ingrese la hora de inicio del ordeño en la tarde.
              </small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="time"
                placeholder="Fin Tarde"
                value={newRecord.afternoonEnd}
                onChange={(e) => setNewRecord({ ...newRecord, afternoonEnd: e.target.value })}
              />
              <small className="text-muted">
                Ingrese la hora de finalización del ordeño en la tarde.
              </small>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton className="button-no-hover-green text-white" onClick={handleAddRecord}>
            Agregar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para editar registro */}
      <CModal
        alignment="center"
        scrollable
        visible={editVisible}
        onClose={() => setEditVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Editar Registro</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormSelect
                value={currentRecord?.type || ''}
                onChange={(e) => setCurrentRecord({ ...currentRecord, type: e.target.value })}
              >
                <option value="Bovino">Bovino</option>
                <option value="Lote">Lote</option>
              </CFormSelect>
              <small className="text-muted">Seleccione el tipo de registro.</small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                placeholder={
                  currentRecord?.type === 'Bovino' ? 'Número de Bovino' : 'Número de Lote'
                }
                value={currentRecord?.identifier || ''}
                onChange={(e) => setCurrentRecord({ ...currentRecord, identifier: e.target.value })}
              />
              <small className="text-muted">
                {currentRecord?.type === 'Bovino'
                  ? 'Ingrese el número de bovino.'
                  : 'Ingrese el número de lote.'}
              </small>
            </CCol>
          </CRow>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormSelect
                value={currentRecord?.day || ''}
                onChange={(e) => setCurrentRecord({ ...currentRecord, day: e.target.value })}
              >
                <option value="">Seleccione el día</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </option>
                ))}
              </CFormSelect>
              <small className="text-muted">Seleccione el día de la semana.</small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                placeholder="Cantidad de Litros"
                value={currentRecord?.liters || ''}
                onChange={(e) => setCurrentRecord({ ...currentRecord, liters: e.target.value })}
              />
              <small className="text-muted">Ingrese la cantidad de litros producidos.</small>
            </CCol>
          </CRow>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                type="time"
                placeholder="Inicio Mañana"
                value={currentRecord?.morningStart || ''}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, morningStart: e.target.value })
                }
              />
              <small className="text-muted">
                Ingrese la hora de inicio del ordeño en la mañana.
              </small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="time"
                placeholder="Fin Mañana"
                value={currentRecord?.morningEnd || ''}
                onChange={(e) => setCurrentRecord({ ...currentRecord, morningEnd: e.target.value })}
              />
              <small className="text-muted">
                Ingrese la hora de finalización del ordeño en la mañana.
              </small>
            </CCol>
          </CRow>
          <CRow className="g-3 mt-2">
            <CCol md={6}>
              <CFormInput
                type="time"
                placeholder="Inicio Tarde"
                value={currentRecord?.afternoonStart || ''}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, afternoonStart: e.target.value })
                }
              />
              <small className="text-muted">
                Ingrese la hora de inicio del ordeño en la tarde.
              </small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="time"
                placeholder="Fin Tarde"
                value={currentRecord?.afternoonEnd || ''}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, afternoonEnd: e.target.value })
                }
              />
              <small className="text-muted">
                Ingrese la hora de finalización del ordeño en la tarde.
              </small>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton className="button-no-hover-green text-white" onClick={handleEditRecord}>
            Guardar cambios
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para eliminar registro */}
      <CModal visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
        <CModalHeader>
          <CModalTitle>Eliminar Registro</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>Por favor escriba "confirmar" para eliminar el registro</h6>
          <CFormInput
            placeholder="confirmar"
            className="modal-border"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton className="button-no-hover green" onClick={() => setDeleteVisible(false)}>
            Cancelar
          </CButton>
          <CButton className="button-no-hover-green" onClick={handleDeleteRecord}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default MilkProduction
