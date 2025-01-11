import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Notifications from '../../Tools/DropdownNotifications';
import UserMenu from '../../Tools/DropdownProfile';
import ThemeToggle from '../../Tools/ThemeToggle';
import HeaderToggle from './HeaderToggle';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    {
      label: 'Reports',
      dropdown: [
        { label: 'Daily Reports', path: '/reports/daily' },
        { label: 'Monthly Reports', path: '/reports/monthly' },
        { label: 'Yearly Reports', path: '/reports/yearly' },
      ],
    },
    {
      label: 'Settings',
      dropdown: [
        { label: 'Profile Settings', path: '/settings/profile' },
        { label: 'Account Settings', path: '/settings/account' },
      ],
    },
    { label: 'Support', path: '/support' },
  ];

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header className="bg-white  dark:bg-gradient-to-l from-avocat-blue-darker to-avocat-blue  border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* الجزء الأيمن: الشعار وزر الشريط الجانبي */}
        <div className="flex items-center space-x-4 space-x-reverse">
        
          <HeaderToggle />
        </div>

        {/* الجزء الأوسط: التنقل الرئيسي */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-8 space-x-reverse">
          {menuItems.map((item, index) =>
            item.dropdown ? (
              <div key={index} className="relative">
                <button
                  onClick={() => handleDropdownToggle(index)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
                >
                  {item.label}
                </button>
                {activeDropdown === index && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                    <ul>
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={index}
                to={item.path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* الجزء الأيسر: الإشعارات، مبدل الوضع الليلي، وقائمة المستخدم */}
        <div className="flex items-center space-x-4">
          <Notifications align="right" />
          <ThemeToggle />
          <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
          <UserMenu align="left" />
        </div>
      </div>

      {/* التنقل للجوال */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <ul className="py-2">
            {menuItems.map((item, index) =>
              item.dropdown ? (
                <li key={index} className="relative">
                  <button
                    onClick={() => handleDropdownToggle(index)}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item.label}
                  </button>
                  {activeDropdown === index && (
                    <ul className="pl-4">
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
