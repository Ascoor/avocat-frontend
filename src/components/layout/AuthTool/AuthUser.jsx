import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../../../config';

export default function useAuth() {
  const navigate = useNavigate();

  // Fetch CSRF token from the document's meta tag
  const csrfToken = document.querySelector('meta[name="csrf-token"]');
  const csrfTokenValue = csrfToken ? csrfToken.getAttribute('content') : null;
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    if (!tokenString) {
      return null; // Return null if the token is not found
    }
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    const userString = sessionStorage.getItem('user');
    // Check if userString is null or undefined
    if (userString === null || userString === undefined) {
      return null; // Return null or any other default value as needed
    }
    const user_detail = JSON.parse(userString);
    return user_detail;
  };

  // Set up state for token and user
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  // Save token and user to session storage and update state
  const saveToken = (user, token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);
    navigate('/');
  };
  // Inside useAuth
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/api/login`, {
        email,
        password,
      });
      if (response.data.access_token && response.data.user) {
        // Store the token and user data in session storage
        saveToken(response.data.user, response.data.access_token);

        // Return true to indicate successful login
        return true;
      }
    } catch (error) {
      console.error('Error in login:', error);
    }

    // Return false to indicate login failure
    return false;
  };

  // Clear session storage and navigate to the login page
  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  // Create an Axios instance with custom headers and CSRF token
  const http = axios.create({
    baseURL: `${API_CONFIG.baseURL}`, // Assuming your Laravel API endpoint is /api
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'X-CSRF-Token': csrfTokenValue,
    },
  });

  // Set up an interceptor to attach the token to requests
  http.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Return the necessary functions and data from the hook
  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    login,
    http,
    getUser,
    logout,
    getCsrfToken: csrfTokenValue, // Expose the CSRF token
    apiURL: '/api', // Expose the API URL
  };
}
