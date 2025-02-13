import React, { Suspense } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { useSidebar } from '../utils/SidebarContext';
import AuthRoutes from '../components/layout/AuthRoutes'; 

const AuthWrapper = () => {
  const { isSidebarOpen, isMobile } = useSidebar();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      {/* Sidebar */}
      {!isMobile && (
        <div className={`transition-all z-50 duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex z-50 flex-col">
        <Header />
        
        {/* Main Layout */}
        <div className="flex-1 overflow-y-auto p-4  bg-white dark:bg-gray-800">
          <main className="max-w-7xl mx-auto ">
            <div className="p-4 sm:p-6 lg:p-8 rounded shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
              
              {/* ✅ Lazy Loaded Routes with Suspense Fallback */}
               <AuthRoutes />
             
              
            </div>
          </main>
        </div>
      </div> 
    </div>
  );
};

export default AuthWrapper;
