import React, { useEffect, useState } from 'react';

const GlobalSpinner = () => {
  const [visible, setVisible] = useState(true);

  // ✅ إخفاء الـ Spinner بعد ثانية واحدة
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);  // Spinner يظهر لمدة 1 ثانية
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;  // ✅ إخفاء الـ Spinner بعد انتهاء الوقت

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-avocat-indigo dark:bg-gradient-day bg-opacity-50 backdrop-blur-sm z-50">
      {/* ✅ Spinner الدائري */}
    
<div className="spinner-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>    </div>
  );
};

export default GlobalSpinner;
 