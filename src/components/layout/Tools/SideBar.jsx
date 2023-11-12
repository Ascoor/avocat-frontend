import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTimes,
  FaHome,
  FaUser,
  FaBriefcase,
  FaFileAlt,
  FaTasks,
  FaArchive,
  FaCog,
} from 'react-icons/fa';
import { MdOutlinePriceChange } from 'react-icons/md';
import { useSpring, animated } from '@react-spring/web';
import '../../../assets/css/SideBar.css';
import useAuth from '../AuthTool/AuthUser';

const Sidebar = ({ sidebarOpen, onClose }) => {
  const sidebarAnimation = useSpring({
    right: sidebarOpen ? 0 : -450, // Adjust the value based on your sidebar width
  });

  const userDropdownAnimation = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.8)' },
    fontSize: '.9rem',
    fontFamily: 'inherit',
  });
  const { user } = useAuth();
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
          المستشار/{user?.name}
        </animated.span>
      </div>

      <ul className="sidebar-nav">
        <li>
          <Link to="/">
            <FaHome className="m-1" size={25} />
            الصفحة الرئيسية
          </Link>
        </li>
        <li>
          <Link to="/lawyers">
            <FaUser className="m-2" size={25} />
            المحامون
          </Link>
        </li>
        <li>
          <Link to="/clients">
            <FaUser className="m-2" size={25} />
            الموكلين
          </Link>
        </li>

        <li>
          <Link to="/legcases">
            <FaFileAlt className="m-2" size={25} />
            القضايا
          </Link>
        </li>
        <li>
          <Link to="/services">
            <FaBriefcase className="m-2" size={25} /> الخدمات
          </Link>
        </li>
        <li>
          <Link to="/procedures">
            <FaTasks className="m-2" size={25} /> الإجراءات
          </Link>
        </li>

        <li>
          <Link to="/financial">
            <MdOutlinePriceChange className="m-2" size={25} />
            الحسابات
          </Link>
        </li>

        <li>
          <Link to="/court-search">
            <FaArchive className="m-2" size={25} />
            بحث القضايا
          </Link>
        </li>
        <li>
          <Link to="/courts">
            <FaCog className="m-1" size={25} />
            اعدادات المحاكم
          </Link>
        </li>
        <li>
          <Link to="/cases_setting">
            <FaCog className="m-1" size={25} /> اعدادات القضايا
          </Link>
        </li>
      </ul>
    </animated.aside>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
