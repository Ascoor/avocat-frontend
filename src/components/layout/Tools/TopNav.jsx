// src\components\layout\Tools\TopNav.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {  Nav, Button, NavDropdown } from 'react-bootstrap';
import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaFileAlt,
  FaTasks,
  FaArchive,
} from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import '../../../assets/css/TopNav.css'; // Assuming this is the path to your CSS file
import { LogoPatren } from '../../../assets/img/index';
import API_CONFIG from '../../../config';
import Notification from './Notification';

const TopNav = ({ onToggleSidebar, sidebarOpen, user, logoutUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const userId = user ? user.id : null;

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/notifications/${userId}`,
      );
      setNotifications(response.data);
      const unreadCount = response.data.filter(n => !n.read).length;
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
    <Nav className={`navbar top-navbar navbar-expand-lg navbar-dark ${sidebarOpen ? 'sidebar-open' : ''}`} dir="rtl">
  <div className="container-fluid">
  <Link
to="/">
<img className="navbar-brand-logo" src={LogoPatren} alt="Brand Logo" />
</Link>
    <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span  className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse align-items-center" id="navbarSupportedContent">
  <ul className="navbar-nav align-items-center">
      <li className="nav-item ">
            <Link to="/" className="nav-link">
              <FaHome className="m-2 -1" size={25} />
               الرئيسية
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/lawyers" className="nav-link">
              <FaUser className="m-2 -1" size={25} />
              المحامون
            </Link>
          </li>
            <li className="nav-item ">
              <Link to="/clients" className="nav-link">
                <FaUser className="m-2 -1" size={25} />
                الموكلين
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/legcases" className="nav-link">  
                <FaFileAlt className="m-2 -1" size={25} />
                القضايا
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/services" className="nav-link">
                <FaBriefcase className="m-2 -1" size={25} />
                الخدمات
              </Link>
            </li>
            <li className="nav-item ">
            <Link to="/court-search" className="nav-link">
            <FaArchive className="m-2 -1" size={25} />
            بحث القضايا
          </Link>
            </li>
            <li className="nav-item ">
              <Link to="/legal-writer" className="nav-link">
                <FaBriefcase className="m-2 -1" size={25} />
                المحرر
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/procedures" className="nav-link">
                <FaTasks className="m-2 -1" size={25} />
                الإجراءات
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/archives" className="nav-link">
                <FaArchive className="m-2 -1" size={25} />
                الارشيف
              </Link>
            </li>
            </ul>
            </div>
            <div className="user-menu">
          <Notification
            notifications={notifications}
            unreadNotifications={unreadNotifications}
            fetchNotifications={fetchNotifications}
          />
          <NavDropdown
            title={<FaUser />}
            id="userDropdown"
            align="end"
            drop="down"
          >
            <NavDropdown.Item href={`/profile/${userId}`}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutUser}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          <Button onClick={onToggleSidebar} className="settings-toggler btn-link-nav">
            <IoSettingsOutline />
          </Button>
        </div>  
      
    </div>

</Nav>
);
};

export default TopNav;