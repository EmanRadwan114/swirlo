import React, { useEffect, useMemo, useState } from "react";
import "@fontsource/lobster";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import img1 from "../../assets/slider1.png";
import img2 from "../../assets/slider2.png";
import img3 from "../../assets/slider3.png";
import img4 from "../../assets/slider4.png";

import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { grey } from "@mui/material/colors";

export default function HomeHero() {
  const images = useMemo(() => [img1, img2, img3, img4], []);
  const [counter, setCounter] = useState(0);
  let navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  const themeC = createTheme({
    palette: {
      primary: {
        main: "#febd45",
      },
    },
  });
  const mainImage = images[counter]; // <-- Sync with counter
  const handleThumbnailClick = (index) => {
    setCounter(index);
  };
  return (
    <Box
      sx={{
        minHeight: "85vh",
        background: "linear-gradient(to bottom right, #dabc9a, #8d6e63)",
        px: { xs: 4, lg: 10 },
        py: { xs: 5, sm: 10 },
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        mt: "60px",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDE: TEXT */}
      <Stack
        spacing={3}
        flex={1}
        sx={{ textAlign: { xs: "center", md: "left" } }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", sm: "3.4rem", lg: "4.2rem" },
            color: "white",
          }}
        >
          Elevate Your
          <br /> Day with <br />
          <Box
            component="span"
            sx={{
              background:
                "linear-gradient(to right, var(--primary), var(--tertiary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
            }}
          >
            Premium Coffee
          </Box>
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            color: grey[900],
            maxWidth: { xs: "400px", lg: "500px" },
            mx: { xs: "auto", md: 0 },
          }}
        >
          Discover the finest coffee, sourced ethically and roasted to
          perfection. From bold blends to single origins, elevate your coffee
          ritual.
        </Typography>

        <ThemeProvider theme={themeC}>
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "fit-content",
              mx: { xs: "auto", md: 0 },
              alignSelf: { xs: "center", md: "start" },
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: "30px",
              textTransform: "none",
              px: 4,
              py: 1.5,
            }}
            onClick={() => {
              navigate("/menu-items");
            }}
          >
            Shop Now
          </Button>
        </ThemeProvider>
      </Stack>
      <Stack
        flex={1}
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
        mb={{ xs: 5, md: 0 }}
        alignSelf={"center"}
      >
        <Box
          component="img"
          src={mainImage}
          alt="Main"
          sx={{
            height: { xs: "250px", md: "400px" },
            width: { xs: "100%", md: "400px" },
            maxWidth: "100%",
            borderRadius: 3,
            objectFit: "cover",
          }}
        />
        <Stack
          direction={{ xs: "row", md: "column" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {images.map((img, idx) => (
            <Box
              key={idx}
              component="img"
              src={img}
              alt={`thumbnail ${idx + 1}`}
              onClick={() => handleThumbnailClick(idx)}
              sx={{
                width: { xs: "60px", md: "80px" },
                height: { xs: "60px", md: "80px" },
                borderRadius: 2,
                cursor: "pointer",
                border:
                  idx === counter
                    ? "2px solid #ff9900"
                    : "2px solid transparent",
                transition: "0.3s",
                objectFit: "cover",
                p: 1,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
