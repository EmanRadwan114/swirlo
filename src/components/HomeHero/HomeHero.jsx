import React, { useEffect, useMemo, useState } from "react";
import "@fontsource/lobster";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import img1 from "../../assets/slider1.png";
import img2 from "../../assets/slider2.png";
import img3 from "../../assets/slider3.png";

export default function HomeHero() {
  const images = useMemo(() => [img1, img2, img3], []);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  const themeC = createTheme({
    palette: {
      primary: {
        main: "#dc9830",
      },
    },
  });

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      minHeight={"85vh"}
      mt={"64px"}
      position="relative"
      borderRadius={2}
      overflow="hidden"
      sx={{
        backgroundImage: `linear-gradient(135deg, var(--accent), var(--secondary), var(--primary))`,
      }}
    >
      {/* Text Section */}
      <Stack
        flex={1}
        p={{ xs: 3, md: 5 }}
        gap={2}
        justifyContent={"center"}
        sx={{
          textAlign: "center",
          color: "var(--primary)",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.4rem" },
            fontFamily: "Pacifico, cursive",
          }}
        >
          Welcome to Swirlo
        </Typography>
        <Typography variant="body1" sx={{ pl: 1, fontFamily: "Pacifico, cursive" }}>
          Great deals, fresh finds, and exciting offers await!
        </Typography>
        <ThemeProvider theme={themeC}>
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 4, textTransform: "none", width: "fit-content", alignSelf: "center", px: 4, fontSize: "1rem" }}
          >
            Shop
          </Button>
        </ThemeProvider>
      </Stack>
      <Stack flex={1.5} display={"flex"} justifyContent={"center"} alignItems={"center"} p={2} position={"relative"}>
        <img
          src={images[counter]}
          alt="hero"
          style={{
            borderRadius: "10%",
            width: "70%",
            position: "relative",
          }}
        />
      </Stack>
    </Stack>
  );
}
