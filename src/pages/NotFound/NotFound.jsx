import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import notFoundBg from "../../assets/notFoundbg.png";
import spiltCoffee from "../../assets/spiltCoffee.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          height: "80vh",
          backgroundImage: `url(${notFoundBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              color: "var(--tertiary)",
              fontSize: { xs: "2.8rem", md: "3.1rem" },
            }}>
            Oh no!
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 500,
              mb: 2,
              color: "var(--tertiary)",
              fontSize: { xs: "1.45rem", md: "1.7rem" },
            }}>
            Error 404: Page Not Found.
          </Typography>
          <Box
            component="img"
            src={spiltCoffee}
            alt="spilt coffee"
            sx={{
              maxHeight: { xs: "135px", md: "170px" },
              width: "auto",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          <Typography
            variant="body1"
            sx={{
              maxWidth: 600,
              mx: "auto",
              my: 1.5,
              color: "rgb(146, 99, 67)",
              fontSize: { xs: "1.35rem", md: "1.45rem" },
            }}>
            I didn't spilt it, I swear!
          </Typography>
          <Button
            onClick={() => navigate("/home")}
            sx={{
              backgroundColor: "rgb(146, 99, 67)",
              color: "#f6f2ef",
              textTransform: "none",
              fontSize: { xs: "1rem", md: "1.1rem" },
              boxShadow: "4px 7px 10px rgba(0,0,0,0.2) ",
              px: 3,
              my: 2,
              "&:hover": {
                backgroundColor: "rgb(170, 131, 105)",
              },
            }}>
            Back to Home
          </Button>
        </Box>
      </Box>
    </>
  );
}
