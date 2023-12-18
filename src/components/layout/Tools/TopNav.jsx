import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBars, FaUser } from 'react-icons/fa';
import { Navbar, NavDropdown } from 'react-bootstrap'; // Import NavDropdown from react-bootstrap
import { useSpring, animated } from '@react-spring/web';
import '../../../assets/css/TopNav.css';
import { LogoImage } from '../../../images/index';
import API_CONFIG from '../../../config';
import Notification from './Notification';

const TopNav = ({ onToggleSidebar, sidebarOpen, user, logoutUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const userId = user ? user.id : null; // Check if user exists before accessing its properties

  const userDropdownAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    zIndex: 1000
  });
  
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/notifications/${userId}`,
      );
      setNotifications(response.data);
      const unreadCount = response.data.filter((n) => !n.read).length;
      setUnreadNotifications(unreadCount);
    } catch (error) {
      console.error('Could not fetch notifications:', error);
    }
  };

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
    fetchNotifications();
  }, [sidebarOpen, userId]);

    

return (
  <animated.nav
    style={userDropdownAnimation}
    dir="rtl"
    className={`top-nav ${sidebarOpen ? 'sidebar-open' : ''}`}
  >
    <div className="d-flex align-items-center justify-content-start">
      <button onClick={onToggleSidebar} className="navbar-toggler">
        <FaBars />
      </button>
      <div className="brand-logo"> {/* تغليف شعار العلامة التجارية في div */}
        <Navbar.Brand href="/">
          <img src={LogoImage} alt="Brand Logo" />
        </Navbar.Brand>
      </div>
    </div>


      <div className="user-menu">
        <Notification
          notifications={notifications}
          unreadNotifications={unreadNotifications}
          fetchNotifications={fetchNotifications}
        />
        {/* Use NavDropdown component for the user menu */}
        <NavDropdown
          title={<FaUser />}
          id="userDropdown"
          align="end" // Set alignment to right for RTL
          drop="down" // Display the dropdown below the button
        >
          <NavDropdown.Item href={`/profile/${userId}`}>
            الملف الشخصي
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            className="dropdown-item-logout beautiful-logout-item"
            onClick={logoutUser}
          >
            نسجيل الخروج
          </NavDropdown.Item>
        </NavDropdown>

      </div>
    </animated.nav>
  );
};

export default TopNav;
