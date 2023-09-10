import { useState, useEffect } from 'react';
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

  const [currentTime, setCurrentTime] = useState(new Date());
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

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Helper function to convert Arabic numerals to Hindi numerals
  const arabicToHindi = (num) => {
    const arabicNumerals = '0123456789';
    const hindiNumerals = '٠١٢٣٤٥٦٧٨٩';
    const numeralMap = new Map(
      [...arabicNumerals].map((d, i) => [d, hindiNumerals[i]])
    );
    return String(num).replace(/[0-9]/g, (match) => numeralMap.get(match));
  };
  return (
    <Row>
      <Col md={12} lg={12} xs={12}>
        <Card>
          <Card.Header className="home-text-center">
            <h3>الأجندة</h3>
            <div className="clock">{currentTime.toLocaleTimeString()}</div>
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
                    locale="ar"
                    dayHeaderContent={({ date }) => {
                      const arabicWeekdays = [
                        'أحد',
                        'إثنين',
                        'ثلاثاء',
                        'أربعاء',
                        'خميس',
                        'جمعة',
                        'سبت',
                      ];
                      return (
                        <span className="arabic-font">
                          {arabicWeekdays[date.getDay()]}
                        </span>
                      );
                    }}
                    dayCellContent={({ date }) => {
                      // Render Arabic day numbers
                      return (
                        <span className="arabic-font">
                          {arabicToHindi(date.getDate())}
                        </span>
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
