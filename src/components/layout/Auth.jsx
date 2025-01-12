import React from 'react'; 
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import { useSidebar } from '../../utils/SidebarContext';
import AuthRoutes from './Tools/AuthRoutes';

const AuthWrapper = () => {
  const { isSidebarOpen, isMobile } = useSidebar();

  // عرض الشريط الجانبي المتجاوب
  const sidebarWidth = !isMobile ? (isSidebarOpen ? '16rem' : '4rem') : '0';

  return (
    
    <div className="flex flex-col md:flex-row h-screen font-['cairo'] bg-gray-50 dark:bg-gray-900 transition-all duration-500 ease-in-out">
      <div style={{ width: sidebarWidth }} className="transition-all duration-500 ease-in-out">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out">
        <Header />
        <div className="flex-1 overflow-y-auto p-4">
          <main className="grow">
            <div className="w-full max-w-9xl mx-auto">
              <div className="card-main p-4 sm:p-6 lg:p-8 rounded bg-white mt-4 dark:bg-gray-800 shadow-md relative transition-shadow duration-500 ease-in-out hover:shadow-lg">
                <AuthRoutes />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
