import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; 
import { Provider } from 'react-redux'; 
import store from './store/store'; // Import your Redux store
import { AlertProvider } from './context/AlertContext';
import App from './App';
import GlobalAlert from './components/common/GlobalAlert';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <GlobalAlert />
        <Provider store={store}>
        <App />
        </Provider>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
