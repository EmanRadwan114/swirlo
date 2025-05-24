import { useState } from "react";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useProductsContext } from "../../context/ProductsContext";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { products, isLoading, isError } = useProductsContext();

  function handlePagination(value) {
    setCurrentPage(value);
    //handle logic api here to get data also or useEffect with setCurrentPage dependency
  }

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" my={8}>
        <Typography color="error">Error loading products.</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      {products?.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <ProductCard
                product={product}
                onAddToCart={(id) => console.log("Add to cart:", id)}
                onToggleFavorite={(id) => console.log("Toggle favorite:", id)}
                onProductClick={handleProductClick}
                sx={{ width: "250px", aspectRatio: "2/3", height: "66%" }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center" my={8}>
          <Typography>No products found.</Typography>
        </Box>
      )}

      <Box display="flex" justifyContent="center" mt={4}>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      </Box>
    </Box>
  );
}
