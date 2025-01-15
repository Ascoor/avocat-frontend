// src/api/services.js
import api from './axiosConfig';

// ✅ عمليات CRUD للخدمات
export const getServices = () => api.get('/api/services');
export const getServiceById = (id) => api.get(`/api/services/${id}`);
export const createService = (data) => api.post('/api/services', data);
export const updateService = (id, data) => api.put(`/api/services/${id}`, data);
export const deleteService = (id) => api.delete(`/api/services/${id}`);
