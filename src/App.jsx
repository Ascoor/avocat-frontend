import React from 'react';
import  AuthUser  from './components/auth/AuthUser';
import Guest from './components/navbar/guest';
import { Box, CssBaseline } from '@mui/material';
import Auth from './components/navbar/auth';

const App =() => {
  const { getToken } = AuthUser();

  if (!getToken()) {
    return <Guest />;
  }

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Auth />
      </Box>
  );
}
export default App;