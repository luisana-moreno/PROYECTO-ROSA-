import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import 'src/scss/style.scss'
import { CTooltip } from '@coreui/react'

const renderEventContent = (eventInfo) => {
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

const VaccinationCalendar = ({ vaccinationEvents, handleDateClick, handleEventClick }) => {
  return (
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
  )
}

export default VaccinationCalendar
