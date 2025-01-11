// LogoGlobal.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoBlue, LogoArt } from '../../../../assets/img/index';

const LogoGlobal = ({ size = 'md' }) => {
  // تحديد حجم الشعار بناءً على قيمة prop
  const sizeClasses = {
    sm: 'w-16 h-8',  // صغير
    md: 'w-28 h-12', // متوسط (افتراضي)
    lg: 'w-64 h-32', // كبير
  };

  return (
    <NavLink to="/" className="flex items-center justify-center h-16 border-b dark:border-gray-700">
      {/* شعار الوضع النهاري */}
      <img
        src={LogoBlue}
        alt="Logo Blue"
        className={`${sizeClasses[size]} block dark:hidden transition-all duration-300`}
      />
      {/* شعار الوضع الليلي */}
      <img
        src={LogoArt}
        alt="Logo Art"
        className={`${sizeClasses[size]} hidden dark:block transition-all duration-300`}
      />
    </NavLink>
  );
};

export default LogoGlobal;
