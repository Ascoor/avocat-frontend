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
  FaBriefcase,
  FaBalanceScale,
  FaMoneyBillWave,
  FaUserAltSlash,
  FaUserTie,
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, isMobile } = useSidebar();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { to: '/', icon: <FaHome />, label: 'الرئيسية' },
    { to: '/legcases', icon: <FaFolder />, label: 'القضايا' },
    {
      to: '/clients',
      icon: <FaUsers />,
      label: 'العملاء',
    },
    { to: '/legcase-services', icon: <FaCogs />, label: 'الخدمات' },
    { to: '/invoices', icon: <FaFileInvoice />, label: 'الفواتير' },
    { to: '/consultations', icon: <FaBalanceScale />, label: 'الاستشارات' },
    { to: '/expenses', icon: <FaMoneyBillWave />, label: 'المصروفات' },
    { to: '/search-courts-api', icon: <FaBriefcase />, label: 'بحث المحاكم' },
    {
      to: '/managment-settings',
      icon: <FaCogs />,
      label: 'إدارة المكتب',
      subItems: [
        {
          to: '/managment-settings/lawyers',
          label: 'المحامون',
          icon: <FaUsers />,
        },
        {
          to: '/managment-settings/procedures',
          label: 'الإجراءات',
          icon: <FaUsers />,
        },
        {
          to: '/managment-settings/courts',
          label: 'المحاكم',
          icon: <FaUsers />,
        },
      ],
    },
  ];

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleToggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const sidebarAnimation = useSpring({
    width: isSidebarOpen ? '16rem' : '4rem',
    config: { tension: 210, friction: 20 },
  });

  return (
    <div className="flex">
      <animated.div
        style={sidebarAnimation}
        className="fixed top-0 right-0 h-full bg-gradient-to-b from-avocat-blue-light via-avocat-indigo to-gray-300 dark:bg-gradient-to-t dark:from-avocat-indigo-darker dark:via-avocat-blue-darker dark:to-avocat-blue shadow-lg z-30 hidden md:flex flex-col"
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
                onClick={() => item.subItems && handleToggleSubMenu(index)}
                className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
                  isSidebarOpen
                    ? 'space-x-4 text-gray-100 hover:bg-pink-300 hover:text-blue-900 dark:hover:bg-avocat-indigo-light'
                    : 'justify-center'
                } ${
                  openSubMenu === index
                    ? 'bg-pink-600 dark:bg-orange-500 text-white shadow-md'
                    : 'text-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isSidebarOpen && <span className="flex-1">{item.label}</span>}
              </NavLink>

              {/* Sub-menu */}
              {item.subItems && openSubMenu === index && (
                <ul
                  className={`mt-2 space-y-2 ${
                    isSidebarOpen ? 'pl-10' : 'flex flex-col items-center'
                  }`}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={subItem.to}
                        className={`flex items-center p-2 text-gray-100 hover:bg-pink-300 dark:hover:bg-avocat-indigo-light ${
                          isSidebarOpen ? 'space-x-4' : 'justify-center'
                        }`}
                      >
                        <span className="text-xl">{subItem.icon}</span>
                        {isSidebarOpen && <span>{subItem.label}</span>}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
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
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-t from-avocat-blue-dark via-avocat-indigo-dark to-avocat-orange dark:bg-gradient-to-t dark:from-avocat-indigo-darker dark:via-avocat-blue-dark dark:to-avocat-indigo-darker text-white z-40">
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={toggleSidebar}
                  className="text-2xl focus:outline-none"
                >
                  <IoMdClose />
                </button>
              </div>
              <ul className="flex flex-col items-center space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index} className="w-full text-center">
                    <NavLink
                      to={item.to}
                      className="flex flex-col items-center w-full p-4 hover:bg-gray-700 focus:outline-none"
                    >
                      <span className="text-3xl mb-2">{item.icon}</span>
                      <span className="text-lg">{item.label}</span>
                    </NavLink>

                    {/* عرض الأيقونات الفرعية في الشريط الجوال */}
                    {item.subItems && (
                      <ul className="mt-2 space-y-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex} className="w-full">
                            <NavLink
                              to={subItem.to}
                              className="flex flex-col items-center p-4 hover:bg-pink-300 dark:hover:bg-avocat-indigo-light text-center"
                            >
                              <span className="text-2xl mb-1">
                                {subItem.icon}
                              </span>
                              <span className="text-sm">{subItem.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
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
