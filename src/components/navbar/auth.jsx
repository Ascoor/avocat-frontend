import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import AuthRoutes from '../auth/AuthRoutes';
import DrawerHeader from './DrawerHeader';

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
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const theme = useTheme();

  return (
    <>
      <TopNav
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        
    <DrawerHeader handleDrawerClose={handleDrawerClose} />
        <AuthRoutes />
      </Main>
    </>
  );
};

export default Auth;
