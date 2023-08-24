import { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './SideBar';

import '../../App.css';
import MainContent from './MainContent';
import '../../assets/css/Auth.css'
function Auth() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return ( 
    <>
    <TopNav onToggleSidebar={onToggleSidebar} sidebarOpen={sidebarOpen} />
    <div className={`admin-dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
<Sidebar sidebarOpen={sidebarOpen} onClose={handleCloseSidebar} onToggleSidebar={onToggleSidebar} />
</div>
<MainContent sidebarOpen={sidebarOpen}   />
    </>


  );
}

export default Auth;