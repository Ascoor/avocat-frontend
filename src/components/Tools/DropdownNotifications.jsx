import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/Transition';
import { IoMdNotifications } from 'react-icons/io';

function DropdownNotifications({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // إغلاق القائمة عند الضغط على زر "Esc"
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className='relative inline-flex'>
      {/* زر الإشعارات */}
      <button
        ref={trigger}
        className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 rounded-full shadow-md transition-transform transform hover:scale-105 ${
          dropdownOpen && 'ring-2 ring-blue-400'
        }`}
        aria-haspopup='true'
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <IoMdNotifications className='w-5 h-5 md:w-6 md:h-6' />
        <div className='absolute top-0 left-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full animate-ping'></div>
      </button>

      {/* القائمة المنسدلة */}
      <Transition
        className={`origin-top-right z-20 absolute top-full right-0 w-[50vw] sm:w-64 md:w-72 lg:w-80 xl:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-2 rounded-2xl shadow-2xl overflow-hidden mt-2 transition-transform duration-300 ease-out`}
        show={dropdownOpen}
        enter='transition ease-out duration-200 transform'
        enterStart='opacity-0 -translate-y-3 scale-95'
        enterEnd='opacity-100 translate-y-0 scale-100'
        leave='transition ease-in duration-150'
        leaveStart='opacity-100 scale-100'
        leaveEnd='opacity-0 scale-95'
      >
        <div ref={dropdown}>
          <div className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase px-5 py-2'>
            الإشعارات
          </div>
          <ul>
            {/* ✅ إشعار 1 */}
            <li className='border-b border-gray-200 dark:border-gray-700/60 last:border-0'>
              <Link
                className='flex items-start gap-3 py-3 px-5 hover:bg-blue-50 dark:hover:bg-gray-700/20 transition rounded-lg'
                to='#0'
                onClick={() => setDropdownOpen(false)}
              >
                <span className='bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white p-2 rounded-full'>
                  📢
                </span>
                <div>
                  <p className='text-gray-800 dark:text-gray-100 font-medium'>
                    تحديث جديد للسياسات
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    يرجى مراجعة السياسات المحدثة.
                  </p>
                  <span className='block text-xs text-gray-400 dark:text-gray-500 mt-1'>
                    منذ 3 ساعات
                  </span>
                </div>
              </Link>
            </li>

            {/* ✅ إشعار 2 */}
            <li className='border-b border-gray-200 dark:border-gray-700/60 last:border-0'>
              <Link
                className='flex items-start gap-3 py-3 px-5 hover:bg-green-50 dark:hover:bg-gray-700/20 transition rounded-lg'
                to='#0'
                onClick={() => setDropdownOpen(false)}
              >
                <span className='bg-green-100 dark:bg-green-600 text-green-600 dark:text-white p-2 rounded-full'>
                  🚀
                </span>
                <div>
                  <p className='text-gray-800 dark:text-gray-100 font-medium'>
                    إطلاق ميزة جديدة
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    استمتع بميزاتنا الجديدة الآن.
                  </p>
                  <span className='block text-xs text-gray-400 dark:text-gray-500 mt-1'>
                    منذ يومين
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownNotifications;
