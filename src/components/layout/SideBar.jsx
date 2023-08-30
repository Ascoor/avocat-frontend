import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import '../../assets/css/SideBar.css';
import useAuth from '../Auth/AuthUser';

const Sidebar = ({ sidebarOpen, onClose ,handleLinkClick}) => {
  const sidebarAnimation = useSpring({
    right: sidebarOpen ? 0 : -450, // Adjust the value based on your sidebar width
  });
const user = useAuth().user;
  const userDropdownAnimation = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.8)' },
    fontSize: '.9rem',
    fontFamily: 'inherit',
  });

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
  }, [sidebarOpen]);

  return (
    <animated.aside
      className={`sidebar ${sidebarOpen ? 'open' : ''}`}
      style={sidebarAnimation}
    >
      <button onClick={onClose} className="close-icon">
        <FaTimes />
      </button>
      <div className="user-profile">
    <img src="/log1.png" alt="صورة المستخدم" className="user-profile-img" />
  <animated.span style={userDropdownAnimation}>
    المستشار/{user.name}
  </animated.span>
</div>

      <ul className="sidebar-nav">
        <li onClick={handleLinkClick}>
          <Link to="/">الصفحة الرئيسية</Link>
        </li>
        <li>
          <Link to="/lawyers">المحامون</Link>
        </li>
        <li onClick={handleLinkClick}>
          <Link to="/clients">الموكلين</Link>
        </li>

            <li onClick={handleLinkClick}>
              <Link to="/legcases">القضايا</Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link to="/services">الخدمات</Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link to="/procedures">الإجراءات</Link>
            </li>
        
            <li onClick={handleLinkClick}>
              <Link to="/courts">اعدادات المحاكم</Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link to="/cases_setting">اعدادات القضايا</Link>
            </li>
     
      </ul>
    </animated.aside>
  );
};


Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
};

export default Sidebar;