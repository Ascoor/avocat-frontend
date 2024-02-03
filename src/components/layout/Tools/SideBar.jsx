import  { useEffect } from 'react';
import {
  FaTimes,
  FaCog,
} from 'react-icons/fa';
import { MdOutlinePriceChange } from 'react-icons/md';
import { Offcanvas } from 'react-bootstrap';
import '../../../assets/css/SideBar.css';
import { Link } from 'react-router-dom';
import useAuth from '../AuthTool/AuthUser';


import { MdOutlineGavel  } from 'react-icons/md';
const Sidebar = ({ sidebarOpen, onClose }) => {
  const { user } = useAuth();

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
  }, [sidebarOpen]);

  return (
    <Offcanvas className="offcanvas-sidebar" show={sidebarOpen} onHide={onClose} placement="start">
      <Offcanvas.Header className="offcanvas-header">
        <Offcanvas.Title className="offcanvas-title m-3">الإعدادات</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <button onClick={onClose} className="close-icon">
          <FaTimes />
        </button>
        <div className="user-profile">
          <img src="/log1.png" alt="صورة المستخدم" className="user-profile-img" />
          <span>المستشار/{user?.name}</span>
        </div>

        <ul className="sidebar-nav">
        <li>
  <Link to="/financial">
    <MdOutlinePriceChange className="m-2" size={25} />
    الحسابات
  </Link>
</li>

<li>
  <Link to="/courts">
    <FaCog className="m-1" size={25} />
    اعدادات المحاكم
  </Link>
</li>

<li className="nav-item m-1">
  <MdOutlineGavel className="m-2" size={30} />
  <Link className="nav-link" to="/lawyers">
    المحامون
  </Link>
</li>

<li>
  <Link to="/cases_setting">
    <FaCog className="m-1" size={25} /> اعدادات القضايا
  </Link>
</li>

        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
