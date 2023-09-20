import PropTypes from 'prop-types';
import AuthRoutes from './AuthRoutes';
import '../../../assets/css/MainContent.css';

const MainContent = ({ sidebarOpen }) => {
  return (
    <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <AuthRoutes />
    </div>
  );
};

MainContent.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired
};

export default MainContent;
