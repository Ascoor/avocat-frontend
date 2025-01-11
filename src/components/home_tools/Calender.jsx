import { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../../config';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSpring, animated } from '@react-spring/web';
import AnalogClock from './AnalogClock';


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
    <div className="grid grid-cols-1 gap-4 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">الأجندة</h3>
          <div className="flex justify-center items-center flex-col">
            <AnalogClock />
            <p className="text-gray-700 mt-2">
              الوقت الحالي: {currentTime.toLocaleTimeString('ar-EG')}
            </p>
          </div>
        </div>
      </div>

      <animated.div
        style={calendarSpringStyles}
        className="bg-gradient-to-r from-blue-500 to-indigo-700 rounded-lg shadow-lg p-6"
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          dayCellContent={({ date }) => (
            <span className="text-lg font-semibold">
              {arabicToHindi(date.getDate())}
            </span>
          )}
          locale="ar"
          eventContent={({ event }) => {
            const hindiDate = arabicToHindi(formatDate(new Date(event.start)));
            return (
              <div className="bg-white shadow-md rounded-lg p-2">
                <h4 className="font-bold">{event.title}</h4>
                <p className="text-sm">{event.description}</p>
                <p className="text-sm text-gray-500">بتاريخ: {hindiDate}</p>
              </div>
            );
          }}
        />
      </animated.div>
    </div>
  );
};

export default Calendar;
