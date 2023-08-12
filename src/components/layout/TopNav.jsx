import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import Menu from "@mui/material/Menu"; // Add this import
import MenuItem from "@mui/material/MenuItem"; // Add this import
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Stack,
  styled,
  Box,
} from "@mui/material";

const drawerWidth = 240;


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const gradientBackground = (theme) => `
  linear-gradient(to ${theme.direction === "rtl" ? "left" : "right"}, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.error.main})
`;
//@ts-ignore
const StyledAppBar = styled(AppBar)(({ theme, open }) => ({
  background: gradientBackground(theme),
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  zIndex: theme.zIndex.drawer + 2, // Set a higher zIndex
}));

const TopNav = ({ open, handleDrawerOpen, setMode, isRTL, setIsRTL,
  userId,logoutUser }) => {
  const theme = useTheme();
  const handleRTLToggle = () => {
    document.documentElement.dir = isRTL ? "ltr" : "rtl";
    setIsRTL(!isRTL);
  };

  const topNavStyles = {
    position: "fixed",
    width: `calc(100% - ${open ? drawerWidth : 0}px)`,
    height: 64,
    [isRTL ? "right" : "left"]: open ? drawerWidth : 0,
    transition: theme.transitions.create(["right", "left", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };

  const [openMemberDropdown, setOpenMemberDropdown] = React.useState(false);
  const [openNotificationDropdown, setOpenNotificationDropdown] = React.useState(false);

  // Define functions to open/close dropdown menus
  const handleOpenMemberDropdown = (event) => {
    setOpenMemberDropdown(true);
  };

  const handleCloseMemberDropdown = () => {
    setOpenMemberDropdown(false);
  };

  const handleOpenNotificationDropdown = (event) => {
    setOpenNotificationDropdown(true);
  };

  const handleCloseNotificationDropdown = () => {
    setOpenNotificationDropdown(false);
  };

  return (
   //@ts-ignore
    <StyledAppBar style={topNavStyles} open={open}>
      
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        
  
        <Box sx={{ flexGrow: 1, marginLeft: theme.spacing(3) }}>
          <SearchIcon sx={{ marginRight: theme.spacing(2) }} />
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Box>

        <Stack direction={"row"}>
            {theme.palette.mode === "light" ? (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "currentMode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                  );
                }}
                color="inherit"
              >
                <LightModeOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "currentMode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                  );
                }}
                color="inherit"
              >
                <DarkModeOutlinedIcon />
              </IconButton>
            )}

            <IconButton color="inherit">
              <NotificationsOutlinedIcon />
            </IconButton>

            <IconButton color="inherit">
              <SettingsOutlinedIcon />
            </IconButton>

            {userId ? ( // Check if the user is authenticated
            <>
              <IconButton color="inherit" onClick={handleOpenMemberDropdown}>
                <Person2OutlinedIcon />
              </IconButton>
              <Menu
                anchorOrigin={{
                  vertical: "top",
                  horizontal: isRTL ? "left" : "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: isRTL ? "left" : "right",
                }}
                open={openMemberDropdown}
                onClose={handleCloseMemberDropdown}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </Menu>
            </>
          ) : null}
        
          </Stack>

        <Switch
          checked={isRTL}
          onChange={handleRTLToggle}
          color="default"
          inputProps={{ "aria-label": "rtl-ltr-switch" }}
        />
      </Toolbar>
    </StyledAppBar>
  );
};

TopNav.propTypes = {
  open: PropTypes.bool.isRequired,
  logoutUser: PropTypes.bool.isRequired,
  userId: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  isRTL: PropTypes.bool.isRequired,
  setIsRTL: PropTypes.func.isRequired,
};

export default TopNav;
