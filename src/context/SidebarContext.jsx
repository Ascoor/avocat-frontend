import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Create Sidebar Context
const SidebarContext = createContext();

// Custom hook to use Sidebar Context
export const useSidebar = () => useContext(SidebarContext);

// Sidebar Provider Component
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const location = useLocation();

  // Update screen size state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change (for mobile)
  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [location.pathname, isMobile]);

  // Determine layout direction
  const layoutDirection = isMobile
    ? isSidebarOpen
      ? 'flex-col-reverse'
      : 'flex-col'
    : 'flex-row-reverse';

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isMobile,
        layoutDirection,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
