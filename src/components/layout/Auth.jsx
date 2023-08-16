import { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

import '../../App.css';
import MainContent from './MainContent';
import '../../assets/css/Auth.css'
function Auth() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (

      <div className="App">
        <TopNav onToggleSidebar={handleToggleSidebar} sidebarOpen={sidebarOpen} />
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <MainContent isOpen={sidebarOpen} />
      </div>

  );
}

export default Auth;