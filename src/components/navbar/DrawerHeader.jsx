
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import  PropTypes  from 'prop-types';

function DrawerHeader({ handleDrawerClose }) {
    const theme = useTheme();
  return (
    <div>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </div>
  );
}
DrawerHeader.propTypes = {
    handleDrawerClose: PropTypes.func.isRequired,
 
  
    // ... other prop validations
  };
export default DrawerHeader;
