// src/api/services.js
import useAuth from '../components /auth/AuthUser';

// ✅ استدعاء http من useAuth
const { http } = useAuth();

export const getProcedures = () => api.get('/procedures');
export const getProcedureById = (id) => api.get(`/procedures/${id}`);
export const createProcedure = (data) => api.post('/procedures', data);
export const updateProcedure = (id, data) => api.put(`/procedures/${id}`, data);
export const deleteProcedure = (id) => api.delete(`/procedures/${id}`);
