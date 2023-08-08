
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import AuthUser from './components/auth/AuthUser';
import Guest from './components/navbar/guest';
import Auth from './components/navbar/auth';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
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
