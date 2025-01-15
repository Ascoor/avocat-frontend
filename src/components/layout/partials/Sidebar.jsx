 
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSidebar } from '../../../utils/SidebarContext';
import LogoGlobal from '../../global/LogoGlobal';
import { LogoArt, LogoSuit } from '../../../assets/img/index';
import { FaHome, FaUsers, FaFolder, FaCogs, FaGavel, FaFileInvoice, FaClipboardList, FaBriefcase, FaBalanceScale, FaMoneyBillWave, FaChevronDown } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Sidebar = () => {
  const { isSidebarOpen, isMobile, setIsSidebarOpen, autoCloseSidebar } = useSidebar();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // إغلاق الشريط عند تغيير الصفحة على الموبايل
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      autoCloseSidebar();
    }
  }, [location.pathname, isMobile, isSidebarOpen, autoCloseSidebar]);

  // إغلاق الشريط عند النقر خارج الشريط
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const links = [
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

  const dropdownLinks = [
    {
      label: 'الإدارة',
      icon: <FaCogs />,
      subLinks: [
        { to: '/users', label: 'المستخدمين', icon: <FaUsers /> },
        { to: '/courts', label: 'المحاكم', icon: <FaUsers /> },
      ],
    },
    {
      label: 'القضايا',
      icon: <FaFolder />,
      subLinks: [
        { to: '/legcases', label: 'القضايا القانونية', icon: <FaGavel /> },
        { to: '/consultations', label: 'الاستشارات', icon: <FaBalanceScale /> },
      ],
    },
  ];

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 right-0 z-30 
                    bg-gradient-to-b from-indigo-600 via-indigo-500 to-pink-300
                    dark:bg-gradient-blue-dark
                    shadow-2xl 
                    transform transition-transform duration-500 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0 w-64' : 'w-16'}
                    hidden md:block`}
      >
        <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
          {isSidebarOpen ? (
            <img src={LogoArt}  className='w-24 h-12' />
          ) : (
            <img src={LogoSuit} alt="Logo Suit" className="w-12 h-10" />
          )}
        </div>

        <nav className="flex flex-col flex-1 justify-center px-2 py-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center justify-between p-2 rounded-lg group transition-colors duration-300 ${
                  isActive ? 'bg-orange-500 dark:bg-red-500 font-bold text-white shadow-lg' : 'text-indigo-50 hover:bg-pink-200 hover:text-avocat-blue-light dark:text-cyan-100 dark:hover:bg-indigo-200  dark:hover:text-avocat-blue-dark'
                }`
              }
            >
              <span className="text-2xl flex-shrink-0">
                {link.icon}
              </span>
              {isSidebarOpen && (
                <span className="flex-1 text-center text-sm font-medium">
                  {link.label}
                </span>
              )}
            </NavLink>
          ))}

          {dropdownLinks.map((dropdown) => (
            <div key={dropdown.label}>
              <button
                onClick={() => toggleDropdown(dropdown.label)}
                className="flex items-center justify-between w-full p-2 text-gray-700 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-indigo-700 rounded-lg transition-all"
              >
                <div className="flex items-center">
                  <span className="text-2xl">{dropdown.icon}</span>
                  {isSidebarOpen && <span className="ml-3 font-bold">{dropdown.label}</span>}
                </div>
                {isSidebarOpen && (
                  <FaChevronDown
                    className={`transition-transform ${openDropdown === dropdown.label ? 'rotate-180' : ''}`}
                  />
                )}
              </button>

              {openDropdown === dropdown.label && isSidebarOpen && (
                <div className="ml-8 space-y-1">
                  {dropdown.subLinks.map((subLink) => (
                    <NavLink
                      key={subLink.to}
                      to={subLink.to}
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg transition-colors duration-300 ${
                          isActive ? 'bg-blue-400 text-white' : 'text-gray-600 hover:bg-pink-300 dark:text-gray-100 dark:hover:bg-indigo-600'
                        }`
                      }
                    >
                      <span className="text-lg">{subLink.icon}</span>
                      <span className="ml-3 text-sm">{subLink.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center w-full p-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all"
          >
            {isSidebarOpen ? <IoMdClose className="text-2xl" /> : <FaUsers className="text-2xl" />}
            {isSidebarOpen && <span className="ml-2">إغلاق</span>}
          </button>
        </div>
      </aside>

      {isMobile && isSidebarOpen && (
        <aside
          className="fixed inset-y-0 right-0 z-40 w-full bg-white dark:bg-gradient-to-b from-avocat-blue-darker to-avocat-blue shadow-lg transition-transform duration-300"
        >
          <div className="flex items-center justify-between h-16 border-b dark:border-gray-700 px-4">
            <LogoGlobal size="md" />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-red-500 hover:text-red-600"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          <nav className="flex flex-col flex-1 justify-center px-2 py-4 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center justify-between p-2 rounded-lg group transition-colors duration-300 ${
                    isActive ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                <span className="text-2xl flex-shrink-0">
                  {link.icon}
                </span>
                {isSidebarOpen && (
                  <span className="flex-1 text-center text-sm font-medium">
                    {link.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar; 
