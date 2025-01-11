import React, { useState, useEffect } from 'react';

const SectionHeader = ({ imageSrc, sectionTitle, children, isDarkMode }) => {
  // ضبط ألوان التأثيرات بناءً على الوضع الليلي أو الفاتح
  const neonColor = isDarkMode ? '#72bcd4' : '#b57edc';
  const textShadowColor = isDarkMode ? '#46606f' : '#b27edc';

  // تأثيرات الانتقال بين الألوان والوضعيات
  useEffect(() => {
    document.documentElement.style.transition =
      'color 0.2s, background-color 0.2s';
  }, [isDarkMode]);

  return (
    <div
      className='flex flex-col items-center justify-center mb-8 p-4 rounded-lg shadow-lg text-center bg-white dark:bg-gray-900'
      style={{
        boxShadow: `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 20px ${neonColor}`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* مركز الصورة والعنوان */}
      <div className='flex flex-col items-center mb-4'>
        <img
          src={imageSrc}
          alt='Section Logo'
          className='flex-shrink-0 w-16 h-16 md:w-24 md:h-24 lg:w-40 lg:h-40 mb-4 rounded-full shadow-md'
        />
        <h1
          className={`text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-white font-bold uppercase`}
          style={{
            textShadow: `
              0 1px 0 ${textShadowColor},
              0 0 5px ${neonColor},
              0 0 10px ${neonColor}
            `,
          }}
        >
          {sectionTitle}
        </h1>
      </div>

      {/* عرض محتوى التبويبات بشكل طبيعي */}
      {children && (
        <div className='mt-4 w-full'>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
