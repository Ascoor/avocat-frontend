import PropTypes from 'prop-types';
import AuthRoutes from './AuthRoutes';
import '../../assets/css/MainContent.css';

const MainContent = ({ isOpen }) => {
  return (
    <div className={`main-content ${isOpen ? 'sidebar-open' : ''}`} style={{ paddingBottom: "16px", minHeight: "calc(100vh - 152px)" }}>
      <AuthRoutes />
    </div>
  );
};

MainContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default MainContent;
