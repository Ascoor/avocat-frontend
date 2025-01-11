import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [isHeaderFullScreen, setIsHeaderFullScreen] = useState(window.innerWidth <= 640); // Initial screen state
  const [timer, setTimer] = useState(null);
  const location = useLocation();

  // Handle window resize to update isMobile and isHeaderFullScreen
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 640;
      setIsMobile(isNowMobile);
      setIsHeaderFullScreen(isNowMobile); // Enable fullscreen for mobile devices
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures this effect runs only once on mount

  // Close sidebar after 2 seconds when it's open
  const autoCloseSidebar = () => {
    if (timer) clearTimeout(timer); // Clear previous timeout

    if (isSidebarOpen) {
      const newTimer = setTimeout(() => {
        setIsSidebarOpen(false);
      }, 2000);
      setTimer(newTimer);
    }
  };

  // Close sidebar when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.closest('.sidebar')) return; // If click inside sidebar, do nothing
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  // Close sidebar on route change
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
      setIsHeaderFullScreen(true); // Make header fullscreen on mobile
    }
  }, [location.pathname, isMobile]); // Only trigger when location changes or mobile state changes

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isMobile,
        isHeaderFullScreen, // Provide fullscreen state for header
        autoCloseSidebar,
        handleClickOutside, // Provide handleClickOutside for sidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
