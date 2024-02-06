import { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../../config';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, Col, Row } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import AnalogClock from './AnalogClock';

import '../../assets/css/calender.css';

const Calendar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [events, setEvents] = useState([]);

  const determineTitle = (event) => {
    const titles = {
      'legal session': 'جلسة',
      'Legal Ads': 'إعلان',
      'legal Procedure': 'إجراء',
    };
    return titles[event.title] || event.title;
  };

  useEffect(() => {
    axios
      .get(`${API_CONFIG.baseURL}/api/events`)
      .then((response) => {
        const formattedEvents = response.data.map((event) => ({
          title: determineTitle(event),
          description: event.description,
          start: event.date,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
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
    from: {
      background: 'linear-gradient(45deg, #000000, #333333, #555555, #777777)',
    },
    to: {
      background: 'linear-gradient(45deg, #0f1621, #121e33, #172133, #063e50)',
    },
    config: { duration: 1000 },
  });

  const arabicToHindi = (num) => {
    const arabicNumerals = '0123456789';
    const hindiNumerals = '٠١٢٣٤٥٦٧٨٩';
    const numeralMap = new Map(
      [...arabicNumerals].map((d, i) => [d, hindiNumerals[i]])
    );
    return String(num).replace(/[0-9]/g, (match) => numeralMap.get(match));
  };

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <Row>
      <Col md={6} lg={12} xs={12}>
        <Card className="home-card-calendar">
          <Card.Header className="home-text-center">
            <h3 className="card-title p-3">الأجندة</h3>
            <div className="clock">
              <AnalogClock />
              <p>الوقت الحالي: {currentTime.toLocaleTimeString('ar-EG')}</p>
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
                    dayCellContent={({ date }) => (
                      <span className="arabic-font">
                        {arabicToHindi(date.getDate())}
                      </span>
                    )}
                    locale="ar"
                    eventContent={({ event }) => {
                      const hindiDate = arabicToHindi(
                        formatDate(new Date(event.start))
                      );
                      return (
                        <Card className="calendar-event-card">
                          <Card.Header>{event.title}</Card.Header>
                          <Card.Body>
                            <strong>{event.description}</strong>
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
