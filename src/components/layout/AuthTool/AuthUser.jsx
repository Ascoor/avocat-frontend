import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../../../config';

export default function useAuth () {
    const navigate = useNavigate();

    // Fetch CSRF token from the document's meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]');
    const csrfTokenValue = csrfToken ? csrfToken.getAttribute('content') : null;

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString) {
            try {
                // Parse the token string as JSON
                const userToken = JSON.parse(tokenString);
                return userToken;
            } catch (error) {
                console.error('Error parsing token:', error);
            }
        }
        return null; // Return null if tokenString is undefined or parsing fails
    };
    
    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        if (userString) {
            try {
                // Parse the user string as JSON
                const userDetail = JSON.parse(userString);
                return userDetail;
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        return null; // Return null if userString is undefined or parsing fails
    };
    

    // Set up state for token and user
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
// Update the saveToken function to store the access token and user data
const saveToken = (accessToken, user) => {
    if (accessToken && user) {
      const tokenObject = {
        access_token: accessToken,
      };
  
      sessionStorage.setItem('token', JSON.stringify(tokenObject));
      sessionStorage.setItem('user', JSON.stringify(user));
  
      setToken(tokenObject);
      setUser(user);
      navigate('/home'); // Make sure '/home' is the correct route
    }
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
        http,
        getUser,
        logout,
        getCsrfToken: csrfTokenValue, // Expose the CSRF token
        apiURL: '/api', // Expose the API URL
    };
}
