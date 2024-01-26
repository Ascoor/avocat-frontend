import { useState } from 'react';
import TopNav from './Tools/TopNav';
// import Sidebar from './Tools/SideBar';
import useAuth from '../layout/AuthTool/AuthUser';
import '../../App.css';
import MainContent from './Tools/MainContent';
import '../../assets/css/Auth.css';

function Auth() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token, logout, getUser } = useAuth();
  const user = getUser();
  const userId = user.id;
  const userName = user.name;

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <TopNav
        toggleSidebar={toggleSidebar}
        userId={userId}
        userName={userName}
        logoutUser={logoutUser}
        sidebarOpen={sidebarOpen}
      />
    

      <MainContent     
        toggleSidebar={toggleSidebar} userName={userName} sidebarOpen={sidebarOpen} />

    </>
  );
}

export default Auth;
