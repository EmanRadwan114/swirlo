import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../ProductCard/ProductCard";
import { useProductsContext } from "../../context/ProductsContext";
import { useState, useEffect } from "react";

export default function RelatedProducts({
  categoryId,
  currentProductId,
  onProductClick,
}) {
  const { products, isLoading, isError } = useProductsContext();
  const [cardsPerView, setCardsPerView] = useState(1);

  const updateCardsPerView = () => {
    const width = window.innerWidth;
    if (width >= 1200) setCardsPerView(4);
    else if (width >= 900) setCardsPerView(3);
    else if (width >= 600) setCardsPerView(2);
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
  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  return (
    <Box
      mt={6}
      sx={{ maxWidth: "1200px", mx: "auto", px: 2, textAlign: "center" }}>
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
        onSlideChange={handleSlideChange}
        navigation={true}
        modules={[Navigation]}
        style={{
          padding: "0 20px 20px",
          display: "flex",
          alignItems: "center",
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
                onAddToCart={() => console.log("Add to cart:", product._id)}
                onToggleFavorite={() =>
                  console.log("Toggle favorite:", product._id)
                }
                onProductClick={onProductClick}
                sx={{ width: "250px", aspectRatio: "2/3", height: "66%" }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
