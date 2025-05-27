import { Grid, Box, Typography } from "@mui/material";
import {
  FacebookOutlined,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/logo2.png";

export default function Footer() {
  return (
    <Box
      sx={{
        marginTop: "auto",
        px: { xs: 3, sm: 6, md: 8, lg: "60px" },
        py: { xs: 4, sm: 5, md: "50px" },
        backgroundColor: "var(--tertiary)",
        color: "var(--secondary)",
        minHeight: "320px",
        backgroundImage: 'url("src/assets/coffee.png")',
        backgroundSize: { xs: "150px", md: "250px", lg: "300px" },
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
        backgroundBlendMode: "soft-light",
      }}
    >
      <Grid container spacing={4}>
        {/* Logo & Description */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ height: { xs: 65, sm: 75, lg: 85 }, width: "auto" }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{ maxWidth: 300, fontSize: "16px" }}
            >
              Premium coffee and pastries crafted with passion since 2010. We
              bring the authentic Italian café experience to your neighborhood.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FacebookOutlined sx={styles.socialMedia} />
              <Instagram sx={styles.socialMedia} />
              <Twitter sx={styles.socialMedia} />
              <YouTube sx={styles.socialMedia} />
            </Box>
          </Box>
        </Grid>

        {/* Quick Access */}
        <Grid
          size={{ xs: 12, sm: 6, lg: 3 }}
          sx={{ paddingTop: { md: "40px" } }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mb: 1, fontSize: "20px" }}
          >
            Quick Access
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box component={RouterLink} to="/home" sx={styles.linkStyle}>
              Home
            </Box>
            <Box component={RouterLink} to="/about" sx={styles.linkStyle}>
              About
            </Box>
            
          </Box>
        </Grid>

        {/* For You */}
        <Grid
          size={{ xs: 12, sm: 6, lg: 3 }}
          sx={{ paddingTop: { lg: "40px" } }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mb: 1, fontSize: "20px" }}
          >
            For You
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
       
           
           <Box component={RouterLink} to="/menu-items" sx={styles.linkStyle}>
              Menu
            </Box>
           <Box component={RouterLink} to="/search" sx={styles.linkStyle}>
            search
            </Box>
            {/* <Box sx={styles.linkStyle}>50% Off</Box> */}
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid
          size={{ xs: 12, sm: 6, lg: 3 }}
          sx={{ paddingTop: { lg: "40px" } }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mb: 1, fontSize: "20px" }}
          >
            Contact Us
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body1" sx={styles.linkStyle}>
              +20 1123 523 055
            </Typography>
            <Typography variant="body1" sx={styles.linkStyle}>
              SwirloCoffee@gmail.com
            </Typography>
            <Typography variant="body1" sx={styles.linkStyle}>
              890 Street Smart Village, Egypt.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = {
  socialMedia: {
    color: "var(--light-bg)",
    fontSize: "28px",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      color: "var(--accent)",
      transform: "scale(1.2)",
    },
  },
  linkStyle: {
    color: "var(--light-bg)",
    fontSize: "18px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      color: "var(--accent)",
      transform: "translateX(4px)",
    },
  },
};
