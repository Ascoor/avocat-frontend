import React, { useState } from 'react';
import Login from '../../Authentication/Login';
import Register from '../../Authentication/Register';
import ShowSpinner from '../../../Tools/ShowSpinner';

const GlassCard = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormClose = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowRegisterForm(false);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowLoginForm(false);
  };

  if (isLoading) {
    return <ShowSpinner />;
  }

  return (
    <div className='relative overflow-hidden bg-no-repeat bg-cover bg-center rounded-none mb-0 p-20 min-h-screen flex items-center justify-center'>
      <div className='before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-800 before:to-pink-100 before:opacity-80'></div>
      {!showLoginForm && !showRegisterForm && (
        <div className='z-10 text-center text-white'>
          <h1
            className='text-5xl md:text-8xl mb-4 flex justify-center items-center font-bold'
            style={{ textShadow: '2px 2px 16px rgba(0,0,0,0.5)' }}
          >
            Hadathah <sup className='text-3xl md:text-6xl'>&reg;</sup>
          </h1>
          <button
            onClick={toggleLoginForm}
            type='button'
            className='text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-900'
          >
            <p className='text-xl font-bold'>Login</p>
          </button>
        </div>
      )}
      {(showLoginForm || showRegisterForm) && (
        <div className='z-20 text-center max-w-md mx-auto bg-white/30 backdrop-blur-sm rounded-lg p-5 glass-effect'>
          {showLoginForm && (
            <Login
              toggleRegisterForm={toggleRegisterForm}
              toggleLoginForm={handleFormClose}
              setIsLoading={setIsLoading}
            />
          )}
          {showRegisterForm && (
            <Register
              handleFormClose={handleFormClose}
              toggleLoginForm={toggleLoginForm}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      )}
      {/* Responsive Decorative Elements */}
      {/* Add your decorative elements here */}
    </div>
  );
};

export default GlassCard;
