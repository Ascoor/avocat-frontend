import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { useSidebar } from "../utils/SidebarContext";
import AuthRoutes from "../components/layout/AuthRoutes";

const AuthWrapper = () => {
  const { isSidebarOpen, isMobile } = useSidebar();
  
  // التحكم في عرض الشريط الجانبي
  const sidebarWidth = !isMobile ? (isSidebarOpen ? "18rem" : "5rem") : "0";

  return (
    <div 
      className="
        flex flex-col md:flex-row h-screen font-['cairo'] 
        transition-all duration-500 ease-in-out
        bg-gradient-to-br from-gray-100 to-gray-300 
        dark:from-gray-900 dark:to-black 
        dark:bg-opacity-90 relative
      "
    >
      
      {/* الشريط الجانبي مع تأثير نيون */}
      <div 
        style={{ width: sidebarWidth }} 
        className="transition-all duration-500 ease-in-out shadow-lg dark:shadow-neon"
      >
        <Sidebar />
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out">
        
        {/* شريط العنوان مع تأثير نيون */}
        <Header className="shadow-md dark:shadow-neon border-b border-gray-200 dark:border-gray-800" />

        {/* منطقة المحتوى */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8  bg-gray-200 dark:bg-gray-900 ">
          <div className=" mx-auto max-w-7xldark:shadow-xl rounded-lg p-0">
            <main className="grow">
              <AuthRoutes />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
