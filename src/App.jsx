// App.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import Guest from './components/layout/Guest';
import Auth from './components/layout/Auth';
import useAuth from './components/layout/AuthTool/AuthUser'; // Import the useAuth hook

const App = () => {
  const { getToken } = useAuth();
  return <div>{getToken() ? <Auth /> : <Guest />}</div>;
};

export default App;
