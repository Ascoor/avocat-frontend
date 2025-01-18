import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoBlue, LogoArt } from '../../assets/images/index';

const LogoGlobal = ({ size = 'md', theme = 'auto' }) => {
  // تحديد حجم الشعار بناءً على قيمة prop
  const sizeClasses = {
    sm: 'w-16 h-8',  // صغير
    md: 'w-28 h-12', // متوسط (افتراضي)
    lg: 'w-64 h-32', // كبير
  };

  // تحديد نمط العرض بناءً على قيمة theme
  const isLightMode = theme === 'light';
  const isDarkMode = theme === 'dark';
  const isAutoMode = theme === 'auto';

  return (
    <NavLink
      to="/"
      className="flex items-center justify-center h-16 border-b dark:border-gray-700 group"
    >
      {/* شعار الوضع النهاري */}
      {(isLightMode || isAutoMode) && (
        <img
          src={LogoBlue}
          alt="Logo Blue"
          className={`${sizeClasses[size]} ${
            isDarkMode ? 'hidden' : 'block dark:hidden'
          } transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
        />
      )}

      {/* شعار الوضع الليلي */}
      {(isDarkMode || isAutoMode) && (
        <img
          src={LogoArt}
          alt="Logo Art"
          className={`${sizeClasses[size]} ${
            isLightMode ? 'hidden' : 'hidden dark:block'
          } transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
        />
      )}
    </NavLink>
  );
};

export default LogoGlobal;
