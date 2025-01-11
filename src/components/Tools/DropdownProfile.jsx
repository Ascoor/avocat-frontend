import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/Transition';
import useAuth from '../layout/AuthTool/AuthUser';

function UserMenu({ align = 'left' }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // استدعاء user مباشرة من useAuth
  const [userImage, setUserImage] = useState('/default-profile.png'); // الصورة الافتراضية

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    // إذا كان لدى المستخدم صورة، قم بضبطها في الحالة
    if (user?.image) {
      setUserImage(user.image);
    }
  }, [user]); // يتم تنفيذ هذا التأثير مرة واحدة عند تغيير `user`

  const handleImageError = () => {
    // عند حدوث خطأ في تحميل الصورة، قم بضبط الصورة الافتراضية
    setUserImage('/default-profile.png');
  };

  // Close dropdown on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex items-center space-x-2 group focus:outline-none"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={userImage} // الصورة تأتي من الحالة
          onError={handleImageError} // التعامل مع خطأ تحميل الصورة
          alt="User profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-gray-800 dark:text-gray-200 font-bold">{user?.name}</span>
        <svg
          className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
          viewBox="0 0 12 12"
        >
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <ul>
            <li>
              <Link
                to="/settings"
                className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3 w-full text-left"
                onClick={logout}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
