import React from 'react';
import AuthRouter from '../Tools/AuthRoutes';
import { useSidebar } from '../../../utils/SidebarContext'; // ✅ استيراد الحالة

const MainContent = () => {
  const { isSidebarOpen, isMobile } = useSidebar(); // ✅ التحكم في الشريط الجانبي

  return (
    <div
      className={` transition-all duration-300 p-4 ${
        isSidebarOpen && !isMobile
          ? 'md:mr-64' // ✅ إضافة مساحة لليمين عندما يكون الشريط مفتوحًا على الشاشات الكبيرة
          : 'mr-0'
      }`}
    >
      <AuthRouter />
    </div>
  );
};

export default MainContent;
