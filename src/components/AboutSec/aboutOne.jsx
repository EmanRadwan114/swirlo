import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CoffeeIcon from "@mui/icons-material/LocalCafe";
import bgLeaf from "../../assets/bg-leaf0.jpg";
import beansBag from "../../assets/beansBag.png";

const AboutOne = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: `linear-gradient(0deg, rgba(255, 255, 255, 0.69), rgba(255, 255, 255, 0.74)), url(${bgLeaf})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
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
          {/* Text Column */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              textAlign: { xs: "center", md: "left" },
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}>
            <Typography
              variant="h4"
              color="#3f704d"
              sx={{
                fontSize: { xs: "2.4rem", md: "2.7rem" },
                fontFamily: "'Segoe Script', cursive",
                fontWeight: "bold",
              }}>
              Discover Our Coffee
              {/* Top Icon with Line */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
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
                <CoffeeIcon sx={{ color: "var(--primary)", fontSize: 30 }} />

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
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "700",
                fontSize: { xs: "1.1rem", md: "1.15rem" },
                textAlign: "justify",
              }}>
              We proudly serve coffee made exclusively from Ethiopian beans —
              the birthplace of all commercial coffee. Known for its fruity
              acidity and sweet honey finish, this single-origin delight brings
              a bright and gentle flavor profile to every cup we brew.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/menu-items")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "var(--main-color)",
                color: "var(--gold)",
                fontSize: "1.15rem",
                fontWeight: "bold",
                boxShadow: "none",
                "&:hover": {
                  color: "var(--light-color)",
                  boxShadow: "none",
                },
              }}>
              learn more
            </Button>
          </Grid>

          {/* Image Column*/}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              order: { xs: -1, md: 0 }, // Reorder for mobile
            }}>
            <Box
              sx={{
                position: "relative",
                width: "fit-content",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {/* Circular Text */}
              <Box
                sx={{
                  position: "absolute",
                  top: "-40px",
                  left: "8%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  display: { xs: "none", md: "block" },
                }}>
                <div className="circular-text-wrapper">
                  <svg viewBox="0 0 200 200" width="160" height="160">
                    <defs>
                      <path
                        id="circle"
                        d="M 100, 100
                         m -75, 0
                         a 75,75 0 1,1 150,0
                         a 75,75 0 1,1 -150,0"
                      />
                    </defs>
                    <text fill="#6f4e37" fontSize="26" fontWeight="bold">
                      <textPath href="#circle" startOffset="0%">
                        PREMIUM QUALITY COFFEE 100%
                      </textPath>
                    </text>
                  </svg>
                </div>
              </Box>

              {/* Beans Bag Image */}
              <Box
                component="img"
                src={beansBag}
                alt="Coffee Bag"
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
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutOne;
