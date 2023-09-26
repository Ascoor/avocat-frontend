import { useState, useRef } from 'react';
import TopNav from './Tools/TopNav';
import Sidebar from './Tools/Sidebar';
import useAuth from '../layout/AuthTool/AuthUser';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import MainContent from './Tools/MainContent';
import '../../assets/css/Auth.css';
import { useSpring, animated } from '@react-spring/web';

function Auth() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user, token } = useAuth();
  const navigate = useNavigate(); // Use the useNavigate hook

  const sidebarRef = useRef(null);

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

  // Add a click event listener to the sidebar to close it
  const handleSidebarClick = (e) => {
    // Prevent the click event from propagating to the parent elements
    e.stopPropagation();
    setSidebarOpen(false);
  };

  // Use the useSpring hook to control the animation duration
  const sidebarAnimation = useSpring({
    right: sidebarOpen ? 0 : -450,
    config: { duration: sidebarOpen ? 500 : 300 }, // Adjust duration as needed
  });

  return (
    <>
      <TopNav
        onToggleSidebar={onToggleSidebar}
        sidebarOpen={sidebarOpen}
        user={user}
        logoutUser={logoutUser}
      />
      <animated.aside
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        style={sidebarAnimation}
        onClick={handleSidebarClick}
      >
        <Sidebar sidebarOpen={sidebarOpen} onClose={handleCloseSidebar} />
      </animated.aside>
      <MainContent sidebarOpen={sidebarOpen} />
    </>
  );
}

export default Auth;
