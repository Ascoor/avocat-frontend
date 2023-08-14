
import { Box, Typography, useTheme } from "@mui/material";



const Header = () => {
  const theme = useTheme();
  return (
    <Box>
        <Typography
      sx={{
        color: theme.palette.info.light,
        fontWeight: "bold",
      }}
      variant="h5"
    >
dfsdfsdf
    </Typography>
    <Typography variant="body1">sdfsdf</Typography>
  </Box>

  
  );
}

export default Header;
