import React, { use, useEffect, useRef, useState } from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import coffeeBeans from "../../assets/coffeeBeans.jpg";
import foam from "../../assets/foam.png";
import milk from "../../assets/milk.png";
import { useNavigate } from "react-router";

const HomeSecTwo = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <Box
        ref={sectionRef}
        sx={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(57, 27, 3, 0.5)), url(${coffeeBeans})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}>
        <Container>
          <Grid
            container
            spacing={{ xs: 0, md: 4 }}
            height={"100vh"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "middle",
            }}>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", lg: "left" },
                alignItems: "center",
              }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}>
                <Box
                  component="img"
                  src={milk}
                  alt="milk"
                  className={isInView ? "myImg" : ""}
                  sx={{
                    width: 290,
                    display: { xs: "none", md: "block" },
                    pointerEvents: "none",
                    position: "absolute",
                    top: -193,
                    zIndex: 2,
                  }}
                />
                <Box
                  component="img"
                  src={foam}
                  alt="Coffee Cup"
                  maxHeight="370px"
                  sx={{
                    width: "auto",
                    marginTop: "3px",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: { xs: 2.5, md: 4 },
                textAlign: { xs: "center", md: "left" },
              }}>
              <Typography
                variant="h4"
                color="white"
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
                Welcome to <strong>Swirlo</strong> — where every sip tells a
                story
              </Typography>
              <Typography
                variant="body1"
                color="white"
                sx={{
                  fontWeight: "700",
                  mb: 2,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}>
                Discover rich, freshly brewed coffee crafted with passion.
                Whether you're a casual sipper or a devoted espresso lover,
                we’re here to elevate your coffee experience.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate("/products")}
                sx={{
                  backgroundColor: "var(--gold)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "var(--light-color)",
                  },
                  marginBottom: 10,
                }}>
                Explore Our Products
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HomeSecTwo;
