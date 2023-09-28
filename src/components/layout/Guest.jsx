import React, { useState } from 'react';
import "../../assets/css/Welcome.css"
import { useTransition, useSpring, animated } from '@react-spring/web';
import { Card, Button, Container, Spinner } from 'react-bootstrap';
import { RiLoginCircleLine, RiUserAddLine } from 'react-icons/ri';
import { WelcomePatren } from '../../images/index';

const Login = React.lazy(() => import('./AuthTool/Login'));
const Register = React.lazy(() => import('./AuthTool/Register'));

const Guest = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLogoAndButtons, setShowLogoAndButtons] = useState(true);
  const handleCloseForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowLogoAndButtons(true);
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowLogoAndButtons(false);
  };

  const handleShowRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
    setShowLogoAndButtons(false);
  };

  const formsTransition = useTransition(
    showLoginForm || showRegisterForm,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    }
  );

  const logoAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-100px)' },
    delay: 500,
  });

  return (
    <div className="splash-container">
      {/* Splash Mask */}
      <div className="splash-mask"></div>
      <div className="navbar navbar-light fixed-top" id="mainNav">
        {/* Navbar content */}
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          paddingLeft: '10px',
          height: 'calc(100% - 64px)', // Adjusted to exclude navbar height
        }}
      >
        {/* Logo and Buttons */}
        {showLogoAndButtons && (
          <animated.div style={logoAnimation} className="logo-container">
            <img
              src={WelcomePatren}
              alt="Pattern Logo"
              className="logo img-fluid"
              style={{ width: '200px', height: 'auto' }}
            />
          </animated.div>
        )}
        {showLogoAndButtons && (
  <div className="buttons-container" style={{ position: 'relative', zIndex: 2 }}>
    <Button
      variant="success"
      onClick={handleShowLoginForm}
      style={{ marginRight: '10px' }}
    >
      <RiLoginCircleLine className="mr-1" />
      دخول
    </Button>
    <Button variant="danger" onClick={handleShowRegisterForm}>
      <RiUserAddLine className="mr-1" />
      تسجيل اشتراك
    </Button>
  </div>
)}


      </div>
      {/* Forms */}{formsTransition((styles, item) =>
  item ? (
    <animated.div style={styles}>
      {/* Glass effect container */}
      <div className="glass-container" style={{ position: 'relative', zIndex: 2 }}>
        <Card className="form-container">
          <React.Suspense fallback={<Spinner animation="grow" />}>
            {showLoginForm && (
              <Login className="form-content" handleCloseForm={handleCloseForm} />
            )}
            {showRegisterForm && (
              <Register className="form-content" handleCloseForm={handleCloseForm} />
            )}
          </React.Suspense>
        </Card>
      </div>
    </animated.div>
  ) : null
)}

      {/* Footer */}
      <footer
        style={{
          background: 'linear-gradient(rgb(11 22 26), rgb(14 48 66), rgb(10 18 24))',
          direction: 'rtl',
          color: '#fff',
          textAlign: 'center',
          padding: '10px 0',
          position: 'absolute',
          bottom: 0, // Place the footer at the bottom of the page
          width: '100%', // Make the footer full width
        }}
      >
        <Container>
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} Avocat All rights reserved
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default Guest;
