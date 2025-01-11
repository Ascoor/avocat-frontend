import React, { useState,useEffect  } from 'react';

import { useSpring, animated } from '@react-spring/web';
import Login from './AuthTool/Login';
import Register from './AuthTool/Register';
import ShowSpinner from '../Tools/ShowSpinner';
import { TeamWorkImage , LogoText  } from '../../assets/img';
import LogoGlobal from './partials/Tools/LogoGlobal';

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
    {/* الخلفية */}
    <div className="absolute inset-0 "></div>

    {/* محتوى الصفحة */}
    {!showLoginForm && !showRegisterForm && (
      <div className="z-10 text-center text-white p-4 flex flex-col items-center">
        {/* صورة الفريق */}
        <animated.div style={imageAnimation} className="mb-6">
          <img
            src={TeamWorkImage}
            alt="Team Work Image"
            className="mx-auto object-cover rounded-lg shadow-lg"
            style={{
              maskImage: 'linear-gradient(to top, transparent, black)',
            }}
          />
        </animated.div>

        {/* الشعار */}
        <LogoGlobal size="lg" />


        {/* زر تسجيل الدخول */}
        <div className="flex mt-6 mr-4 p-4">
       <button
         onClick={toggleLoginForm}
         className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
       >
         تسجيل الدخول
       </button>
       <button
         onClick={toggleRegisterForm}
         className="bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
       >
         الاشتراك
       </button>
     </div>
      </div>
    )}

{(showLoginForm || showRegisterForm) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-sm sm:max-w-md lg:max-w-lg">
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
          </div>
        </div>
    )}
  </div>
</div>

  );
};

const TriangleShape = ({ img, className }) => (
  <div className={`${className} triangle`}>
    <img src={img} alt='Triangle shape' />
  </div>
);

export default Guest;
