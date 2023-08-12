import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material/styles";
import PropTypes from 'prop-types';

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import SideBar from "./SideBar";
import { getDesignTokens } from "./theme";
import AuthRoutes from "./AuthRoutes";
import TopNav from "./TopNav";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
"./TopNav";

export default function Auth() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [mode, setMode] = React.useState(
    Boolean(localStorage.getItem("currentMode"))
      ? localStorage.getItem("currentMode")
      : "light"
  );
  const [isRTL, setIsRTL] = React.useState(false);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopNav
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          setMode={setMode}
          setIsRTL={setIsRTL}
          isRTL={isRTL}
        />

        <SideBar
          open={open}
          handleDrawerClose={handleDrawerClose}
          isRTL={isRTL}
          setRTL={setIsRTL}
        />
        <Box
          component="main"
        
        >
          <AuthRoutes />
        </Box>
      </Box>
    </ThemeProvider>
  );
}