import { useEffect } from 'react';
import { FaTimes, FaCog } from 'react-icons/fa';
import { MdOutlinePriceChange, MdOutlineGavel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAuth from '../AuthTool/AuthUser';

const Sidebar = ({ sidebarOpen, onClose }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [sidebarOpen]);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out shadow-lg z-50`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900">
        <h2 className="text-lg font-semibold">الإعدادات</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-400 focus:outline-none"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center mt-6">
        <img
          src="/log1.png"
          alt="صورة المستخدم"
          className="w-20 h-20 rounded-full border-2 border-gray-700"
        />
        <span className="mt-2 text-center text-sm">المستشار/{user?.name}</span>
      </div>

      <ul className="mt-6 space-y-4">
        <li>
          <Link
            className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded-lg"
            to="/financial"
          >
            <MdOutlinePriceChange size={20} className="mr-2" />
            الحسابات
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded-lg"
            to="/courts"
          >
            <FaCog size={20} className="mr-2" />
            اعدادات المحاكم
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded-lg"
            to="/lawyers"
          >
            <MdOutlineGavel size={20} className="mr-2" />
            المحامون
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded-lg"
            to="/cases_setting"
          >
            <FaCog size={20} className="mr-2" />
            اعدادات القضايا
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
