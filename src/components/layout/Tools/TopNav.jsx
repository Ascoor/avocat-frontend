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
    <Navbar expand="md" className="bg-body-tertiary navbar-dark navbar-top-nav">

        <Container className="container container-top-nav">
          <Navbar.Brand href="#home">
          <Link to="/">
            <img
         src={LogoPatren}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <ul className="navbar-nav">

            
              <li className="nav-item">
                <Link className="nav-link" to="/">
                <BiHomeCircle className="m-1" size={15} />
                  الرئيسية
                </Link>
              </li>
   
        <li className='nav-item'>
          <Link className='nav-link' to="/clients">
            <IoMdPeople className="m-1" size={15} />
            الموكلين
          </Link>
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
          <Link className='nav-link' to="/legal-writer">
            <HiOutlineDocumentText   className="m-1" size={15} />
             المحرر
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
          </Nav>
        </Navbar.Collapse>
        <div className="user-menu">
        
          <Notification
            notifications={notifications}
            unreadNotifications={unreadNotifications}
            fetchNotifications={fetchNotifications}
          />
           <NavDropdown
            id="userDropdown"
            title={<FaUser  color="orange" size={20} />}
            align="end"
            drop="down"
            className="dropdown-menu-right m-2" 
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
<SlSettings
                  
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
