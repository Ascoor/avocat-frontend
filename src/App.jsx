import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

import Guest from './components/layout/Guest';
import Auth from './components/layout/Auth';
import useAuth from './components/layout/AuthTool/AuthUser';

const App = () => {
  const { getToken } = useAuth();
  const isAuthenticated = !!getToken(); // Check if the user is authenticated

  return <>{isAuthenticated ? <Auth /> : <Guest />}</>;
};

export default App;
