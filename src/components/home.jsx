import { Stack, Typography, useTheme } from "@mui/material";
import DashBoard from './dashboard/Dashboard';

const Home = () => {
  const theme = useTheme(); // استخدام useTheme للوصول إلى theme

  return (
    <Stack width={1500}
    direction={"row"}
    flexWrap={"wrap"}
    gap={2}
    justifyContent={"center"}
  >
      <Typography
        sx={{
          color: theme.palette.info.light,
          fontWeight: "bold",
        }}
        variant="h5"
      >
        <DashBoard />   
      </Typography>
     
    </Stack>
  );
};

export default Home;
