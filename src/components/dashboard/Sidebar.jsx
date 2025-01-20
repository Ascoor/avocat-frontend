import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '../../utils/SidebarContext';
import { useSpring, animated } from '@react-spring/web';

import { LogoArt, LogoSuit } from '../../assets/images/index';
import {
  FaHome,
  FaBars,
  FaFolder,
  FaUsers,
  FaCogs,
  FaFileInvoice,
  FaClipboardList,
  FaBriefcase,
  FaBalanceScale,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, isMobile } = useSidebar();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

  const sidebarAnimation = useSpring({
    width: isSidebarOpen ? '16rem' : '4rem',
    config: { tension: 220, friction: 20 },
  });

  return (
    <div className="flex">
      <animated.div
        style={sidebarAnimation}
        className={`fixed top-0 right-0 h-full bg-gradient-to-b from-indigo-600 via-indigo-500 to-pink-300 dark:bg-gradient-blue-dark shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } hidden md:flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16">
          {isSidebarOpen ? (
            <img src={LogoArt} alt="Logo Art" className="w-28 h-14" />
          ) : (
            <img src={LogoSuit} alt="Logo Suit" className="mt-4 w-12 h-12" />
          )}
        </div>

        {/* Menu */}
        <ul className="mt-8 flex-1">
          {menuItems.map((item, index) => (
            <li key={index} className="group relative">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex ${
                    isSidebarOpen
                      ? 'items-center space-x-4 pl-4'
                      : 'items-center justify-center'
                  } font-bold p-3 rounded-lg group transition-colors duration-300 ${
                    isActive
                      ? 'bg-pink-600 dark:bg-orange-500 text-white shadow-md'
                      : 'text-gray-100 hover:bg-pink-300 hover:text-blue-900   dark:hover:bg-avocat-indigo-light'
                  }`
                }
              >
                <span
                  className={`text-xl ${
                    isSidebarOpen ? 'ml-4' : 'text-center'
                  }`}
                >
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="text-sm sm:text-base text-left">
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute bottom-4 right-4 p-2 bg-red-700 text-white rounded-full hover:bg-indigo-500 transition-colors"
        >
          {isSidebarOpen ? <IoMdClose /> : <FaBars />}
        </button>
      </animated.div>

      {/* Mobile Sidebar */}
      {isMobile && (
        <div className="md:hidden">
          {isSidebarOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-700 via-indigo-600 to-indigo-500 dark:bg-gradient-blue-dark text-white z-40">
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={toggleSidebar}
                  className="text-2xl focus:outline-none"
                >
                  <IoMdClose />
                </button>
              </div>
              <ul className="flex flex-col items-center">
                {menuItems.map((item, index) => (
                  <li key={index} className="group">
                    <NavLink
                      to={item.to}
                      className="flex flex-col items-center w-full p-3 hover:bg-gray-700 focus:outline-none"
                    >
                      <span className="text-xl mb-1">{item.icon}</span>
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
