import React, { Suspense, useState } from 'react';
import { useTransition, useSpring, animated } from '@react-spring/web';
import { RiLoginCircleLine, RiUserAddLine } from 'react-icons/ri';
import { LogoPatren } from '../../assets/img/index';
import WelcomeSuspense from './Tools/WelcomeSuspense';

const Login = React.lazy(() => import('./AuthTool/Login'));
const Register = React.lazy(() => import('./AuthTool/Register'));

const Guest = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLogoAndButtons, setShowLogoAndButtons] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCloseForm = () => {
    setLoading(true);
    setTimeout(() => {
      setShowRegisterForm(false);
      setShowLoginForm(false);
      setLoading(false);
      setShowLogoAndButtons(true);
    }, 1000); // Simulate a loading delay
  };

  const handleShowLoginForm = () => {
    setLoading(true);
    setTimeout(() => {
      setShowLoginForm(true);
      setShowLogoAndButtons(false);
      setLoading(false);
    }, 1000); // Simulate a loading delay
  };

  const handleShowRegisterForm = () => {
    setLoading(true);
    setTimeout(() => {
      setShowLogoAndButtons(false);
      setShowRegisterForm(true);
      setLoading(false);
    }, 1000); // Simulate a loading delay
  };

  const formsTransition = useTransition(showLoginForm || showRegisterForm, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const logoAnimation = useSpring({
    opacity: showLogoAndButtons ? 1 : 0,
    transform: showLogoAndButtons ? 'translateY(0)' : 'translateY(-100px)',
    from: { opacity: 0, transform: 'translateY(-100px)' },
    delay: 500,
  });

  const buttonsAnimation = useSpring({
    opacity: showLogoAndButtons ? 1 : 0,
    transform: showLogoAndButtons ? 'translateY(0)' : 'translateY(100px)',
    from: { opacity: 0, transform: 'translateY(100px)' },
    delay: showLogoAndButtons ? 500 : 0,
  });

  return (
    <div className="relative h-screen bg-gradient-to-br from-gray-800 via-red-800 to-gray-900 text-white flex flex-col">
      {/* Splash Mask */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative flex flex-col justify-center items-center flex-grow">
        {loading ? (
          <WelcomeSuspense />
        ) : (
          <>
            {showLogoAndButtons && (
              <animated.div style={logoAnimation} className="mb-8">
                <img
                  src={LogoPatren}
                  alt="Pattern Logo"
                  className="w-64 h-auto"
                />
              </animated.div>
            )}

            {showLogoAndButtons && (
              <animated.div style={buttonsAnimation}>
                <div className="flex space-x-4">
                  <button
                    onClick={handleShowLoginForm}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
                  >
                    <RiLoginCircleLine className="mr-2" />
                    دخول
                  </button>
                  <button
                    onClick={handleShowRegisterForm}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center"
                  >
                    <RiUserAddLine className="mr-2" />
                    تسجيل اشتراك
                  </button>
                </div>
              </animated.div>
            )}

            <Suspense fallback={<div>Loading...</div>}>
              {formsTransition((styles, item) =>
                item ? (
                  <animated.div style={styles}>
                    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 w-11/12 max-w-md">
                      {showLoginForm && (
                        <Login
                          className="form-content"
                          handleCloseForm={handleCloseForm}
                        />
                      )}
                      {showRegisterForm && (
                        <Register
                          className="form-content"
                          handleCloseForm={handleCloseForm}
                        />
                      )}
                    </div>
                  </animated.div>
                ) : null
              )}
            </Suspense>
          </>
        )}
      </div>

      <footer className="bg-gradient-to-r from-gray-800 via-red-600 to-gray-900 text-center py-3">
        <p className="m-0">&copy; {new Date().getFullYear()} Avocat All rights reserved</p>
      </footer>
    </div>
  );
};

export default Guest;
