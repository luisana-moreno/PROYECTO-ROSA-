import React, { useState, useEffect } from 'react'
import { helpFetch } from 'src/helpper/helpFetch'
const { get, post, put, del } = helpFetch()
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import 'src/scss/style.scss'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CTooltip,
  CAlert,
} from '@coreui/react'

const Vaccination = () => {
  const [visibleVaccination, setVisibleVaccination] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [vaccinationEvents, setVaccinationEvents] = useState([])
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [formData, setFormData] = useState({
    cattleId: '',
    employeeId: '',
    diagnosis: '',
    treatment: '',
    vaccine: '',
    date_vaccination: '',
  })
  const [toast, setToast] = useState({ show: false, message: '', color: 'success' })
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  // Nuevos estados para empleados y bovinos
  const [employees, setEmployees] = useState([])
  const [cattle, setCattle] = useState([])

  // Cargar empleados y bovinos al iniciar
  useEffect(() => {
    get('employee').then(data => setEmployees(data || []))
    get('cattle').then(data => setCattle(data || []))
  }, [])

  // Abrir modal para agregar
  const handleDateClick = (info) => {
    setEditMode(false)
    setSelectedDate(info.dateStr)
    setFormData({
      cattleId: '',
      employeeId: '',
      diagnosis: '',
      treatment: '',
      vaccine: '',
      date_vaccination: info.dateStr,
    })
    setVisibleVaccination(true)
    setSelectedEventId(null)
  }

  // Abrir modal para editar
  const handleEventClick = (info) => {
    setEditMode(true)
    setSelectedEventId(info.event.id)
    setFormData({
      cattleId: info.event.extendedProps.cattleId,
      employeeId: info.event.extendedProps.employeeId,
      diagnosis: info.event.extendedProps.diagnosis,
      treatment: info.event.extendedProps.treatment,
      vaccine: info.event.extendedProps.vaccine,
      date_vaccination: info.event.extendedProps.date_vaccination,
    })
    setSelectedDate(info.event.startStr)
    setVisibleVaccination(true)
  }

  // Guardar nuevo evento o editar
  const handleSubmit = () => {
    if (editMode && selectedEventId !== null) {
      setVaccinationEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEventId
            ? {
                ...event,
                title: `Vacuna: ${formData.vaccine}`,
                date: formData.date_vaccination,
                extendedProps: { ...formData },
              }
            : event
        )
      )
      showToast('Evento editado correctamente', 'info')
    } else {
      const newEvent = {
        id: Date.now().toString(),
        title: `Vacuna: ${formData.vaccine}`,
        date: formData.date_vaccination,
        extendedProps: { ...formData },
      }
      setVaccinationEvents([...vaccinationEvents, newEvent])
      showToast('Evento registrado correctamente', 'success')
    }
    closeModal()
  }

  // Mostrar modal de confirmación antes de eliminar
  const handleDelete = () => {
    setConfirmDelete(true)
    setDeleteConfirmation('')
  }

  // Confirmar eliminación de evento de vacunación
  const handleConfirmDelete = () => {
    if (deleteConfirmation === 'confirmar' && selectedEventId !== null) {
      setVaccinationEvents((prev) => prev.filter((event) => event.id !== selectedEventId))
      showToast('Evento eliminado correctamente', 'danger')
      setConfirmDelete(false)
      closeModal()
    } else {
      showToast('Debe escribir "confirmar" para eliminar', 'warning')
    }
  }

  // Cancelar eliminación
  const cancelDelete = () => {
    setConfirmDelete(false)
  }

  // Mostrar mensaje tipo toast centrado
  const showToast = (message, color = 'success') => {
    setToast({ show: true, message, color })
    setTimeout(() => setToast({ show: false, message: '', color: 'success' }), 2500)
  }

  // Cerrar modal y limpiar
  const closeModal = () => {
    setVisibleVaccination(false)
    setFormData({
      cattleId: '',
      employeeId: '',
      diagnosis: '',
      treatment: '',
      vaccine: '',
      date_vaccination: '',
    })
    setSelectedEventId(null)
    setEditMode(false)
  }

  return (
    <>
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          minWidth: 300,
        }}>
          <CAlert color={toast.color} className="text-center m-0">
            {toast.message}
          </CAlert>
        </div>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        events={vaccinationEvents}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
        height="auto"
        locale="es"
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
        }}
      />

      <CModal
        alignment="center"
        visible={visibleVaccination}
        onClose={closeModal}
        className="modern-modal"
      >
        <CModalHeader className="modern-modal-header">
          <CModalTitle className="modern-modal-title">
            {editMode ? 'Editar Evento de Vacunación' : 'Registrar Vacunación'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody className="modern-modal-body">
          <p>
            <strong>Fecha:</strong> {selectedDate}
          </p>
          <CForm>
            <CFormSelect
              className="modal-name mb-3 custom-select"
              value={formData.cattleId}
              onChange={(e) => setFormData({ ...formData, cattleId: e.target.value })}
            >
              <option value="">Seleccione el bovino</option>
              {cattle.map((b) => (
                <option key={b.id} value={b.cattle_number || b.id}>
                  {b.cattle_number || b.id} - {b.breed_bovine}
                </option>
              ))}
            </CFormSelect>
            <CFormSelect
              className="modal-name mb-3 custom-select"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            >
              <option value="">Seleccione el empleado</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.Document_Number || emp.id}>
                  {emp.firts_name} {emp.Firts_Las_Name} ({emp.Position})
                </option>
              ))}
            </CFormSelect>
            <CFormInput
              className="modal-name mb-3 custom-select"
              placeholder="Diagnóstico"
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            />
            <CFormInput
              className="modal-name mb-3 custom-select"
              placeholder="Tratamiento"
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
            />
            <CFormInput
              className="modal-name mb-3 custom-select"
              type="text"
              placeholder="Vacuna"
              name="vaccine"
              value={formData.vaccine}
              onChange={(e) => setFormData({ ...formData, vaccine: e.target.value })}
            />
            <CFormInput
              className="modal-name mb-3 custom-select"
              type="date"
              placeholder="Fecha de Vacunación"
              name="date_vaccination"
              value={formData.date_vaccination}
              onChange={(e) => setFormData({ ...formData, date_vaccination: e.target.value })}
            />
          </CForm>
        </CModalBody>
        <CModalFooter className="modern-modal-footer">
          {editMode && (
            <CButton className="button-no-hover-green" color="danger" onClick={handleDelete}>
              <h6 className='typography-color'>Eliminar</h6>
            </CButton>
          )}
          <CButton className="button-no-hover-green" onClick={closeModal}>
            <h6 className='typography-color'>Cerrar</h6>
          </CButton>
          <CButton className="button-no-hover-green text-white" onClick={handleSubmit}>
            {editMode ? 'Guardar Cambios' : 'Registrar'}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal de confirmación para eliminar */}
      <CModal alignment="center" visible={confirmDelete} onClose={cancelDelete} className="modern-modal">
        <CModalHeader className="modern-modal-header">
          <CModalTitle className="modern-modal-title">
            Confirmar Eliminación
          </CModalTitle>
        </CModalHeader>
        <CModalBody className="modern-modal-body">
          <h6>
            Por favor escriba "confirmar" para eliminar el evento de vacunación:
          </h6>
          <CFormInput
            placeholder="confirmar"
            className='modal-border'
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />
        </CModalBody>
        <CModalFooter className="modern-modal-footer">
          <CButton className="button-no-hover green" onClick={cancelDelete}>
            <h6 className='typography-color'>Cancelar</h6>
          </CButton>
          <CButton className="button-no-hover-green" color="danger" onClick={handleConfirmDelete}>
            <h6 className='typography-color'>Eliminar</h6>
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

function renderEventContent(eventInfo) {
  return (
    <CTooltip
      content={
        `Diagnóstico: ${eventInfo.event.extendedProps.diagnosis || 'N/A'}\n` +
        `Responsable: ${eventInfo.event.extendedProps.employeeId || 'N/A'}\n`
      }
      placement="right"
      trigger="hover"
    >
      <div className="vaccination-event">
        <div className="event-title">{eventInfo.event.title}</div>
        <div className="event-cattle">Ganado: {eventInfo.event.extendedProps.cattleId}</div>
      </div>
    </CTooltip>
  )
}

export default Vaccination
