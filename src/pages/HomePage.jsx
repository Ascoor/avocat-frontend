import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { TeamWorkImage, LogoPatren } from '../assets/images';
import { useAlert } from '../context/AlertContext';
import GlobalSpinner from '../components/common/GlobalSpinner';

const HomePage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { triggerAlert } = useAlert();

  const handleFormClose = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleAuthStart = () => {
    setIsLoading(true);
  };

  const handleAuthComplete = (success, message) => {
    setIsLoading(false);
    if (success) {
      handleFormClose();
      triggerAlert('success', message);
    } else {
      triggerAlert('error', message);
    }
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
    transform: isImageLoaded ? 'translateY(0%)' : 'translateY(100%)',
    opacity: isImageLoaded ? 1 : 0,
    config: { duration: 1000 },
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-cover bg-center flex flex-col items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute bg-gradient-day dark:via-gray-800 dark:to-gray-700 inset-0"></div>

      {!showLoginForm && !showRegisterForm && (
        <div className="z-50 text-center text-white p-4 flex flex-col items-center">
          {/* Teamwork Image with Mask */}
          <animated.div
            style={imageAnimation}
            className="relative w-full max-w-[661px] aspect-[661/377] overflow-hidden"
          >
            <img
              src={TeamWorkImage}
              alt="Team Work"
              className="object-cover w-full h-full rounded-lg shadow-lg"
              onLoad={() => setIsImageLoaded(true)}
              style={{
                maskImage: 'linear-gradient(to top, transparent, black)',
                WebkitMaskImage: 'linear-gradient(to top, transparent, black)',
              }}
            />
          </animated.div>

          <img
            src={LogoPatren}
            alt="Logo"
            className="mt-6 w-[288px] max-w-full aspect-[2/1] h-auto"
          />

          <div className="flex flex-col sm:flex-row items-center mt-4 mr-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={toggleLoginForm}
              className="px-6 py-2 text-lg font-bold bg-red-500 text-white rounded-lg"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={toggleRegisterForm}
              className="px-6 py-2 text-lg font-bold bg-green-500 text-white rounded-lg"
            >
              الاشتراك
            </button>
          </div>
        </div>
      )}

      {/* ✅ عرض التحميل أثناء العملية */}
      {isLoading && <GlobalSpinner />}

      {/* ✅ نماذج تسجيل الدخول والتسجيل مع تحسين z-index */}
      {showLoginForm && (
        <Login
          onAuthStart={handleAuthStart}
          handleFormClose={handleFormClose}
          toggleRegisterForm={toggleRegisterForm}
          onAuthComplete={handleAuthComplete}
        />
      )}

      {showRegisterForm && (
        <Register
          onAuthStart={handleAuthStart}
          handleFormClose={handleFormClose}
          onAuthComplete={handleAuthComplete}
        />
      )}
    </div>
  );
};

export default HomePage;
