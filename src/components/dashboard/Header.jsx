import React from "react";
import Notifications from "../common/DropdownNotifications";
import UserMenu from "../common/DropdownProfile";
import ThemeToggle from "../common/ThemeToggle";
import HeaderToggle from "../common/HeaderToggle";
import { useSidebar } from "../../utils/SidebarContext";
import { motion } from "framer-motion"; // استيراد motion من framer-motion

const Header = () => {
  const { isSidebarOpen, isMobile } = useSidebar(); // استخدام isMobile للتحقق من حجم الشاشة

  // حركات الشريط العلوي باستخدام motion من framer-motion
  const headerVariants = {
    open: {
      marginRight: isMobile ? "0" : "18rem", // إذا كانت الشاشة صغيرة، لا نغير المسافة
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    closed: {
      marginRight: isMobile ? "0" : "5rem", // إخفاء المسافة الإضافية عند إغلاق الشريط الجانبي على الشاشات الصغيرة
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };
 

  return (
    <motion.header
      variants={headerVariants}
      initial="closed"
      animate={isSidebarOpen ? "open" : "closed"}
      className={`bg-gradient-to-l from-avocat-indigo via-avocat-indigo to-avocat-blue-light dark:bg-gradient-to-r dark:from-avocat-blue-dark dark:via-avocat-indigo-darker dark:to-avocat-blue-darker fixed top-0 right-0 left-0 z-20 shadow-lg transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <HeaderToggle />

        {/* الإشعارات وأدوات التحكم */}
        <div className="flex items-center space-x-6 space-x-reverse">
          <Notifications align="right" />
          <ThemeToggle />
          <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
          <UserMenu align="left" />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
