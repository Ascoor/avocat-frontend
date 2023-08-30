import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Col } from 'react-bootstrap'; // Import the Col component

const Calendar = () => {
  const events = [
    // Define your events here
    { title: 'Event 1', start: '2023-08-01' },
    { title: 'Event 2', start: '2023-08-10' },
    // Add more events
  ];

  return (
    <div>
      {/* Use responsive classes for different screen sizes */}
      <Col sm={12} md={8} lg={6} className="mx-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          locale="ar"
        />
      </Col>
    </div>
  );
};

export default Calendar;
