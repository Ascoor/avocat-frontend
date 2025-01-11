import React from 'react';
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import MainContent from './Tools/MainContent';
import { useSidebar } from '../../utils/SidebarContext';

const Auth = () => {
  const { isSidebarOpen, isMobile } = useSidebar();

  // Dynamic sidebar width
  const sidebarWidth = !isMobile ? (isSidebarOpen ? '16rem' : '4rem') : '0';

  return (
    <div className="flex flex-col md:flex-row h-screen bg-lightBg dark:bg-gradient-night transition-colors duration-500">
      {/* Sidebar */}
      <div
        style={{ width: sidebarWidth }}
        className="transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg"
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <main className="grow">
            <div className="w-full max-w-9xl mx-auto">
              <div className="card-main p-4 sm:p-6 lg:p-8 rounded bg-white dark:bg-gray-800 shadow-md relative transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <MainContent />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Auth;
