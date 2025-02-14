import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../utils/SidebarContext";
import { useSpring, animated } from "@react-spring/web";

import { LogoArt, LogoSuit } from "../../assets/images/index";
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
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, isMobile } = useSidebar();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { to: "/", icon: <FaHome />, label: "الرئيسية" },
    { to: "/legcases", icon: <FaFolder />, label: "القضايا" },
    { to: "/clients", icon: <FaUsers />, label: "العملاء" },
    { to: "/legcase-services", icon: <FaCogs />, label: "الخدمات" },
    { to: "/invoices", icon: <FaFileInvoice />, label: "الفواتير" },
    { to: "/consultations", icon: <FaBalanceScale />, label: "الاستشارات" },
    { to: "/expenses", icon: <FaMoneyBillWave />, label: "المصروفات" },
    { to: "/contracts", icon: <FaBriefcase />, label: "العقود" },
  ];

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleToggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const sidebarAnimation = useSpring({
    width: isSidebarOpen ? "16rem" : "4rem",
    config: { tension: 210, friction: 20 },
  });

  return (
    <>
      {/* الشريط الجانبي */}
      <animated.div
        style={sidebarAnimation}
       className="fixed top-0 right-0 h-full bg-gradient-to-b from-avocat-blue-light via-avocat-indigo to-gray-300 dark:bg-gradient-to-b dark:from-avocat-blue-darker dark:via-avocat-indigo-darker dark:to-gray-800 shadow-lg z-30 flex flex-col transition-all"
      >
        {/* الشعار */}
        <div className="flex items-center justify-center h-16">
          <img
            src={isSidebarOpen ? LogoArt : LogoSuit}
            alt="Logo"
            className={isSidebarOpen ? "w-28 h-14" : "w-12 h-12 mt-2"}
          />
        </div>

        {/* القائمة */}
        <ul className="mt-4 flex-1">
          {menuItems.map((item, index) => (
            <li key={index} className="group relative">
                 <NavLink
                to={item.to}
                onClick={() => item.subItems && handleToggleSubMenu(index)}
                className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
                  isSidebarOpen
                    ? 'space-x-4 text-gray-100 hover:bg-pink-800 hover:text-avocat-orange-light dark:hover:bg-avocat-indigo-light'
                    : 'justify-center'
                } ${
                  openSubMenu === index
                    ? 'bg-pink-600 dark:bg-orange-500 text-white shadow-md'
                    : 'text-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isSidebarOpen &&          <span
                  className="flex-1 text-gray-800 dark:text-gray-100 text-center "
       
                >
                  {item.label}
                </span>}
              </NavLink>

              {/* عرض اسم العنصر عند المرور عليه في الوضع المصغر */}
              {!isSidebarOpen && (
                <span className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
 
        <button
          onClick={toggleSidebar}
          className="absolute bottom-4 right-4 p-2 bg-red-700 text-white rounded-full hover:bg-indigo-500 transition"
        >
          {isSidebarOpen ? <IoMdClose /> : <FaBars />}
        </button>
      </animated.div>
    </>
  );
};

export default Sidebar;
