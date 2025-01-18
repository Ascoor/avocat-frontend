 
// src/api/clients.js
import useAuth from "../components /auth/AuthUser";
const { http } = useAuth();

export const getClients = () => api.get('/api/clients');
export const getClientById = (id) => api.get(`/api/clients/${id}`);
export const createClient = (data) => api.post('/api/clients', data);
export const updateClient = (id, data) => api.put(`/api/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/api/clients/${id}`);
