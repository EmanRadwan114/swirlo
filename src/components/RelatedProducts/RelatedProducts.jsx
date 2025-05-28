import { Box, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { toast } from "react-toastify";
import ProductCard from "../ProductCard/ProductCard";
import { useCart } from "../../context/CartContext";
import { useProductsContext } from "../../context/ProductsContext";
import { useFavoritesContext } from "../../context/FavoritesContext";

export default function RelatedProducts({
  categoryId,
  currentProductId,
  onProductClick,
}) {
  const theme = useTheme();

  const { addToCart } = useCart();
  const { products, isLoading, isError } = useProductsContext();
  const { addToFav, removeFromFav, isFavorited } = useFavoritesContext();

  const user = localStorage.getItem("user");

  if (isLoading) return <Typography>Loading related products...</Typography>;
  if (isError) return <Typography>Error loading related products.</Typography>;

  const relatedProducts = products?.data?.filter(
    (product) =>
      product.categoryID === categoryId && product._id !== currentProductId
  );

  if (!relatedProducts?.length) return null;

  const handleAddToCart = (productId) => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }
    toast.success("Item added to cart successfully");
    addToCart(productId);
  };

  const handleToggleFavorite = (productId) => {
    if (!user) {
      toast.error("Please log in to add items to your favorites!");
      return;
    }
    isFavorited(productId) ? removeFromFav(productId) : addToFav(productId);
  };

  return (
    <Box
      mt={6}
      sx={{
        maxWidth: "100%",
        mx: "auto",
        px: { xs: 1, sm: 2 },
        my: 12,
        textAlign: "center",
        overflow: "hidden",
      }}>
      <Typography
        variant="h5"
        color="var(--primary)"
        gutterBottom
        sx={{ fontWeight: 700, mb: 6, fontSize: "2.5rem" }}>
        Related Products
      </Typography>

      <Box sx={{ position: "relative", width: "100%" }}>
        <Swiper
          className="related-swiper"
          spaceBetween={24}
          navigation
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
            1600: {
              slidesPerView: 5,
            },
          }}
          style={{
            padding: "0 20px 40px",
            boxSizing: "border-box",
          }}>
          {relatedProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  px: 1,
                  boxSizing: "border-box",
                }}>
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product._id)}
                  onToggleFavorite={() => handleToggleFavorite(product._id)}
                  onProductClick={() =>
                    onProductClick(
                      product.categoryID?.name || "category",
                      product._id
                    )
                  }
                  sx={{
                    width: { xs: "240px", sm: "100%" },
                    aspectRatio: "1.9/3",
                    height: { xs: "55%", md: "62%" },
                    boxShadow: theme.shadows[3],
                    borderRadius: 2,
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
