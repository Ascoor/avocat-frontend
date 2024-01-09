import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'boxicons/css/boxicons.min.css';
import 'react-datepicker/dist/react-datepicker.css';
<<<<<<< HEAD
import './App.css';
import Guest from './components/layout/Guest'
import Auth from './components/layout/Auth'
import useAuth from './components/layout/AuthTool/AuthUser';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuth();
=======
import './index.css';
// import AuthUser from './components/layout/AuthTool/AuthUser';
// import Guest from './components/layout/Guest';
// import Auth from './components/layout/Auth';
import WebSite from './WebSite';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const { getToken } = AuthUser();

  // useEffect(() => {
  //   // Set a timeout to simulate loading time
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   // Cleanup function to clear the timer
  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   // Check if the user is authenticated when the component mounts
  //   if (getToken()) {
  //     setIsAuthenticated(true);
  //   }
  // }, [getToken]);

  // if (isLoading) {
>>>>>>> 28cdc826981af2082fc9871805549429b8629510

  useEffect(() => {
    // Set a timeout to simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, []);

<<<<<<< HEAD
  if (isLoading) {
    return (
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    );
  }

  if (!getToken()) {
    return <Guest />;
  }

  return <Auth />;
=======
  return (
    <div>
      {isLoading ? (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      ) : (
        <>
          <WebSite />
        </>
      )}
    </div>
    //   {isAuthenticated ? (
    //     // إذا كان المستخدم مصادقًا، عرض مكون Auth فقط
    //     <Auth />
    //   ) : (
    //     // إذا كان المستخدم زائرًا غير مصادق، عرض مكون Guest فقط
    //     <Guest />
    //   )}

    // </div>
  );
>>>>>>> 28cdc826981af2082fc9871805549429b8629510
}

export default App;
