import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaUserTie, FaUserAltSlash } from 'react-icons/fa';
const ClientUnclientList = () => {
  const buttons = [
    { label: 'عملاء بوكالة', to: '/clients/regular', icon: <FaUserTie /> },
    { label: 'عملاء بدون وكالة', to: '/clients/one-time', icon: <FaUserAltSlash /> },
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center tracking-wide">
        إدارة العملاء
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {buttons.map((button, index) => (
          <NavLink
            key={index}
            to={button.to}
            className={`
              text-white 
                  bg-gradient-red-button
                  hover:bg-gradient-blue-button
                  focus:ring-4 
                  focus:outline-none 
                  focus:ring-pink-300 
                  dark:bg-gradient-blue-button
                  dark:hover:bg-gradient-red-button
                  dark:focus:ring-blue-800 
                  shadow-lg shadow-pink-500/50 
                  dark:shadow-lg dark:shadow-blue-800/80 
              font-medium 
              rounded-lg 
              text-lg 
              px-6 
              py-5 
              flex 
              items-center 
              justify-center 
              transition-transform 
              transform 
              hover:scale-105
            `}
          >
            <span className="text-3xl mr-3">{button.icon}</span>
            {button.label}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default ClientUnclientList;

  
