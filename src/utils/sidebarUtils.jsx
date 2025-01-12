// utils/sidebarUtils.js

export const getSidebarClasses = (isSidebarOpen, isMobile) => {
  if (isSidebarOpen) {
    return isMobile ? 'translate-x-0 w-full' : 'translate-x-0 w-64'; // يغطي كامل الشاشة على الموبايل
  } else {
    return isMobile ? 'translate-x-full w-full' : 'translate-x-0 w-20'; // مخفي على الموبايل أو مصغر على الكمبيوتر
  }
};

export const getHeaderClasses = (isSidebarOpen, isMobile) => {
  return isSidebarOpen && !isMobile ? 'md:mr-64' : 'mr-0'; // إضافة مساحة للهيدر على الشاشات الكبيرة
};

export const toggleSidebar = (isSidebarOpen, setIsSidebarOpen) => {
  setIsSidebarOpen(!isSidebarOpen); // فتح/إغلاق الشريط الجانبي
};
