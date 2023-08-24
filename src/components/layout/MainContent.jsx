import PropTypes from 'prop-types';
import AuthRoutes from './AuthRoutes';
import '../../assets/css/MainContent.css';

const MainContent = ({ sidebarOpen }) => {
  return (
    <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`} style={{ paddingBottom: "16px", minHeight: "calc(100vh - 152px)" }}>
      <AuthRoutes />
    </div>
  );
};

MainContent.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
};

export default MainContent;
