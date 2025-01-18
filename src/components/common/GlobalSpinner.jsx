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
 
    <div className="loader">
      <div className="tars">
        <div className="container 1">
          <div className="shape">
            <div className="f"></div>
            <div className="b"></div>
            <div className="l"></div>
            <div className="r"></div>
            <div className="t"></div>
            <div className="bot"></div>
          </div>
        </div>
        <div className="container 2">
          <div className="shape">
            <div className="f"></div>
            <div className="b"></div>
            <div className="l"></div>
            <div className="r"></div>
            <div className="t"></div>
            <div className="bot"></div>
          </div>
        </div>
        <div className="container 3">
          <div className="shape">
            <div className="f"></div>
            <div className="b"></div>
            <div className="l"></div>
            <div className="r"></div>
            <div className="t"></div>
            <div className="bot"></div>
          </div>
        </div>
        <div className="container 4">
          <div className="shape">
            <div className="f"></div>
            <div className="b"></div>
            <div className="l"></div>
            <div className="r"></div>
            <div className="t"></div>
            <div className="bot"></div>
          </div>
        </div>
      </div>
    </div> </div>
  );
};

export default GlobalSpinner;
 