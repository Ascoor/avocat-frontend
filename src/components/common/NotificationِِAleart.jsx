import React, { useEffect, useState } from 'react';

const Notification = ({ message, type, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setVisible(true); // إظهار الإشعار عند وجود رسالة
      const timer = setTimeout(() => {
        setVisible(false); // إخفاء الإشعار بعد مدة
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!message || !visible) return null;

  const color = type === 'error' ? 'red' : 'green';
  return (
    <div
      className={`bg-${color}-100 border text-center border-${color}-400 text-${color}-700 px-4 py-3 rounded relative`}
      role='alert'
    >
      {type === 'error' ? (
        <strong className='font-bold'>خطأ: </strong>
      ) : (
        <strong className='font-bold'></strong>
      )}
      <span className='block sm:inline'>{message}</span>
    </div>
  );
};

export default Notification;
