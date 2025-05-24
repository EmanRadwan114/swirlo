import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, Container, Grid, Typography } from "@mui/material";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import favoritesServices from "../../services/favorites";
import { useNavigate, useSearchParams } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { searchProducts } from "../../services/productsApi";

export default function Search() {
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const {
    data: {
      data: searchedPro = [],
      currentPage: serverCurrentPage = 1,
      totalPages,
    } = {},
    isLoading: isSearching,
    error,
    isFetched: isProductsFetched,
  } = useQuery({
    queryKey: ["searchedProducts", query, currentPage],
    queryFn: () => searchProducts(query, currentPage),
    keepPreviousData: true,
    enabled: !!query && query.length > 0,
  });

  function handlePagination(value) {
    setCurrentPage(value);
  }

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  // ^ handle add to / remove from favorites
  const queryClient = useQueryClient();
  const { data: { favorites = [] } = {}, isFetched: isFavFetched } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoritesServices.fetchAllFavorites(),
  });

  const [favArr, setFavArr] = useState([]);

  useEffect(() => {
    if (isFavFetched && isFavFetched.length === 0) {
      setFavArr([...favorites.map((item) => item._id)]);
    }

    if (isProductsFetched && searchedPro.length === 0) {
      console.log("hi");

      toast.error("No products found that match your search!");
    }
  }, [isFavFetched, isProductsFetched]);

  const { mutateAsync: removeFromFavorites } = useMutation({
    mutationFn: (id) => favoritesServices.removeFromFavorites(id),
    onSuccess: (data) => {
      setFavArr([...data.favorites]);
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Item removed from favorites!");
    },
    onError: (error) => {
      toast.error(`Failed to remove: ${error.message}`);
    },
  });
  const { mutateAsync: addToFavorites } = useMutation({
    mutationFn: (id) => favoritesServices.addToFavorites(id),
    onSuccess: (data) => {
      setFavArr([...data.favorites]);
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Item Added To Your favorites!");
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  const toggleWishlist = (id) => {
    if (favArr.includes(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  if (isSearching) return <LoadingSpinner></LoadingSpinner>;

  if (error) {
    toast.error(error.response.data.message || "Failed to fetch products");
  }

  if (isProductsFetched && searchedPro.length === 0) {
    return (
      <Container fixed>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="p">
            No products found that match your search.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container fixed sx={{ paddingTop: "70px", paddingBottom: "70px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: 4,
        }}
      >
        <Grid container spacing={2}>
          {searchedPro.map((item) => (
            <Grid key={item._id} size={{ xs: 12, md: 6, lg: 4 }}>
              <ProductCard
                product={item}
                onAddToCart={(id) => console.log("Add to cart:", id)}
                onToggleFavorite={(id) => toggleWishlist(id)}
                onProductClick={handleProductClick}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
      ></PaginationComponent>
    </Container>
  );
}
