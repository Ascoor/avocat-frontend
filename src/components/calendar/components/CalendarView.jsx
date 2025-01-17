// 📅 CalendarView.jsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import useFetchEvents from '../hooks/useFetchEvents'; // ✅ استخدم التصدير الافتراضي

const CalendarView = () => {
  const { events } = useFetchEvents(); // استدعاء هوك جلب الأحداث

  return (
    <div className="calendar-view">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        locale="ar"
        events={events}
        editable={true}
        eventClick={({ event }) => alert(`📅 حدث: ${event.title}`)}
      />
    </div>
  );
};

export default CalendarView;
