// src/api/services.js
import api from './axiosConfig';

export const getServices = () => api.get('/api/services');
export const getServiceById = (id) => api.get(`/api/services/${id}`);
export const createService = (data) => api.post('/api/services', data);
export const updateService = (id, data) => api.put(`/api/services/${id}`, data);
export const deleteService = (id) => api.delete(`/api/services/${id}`);

export const getServiceTypes = () => api.get('/api/service-types');
export const getServiceTypeById = (id) => api.get(`/api/service-types/${id}`);
export const createServiceType = (data) => api.post('/api/service-types', data);
export const updateServiceType = (id, data) => api.put(`/api/service-types/${id}`, data);
export const deleteServiceType = (id) => api.delete(`/api/service-types/${id}`);


