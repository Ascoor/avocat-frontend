
import  AuthUser  from './components/Auth/AuthUser';
import './App.css';
import Guest from './components/layout/Guest';
import Auth from './components/layout/Auth';
const App =() => {
  const { getToken } = AuthUser();

  if (!getToken()) {
    return <Guest />;
  }

  return (
  
        <Auth />

  );
}
export default App;