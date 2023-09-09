import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, Col, Row } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import '../../assets/css/Calender.css';

const Calendar = () => {
  const events = [
    { title: 'فعالية 1', start: '2023-08-01' },
    { title: 'فعالية 2', start: '2023-08-10' },
    // Add more events here
  ];

  // Define animated styles for the calendar container
  const calendarSpringStyles = useSpring({
    background: 'linear-gradient(45deg, #e0c3fc, #8ec5fc)',
    boxShadow: '0px 0px 10px rgba(188, 171, 247, 0.5)',
    from: {
      background: 'linear-gradient(45deg, #c2e2fc, #cfd3e6)',
      boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
    },
    config: { duration: 1000 },
  });

  return (
    <Row>
      <Col md={12} lg={12} xs={12}>
        <Card>
          <Card.Header className="home-text-center">
            <h3>الأجندة</h3>
          </Card.Header>
          <Card.Body>
            <div className="calendar-container">
             
              <animated.div style={calendarSpringStyles}>
                <FullCalendar
                  className="calendar-container-display"
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                  }}
                  locale="ar"
                  dayHeaderContent={({ date }) => {
                    return (
                      <span className="arabic-font">
                        {date.toLocaleDateString('ar', { weekday: 'short' })}
                      </span>
                    );
                  }}
                  dayCellContent={({ date }) => {
                    return <span className="arabic-font">{date.getDate()}</span>;
                  }}
                />
              </animated.div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Calendar;
