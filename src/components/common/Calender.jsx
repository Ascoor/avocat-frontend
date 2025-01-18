import { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../../config/config';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { animated } from '@react-spring/web';
import '@fullcalendar/core/locales/ar';
import { FaStar, FaBell, FaRegTrashAlt } from 'react-icons/fa';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const categoryColors = {
    session: '#4CAF50',       // جلسة قانونية - أخضر
    ad: '#2196F3',            // إعلان قانوني - أزرق
    procedure: '#FF9800',     // إجراء قانوني - برتقالي
    meeting: '#9C27B0',       // اجتماع - بنفسجي
    call: '#00BCD4',          // مكالمة - سماوي
    document: '#FFC107',      // مستندات - أصفر
    consultation: '#8BC34A',  // استشارة - أخضر فاتح
    update: '#F44336',        // تحديث قضية - أحمر
    alert: '#FF5722'          // تنبيه - برتقالي داكن
  };

  const determineTitle = (event) => {
    const titles = {
      'legal session': 'جلسة قانونية',
      'Legal Ads': 'إعلان قانوني',
      'legal Procedure': 'إجراء قانوني',
      'alert': 'تنبيه',
      'meeting': 'اجتماع قانوني',
      'client call': 'مكالمة مع العميل',
      'document submission': 'تقديم مستندات',
      'lawyer consultation': 'استشارة قانونية',
      'case update': 'تحديث قضية'
    };
    return titles[event.title] || event.title;
  };

  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        title: 'legal session',
        description: 'جلسة محكمة لمراجعة القضية رقم ١٢٣٤٥',
        date: '2025-01-20',
        type: 'session'
      },
      {
        id: 2,
        title: 'Legal Ads',
        description: 'إعلان عن تعديل في القضية رقم ٥٤٣٢١',
        date: '2025-01-22',
        type: 'ad'
      },
      {
        id: 3,
        title: 'legal Procedure',
        description: 'إجراء قانوني جديد في القضية رقم ٦٧٨٩٠',
        date: '2025-01-25',
        type: 'procedure'
      }
    ];

    const formattedEvents = fakeData.map((event) => ({
      id: event.id,
      title: determineTitle(event),
      description: event.description,
      start: event.date,
      type: event.type,
      backgroundColor: categoryColors[event.type],
      borderColor: categoryColors[event.type]
    }));
    setEvents(formattedEvents);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fav) => fav !== id)
        : [...prevFavorites, id]
    );
  };

  const addNotification = (event) => {
    setNotifications((prev) => [
      ...prev,
      {
        id: event.id,
        message: `تذكير بحدث: ${event.title} في ${event.start}`,
      },
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-6 bg-gradient-blue-light dark:bg-gradient-night text-avocat-indigo-darker dark:text-white min-h-screen">
      <animated.div className="rounded-lg shadow-xl p-6 bg-opacity-90">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ar"
          events={events}
          eventClick={({ event }) => addNotification(event)}
          eventMouseEnter={({ event, el }) => {
            const tooltip = document.createElement('div');
            tooltip.innerHTML = `<div class='bg-white shadow-lg p-3 text-center rounded-lg'>
                                  <h4 class='font-bold text-lg'>${event.title}</h4>
                                  <p>${event.extendedProps.description}</p>
                                  <p class='text-sm text-gray-500'>التاريخ: ${event.startStr}</p>
                                </div>`;
            tooltip.classList.add('absolute', 'z-50');
            el.appendChild(tooltip);
          }}
          eventMouseLeave={({ el }) => {
            el.querySelectorAll('.z-50').forEach((tooltip) => tooltip.remove());
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
        />
      </animated.div>
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          <h4 className="font-bold text-avocat-blue dark:text-avocat-orange mb-2">الإشعارات</h4>
          {notifications.map((note) => (
            <div key={note.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-md mb-2">
              <span>{note.message}</span>
              <button onClick={() => removeNotification(note.id)}>
                <FaRegTrashAlt className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div> 
  );
};

export default Calendar;
