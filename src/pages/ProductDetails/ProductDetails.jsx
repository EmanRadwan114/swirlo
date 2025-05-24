import { Typography, Box } from "@mui/material";
import Review from "../../components/Review/Review";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { useNavigate, useParams } from "react-router";
import { useProductsContext } from "../../context/ProductsContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProductDetails } = useProductsContext();

  const { data: product, isLoading, isError, error } = getProductDetails(id);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return toast.error(`Error: ${error.message}`);
  if (!product.data[0]) return toast.error(`product Not Found`);

  const prd = product.data[0];
  
  console.log(product);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          p: { xs: 2, md: 6 },
          overflowX: "hidden",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            width: "100%",
            height: { xs: "auto", md: "80dvh" },
          }}
        >
          <img
            src={prd.thumbnail}
            alt="coffee shop"
            style={{
              width: "100%",
              height: "85%",
              objectFit: "cover",
              borderRadius: "10%",
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
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              color: "var(--primary)",
              fontFamily: "Pacifico, cursive",
            }}
          >
            {prd.title}
          </Typography>

          <Box
            sx={{
              background: "var(--custom-gradient)",
              // bgcolor: "var(--gold)",
              height: "5px",
              width: { xs: "80%", md: "18rem" },
              mb: 4,
            }}
          />

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: "var(--tertiary)",
            }}
          >
            Ingredients
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: "var(--main-text)",
            }}
          >
            {prd.description}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 6,
              fontWeight: "700",
              color: "var(--primary)",
              fontFamily: "Playpen Sans Hebrew",
            }}
          >
            Price: {prd.price}
          </Typography>

          <Box
            sx={{
              width: { xs: "60%", sm: "80%" },
              p: 2,
              borderRadius: "20px",
              bgcolor: "var(--main-text)",
              color: "var(--main-background)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              mx: "auto",
              textAlign: "center",
              transition: "background-color 0.3s ease",
              "&:hover": {
                bgcolor: "var(--primary)",
              },
            }}
          >
            Add To Cart
          </Box>
        </Box>
      </Box>
      <Review></Review>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 6 } }}>
        <RelatedProducts
          categoryId={"6812879bbcafe5c8e6084e62"}
          currentProductId={"6830e8a24b950461489ae1ca"}
          onProductClick={(id) => navigate(`/menu-items/${id}`)}
        />
      </Box>
    </Box>
  );
}
