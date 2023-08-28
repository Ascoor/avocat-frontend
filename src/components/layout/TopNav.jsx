import { useEffect , useState} from 'react';
import { FaBars, FaUser, FaBell, FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import '../../assets/css/TopNav.css';
const TopNav = ({ onToggleSidebar, sidebarOpen,userId, logoutUser }) => {
  const userDropdownAnimation = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.8)' },
  });
  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
   
  }, [sidebarOpen]);
  
  return (
  
    <animated.nav className={`top-nav ${sidebarOpen ? 'sidebar-open' : ''}`}>
 <button onClick={onToggleSidebar} className="navbar-toggler">
        <FaBars />
      </button>
      <a href="/" className="brand-logo">
      <img src="/logo512.png" alt="Brand Logo" />
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
            <a href={`/profile/${userId}`}>الملف الشخصي</a>
          </li>
          <li>
            <a className="dropdown-item-logout" href="#" onClick={logoutUser}>نسجيل الخروج</a>
          </li>
        </ul>
      </div>
        <div className="notification-icon">
          <button className="notification-button">
            <FaBell />
            <span className="notification-badge">1</span>
          </button>
          <div className="notification-alert">
        
                    <p> welcome</p>
   
      
          </div>
        </div>
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
