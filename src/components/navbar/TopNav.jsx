import {useState } from "react";
import { Nav, NavDropdown,Navbar } from "react-bootstrap";
import { BiBell, BiUser } from "react-icons/bi";
import { useNavigate,Link } from "react-router-dom";
import PropTypes from "prop-types";
import {LogoNav} from '../../assets/icons/index'
const TopNav = ({ userId, logoutUser }) => {
  TopNav.propTypes = {
    userId: PropTypes.string.isRequired,
    logoutUser: PropTypes.func.isRequired,
  };
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
    <Navbar className="top-nav-container">
      <Navbar.Brand as={Link} to="/" className="navbar-brand--start me-0">
                        <img
                            src={LogoNav}
                            width="120"
                            height="60"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
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
    </Navbar>
  );
};

export default TopNav;
