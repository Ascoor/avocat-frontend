import React, { Suspense, useState } from 'react';
import '../../assets/css/Welcome.css';
import { useTransition, useSpring, animated } from '@react-spring/web';
import { Button, Container } from 'react-bootstrap';
import { RiLoginCircleLine, RiUserAddLine } from 'react-icons/ri';
import { LogoPatren } from '../../assets/img/index';

import WelcomeSuspense from './Tools/WelcomeSuspense';

const Login = React.lazy(() => import('./AuthTool/Login'));
const Register = React.lazy(() => import('./AuthTool/Register'));

const Guest = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLogoAndButtons, setShowLogoAndButtons] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCloseForm = () => {
    setLoading(true);
    setTimeout(() => {
      setShowRegisterForm(false);
      setShowLoginForm(false);
      setLoading(false);
      setShowLogoAndButtons(true);
    }, 1000); // Simulate a loading delay
  };

  const handleShowLoginForm = () => {
    setLoading(true);
    setTimeout(() => {
      setShowLoginForm(true);
      setShowLogoAndButtons(false);
      setLoading(false);
    }, 1000); // Simulate a loading delay
  };

  const handleShowRegisterForm = () => {
    setLoading(true);
    setTimeout(() => {
      setShowLogoAndButtons(false);
      setShowRegisterForm(true);
      setLoading(false);
    }, 1000); // Simulate a loading delay
  };

  const formsTransition = useTransition(showLoginForm || showRegisterForm, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const logoAnimation = useSpring({
    opacity: showLogoAndButtons ? 1 : 0,
    transform: showLogoAndButtons ? 'translateY(0)' : 'translateY(-100px)',
    from: { opacity: 0, transform: 'translateY(-100px)' },
    delay: 500,
  });

  const buttonsAnimation = useSpring({
    opacity: showLogoAndButtons ? 1 : 0,
    transform: showLogoAndButtons ? 'translateY(0)' : 'translateY(100px)',
    from: { opacity: 0, transform: 'translateY(100px)' },
    delay: showLogoAndButtons ? 500 : 0, // Adjusted delay here
  });

  return (
    <div className="splash-container">
      {/* Splash Mask */}
      <div className="splash-mask"></div>

      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          paddingLeft: '10px',
          height: 'calc(100% - 64px)', // Adjusted to exclude navbar height
        }}
      >
        {loading ? (
          <WelcomeSuspense />
        ) : (
          <>
            {showLogoAndButtons && (
              <animated.div style={logoAnimation} className="logo-container">
                <img
                  src={LogoPatren}
                  alt="Pattern Logo"
                  className="logo img-fluid"
                  style={{
                    marginLeft: '80px',
                    paddingRight: '15px',
                    paddingLeft: '30px',
                    width: '250px',
                    height: 'auto',
                  }}
                />
              </animated.div>
            )}
            {showLogoAndButtons && (
              <animated.div style={buttonsAnimation} className="logo-container">
                <div
                  className="buttons-container"
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  <Button
                    variant="success"
                    onClick={handleShowLoginForm}
                    style={{ marginTop: '10px' }}
                  >
                    <RiLoginCircleLine className="mr-1" />
                    دخول
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleShowRegisterForm}
                    style={{ marginTop: '10px' }}
                  >
                    <RiUserAddLine className="mr-1" />
                    تسجيل اشتراك
                  </Button>
                </div>
              </animated.div>
            )}

            {/* Forms */}
            <Suspense fallback={<div>Loading...</div>}>
              {formsTransition((styles, item) =>
                item ? (
                  <animated.div style={styles}>
                    {/* Glass effect container */}
                    <div
                      className="glass-container"
                      style={{ position: 'relative', zIndex: 3 }}
                    >
                      {showLoginForm && (
                        <Login
                          className="form-content"
                          handleCloseForm={handleCloseForm}
                        />
                      )}
                      {showRegisterForm && (
                        <Register
                          className="form-content"
                          handleCloseForm={handleCloseForm}
                        />
                      )}
                    </div>
                  </animated.div>
                ) : null,
              )}
            </Suspense>
          </>
        )}
      </div>

      <footer
        style={{
          background:
            'linear-gradient(35deg, rgb(7 51 56),#972c2c, rgb(8 36 60))',
          direction: 'rtl',
          color: '#fff',
          textAlign: 'center',
          padding: '10px 0',
          position: 'absolute',
          bottom: 0,
          width: '100%',
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
