
import { FaBars, FaUser, FaBell, FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import '../../assets/css/TopNav.css';

const TopNav = ({ onToggleSidebar, sidebarOpen }) => {
  const userDropdownAnimation = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.8)' },
  });

  return (
    <animated.nav className={`top-nav ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button onClick={onToggleSidebar} className="navbar-toggler">
        <FaBars />
      </button>
      <a href="/" className="brand-logo">
        <img src="logo512.png" alt="Brand Logo" />
      </a>
      <div className="search-form">
        <form>
          <input type="text" placeholder="Search" />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="user-menu">
        <div className="user-dropdown">
          <animated.button
            className="dropdown-toggle"
            id="userDropdown"
            data-bs-toggle="dropdown"
            style={userDropdownAnimation}
          >
            <FaUser />
          </animated.button>
          <ul className="dropdown-menu" aria-labelledby="userDropdown">
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
        <div className="notification-icon">
          <button className="notification-button">
            <FaBell />
            <span className="notification-badge">1</span>
          </button>
          <div className="notification-alert">
            <p>New notification: You have a new message!</p>
          </div>
        </div>
      </div>
    </animated.nav>
  );
};

TopNav.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

export default TopNav;
