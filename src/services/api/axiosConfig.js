import axios from 'axios';
import API_CONFIG from '../../config/config';

const api = axios.create({
  baseURL: `${API_CONFIG.baseURL}`,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// ✅ إضافة Interceptor لإضافة التوكن
api.interceptors.request.use((config) => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
