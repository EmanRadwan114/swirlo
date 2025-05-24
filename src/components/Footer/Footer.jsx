import { Box, Typography } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      sx={{
        px: "60px",
        py: "60px",
        backgroundColor: "var(--tertiary)",
        color: "var(--secondary)",
        minHeight: "320px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "30px",
        backgroundImage: 'url("src/assets/coffee.png")',
        backgroundSize: "300px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
        backgroundBlendMode: "soft-light",
      }}>
      {/* Logo & Description */}
      <Box
        sx={{
          flex: "1 1 250px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}>
          <Box
            component="img"
            src="src/assets/logo2.png"
            alt="Logo"
            sx={{ height: 85, width: "auto" }}
          />
        </Box>
        <Typography variant="body1" sx={{ maxWidth: 300, fontSize: "16px" }}>
          Premium coffee and pastries crafted with passion since 2010. We bring
          the authentic Italian café experience to your neighborhood.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FacebookOutlinedIcon sx={styles.socialMedia} />
          <InstagramIcon sx={styles.socialMedia} />
          <TwitterIcon sx={styles.socialMedia} />
          <YouTubeIcon sx={styles.socialMedia} />
        </Box>
      </Box>

      {/* Quick Access */}
      <Box sx={{ flex: "1 1 150px" }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", mb: 1, fontSize: "20px" }}>
          Quick Access
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box component={RouterLink} to="/home" sx={styles.linkStyle}>
            Home
          </Box>
          <Box component={RouterLink} to="/about" sx={styles.linkStyle}>
            About
          </Box>
          <Box component={RouterLink} to="/categories" sx={styles.linkStyle}>
            Categories
          </Box>
        </Box>
      </Box>

      {/* For You */}
      <Box sx={{ flex: "1 1 150px" }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", mb: 1, fontSize: "20px" }}>
          For You
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box component={RouterLink} to="/NewArrival" sx={styles.linkStyle}>
            New Arrival
          </Box>
          <Box component={RouterLink} to="/BestSelling" sx={styles.linkStyle}>
            Best Selling
          </Box>
          <Box component={RouterLink} to="/50%Off" sx={styles.linkStyle}>
            50% Off
          </Box>
        </Box>
      </Box>

      {/* Contact Info */}
      <Box sx={{ flex: "1 1 200px" }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", mb: 1, fontSize: "20px" }}>
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
      </Box>
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
