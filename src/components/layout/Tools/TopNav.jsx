import { useEffect, useState } from 'react';
import axios from 'axios';
import { LogoPatren } from '../../../assets/img/index';
import API_CONFIG from '../../../config';
import Notification from './Notification';
import { Link } from 'react-router-dom';
import { GiJusticeStar } from 'react-icons/gi';
import { RiServiceLine } from 'react-icons/ri';
import { AiOutlineAudit } from 'react-icons/ai';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { SlSettings } from 'react-icons/sl';

import { BiHomeCircle } from 'react-icons/bi';
import { IoMdPeople } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';

const TopNav = ({ toggleSidebar, user, logoutUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const userId = user ? user.id : null;

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/notifications/${userId}`
      );
      setNotifications(response.data);
      const unreadCount = response.data.filter((n) => !n.read).length;
      setUnreadNotifications(unreadCount);
    } catch (error) {
      console.error('Could not fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex items-center shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={LogoPatren}
          alt="Logo"
          className="w-24 h-auto"
        />
        <button
          className="text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          <SlSettings size={24} />
        </button>
      </div>

      <ul className="flex-grow flex space-x-4 items-center justify-center">
        <li>
          <Link
            className="flex items-center text-sm hover:text-orange-500"
            to="/"
          >
            <BiHomeCircle size={20} className="mr-1" />
            الرئيسية
          </Link>
        </li>
        <li>
          <div className="relative group">
            <span className="flex items-center text-sm cursor-pointer hover:text-orange-500">
              <IoMdPeople size={20} className="mr-1" />
              العملاء
            </span>
            <div className="absolute hidden group-hover:block bg-gray-700 text-white shadow-md mt-2 rounded-md">
              <Link
                className="block px-4 py-2 hover:bg-gray-600"
                to="/clients"
              >
                الموكلين
              </Link>
              <Link
                className="block px-4 py-2 hover:bg-gray-600"
                to="/unclients"
              >
                العملاء غير الموكلين
              </Link>
            </div>
          </div>
        </li>
        <li>
          <Link
            className="flex items-center text-sm hover:text-orange-500"
            to="/legcases"
          >
            <GiJusticeStar size={20} className="mr-1" />
            القضايا
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center text-sm hover:text-orange-500"
            to="/services"
          >
            <RiServiceLine size={20} className="mr-1" />
            الخدمات
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center text-sm hover:text-orange-500"
            to="/procedures"
          >
            <AiOutlineAudit size={20} className="mr-1" />
            الإجراءات
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center text-sm hover:text-orange-500"
            to="/court-search"
          >
            <GiMagnifyingGlass size={20} className="mr-1" />
            بحث محاكم
          </Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4 ml-auto">
        <Notification
          notifications={notifications}
          unreadNotifications={unreadNotifications}
          fetchNotifications={fetchNotifications}
        />
        <div className="relative">
          <button
            className="text-orange-500 hover:text-orange-400"
            aria-haspopup="true"
          >
            <FaUser size={20} />
          </button>
          <div className="absolute right-0 hidden group-hover:block bg-gray-700 text-white shadow-md mt-2 rounded-md">
            <Link
              to={`/profile/${userId}`}
              className="block px-4 py-2 hover:bg-gray-600"
            >
              الملف الشخصي
            </Link>
            <button
              onClick={logoutUser}
              className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;

