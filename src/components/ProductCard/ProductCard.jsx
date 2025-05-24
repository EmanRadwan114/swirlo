import React, { useState, useCallback } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 0,
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.4s",
  "&:hover": {
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
}));

const OverlayBox = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  opacity: 0,
  transition: "opacity 0.4s",
  "&:hover": { opacity: 1 },
});

const LabelChip = styled(Chip)({
  position: "absolute",
  left: 0,
  transform: "translateX(-100%)",
  transition: "transform 0.5s",
  "&.hovered": { transform: "translateX(10px)" },
});

const StarRating = ({ rating = 0 }) => (
  <Box display="flex" justifyContent="center">
    {[...Array(5)].map((_, i) => (
      <Typography
        key={i}
        variant="body1"
        sx={{
          color: i < rating ? "gold" : "gray",
          marginRight: "2px",
          fontSize: "1.3rem",
        }}
      >
        ★
      </Typography>
    ))}
  </Box>
);

const ProductCard = ({
  product,
  sx = {},
  onAddToCart,
  onToggleFavorite,
  onProductClick,
}) => {
  const [hover, setHover] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = useCallback(
    (e) => {
      e.stopPropagation();
      setIsFavorited((prev) => !prev);
      onToggleFavorite?.(product._id);
    },
    [onToggleFavorite, product._id]
  );

  const handleAddToCartClick = useCallback(
    (e) => {
      e.stopPropagation();
      onAddToCart?.(product._id);
    },
    [onAddToCart, product._id]
  );

  const handleClick = () => onProductClick?.(product._id);

  const labels = product?.label || [];

  return (
    <StyledCard
      sx={{ width: sx.width, aspectRatio: sx.aspectRatio }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <Box position="relative" sx={{ height: sx.height, overflow: "hidden" }}>
        <CardMedia
          component="div"
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "var(--light-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={product.thumbnail}
            alt={product.title}
            sx={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
              transition: "transform 0.4s",
              transform: hover ? "scale(1.15)" : "scale(1)",
            }}
          />
        </CardMedia>

        {/* Labels */}
        {labels.includes("new arrival") && (
          <LabelChip
            label="New"
            color="success"
            className={hover ? "hovered" : ""}
            sx={{ top: 8 }}
          />
        )}
        {labels.includes("vegan") && (
          <LabelChip
            label="Vegan"
            color="secondary"
            className={hover ? "hovered" : ""}
            sx={{ top: 40 }}
          />
        )}
        {labels.includes("signature") && (
          <LabelChip
            label="Signature"
            color="warning"
            className={hover ? "hovered" : ""}
            sx={{ top: 72 }}
          />
        )}

        <OverlayBox>
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              color: isFavorited ? "var(--secondary)" : "white",
              "&:hover": { color: "var(--secondary)" },
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            onClick={handleAddToCartClick}
            sx={{
              color: "white",
              "&:hover": { color: "var(--secondary)" },
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
        </OverlayBox>
      </Box>

      <CardContent sx={{ textAlign: "center" }}>
        <StarRating rating={product.avgRating} />
        <Typography
          variant="h6"
          color="var(--primary)"
          sx={{ fontSize: "1.35rem" }}
        >
          {product.title}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
          {product.price} EGP
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
