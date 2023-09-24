import { useState, useRef } from 'react';
import TopNav from './Tools/TopNav';
import Sidebar from './Tools/SideBar';
import useAuth from '../layout/AuthTool/AuthUser';
import '../../App.css';
import MainContent from './Tools/MainContent';
import '../../assets/css/Auth.css';
import { useSpring, animated } from '@react-spring/web';

function Auth() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token, logout } = useAuth();



  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const sidebarRef = useRef(null); // Ref to the sidebar element

  const onToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
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
        logoutUser={logoutUser}
        sidebarOpen={sidebarOpen}
      />
      <animated.aside
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        style={sidebarAnimation}
        ref={sidebarRef}
        onClick={handleSidebarClick} // Add click event handler to close sidebar
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          onClose={handleCloseSidebar}
          onToggleSidebar={onToggleSidebar}
        />
      </animated.aside>
      <MainContent sidebarOpen={sidebarOpen} />
    </>
  );
}

export default Auth;
