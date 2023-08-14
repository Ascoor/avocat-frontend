import { Stack, Typography, useTheme } from "@mui/material";
import DashBoard from './dashboard/Dashboard';

const Home = () => {
  const theme = useTheme(); // استخدام useTheme للوصول إلى theme

  return (
   <Typography variant="h6" align="center" sx={{ mt: "15px",m:"20px" }}>
     <DashBoard />   
     </Typography>

     
     
  );
};

export default Home;
