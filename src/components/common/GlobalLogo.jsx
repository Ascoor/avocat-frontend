import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoBlue, LogoArt } from '../../assets/images/index';

const GlobalLogo = ({ size = 'md', theme = 'auto' }) => {
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
      className="flex items-center justify-center h-16  dark:border-gray-700 group"
    >
      {/* شعار الوضع النهاري */}
      {(isLightMode || isAutoMode) && (
        <img
          src={LogoBlue}
          alt="Logo Blue"
          className={`${sizeClasses[size]} ${
            isDarkMode ? 'hidden' : 'block dark:hidden'
          }  `}
        />
      )}

      {/* شعار الوضع الليلي */}
      {(isDarkMode || isAutoMode) && (
        <img
          src={LogoArt}
          alt="Logo Art"
          className={`${sizeClasses[size]} ${
            isLightMode ? 'hidden' : 'hidden dark:block'
          }  `}
        />
      )}
    </NavLink>
  );
};

export default GlobalLogo;
