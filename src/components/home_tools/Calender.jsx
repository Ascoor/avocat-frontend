import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
  const events = [
    // Define your events here
    { title: 'Event 1', start: '2023-08-01' },
    { title: 'Event 2', start: '2023-08-10' },
    // Add more events
  ];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // Set the initial view to month
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        locale="ar" // Set the locale to Arabic
      />
    </div>
  );
};

export default Calendar;
