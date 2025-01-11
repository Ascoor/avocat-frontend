import Sidebar from './SideBar';
import AuthRouter from './AuthRoutes';

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
        <AuthRouter />
      </div>
    </div>
  );
};

export default MainContent;
