// LoadingFallback.js
import React from 'react';

const LoadingFallback = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
    }}>
      <div style={{ color: '#3a3b3c', fontSize: '24px' }}>
        Loading...
      </div>
    </div>
  );
};

export default LoadingFallback;
