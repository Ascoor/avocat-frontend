import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useSidebar } from '../../../utils/SidebarContext';
import LogoGlobal from './Tools/LogoGlobal';
import { LogoSuit } from '../../../assets/img/index';
import {
  FaHome, FaUsers, FaFolder, FaCogs, FaFileInvoice, FaClipboardList, FaBriefcase, FaBalanceScale, FaMoneyBillWave
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Sidebar = () => {
  const { isSidebarOpen, isMobile, setIsSidebarOpen, autoCloseSidebar, isHeaderFullScreen } = useSidebar();
  const location = useLocation();
  const { pathname } = location;
  const sidebarRef = useRef(null);

  // إغلاق الشريط الجانبي على الجوال عند التنقل
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      autoCloseSidebar();
    }
  }, [isMobile, isSidebarOpen, autoCloseSidebar]);

  // إغلاق الشريط الجانبي عند النقر خارج الشريط
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobile, isSidebarOpen]);

  // روابط الأقسام
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

  return (
    <aside
      ref={sidebarRef}
      className={`fixed inset-y-0 right-0 z-30 bg-white dark:bg-gradient-to-b from-avocat-blue-darker to-avocat-blue shadow-lg transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* ✅ الشعار يتغير حسب حالة الشريط */}
      <div
        className={`flex items-center justify-center h-16 border-b dark:border-gray-700 ${
          !isSidebarOpen ? 'bg-avocat-blue dark:bg-avocat-blue-darker' : ''
        }`}
      > 
          {isSidebarOpen ? (
            <LogoGlobal />
          ) : (
            <img
              src={LogoSuit}
              alt="Logo Suit"
              className="w-12 h-12 transition-transform duration-300"
            />
          )} 
      </div>

      {/* روابط الشريط الجانبي */}
      <nav className="flex flex-col flex-1 justify-center px-2 py-4 space-y-2">
        {links.map((link) => (
          <NavLink
  key={link.to}
  to={link.to}
  className={({ isActive }) =>
    `flex items-center ${
      isSidebarOpen ? 'justify-start' : 'justify-center'
    } p-2 rounded-lg group transition-colors duration-300 ${
      isActive
        ? 'bg-blue-500 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
    }`
  }
>
  {/* ✅ الأيقونة دائمًا على اليمين */}
  <span className={`text-2xl flex-shrink-0 ${isSidebarOpen ? 'mr-3' : ''}`}>
    {link.icon}
  </span>

  {/* ✅ العنوان في المنتصف عند الفتح */}
  {isSidebarOpen && (
    <span className="flex-1 text-center text-sm font-medium">
      {link.label}
    </span>
  )}
</NavLink>

        ))}
      </nav>

      {/* زر إغلاق الشريط */}
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
  );
};

export default Sidebar;
