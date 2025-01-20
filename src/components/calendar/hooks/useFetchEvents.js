import { useState, useEffect } from 'react';
import calendarService from '../services/calendarService';

// ✅ Hook to fetch events from the API
const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await calendarService.getEvents(); // جلب الأحداث من API
        setEvents(data);
      } catch (err) {
        setError('❌ حدث خطأ أثناء جلب الأحداث');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

export default useFetchEvents; // ✅ التأكد من التصدير الصحيح
