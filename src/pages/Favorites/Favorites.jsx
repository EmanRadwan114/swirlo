import React, { useContext, useEffect } from "react";
import { FavoritesContext } from "./../../context/FavoritesContext";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Box,
  Divider,
  Badge,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  LocalCafe,
  Star,
  ArrowBack,
} from "@mui/icons-material";

const Favorites = () => {
  const { favorites, setFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    // setFavorites(dummyFavorites);
  }, []);

  return (
    <Box
      sx={{
        py: 4,
      }}
    >
      <Container fixed>
        {/* Header Section */}
        <Box
          sx={{
            mb: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "var(--main-text)",
              display: "flex",
              alignItems: "center",
              fontSize: {
                xs: "1.5rem",
              },
            }}
          >
            <LocalCafe sx={{ mr: 2, color: "var(--light-color)" }} />
            My Swirlo Favorites
          </Typography>
          <Badge
            badgeContent={favorites.length}
            color="tertiary"
            sx={{ color: "var(--light-color)", fontSize: "2rem" }}
            showZero
          >
            <Favorite sx={{ color: "var(--tertiary)", fontSize: "1.8rem" }} />
          </Badge>
        </Box>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            <FavoriteBorder
              sx={{
                fontSize: "4rem",
                color: "var(--light-color)",
                mb: 3,
              }}
            />
            <Typography
              variant="h5"
              component="p"
              gutterBottom
              sx={{ color: "var(--main-text)" }}
            >
              Your favorites list is empty
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ color: "var(--tertiary)", mb: 3 }}
            >
              Start adding your favorite coffee drinks and treats to build your
              perfect order!
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              href="/menu"
              sx={{
                background:
                  "linear-gradient(45deg, var(--light-color) 20%, var(--primary) 70%)",
                color: "white",
                fontWeight: 600,
                borderRadius: 50,
                px: 5,
                py: 1,
                "&:hover": {
                  background:
                    "linear-gradient(45deg, var(--light-color) 20%, var(--primary) 70%)",
                },
              }}
            >
              Explore Our Menu
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {favorites.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card
                  sx={{
                    borderRadius: 4,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    minHeight: "440px",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 0,
                      pt: "50%",
                      backgroundSize: "contain",
                      backgroundColor: "var(--light-bg)",
                    }}
                    image={item.image}
                    title={item.name}
                  />
                  <CardContent sx={{ minHeight: "190px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{ color: "var(--main-text)" }}
                      >
                        {item.name}
                      </Typography>
                      <IconButton
                        aria-label="remove from favorites"
                        // onClick={() => }
                        sx={{ color: "error.main" }}
                      >
                        <Favorite />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          fontSize="small"
                          sx={{
                            color:
                              i < item.rating
                                ? "var(--gold)"
                                : "var(--tertiary)",
                          }}
                        />
                      ))}
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ ml: 1 }}
                      >
                        ({item.reviews})
                      </Typography>
                    </Box>

                    <Typography
                      variant="body1"
                      component="p"
                      color="textSecondary"
                      sx={{ color: "var(--tertiary)" }}
                    >
                      {item.description}
                    </Typography>

                    <Box
                      sx={{
                        padding: "3px 40px",
                        margin: "7px 0px",
                        borderRadius: 4,
                        bgcolor: "var(--secondary)",
                        width: "fit-content",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--tertiary)" }}
                      >
                        {item.category}
                      </Typography>
                    </Box>
                  </CardContent>

                  <Divider />

                  <CardActions
                    sx={{ justifyContent: "space-between", padding: "15px" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "var(--primary)",
                      }}
                    >
                      {item.price.toFixed(2)} EGP
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      startIcon={<AddShoppingCart />}
                      // onClick={() => onAddToCart(item)}
                      sx={{
                        background: "var(--primary)",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: 50,
                        px: 3,
                        py: 1,
                        "&:hover": {
                          background: "var(--secondary)",
                          color: "var(--tertiary)",
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Favorites;
