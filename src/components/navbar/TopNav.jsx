<<<<<<< HEAD
=======
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
>>>>>>> 59404359b129b7c8626b38b1bb88a0c360c4b040

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import  PropTypes  from 'prop-types';
function TopNav({ open, handleDrawerOpen }) {
  return (
<<<<<<< HEAD
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
=======
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
>>>>>>> 59404359b129b7c8626b38b1bb88a0c360c4b040
  );
}
// TopNav.jsx
TopNav.propTypes = {
  handleDrawerOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // ... other prop validations
};

export default TopNav;
