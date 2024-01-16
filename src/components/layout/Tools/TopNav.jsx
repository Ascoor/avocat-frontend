import { useEffect, useState } from 'react';
import axios from 'axios';

import { MdOutlineGavel  } from 'react-icons/md';
import { GiJusticeStar  } from 'react-icons/gi';
import { RiServiceLine   } from 'react-icons/ri';
import { HiOutlineDocumentText    } from 'react-icons/hi';
import { AiOutlineAudit     } from 'react-icons/ai';
import { BsCashStack     } from 'react-icons/bs';
import { GiMagnifyingGlass ,GiSettingsKnobs    } from 'react-icons/gi';

import {
  BiHomeCircle
} from 'react-icons/bi'
import {
  IoMdPeople
} from 'react-icons/io'
import {
  FaUser
} from 'react-icons/fa';
import { Navbar, NavDropdown ,Container,Button} from 'react-bootstrap'; // Import NavDropdown from react-bootstrap
import '../../../assets/css/TopNav.css';
import { LogoPatren } from '../../../assets/img/index';
import API_CONFIG from '../../../config';
import Notification from './Notification';
import {Link} from 'react-router-dom';

const TopNav = ({ onToggleSidebar, sidebarOpen, user, logoutUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const userId = user ? user.id : null; // Check if user exists before accessing its properties



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

      <Navbar expand="lg" className="navbar-top-nav navbar-expand-lg navbar-dark">
  <Container className={`container-top-nav ${sidebarOpen ? 'sidebar-open' : ''}`}>
    <Link to="/">
            <img className="navbar-brand" src={LogoPatren} alt="Brand Logo" />
            </Link>
    <Button className="navbar-toggler" type="Button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </Button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item m-1">
            <BiHomeCircle className="m-2" size={25} />
          <Link className='nav-link' to="/">
             الرئيسية
          </Link>
        </li>
        <li className='nav-item m-1'>
            <MdOutlineGavel  className="m-2" size={25} />
          <Link className='nav-link' to="/lawyers">
            المحامون
          </Link>
        </li>
        <li className='nav-item m-1'>
            <IoMdPeople className="m-2" size={25} />
          <Link className='nav-link' to="/clients">
            الموكلين
          </Link>
        </li>

        <li className='nav-item m-1'>
            <GiJusticeStar className="m-2" size={25} />
          <Link className='nav-link' to="/legcases">
            القضايا
          </Link>
        </li>
        <li className='nav-item m-1'>
            <RiServiceLine  className="m-2" size={25} /> 
          <Link className='nav-link' to="/services">
            الخدمات
          </Link>
        </li>
        <li className='nav-item m-1'>
            <HiOutlineDocumentText  className="m-2" size={25} />
          <Link className='nav-link' to="/legal-writer">
             المحرر
          </Link>
        </li>
        <li className='nav-item m-1'>
            <AiOutlineAudit  className="m-2" size={25} />
          <Link className='nav-link' to="/procedures">
             الإجراءات
          </Link>
        </li>

        <li className='nav-item m-1'>
            <BsCashStack className="m-2" size={25} />
          <Link className='nav-link' to="/financial">
            الحسابات
          </Link>
        </li>

        <li className='nav-item m-1'>
            <GiMagnifyingGlass className="m-2" size={25} />
          <Link className='nav-link' to="/court-search">
            بحث محاكم
          </Link>
        </li>
<div className="d-flex"> 
        <li className='nav-item m-1'>
        <Notification
          notifications={notifications}
          unreadNotifications={unreadNotifications}
          fetchNotifications={fetchNotifications}
        />
             </li>
             <li className='nav-item m-1 '>
        <NavDropdown

           title= {<FaUser className="m-2" color="orange" size={20} />}
          id="userDropdown"
          align="end" // Set alignment to right for RTL
          drop="down" // Display the dropdown below the button
        >
   
          <NavDropdown.Item href={`/profile/${userId}`}>
            الملف الشخصي
          </NavDropdown.Item>
          <NavDropdown.Item
            className="dropdown-item-logout beautiful-logout-item"
            onClick={logoutUser}
          >
            نسجيل الخروج
          </NavDropdown.Item>
        </NavDropdown>
        </li>

    <li  className='nav-item m-2' onClick={onToggleSidebar} >
          <GiSettingsKnobs color='orange'   size={25}  />
        </li>
        </div>
        </ul>
    </div>
  </Container>
</Navbar>
  );
};
export default TopNav;