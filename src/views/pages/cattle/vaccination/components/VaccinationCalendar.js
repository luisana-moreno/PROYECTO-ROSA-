import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import 'src/scss/style.scss'
import { CTooltip } from '@coreui/react'
import { format } from 'date-fns'

const renderEventContent = (eventInfo) => {
  return (
    <CTooltip
      content={
        `Diagnóstico: ${eventInfo.event.extendedProps.diagnosis || 'N/A'}\n` +
        `Responsable: ${eventInfo.event.extendedProps.employeeName || 'N/A'}\n`
      }
      placement="right"
      trigger="hover"
    >
      <div
        className="vaccination-event"
        style={{
          backgroundColor: '#00470a4f',
          color: '#ffffffe1',
          padding: '0.25rem 0.5rem', // Responsive padding
          borderRadius: '2px',
          borderColor: '#00580ce1',
          fontSize: '0.75rem', // Responsive font size
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {eventInfo.timeText && <span className="me-1">{eventInfo.timeText}</span>}
        <span className="event-title">{eventInfo.event.title}</span>
      </div>
    </CTooltip>
  )
}

const VaccinationCalendar = ({ vaccinationEvents, handleDateClick }) => {
  const dayCellContent = (arg) => {
    const dateStr = format(arg.date, 'yyyy-MM-dd')
    const hasEvents = vaccinationEvents.some((event) => event.date.split('T')[0] === dateStr)

    return (
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        {arg.dayNumberText}
        {/* Círculo rojo removido */}
      </div>
    )
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
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
      dayCellContent={dayCellContent}
      dayMaxEvents={2} // Limitar a 2 eventos por día
      views={{
        dayGridMonth: {
          dayMaxEventRows: 2, // Limitar a 2 filas de eventos en la vista de mes
        },
      }}
    />
  )
}

export default VaccinationCalendar
