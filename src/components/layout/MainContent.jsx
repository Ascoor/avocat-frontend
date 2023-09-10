import PropTypes from 'prop-types';
import AuthRoutes from './AuthRoutes';
import '../../assets/css/MainContent.css';

const MainContent = ({ sidebarOpen }) => {
  return (
    <div
      className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}
      style={{
        padding: '16px',
        minHeight: 'calc(100vh - 152px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AuthRoutes />
    </div>
  );
};

MainContent.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
};

export default MainContent;
