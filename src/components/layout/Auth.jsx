import { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './SideBar';
import useAuth from '../Auth/AuthUser';
import '../../App.css';
import MainContent from './MainContent';
import '../../assets/css/Auth.css'
function Auth() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token, logout } = useAuth();
  const userId = useAuth().user.id;

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  const onToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return ( 
    <>
    <TopNav onToggleSidebar={onToggleSidebar} userId={userId} logoutUser={logoutUser} sidebarOpen={sidebarOpen} />
    <div className={`admin-dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
<Sidebar sidebarOpen={sidebarOpen} onClose={handleCloseSidebar} onToggleSidebar={onToggleSidebar} />
</div>
<MainContent sidebarOpen={sidebarOpen}   />
    </>


  );
}

export default Auth;