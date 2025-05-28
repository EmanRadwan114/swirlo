import { Typography, Box, IconButton, Button } from "@mui/material";
import Review from "../../components/Review/Review";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { Navigate, useNavigate, useParams } from "react-router";
import { useProductsContext } from "../../context/ProductsContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { useFavoritesContext } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProductDetails } = useProductsContext();
  const { data: product, isLoading, isError, error } = getProductDetails(id);
  const [favorited, setFavorited] = useState(false);
  const { addToCart } = useCart();
  const { addToFav, removeFromFav, isFavorited } = useFavoritesContext();

  useEffect(() => {
    if (id) {
      setFavorited(isFavorited(id));
    }
  }, [id, isFavorited]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    toast.error(`Error: ${error.response.data.message}`);
    return null;
  }

  if (!product?.data?.[0]) {
    toast.error(`Product Not Found`);
    return null;
  }

  const prd = product.data[0];

  // check user is logged ?
  const user = localStorage.getItem("user");

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please log in to add items to your favorites!");
      return;
    }
    if (isFavorited(id)) {
      removeFromFav(id);
      setFavorited(false);
    } else {
      addToFav(id);
      setFavorited(true);
    }
  };

  // add to cart
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }
    toast.success("item added to cart successfully");
    addToCart(prd._id);
  };

  console.log(product);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          p: { xs: 2, md: 6 },
          overflowX: "hidden",
        }}>
        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            width: "100%",
            height: { xs: "60vh", sm: "430px", md: "75vh", lg: "75vh" },
          }}>
          <img
            src={prd.thumbnail}
            alt="coffee shop"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1.5rem",
            }}
          />
        </Box>

        {/* Text Section */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            width: "100%",
            height: "100%",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 4 },
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}>
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                color: "var(--primary)",
                fontFamily: "Pacifico, cursive",
              }}>
              {prd.title}
            </Typography>

            {/* Add to Fav */}
            <IconButton onClick={handleFavoriteClick}>
              {favorited ? (
                <FavoriteIcon sx={{ fontSize: "2.5rem", color: red[800] }} />
              ) : (
                <FavoriteBorderOutlinedIcon
                  sx={{ fontSize: "2.5rem", color: "var(--primary)" }}
                />
              )}
            </IconButton>
          </Box>

          <Box
            sx={{
              background: "var(--custom-gradient)",
              // bgcolor: "var(--gold)",
              height: "5px",
              width: { xs: "70%", md: "18rem" },
              alignSelf: "flex-start",
              mb: 4,
            }}
          />

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: "var(--tertiary)",
            }}>
            Ingredients
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: "var(--main-text)",
            }}>
            {prd.description}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 6,
              fontWeight: "700",
              color: "var(--primary)",
              fontFamily: "Playpen Sans Hebrew",
            }}>
            Price: {prd.price} EGP
          </Typography>

          <Button
            onClick={handleAddToCart}
            sx={{
              width: { xs: "80%", sm: "80%" },
              p: 2,
              borderRadius: "1rem",
              bgcolor: "var(--primary)",
              color: "var(--main-background)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              gap: 2,
              mx: "auto",
              textAlign: "center",
              transition: "background-color 0.3s ease",
              "&:hover": {
                bgcolor: "var(--main-text)",
              },
            }}>
            <ShoppingCartIcon />
            Add To Cart
          </Button>
        </Box>
      </Box>
      <Review></Review>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 6 } }}>
        <RelatedProducts
          categoryId={prd.categoryID}
          currentProductId={prd._id}
          // onProductClick={(prd) => {
          //   navigate(`/menu-items/${prd}`);
          // }}
          onProductClick={(categoryName, productId) => {
            navigate(
              `/menu-items/${encodeURIComponent(categoryName)}/${productId}`
            );
          }}
        />
      </Box>
    </Box>
  );
}
