// 📦 Sidebar Component for Legal Office Management
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '../../utils/SidebarContext';
import { useSpring, animated } from '@react-spring/web';

import { LogoArt, LogoSuit } from '../../assets/images/index';
import {
  FaHome, FaBars, FaFolder, FaUsers, FaCogs,
  FaFileInvoice, FaClipboardList, FaBriefcase,
  FaBalanceScale, FaMoneyBillWave
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

// ✅ Sidebar Component
const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, isMobile } = useSidebar();
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ Toggle sidebar open/close
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // ✅ Toggle submenu expansion
  const toggleSubmenu = (index) => setActiveIndex(activeIndex === index ? null : index);

  // ✅ Sidebar menu items
  const menuItems = [
    { to: '/', icon: <FaHome />, label: 'الرئيسية' },
    { to: '/clients', icon: <FaUsers />, label: 'العملاء' },
    { to: '/legcases', icon: <FaFolder />, label: 'القضايا' },
    { to: '/services', icon: <FaCogs />, label: 'الخدمات' },
    { to: '/procedures', icon: <FaClipboardList />, label: 'الإجراءات' },
    { to: '/invoices', icon: <FaFileInvoice />, label: 'الفواتير' },
    { to: '/consultations', icon: <FaBalanceScale />, label: 'الاستشارات' },
    { to: '/expenses', icon: <FaMoneyBillWave />, label: 'المصروفات' },
    { to: '/contracts', icon: <FaBriefcase />, label: 'العقود' },
  ];

  // ✅ Sidebar animation for expand/collapse
  const sidebarAnimation = useSpring({
    width: isSidebarOpen ? '16rem' : '5rem',
    config: { tension: 220, friction: 20 },
  });

  // ✅ Logo animation for smooth transition
  const logoAnimation = useSpring({
    opacity: 1,
    transform: isSidebarOpen ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 220, friction: 20 },
  });

  return (
    <div className="flex">
      {/* ✅ Sidebar for larger screens */}
      <animated.div style={sidebarAnimation} className={`fixed top-0 right-0 h-full bg-gradient-to-b from-indigo-600 via-indigo-500 to-pink-300 dark:bg-gradient-blue-dark shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'} hidden md:flex flex-col`}>
        <div className="flex items-center justify-center h-16">
          <animated.div style={logoAnimation}>
            {isSidebarOpen ? (
              <img src={LogoArt} alt="Logo Art" className="w-28 h-14" />
            ) : (
              <img src={LogoSuit} alt="Logo Suit" className="mt-4 w-16 h-16" />
            )}
          </animated.div>
        </div>

        <ul className="mt-8 flex-1">
          {menuItems.map((item, index) => (
            <li key={index} className="group relative">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-start font-bold p-3 rounded-lg group transition-colors duration-300 ${
                    isActive
                      ? 'bg-avocat-indigo-dark dark:bg-avocat-orange text-white shadow-xl'
                      : 'text-indigo-50 hover:bg-avocat-orange-light hover:text-avocat-blue-dark dark:text-cyan-100 dark:hover:bg-avocat-orange-light dark:hover:text-avocat-indigo-dark'
                  }`
                }
              >
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl mr-4">{item.icon}</span>
                {isSidebarOpen && <span className="text-sm sm:text-base md:text-lg lg:text-xl">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </animated.div>

      {/* ✅ Sidebar for mobile screens */}
      {isMobile && (
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="p-3 fixed top-2 left-2 z-50 bg-gray-900 text-white rounded-full">
            <FaBars />
          </button>
          {isSidebarOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-avocat-indigo via-avocat-indigo to-avocat-indigo-dark dark:bg-gradient-blue-dark text-white z-40 overflow-y-auto">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-bold">القائمة</h2>
                <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                  <IoMdClose />
                </button>
              </div>
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index} className="group">
                    <NavLink
                      to={item.to}
                      className="flex items-center w-full p-3 hover:bg-gray-700 focus:outline-none"
                    >
                      <span className="text-xl mr-4">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
