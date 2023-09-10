import AuthUser from './components/Auth/AuthUser';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import Guest from './components/layout/Guest';
import Auth from './components/layout/Auth';
const App = () => {
  const { getToken } = AuthUser();

  if (!getToken()) {
    return <Guest />;
  }

  return <Auth />;
};
export default App;
