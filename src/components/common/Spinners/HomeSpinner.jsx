import React from 'react';

const HomeSpinner = () => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
};

export default HomeSpinner;
