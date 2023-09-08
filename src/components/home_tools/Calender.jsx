import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Col } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import '../../assets/css/calender.css';

const Calendar = () => {
  const events = [
    // Define your events here
    { title: 'Event 1', start: '2023-08-01' },
    { title: 'Event 2', start: '2023-08-10' },
    // Add more events
  ];

  // Define animated styles for the calendar container
  const calendarSpringStyles = useSpring({
    background: 'linear-gradient(45deg, #ff6b6b, #ffa07a)',
    boxShadow: '0px 0px 10px rgba(255, 106, 106, 0.5)',
    from: { background: 'linear-gradient(45deg, #85d8bf, #a1b8df)', boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)' },
    config: { duration: 1000 },
  });

  return (
    <div>
      {/* Use responsive classes for different screen sizes */}
      <Col sm={12} md={12} lg={6} className="mx-auto">
        {/* Apply animated styles to the calendar container */}
        <animated.div style={calendarSpringStyles}>
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
        </animated.div>
      </Col>
    </div>
  );
};

export default Calendar;
