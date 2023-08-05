import React, { useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { BiBell, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const TopNav = ({ userId, logoutUser }) => {
  const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(
    false
  );
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleNotificationDropdown = () => {
    setNotificationDropdownVisible(!notificationDropdownVisible);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleProfileClick = () => {
    // Navigate to the profile update page
    navigate(`/profile/${userId}`);
    // Close the profile dropdown after clicking
    setProfileDropdownVisible(false);
  };

  return (
    <div className="top-nav-container">
      <Nav as="ul" className="justify-content-end pt-2">
        <Nav.Item as="li" className="nav-item-auth">
          <NavDropdown
            title={<BiBell />}
            id="notification-dropdown"
            show={notificationDropdownVisible}
            onToggle={toggleNotificationDropdown}
          >
            <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Item>Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav.Item>
        <Nav.Item as="li" className="nav-item-auth">
          <NavDropdown
          className="dropdown-top-nav-item"
            title={<BiUser />}
            id="profile-dropdown"
            show={profileDropdownVisible}
            onToggle={toggleProfileDropdown}
          >
            {/* Use the handleProfileClick function to navigate */}
            <div className="dropdown-item"  onClick={handleProfileClick}>
              Profile
            </div>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default TopNav;
