import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Login from './AuthTool/Login';
import Register from './AuthTool/Register';
import ShowSpinner from '../Tools/ShowSpinner';
import { TeamWorkImage, LogoPatren } from '../../assets/img/index';

const Guest = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleFormClose = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const toggleLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const imageAnimation = useSpring({
    from: { transform: 'translateY(100%)', opacity: 0 },
    to: { transform: 'translateY(0%)', opacity: 1 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ShowSpinner />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-cover bg-center">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="absolute bg-gradient-day  dark:via-gray-800 dark:to-gray-700 inset-0"></div>

        {!showLoginForm && !showRegisterForm && (
          <div className="z-10 text-center text-white p-4 flex flex-col items-center">
            <animated.div style={imageAnimation} className="mb-6">
              <img
                src={TeamWorkImage}
                alt="Team Work Image"
                className="mx-auto object-cover rounded-lg shadow-lg"
                style={{ maskImage: 'linear-gradient(to top, transparent, black)' }}
              />
            </animated.div>

            <img src={LogoPatren} alt="Logo" className="w-70 h-36" />

            <div className="flex mt-6 mr-4 p-4 space-x-4">
              <button
                onClick={toggleLoginForm}
                className="inline-block px-6 py-2 text-lg font-bold text-white bg-red-500 border-2 border-black rounded-lg shadow-md transition-all duration-300 transform hover:bg-white hover:text-red-500 hover:border-red-500 hover:shadow-lg active:bg-yellow-400 active:translate-y-1"
              >
                تسجيل الدخول
              </button>
              <button
                onClick={toggleRegisterForm}
                className="inline-block px-6 py-2 text-lg font-bold text-white bg-green-500 border-2 border-black rounded-lg shadow-md transition-all duration-300 transform hover:bg-white hover:text-green-500 hover:border-green-500 hover:shadow-lg active:bg-yellow-400 active:translate-y-1"
              >
                الاشتراك
              </button>
            </div>
          </div>
        )}

        {(showLoginForm || showRegisterForm) && (
          <>
            {showLoginForm && (
              <Login
                toggleRegisterForm={toggleRegisterForm}
                handleFormClose={handleFormClose}
                setLoading={setLoading}
              />
            )}
            {showRegisterForm && (
              <Register
                toggleLoginForm={toggleLoginForm}
                handleFormClose={handleFormClose}
                setLoading={setLoading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const TriangleShape = ({ img, className }) => (
  <div className={`${className} triangle`}>
    <img src={img} alt="Triangle shape" />
  </div>
);

export default Guest;
