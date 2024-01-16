 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import '../../../assets/css/TopNav.css';
import { LogoPatren } from '../../../assets/img/index';
import API_CONFIG from '../../../config';
import Notification from './Notification';
import { Link } from 'react-router-dom';

import { GiJusticeStar  } from 'react-icons/gi';
import { RiServiceLine   } from 'react-icons/ri';
import { HiOutlineDocumentText    } from 'react-icons/hi';
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
    <Navbar expand="lg" className="bg-body-tertiary navbar-dark navbar-top-nav">
      <Container fluid className="container-fluid container-top-nav">
        <Link to="/">
          <img className="navbar-brand" src={LogoPatren} alt="Brand Logo" />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item m-1">
                <BiHomeCircle className="m-2" size={30} />
                <Link className="nav-link" to="/">
                  الرئيسية
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
            </ul>
          </Nav>
        </Navbar.Collapse>
        <div className="user-menu">
          <NavDropdown
            title={<FaUser className="m-2" color="orange" size={20} />}
            id="userDropdown"
            align="end"
            drop="down"
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
          <Notification
            notifications={notifications}
            unreadNotifications={unreadNotifications}
            fetchNotifications={fetchNotifications}
          />
          
<SlSettings
                  className="m-2"
                  size={30}
                  color='orange'
                  onClick={toggleSidebar}
                />
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNav;
