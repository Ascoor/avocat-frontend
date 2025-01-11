import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoBlue, LogoArt } from '../../../../assets/img/index';

const LogoGlobal = () => {
  return (
    <NavLink to="/" className="flex items-center justify-center h-16 border-b dark:border-gray-700">
      {/* شعار الوضع النهاري */}
      <img
        src={LogoBlue}
        alt="Logo Blue"
        className="w-28 h-12 block dark:hidden transition-all duration-300"
      />
      {/* شعار الوضع الليلي */}
      <img
        src={LogoArt}
        alt="Logo Art"
        className="w-28 h-12 hidden dark:block transition-all duration-300"
      />
    </NavLink>
  );
};

export default LogoGlobal;
