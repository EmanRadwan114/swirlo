import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CoffeeIcon from "@mui/icons-material/LocalCafe";
import SpaIcon from "@mui/icons-material/Spa";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import beans from "../../assets/beans.png";
import donutMug from "../../assets/donutMug.png";

const steps = [
  {
    icon: <SpaIcon sx={{ fontSize: 40, color: "var(--gold)" }} />,
    title: "Organic Coffee Seed",
    description: "We will help you to get the result you dreamed of.",
  },
  {
    icon: <CoffeeMakerIcon sx={{ fontSize: 40, color: "var(--gold)" }} />,
    title: "Italy Modern Machine",
    description: "We will help you to get the result you dreamed of.",
  },
  {
    icon: <CoffeeOutlinedIcon sx={{ fontSize: 40, color: "var(--gold)" }} />,
    title: "Best Traditional Flavors",
    description: "We will help you to get the result you dreamed of.",
  },
];

const AboutTwo = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(0deg, rgba(232, 241, 229, 0.69), rgba(255, 255, 255, 0.74)), url(${beans})`,
          backgroundSize: "fit",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          py: { xs: 8, md: 0 },
        }}>
        <Container>
          <Grid
            container
            spacing={{ xs: 5, md: 4 }}
            alignItems="center"
            justifyContent="center"
            sx={{ px: { xs: 2, md: 7 } }}>
            {/* Image Column*/}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Box
                sx={{
                  width: "fit-content",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                {/* Beans Bag Image */}
                <Box
                  component="img"
                  src={donutMug}
                  alt="Donut and Coffee Mug"
                  sx={{
                    maxHeight: { xs: "300px", md: "500px" },
                    width: "auto",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Text Column */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                textAlign: { xs: "center", md: "left" },
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}>
              <Box sx={{ py: 10, textAlign: "center" }}>
                <Container maxWidth="md">
                  {/* Section Title */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "var(--green-color)",
                      fontSize: { xs: "2rem", md: "2.6rem" },
                      fontFamily: "'Segoe Script', cursive",
                    }}>
                    How We Made Coffee
                  </Typography>

                  {/* Top Icon with Line */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      mb: 5,
                    }}>
                    {/* Left Curved Line */}
                    <Box
                      sx={{
                        width: 50,
                        height: 4,
                        backgroundColor: "var(--primary)",
                        borderRadius: "50px 0 0 50px",
                      }}
                    />

                    {/* Coffee Icon */}
                    <CoffeeIcon
                      sx={{ color: "var(--primary)", fontSize: 30 }}
                    />

                    {/* Right Curved Line */}
                    <Box
                      sx={{
                        width: 50,
                        height: 4,
                        backgroundColor: "var(--primary)",
                        borderRadius: "0 50px 50px 0",
                      }}
                    />
                  </Box>

                  {/* Steps */}
                  <Grid container spacing={4}>
                    {steps.map((step, index) => (
                      <Grid item xs={12} key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            textAlign: "left",
                          }}>
                          {step.icon}
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                color: "var(--green-color)",
                              }}>
                              {step.title}
                            </Typography>
                            <Typography variant="body1" color="text.primary">
                              {step.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Buttons */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                      mt: 6,
                      flexWrap: "wrap",
                    }}>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/home")}
                      sx={{
                        backgroundColor: "var(--gold)",
                        color: "#fff",
                        fontWeight: "bold",
                        px: 4,
                        py: 1.3,
                        "&:hover": {
                          backgroundColor: "#d08f00",
                        },
                      }}>
                      More About Us
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/menu-items")}
                      sx={{
                        backgroundColor: "var(--green-color)",
                        color: "#fff",
                        fontWeight: "bold",
                        px: 4,
                        "&:hover": {
                          backgroundColor: "#2e5b3a",
                        },
                      }}>
                      Check Our Menu
                    </Button>
                  </Box>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AboutTwo;
