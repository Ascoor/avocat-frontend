import { useState } from 'react';
import { styled } from '@mui/material/styles';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import AuthRoutes from '../auth/AuthRoutes';
import DrawerHeader from './DrawerHeader';

import useAuth from "../auth/AuthUser";

const drawerWidth = 240;

const Main = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const Auth = () => {
  const { token, logout } = useAuth();
  const userId = useAuth().user.id;
  
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <TopNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        userId={userId}
        logoutUser={logoutUser}
      />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader handleDrawerClose={handleDrawerClose}/>
        <AuthRoutes />
      </Main>
    </>
  );
};

export default Auth;
