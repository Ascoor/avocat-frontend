import React, { createContext, useContext, useState } from 'react';
import GlobalAlert from '../components/common/GlobalAlert';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const triggerAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000); // إخفاء التنبيه بعد 5 ثوانٍ
  };

  return (
    <AlertContext.Provider value={{ alert, triggerAlert }}>
      {children}
      {alert && <GlobalAlert type={alert.type} message={alert.message} />}
    </AlertContext.Provider>
  );
};
