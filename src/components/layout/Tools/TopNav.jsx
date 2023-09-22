import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaBars, FaUser } from 'react-icons/fa';
import { Navbar } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import '../../../assets/css/TopNav.css';
import { LogoImage } from '../../../images/index';
import API_CONFIG from '../../../config';
import Notification from './Notification';

const TopNav = ({ onToggleSidebar, sidebarOpen, userId, logoutUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const userDropdownAnimation = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.8)' },
  });

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/notifications/${userId}`,
      );
      setNotifications(response.data);
      const unreadCount = response.data.filter(n => !n.read).length;
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
    <animated.nav className={`top-nav ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="d-flex align-items-center justify-content-start">
        <button onClick={onToggleSidebar} className="navbar-toggler">
          <FaBars />
        </button>
        <Navbar.Brand href="/">
          <img src={LogoImage} alt="Brand Logo" />
        </Navbar.Brand>
      </div>

      <div className="user-menu">
        <Notification
          notifications={notifications}
          unreadNotifications={unreadNotifications}
          fetchNotifications={fetchNotifications}
        />
        <div className="user-dropdown">
          <animated.button
            className="dropdown-toggle beautiful-dropdown"
            id="userDropdown"
            data-bs-toggle="dropdown"
            style={userDropdownAnimation}
          >
            <FaUser />
          </animated.button>
          <ul
            className="dropdown-menu beautiful-dropdown-menu"
            aria-labelledby="userDropdown"
          >
            <li>
              <a href={`/profile/${userId}`}>الملف الشخصي</a>
            </li>
            <li>
              <a
                className="dropdown-item-logout beautiful-logout-item"
                href="#"
                onClick={logoutUser}
              >
                نسجيل الخروج
              </a>
            </li>
          </ul>
        </div>

        <div className="notification-icon beautiful-notification"></div>
      </div>
    </animated.nav>
  );
};

TopNav.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default TopNav;
