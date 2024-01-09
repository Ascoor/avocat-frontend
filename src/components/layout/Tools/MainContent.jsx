
import AuthRoutes from './AuthRoutes';
import '../../../assets/css/MainContent.css';

const MainContent = ({ sidebarOpen }) => {
  return (
    <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <AuthRoutes />
    </div>
  );
};


export default MainContent;
