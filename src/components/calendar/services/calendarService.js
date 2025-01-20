// 📁 services/calendarService.js
import axios from 'axios';
import fakeEventsData from '../data/fakeEventsData';

// Base URL for the calendar API
const API_BASE_URL = 'https://api.your-legaloffice.com';

// Service to handle all calendar-related API operations
const calendarService = {
  // Fetch all events from the server or use fake data for testing
  getEvents: async () => {
    try {
      // Uncomment this for production
      // const response = await axios.get(`${API_BASE_URL}/events`);
      // return response.data;

      // For testing with fake data
      return fakeEventsData;
    } catch (error) {
      console.error('❌ خطأ في جلب الأحداث:', error);
      throw error;
    }
  },
};

export default calendarService;
