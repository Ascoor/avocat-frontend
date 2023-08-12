
import Box from "@mui/material/Box";
import DashBoard from './dashboard/Dashboard';

const Home = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, paddingBottom: "70px" }}>
      <DashBoard/>   
    </Box>
  );
};

export default Home;
