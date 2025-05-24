import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dessertBg from "../../assets/dessertBg2.jpg";

const AboutMid = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          height: "80vh",
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.69), rgba(0, 0, 0, 0.74)), url(${dessertBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          px: 2,
        }}>
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3rem" },
            }}>
            Taste Our Irresistible Pastries
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 600,
              mx: "auto",
              mb: 4,
              fontSize: { xs: "1.1rem", md: "1.2rem" },
            }}>
            Discover the perfect pairing to your coffee — handcrafted desserts
            and fresh pastries baked with love every day.
          </Typography>
          <Button
            onClick={() => navigate("/menu-items")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "var(--main-color)",
              color: "var(--gold)",
              textTransform: "none",
              fontSize: "1.3rem",
              "&:hover": {
                color: "var(--light-color)",
                boxShadow: "none",
              },
            }}>
            Explore Desserts
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AboutMid;
