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

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Show sidebar if mouse is within 50px of the right edge of the window
      if (window.innerWidth - e.clientX < 50) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const sidebarAnimation = useSpring({
    right: sidebarOpen ? 0 : -450,
    config: { duration: 300 },
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
