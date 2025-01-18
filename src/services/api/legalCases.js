
// src/api/legalCases.js
import api from './axiosConfig';

export const getLegalCases = () => api.get('/legal-cases');
export const getLegalCaseById = (id) => api.get(`/legal-cases/${id}`);
export const createLegalCase = (data) => api.post('/legal-cases', data);
export const updateLegalCase = (id, data) => api.put(`/legal-cases/${id}`, data);
export const deleteLegalCase = (id) => api.delete(`/legal-cases/${id}`);
