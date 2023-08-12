import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PropTypes from "prop-types";
const HeaderContainer = styled('div')(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-end' : 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerHeader = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  return (
    <HeaderContainer open={open}>
      <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </HeaderContainer>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool.isRequired,
  theme: PropTypes.func.isRequired,
 
};
export default DrawerHeader;
