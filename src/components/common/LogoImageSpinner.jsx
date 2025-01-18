import React from 'react';
import { LogoArt } from '../../assets/images/index'; // Adjusted import statement

const LogoImageSpinner = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <img src={LogoArt} alt='Logo Animation' className='logo-animation' />
    </div>
  );
};

export default LogoImageSpinner;
