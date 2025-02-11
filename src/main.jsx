import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Adjust the path if needed

import { AlertProvider } from './context/AlertContext';
import App from './App';
import GlobalAlert from './components/common/GlobalAlert';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <GlobalAlert />
        <App />
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
