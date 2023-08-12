import React, { useState } from 'react';
import { useTransition,useSpring, animated } from '@react-spring/web';
import { Card, Button, CircularProgress, Box, Collapse } from '@mui/material';
import { RiLoginCircleLine, RiUserAddLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { WelcomeImage, WelcomePatren } from '../../images/index';
const Login = React.lazy(() => import('../Auth/Login'));
const Register = React.lazy(() => import('../Auth/Register'));

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

  const formsTransition = useTransition(showLoginForm || showRegisterForm, {
    from: {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.8)',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 2,
    },
    enter: {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 2,
    },
    leave: {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.8)',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 2,
    },
    config: { duration: 500 },
  });

  const logoAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-100px)' },
    delay: 500,
  });

  return (
    <div>
      <header
        className="masthead"
        style={{
          backgroundImage: `url(${WelcomeImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '100vh',
        }}
      >
        <Box
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            paddingLeft: 10,
            height: '100%',
          }}
        >
          {showLogoAndButtons && (
            <animated.div style={logoAnimation} className="logo">
              <img
                src={WelcomePatren}
                alt="Pattern Logo"
                style={{ width: '200px', height: 'auto' }}
              />
            </animated.div>
          )}
          {showLogoAndButtons && (
            <Box mt={4} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleShowLoginForm}
                style={{ marginRight: 10 }}
              >
                <RiLoginCircleLine className="mr-1" />
                دخول
              </Button>
              <Button variant="contained" color="warning" onClick={handleShowRegisterForm}>
                <RiUserAddLine className="mr-1" />
                تسجيل اشتراك
              </Button>
            </Box>
          )}
          {formsTransition((styles, item) =>
            item ? (
              <animated.div
              style={{
                ...styles,
                position: 'absolute', // Explicitly set the position
              }}
            >
                <Collapse in={showLoginForm}>
                  <Card className="card-login">
                    <React.Suspense fallback={<CircularProgress />}>
                      <Login handleCloseForm={handleCloseForm} />
                    </React.Suspense>
                  </Card>
                </Collapse>
                <Collapse in={showRegisterForm}>
                  <Card className="card-login">
                    <React.Suspense fallback={<CircularProgress />}>
                      <Register handleCloseForm={handleCloseForm} />
                    </React.Suspense>
                  </Card>
                </Collapse>
              </animated.div>
            ) : null
          )}
        </Box>
      </header>
    </div>
  );
};

Guest.propTypes = {
  open: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
};

export default Guest;
