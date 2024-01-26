
import AuthRoutes from './AuthRoutes';
import '../../../assets/css/MainContent.css';
import Sidebar from './SideBar';

const MainContent = ({ sidebarOpen, userName, toggleSidebar }) => {
  // Define CSS classes based on the sidebarOpen prop
  const sidebarClass = `sidebar ${sidebarOpen ? 'open' : ''}`;
  const contentClass = `content ${sidebarOpen ? 'content-with-sidebar' : ''}`;

  return (
    <div className="main-content">
      <div className={sidebarClass}>
        <Sidebar
          userName={userName}
          sidebarOpen={sidebarOpen}
          onClose={toggleSidebar}
          onToggleSidebar={toggleSidebar}
        />
      </div>
      <div className={contentClass}>
        <AuthRoutes />
      </div>
    </div>
  );
};

export default MainContent;
