import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import '../../assets/css/Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarAnimation = useSpring({
    right: isOpen ? 0 : -250, // Adjust the value based on your sidebar width
  });

  const userDropdownAnimation = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.8)' },
  });

  return (
    <animated.aside dir="rtl" className={`sidebar ${isOpen ? 'open' : ''}`} style={sidebarAnimation}>
      <button onClick={onClose} className="close-icon">
        <FaTimes />
      </button>
      <div className="user-profile">
        <img src="/log1.png" alt="صورة المستخدم" />
        <animated.span style={userDropdownAnimation}>جون دو</animated.span>
      </div>
      <ul className="sidebar-nav">
        <li>
          <Link to="/">الصفحة الرئيسية</Link>
        </li>
        <li>
          <Link to="/clients">العملاء</Link>
        </li>
        <li>
          <Link to="/clients">الموكلين</Link>
        </li>
        <li className="sub-menu">
          القضايا
          <ul className="sub-menu-items">
            <li>
              <Link to="/cases">القضايا</Link>
            </li>
            <li>
              <Link to="/sessions">الجلسات</Link>
            </li>
            <li>
              <Link to="/procedures">الإجراءات</Link>
            </li>
          </ul>
        </li>
        <li className="sub-menu">
          إعدادات المكتب
          <ul className="sub-menu-items">
            <li>
              <Link to="/court-settings">اعدادات المحاكم</Link>
            </li>
            <li>
              <Link to="/case-settings">اعدادات القضايا</Link>
            </li>
          </ul>
        </li>
      </ul>
    </animated.aside>
  );
};


Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;