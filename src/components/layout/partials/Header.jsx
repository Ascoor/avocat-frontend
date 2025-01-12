import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Notifications from '../../Tools/DropdownNotifications';
import UserMenu from '../../Tools/DropdownProfile';
import ThemeToggle from '../../Tools/ThemeToggle';
import HeaderToggle from './HeaderToggle';
import { useSidebar } from '../../../utils/SidebarContext';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isSidebarOpen, isMobile } = useSidebar();

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

 

  return (
    <header
      className={`bg-gradient-orange-dark to-indigo-700 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 fixed top-0 right-0 left-0 z-40 shadow-md transition-all duration-300
        ${
          isSidebarOpen && !isMobile
            ? 'md:mr-64'  // ✅ مساحة للشريط الجانبي المفتوح
            : 'md:mr-16'  // ✅ مساحة للشريط الجانبي المغلق
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* ✅ الشعار وزر القائمة */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <HeaderToggle />
 
        </div>

 

        {/* ✅ الإشعارات وأدوات التحكم */}
        <div className="flex items-center space-x-6 space-x-reverse">
          <Notifications align="right" />
          <ThemeToggle />
          <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
          <UserMenu align="left" />
          
   
        </div>
      </div>

      {/* ✅ قائمة الجوال */}
      
    </header>
  );
};

export default Header;
