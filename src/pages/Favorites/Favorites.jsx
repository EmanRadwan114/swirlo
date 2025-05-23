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

const dummyFavorites = [
  {
    id: 1,
    name: "Caramel Macchiato",
    image: "https://source.unsplash.com/random/300x300/?caramel,macchiato",
    price: 4.75,
    rating: 4,
    reviews: 128,
    description:
      "Espresso with vanilla-flavored syrup, steamed milk and caramel drizzle.",
    categories: ["Hot", "Espresso", "Sweet"],
  },
  {
    id: 2,
    name: "Iced Matcha Latte",
    image: "https://source.unsplash.com/random/300x300/?matcha,latte",
    price: 5.25,
    rating: 5,
    reviews: 86,
    description: "Premium matcha green tea powder whisked with milk over ice.",
    categories: ["Iced", "Tea", "Refreshing"],
  },
  {
    id: 3,
    name: "Swirlo Special Blend",
    image: "https://source.unsplash.com/random/300x300/?special,coffee",
    price: 3.99,
    rating: 4,
    reviews: 215,
    description:
      "Our signature house blend with notes of chocolate and caramel.",
    categories: ["Hot", "House Blend", "Classic"],
  },
  {
    id: 4,
    name: "Chocolate Croissant",
    image: "https://source.unsplash.com/random/300x300/?chocolate,croissant",
    price: 3.5,
    rating: 5,
    reviews: 192,
    description: "Buttery flaky croissant with rich chocolate filling.",
    categories: ["Pastry", "Sweet", "Breakfast"],
  },
  {
    id: 5,
    name: "Cold Brew Black",
    image: "https://source.unsplash.com/random/300x300/?cold,brew",
    price: 4.25,
    rating: 4,
    reviews: 74,
    description: "Smooth cold brew coffee served black over ice.",
    categories: ["Iced", "Strong", "Low Acid"],
  },
  {
    id: 6,
    name: "Blueberry Muffin",
    image: "https://source.unsplash.com/random/300x300/?blueberry,muffin",
    price: 3.25,
    rating: 4,
    reviews: 143,
    description: "Freshly baked muffin packed with juicy blueberries.",
    categories: ["Pastry", "Sweet", "Vegetarian"],
  },
  {
    id: 7,
    name: "Hazelnut Cappuccino",
    image: "https://source.unsplash.com/random/300x300/?hazelnut,cappuccino",
    price: 4.5,
    rating: 5,
    reviews: 97,
    description: "Classic cappuccino with rich hazelnut flavor.",
    categories: ["Hot", "Espresso", "Nutty"],
  },
  {
    id: 8,
    name: "Avocado Toast",
    image: "https://source.unsplash.com/random/300x300/?avocado,toast",
    price: 6.75,
    rating: 4,
    reviews: 68,
    description:
      "Sourdough toast with smashed avocado, cherry tomatoes and feta.",
    categories: ["Food", "Savory", "Healthy"],
  },
];

const Favorites = () => {
  const { favorites, setFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    setFavorites(dummyFavorites);
  }, []);

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: "#f9f5f0",
      }}
    >
      <Container maxWidth="lg">
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
              color: "#5d4037",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocalCafe color="primary" sx={{ mr: 2 }} />
            My Swirlo Favorites
          </Typography>
          <Badge badgeContent={favorites.length} color="primary" showZero>
            <Favorite color="action" />
          </Badge>
        </Box>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
            }}
          >
            <FavoriteBorder
              sx={{
                fontSize: "4rem",
                color: "#d7ccc8",
                mb: 3,
              }}
            />
            <Typography variant="h6" gutterBottom>
              Your favorites list is empty
            </Typography>
            <Typography color="textSecondary" paragraph sx={{ mb: 3 }}>
              Start adding your favorite coffee drinks and treats to build your
              perfect order!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBack />}
              href="/menu"
              sx={{
                background: "linear-gradient(45deg, #8d6e63 30%, #5d4037 90%)",
                color: "white",
                fontWeight: 600,
                borderRadius: 50,
                px: 5,
                py: 1,
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #5d4037 30%, #3e2723 90%)",
                },
              }}
            >
              Explore Our Menu
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {favorites.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    borderRadius: 4,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 0,
                      pt: "75%",
                      backgroundSize: "contain",
                      backgroundColor: "#efebe9",
                    }}
                    image={item.image}
                    title={item.name}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" component="h3" gutterBottom>
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
                          color={i < item.rating ? "primary" : "disabled"}
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

                    <Typography variant="body2" color="textSecondary" paragraph>
                      {item.description}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                      {item.categories.map((category) => (
                        <Box
                          key={category}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            mr: 1,
                            mb: 1,
                            borderRadius: 4,
                            bgcolor: "#efebe9",
                          }}
                        >
                          <Typography variant="caption">{category}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>

                  <Divider />

                  <CardActions sx={{ justifyContent: "space-between", p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#5d4037",
                      }}
                    >
                      ${item.price.toFixed(2)}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      startIcon={<AddShoppingCart />}
                      // onClick={() => onAddToCart(item)}
                      sx={{
                        background:
                          "linear-gradient(45deg, #8d6e63 30%, #5d4037 90%)",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: 50,
                        px: 3,
                        py: 1,
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #5d4037 30%, #3e2723 90%)",
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
