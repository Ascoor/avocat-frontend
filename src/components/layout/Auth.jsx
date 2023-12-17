import { useState, useEffect } from 'react';
import TopNav from './Tools/TopNav';
import Sidebar from './Tools/SideBar';
import useAuth from '../layout/AuthTool/AuthUser';
import '../../App.css';
import MainContent from './Tools/MainContent';
import '../../assets/css/Auth.css';
import { useSpring, animated } from '@react-spring/web';

function Auth() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user, token } = useAuth();

  const onToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // إظهار الشريط الجانبي إذا كان الماوس على بعد 50px من الحافة اليمنى للنافذة
      if (window.innerWidth - e.clientX < 50) {
        if (timerId) {
          clearTimeout(timerId);
          setTimerId(null);
        }
        setSidebarOpen(true);
      } else {
        if (!timerId) {
          const id = setTimeout(() => {
            setSidebarOpen(false);
          }, 2000); // تأخير 2 ثانية قبل الإغلاق
          setTimerId(id);
        }
      }
    };

    // إضافة مستمع الحدث لحركة الماوس
    window.addEventListener('mousemove', handleMouseMove);

    // إزالة مستمع الحدث عند التنظيف
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  const sidebarAnimation = useSpring({
    right: sidebarOpen ? 0 : -450,
    config: { duration: 500 }, // زيادة مدة الحركة لجعلها أبطأ
  });

  return (
    <>
      <TopNav
        onToggleSidebar={onToggleSidebar}
        sidebarOpen={sidebarOpen}
        user={user}
        logoutUser={logoutUser}
      />
      <MainContent sidebarOpen={sidebarOpen} />
      <animated.aside
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        style={sidebarAnimation}
        onClick={handleCloseSidebar}
      >
        <Sidebar sidebarOpen={sidebarOpen} onClose={handleCloseSidebar} />
      </animated.aside>
    </>
  );
}

export default Auth;
