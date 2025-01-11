import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../../../config';

export default function useAuth() {
  const navigate = useNavigate();

  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || null;

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    return tokenString ? JSON.parse(tokenString) : null;
  };

  const getUser = () => {
    const userString = sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (user, token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    navigate('/');
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/api/login`, { email, password });
      if (response.data.access_token && response.data.user) {
        saveToken(response.data.user, response.data.access_token);
        return true;
      }
    } catch (error) {
      console.error('Error in login:', error);
    }
    return false;
  };


  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const http = axios.create({
    baseURL: `${API_CONFIG.baseURL}`,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'X-CSRF-Token': csrfToken,
    },
  });

  http.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return {
    setToken: saveToken,
    token,
    user,
    login,
    getToken,
    http,
    logout,
  };
}
