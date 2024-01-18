import React, {  useState } from 'react';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'boxicons/css/boxicons.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import Guest from './components/layout/Guest'
import Auth from './components/layout/Auth'
import useAuth from './components/layout/AuthTool/AuthUser';


function App() {
  const { getToken } = useAuth();

  return (
    <>
      {!getToken() ? <Guest /> : <Auth />}
    
    </>
  );
}

export default App;
