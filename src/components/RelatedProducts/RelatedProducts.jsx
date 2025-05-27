import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
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
  const { addToCart } = useCart();
  const { products, isLoading, isError } = useProductsContext();
  const { addToFav, removeFromFav, isFavorited } = useFavoritesContext();

  const [cardsPerView, setCardsPerView] = useState(1);

  const updateCardsPerView = () => {
    const width = window.innerWidth;
    if (width >= 1200) setCardsPerView(4);
    else if (width >= 900) setCardsPerView(3);
    else if (width >= 650) setCardsPerView(2);
    else setCardsPerView(1);
  };

  useEffect(() => {
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  if (isLoading) return <Typography>Loading related products...</Typography>;
  if (isError) return <Typography>Error loading related products.</Typography>;

  const relatedProducts = products?.data?.filter(
    (product) =>
      product.categoryID === categoryId && product._id !== currentProductId
  );

  if (!relatedProducts?.length) return null;

  const slidesToShow = Math.min(cardsPerView, relatedProducts.length);

  // check user is logged ?
  const user = localStorage.getItem("user");

  const handleAddToCart = (productId) => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }
    toast.success("item added to cart successfully");
    addToCart(productId);
  };

  const handleToggleFavorite = (productId) => {
    if (isFavorited(productId)) {
      removeFromFav(productId);
    } else {
      addToFav(productId);
    }
  };

  return (
    <Box
      mt={6}
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        px: 2,
        my: 12,
        textAlign: "center",
      }}>
      <Typography
        variant="h5"
        color="var(--primary)"
        gutterBottom
        sx={{ fontWeight: "700", mb: 6, fontSize: "2.5rem" }}>
        Related Products
      </Typography>

      <Swiper
        className="related-swiper"
        spaceBetween={20}
        slidesPerView={slidesToShow}
        navigation={true}
        modules={[Navigation]}
        style={{
          padding: "0 20px 20px",
          display: "flex",
          alignItems: "center",
          margin: 0,
        }}>
        {relatedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Box
              display="grid"
              justifyContent="center"
              sx={{
                width: "100%",
                height: "100%",
                placeItems: "center",
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
                  width: { xs: "280px", md: "250px" },
                  aspectRatio: "2/3",
                  height: "66%",
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
