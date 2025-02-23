import React from 'react';
import Notifications from '../common/DropdownNotifications';
import UserMenu from '../common/DropdownProfile';
import ThemeToggle from '../common/ThemeToggle';
import HeaderToggle from '../common/HeaderToggle';
import { useSidebar } from '../../utils/SidebarContext';

import { useSpring, animated } from '@react-spring/web';
const Header = () => {
  const { isSidebarOpen, isMobile } = useSidebar();
 // Use spring to animate the header's margin when sidebar opens/closes
 const headerStyle = useSpring({
  marginRight: isSidebarOpen && !isMobile ? '-16rem' : '4rem',
  config: { tension: 210, friction: 20 }, // Adjust speed and smoothness
});

  return (
    <animated.header
    style={headerStyle}
    className={`bg-gradient-to-r from-avocat-indigo via-avocat-indigo to-avocat-blue-light dark:bg-gradient-to-r dark:from-avocat-blue-dark dark:via-avocat-indigo-darker dark:to-avocat-blue-darker fixed top-0 right-0 left-0 z-20 shadow-lg transition-all duration-300`}
  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <HeaderToggle />

        {/* ✅ الإشعارات وأدوات التحكم */}
        <div className="flex items-center space-x-6 space-x-reverse">
          <Notifications align="right" />
          <ThemeToggle />
          <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
          <UserMenu align="left" />
        </div>
      </div>

      {/* ✅ قائمة الجوال */}
    </animated.header>
  );
};

export default Header;
