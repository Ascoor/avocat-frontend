import * as React from "react";
import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import useAuth from "../Auth/AuthUser";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";

import SideBar from "./SideBar";
import { getDesignTokens } from "./theme";
import AuthRoutes from "./AuthRoutes";
import TopNav from "./TopNav";


"./TopNav";

export default function Auth() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const { token, logout } = useAuth();
  const userId = useAuth().user.id;
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [mode, setMode] = React.useState(
    
    localStorage.getItem("currentMode")
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
        //@ts-ignore
                userId={userId}  logoutUser={logoutUser}
        
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          setMode={setMode}
          setIsRTL={setIsRTL}
          isRTL={isRTL}
        />

     
            
    <Stack 
           sx={{
            display: 'flex',
            flexDirection: 'col',
            justifyContent: 'center',
            alignItems: 'center', // يمكن تغييرها إلى 'center' لتوسيط العناصر عمودياً
            flexGrow: 1,
            overflow: 'hidden',
            marginTop: '84px', // الهامش العلوي
          }}>
    
   <SideBar
          open={open}
          handleDrawerClose={handleDrawerClose}
          isRTL={isRTL}
          setRTL={setIsRTL}
          userId={userId}
        />
          <AuthRoutes />
    </  Stack>
      </Box>

    </ThemeProvider>
  );
}