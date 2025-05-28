import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Box,
  Divider,
  Badge,
  Rating,
} from "@mui/material";

import {
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  LocalCafe,
  Star,
  ArrowBack,
} from "@mui/icons-material";

import { red } from "@mui/material/colors";
import { memo, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import favoritesServices from "../../services/favorites";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import AboutBg from "../../components/AboutSec/AboutBg";
import favoritesImg from "../../assets/favorites.jpg";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";

const Favorites = () => {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);

  const user = localStorage.getItem("user");

  const { addToCart } = useCart();

  const {
    data: { favorites = [], totalPages } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", currentPage],
    queryFn: () => favoritesServices.fetchFavorites(currentPage),
    keepPreviousData: true,
    enabled: !!user,
  });

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (user && error) {
    toast.error(error.response.data.message || "Failed to fetch favorites");
  }

  const { mutateAsync: removeFromFavorites, isPending: isRemoving } =
    useMutation({
      mutationFn: (id) => favoritesServices.removeFromFavorites(id),
      onSuccess: () => {
        queryClient.invalidateQueries(["favorites"]);
        toast.success("Item removed from favorites!");
      },
      onError: (error) => {
        toast.error(`Failed to remove: ${error.response.data.message}`);
      },
    });

  const { mutateAsync: clearFav, isPending: isClearing } = useMutation({
    mutationFn: favoritesServices.clearFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Your Favorites is Cleared!");
    },
    onError: (error) => {
      toast.error(`Failed to clear: ${error.response.data.message}`);
    },
  });

  // Handle Add To Cart
  const handleAddToCart = (id) => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }
    toast.success("item added to cart successfully");
    addToCart(id);
  };

  if (user && (isLoading || isRemoving || isClearing))
    return <LoadingSpinner></LoadingSpinner>;

  if (user && error) toast.error(`${error.response.data.message}`);

  return (
    <>
      {" "}
      <AboutBg
        title="Your Favorites"
        subtitle="Home / Favorites"
        backgroundImage={favoritesImg}
      />
      <Box
        sx={{
          padding: "70px 0",
        }}
      >
        <Container fixed>
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
                fontWeight: "bold",
                mb: 1,
                color: "var(--green-color)",
                fontSize: { xs: "2rem", md: "2.6rem" },
              }}
            >
              <LocalCafe
                sx={{
                  mr: 2,
                  color: "var(--light-color)",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.8rem",
                    md: "2rem",
                  },
                }}
              />
              My Swirlo Favorites
            </Typography>
            <Badge
              badgeContent={favorites.length}
              color="tertiary"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "var(--light-color)", // Your custom color
                  color: "white", // Text color
                  fontSize: "0.8rem", // Badge size
                  fontWeight: "bold",
                  // Additional styling:
                  width: "20px",
                  height: "20px",
                  borderRadius: "10px",
                  padding: "0 4px",
                },
              }}
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
                Start adding your favorite coffee drinks and treats <br /> to
                build your perfect order!
              </Typography>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                href="/menu-items"
                sx={{
                  backgroundColor: "var(--green-color)",
                  color: "#fff",
                  fontWeight: "bold",
                  px: 4,
                  py: 2,
                  "&:hover": {
                    backgroundColor: "#2e5b3a",
                  },
                }}
              >
                Explore Our Menu
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                sx={{
                  backgroundColor: red[800],
                  color: "white",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  marginLeft: { md: "auto" },
                  display: "block",
                  padding: "5px 15px",
                }}
                onClick={clearFav}
              >
                Clear Favorites
              </Button>
              <Grid container spacing={4} sx={{ marginBottom: "20px" }}>
                {favorites.map((item) => (
                  <Grid key={item._id} size={{ xs: 12, md: 6, lg: 4 }}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        minHeight: { md: "440px" },
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <Box component={Link} to={`/menu-items/all/${item._id}`}>
                        <CardMedia
                          sx={{
                            height: 0,
                            pt: "50%",
                            backgroundSize: "cover",
                          }}
                          image={item.thumbnail}
                          title={item.title}
                        />
                      </Box>
                      <CardContent sx={{ minHeight: { md: "190px" } }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "0px",
                          }}
                        >
                          <Box
                            component={Link}
                            to={`/menu-items/all/${item._id}`}
                            sx={{ textDecoration: "none" }}
                          >
                            <Typography
                              variant="h6"
                              component="h3"
                              gutterBottom
                              sx={{ color: "var(--main-text)" }}
                            >
                              {item.title}
                            </Typography>
                          </Box>
                          <IconButton
                            aria-label="remove from favorites"
                            onClick={() => {
                              removeFromFavorites(item._id);
                            }}
                            sx={{ color: "error.main" }}
                          >
                            <Favorite />
                          </IconButton>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Rating
                            name="read-only-rating"
                            value={item.avgRating}
                            readOnly
                            precision={0.5} // Optional: for half-star ratings
                            icon={<Star fontSize="small" />}
                            emptyIcon={<Star fontSize="small" />}
                            sx={{
                              "& .MuiRating-iconFilled": {
                                color: "var(--gold)",
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ ml: 1 }}
                          >
                            ({item.numberOfReviews}) reviews
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

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "15px",
                          flexDirection: { xs: "column", md: "row" },
                          alignItems: {
                            xs: "start",
                          },
                          gap: "0.5rem",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "var(--primary)",
                            fontSize: {
                              xs: "1.2rem",
                            },
                            width: "100%",
                            textAlign: {
                              xs: "center",
                              md: "start",
                            },
                          }}
                        >
                          {item.price.toFixed(2)} EGP
                        </Typography>
                        <Button
                          onClick={() => handleAddToCart(item._id)}
                          size="small"
                          color="primary"
                          variant="contained"
                          startIcon={<AddShoppingCart />}
                          // onClick={() => onAddToCart(item)}
                          sx={{
                            background: "var(--primary)",
                            width: { xs: "100%" },
                            color: "white",
                            fontWeight: 600,
                            borderRadius: 50,
                            px: 3,
                            py: 1,
                            marginLeft: "0px",
                            "&:hover": {
                              background: "var(--secondary)",
                              color: "var(--tertiary)",
                            },
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                handlePagination={handlePagination}
              ></PaginationComponent>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default memo(Favorites);
