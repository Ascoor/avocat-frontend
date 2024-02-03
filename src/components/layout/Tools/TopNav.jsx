import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, NavDropdown } from 'react-bootstrap';
import '../../../assets/css/TopNav.css';
import { LogoPatren } from '../../../assets/img/index';
import API_CONFIG from '../../../config';
import Notification from './Notification';
import { Link } from 'react-router-dom';
import { GiJusticeStar  } from 'react-icons/gi';
import { RiServiceLine   } from 'react-icons/ri';
import { AiOutlineAudit     } from 'react-icons/ai';
import { BsCashStack     } from 'react-icons/bs';
import { GiMagnifyingGlass     } from 'react-icons/gi';
import { SlSettings } from "react-icons/sl";
import {
  BiHomeCircle
} from 'react-icons/bi'
import {
  IoMdPeople
} from 'react-icons/io'
import {
  FaUser
} from 'react-icons/fa';
const TopNav = ({ toggleSidebar, user, logoutUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const userId = user ? user.id : null;

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/notifications/${userId}`);
      setNotifications(response.data);
      const unreadCount = response.data.filter((n) => !n.read).length;
      setUnreadNotifications(unreadCount);
    } catch (error) {
      console.error('Could not fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);
  
  return (
    <Navbar className="navbar-top-nav bg-body-tertiary" expand="lg">
    <Navbar.Brand href="#home">
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="home-navbar-toggle m-3" />
        <img src={LogoPatren} alt="Logo" width={100} height={50} />

    </Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav" className="basic-navbar-nav">   <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <BiHomeCircle className="m-1" size={15} />
                الرئيسية
              </Link>
            </li>
<li className='nav-item'>
<NavDropdown title={<span><IoMdPeople className="m-1" size={15} /> العملاء</span>} id="client-dropdown">
<NavDropdown.Item as={Link} to="/clients">
الموكلين
</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/unclients">
العملاء غير الموكلين
</NavDropdown.Item>
</NavDropdown>
</li>

<li className='nav-item'>
<Link className='nav-link' to="/legcases">
<GiJusticeStar  className="m-1" size={15} />
القضايا
</Link>
</li>
<li className='nav-item'>
<Link className='nav-link' to="/services">
<RiServiceLine   className="m-1" size={15} /> 
الخدمات
</Link>
</li>



<li className='nav-item'>
<Link className='nav-link' to="/procedures">
<AiOutlineAudit   className="m-1" size={15} />
الإجراءات
</Link>
</li>

<li className='nav-item'>
<Link className='nav-link' to="/financial">
<BsCashStack  className="m-1" size={15} />
الحسابات
</Link>
</li>

<li className='nav-item'>
<Link className='nav-link' to="/court-search">
<GiMagnifyingGlass  className="m-1" size={15} />
بحث محاكم
</Link>
</li>
</ul>
  </Navbar.Collapse>
  <div className="user-menu ml-auto"> {/* Use ml-auto to move it to the end */}
        <Notification notifications={notifications} unreadNotifications={unreadNotifications} fetchNotifications={fetchNotifications} />
        <NavDropdown id="userDropdown" title={<FaUser color="orange" size={20} />} align="end" drop="down" className="dropdown-menu-right m-2">
          <NavDropdown.Item href={`/profile/${userId}`}>الملف الشخصي</NavDropdown.Item>
          <NavDropdown.Item onClick={logoutUser}>تسجيل الخروج</NavDropdown.Item>
        </NavDropdown>
      </div>
     <SlSettings size={30} color="orange" onClick={toggleSidebar} />

</Navbar>
  );
};


export default TopNav;