import { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../../config';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, Col, Row } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import '../../assets/css/calender.css';
import AnalogClock from './AnalogClock';

const Calendar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  // Function to determine the title based on the event type
  const [events, setEvents] = useState([]);

  const determineTitle = event => {
    if (event.title === 'legal session') {
      return 'جلسة';
    } else if (event.title === 'legal Ads') {
      return 'إعلانات';
    } else if (event.title === 'legal') {
      return 'إجراء قانوني';
    } else {
      return event.title;
    }
  };

  useEffect(() => {
    axios
      .get(`${API_CONFIG.baseURL}/api/events`)
      .then(response => {
        setEvents(
          response.data.map(event => ({
            title: determineTitle(event),
            extendedProps: {
              description: event.description,
            },
            start: event.date,
          })),
        );
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calendarSpringStyles = useSpring({
    background: 'linear-gradient(45deg, #e0c3fc, #8ec5fc)',
    boxShadow: '0px 0px 10px rgba(188, 171, 247, 0.5)',
    from: {
      background: 'linear-gradient(45deg, #c2e2fc, #cfd3e6)',
      boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
    },
    config: { duration: 1000 },
  });

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Helper function to convert Arabic numerals to Hindi numerals
  const arabicToHindi = num => {
    const arabicNumerals = '0123456789';
    const hindiNumerals = '٠١٢٣٤٥٦٧٨٩';
    const numeralMap = new Map(
      [...arabicNumerals].map((d, i) => [d, hindiNumerals[i]]),
    );
    return String(num).replace(/[0-9]/g, match => numeralMap.get(match));
  };
  const formatDate = date => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <Row>
      <Col md={12} lg={12} xs={12}>
        <Card>
          <Card.Header className="home-text-center">
            <h3>الأجندة</h3>
            <div className="clock">
              <AnalogClock />
            </div>
          </Card.Header>
          <Card.Body>
            <div className="calendar-container">
              <animated.div style={calendarSpringStyles}>
                <div className="calendar-container-display">
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    headerToolbar={{
                      left: 'next,prev today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    dayCellContent={({ date }) => {
                      // Render Arabic day numbers
                      return (
                        <span className="arabic-font">
                          {arabicToHindi(date.getDate())}
                        </span>
                      );
                    }}
                    locale="ar"
                    eventContent={({ event }) => {
                      const hindiDate = arabicToHindi(
                        formatDate(new Date(event.start)),
                      );
                      return (
                        <Card className="calendar-event-card">
                          <Card.Header>{event.title}</Card.Header>
                          <Card.Body>
                            <strong>{event.extendedProps.description}</strong>
                            <br />
                            <p>بتاريخ: {hindiDate}</p>
                          </Card.Body>
                        </Card>
                      );
                    }}
                  />
                </div>
              </animated.div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Calendar;
