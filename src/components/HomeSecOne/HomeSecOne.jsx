import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import VerifiedIcon from "@mui/icons-material/Verified";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AirIcon from "@mui/icons-material/Air";
import leaf1 from "../../assets/leaf1.png";
import leaf2 from "../../assets/leaf2.png";
import cup from "../../assets/cup.png";

const iconStyle = { color: "green", fontSize: 30, mr: 2 };

const features = [
  {
    title: "Fresh Coffee Beans",
    desc: "We use only the finest handpicked Arabica beans for a rich, smooth flavor.",
    icon: <LocalCafeIcon sx={iconStyle} />,
  },
  {
    title: "Variety of Blends",
    desc: "Choose from single-origin, espresso, or signature house blends.",
    icon: <CoffeeMakerIcon sx={iconStyle} />,
  },
  {
    title: "Perfect Roasting",
    desc: "Expertly roasted to unlock the full aroma and taste profile.",
    icon: <FireplaceIcon sx={iconStyle} />,
  },
  {
    title: "Premium Quality",
    desc: "Quality checks at every step ensure consistency and excellence.",
    icon: <VerifiedIcon sx={iconStyle} />,
  },
  {
    title: "Finely Ground",
    desc: "Our precision grinding preserves flavor and ensures optimal brewing.",
    icon: <PrecisionManufacturingIcon sx={iconStyle} />,
  },
  {
    title: "Inviting Aroma",
    desc: "Every cup bursts with a bold, captivating coffee fragrance.",
    icon: <AirIcon sx={iconStyle} />,
  },
];

const FeatureCard = ({ title, desc, icon }) => (
  <Box mb={5} px={2}>
    <Box display="flex" alignItems="flex-start">
      {icon}
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default function CoffeeFeatures() {
  return (
    <ParallaxProvider>
      <Box
        position="relative"
        sx={{
          background: "#fff",
          minHeight: { xs: "auto", lg: "100vh" },
          py: { xs: 6, lg: 0 },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}>
        {/* Leaves above all */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 5,
          }}>
          <Parallax speed={8}>
            <Box
              component="img"
              src={leaf2}
              alt="Leaf"
              display={{ xs: "none", md: "flex" }}
              sx={{
                position: "absolute",
                top: 0,
                left: "20%",
                width: "45%",
              }}
            />
          </Parallax>
          <Parallax speed={-4}>
            <Box
              component="img"
              src={leaf1}
              alt="Leaf"
              display={{ xs: "none", md: "flex" }}
              sx={{
                position: "absolute",
                top: 350,
                left: "62%",
                width: "6%",
              }}
            />
          </Parallax>
        </Box>

        {/* Main Content */}
        <Box sx={{ zIndex: 2, px: { xs: 2, md: 8 } }}>
          <Grid container spacing={{ xs: 0, md: 4 }} alignItems="center">
            {/* Left Column */}
            <Grid size={{ xs: 12, md: 4 }}>
              {features.slice(0, 3).map((f, i) => (
                <FeatureCard key={i} {...f} />
              ))}
            </Grid>

            {/* Center Image */}
            <Grid
              size={{ xs: 12, md: 4 }}
              display={{ xs: "none", md: "flex" }}
              justifyContent="center">
              <Box
                component="img"
                src={cup}
                alt="Coffee Cup"
                sx={{
                  maxHeight: 550,
                  height: "100%",
                  width: "auto",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              />
            </Grid>

            {/* Right Column */}
            <Grid size={{ xs: 12, md: 4 }}>
              {features.slice(3).map((f, i) => (
                <FeatureCard key={i} {...f} />
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ParallaxProvider>
  );
}
