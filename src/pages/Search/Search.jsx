import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, Container, Grid, Typography } from "@mui/material";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import favoritesServices from "../../services/favorites";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { filterProducts } from "../../services/productsApi";
import FilterationSideNav from "../../components/FilterationSideNav/FilterationSideNav";
import { useCart } from "../../context/CartContext";

function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    title: query || "",
    price: 200,
  });
  const { addToCart } = useCart();

  // Filter query with automatic refetch on dependencies change
  const {
    data: { data: products = [], totalPages = 1 } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["filterProducts", filters, currentPage],
    queryFn: () => filterProducts(filters, currentPage),
    keepPreviousData: true,
  });

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Handle pagination
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  // Favorites logic
  const { data: favoritesData = {}, isFetched: isFavFetched } = useQuery({
    queryKey: ["favorites"],
    queryFn: favoritesServices.fetchAllFavorites,
  });

  // check user is logged ?
  const user = localStorage.getItem("user");

  // add to cart
  const handleAddToCart = (id) => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }
    toast.success("item added to cart successfully");
    addToCart(id);
  };

  const [favArr, setFavArr] = useState([]);

  useEffect(() => {
    if (isFavFetched && favoritesData.favorites) {
      setFavArr(favoritesData.favorites.map((item) => item._id));
    }
  }, [isFavFetched, favoritesData]);

  // Automatically update title filter when query changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, title: query || "" }));
    setCurrentPage(1);
  }, [query]);

  // Add to favorites mutation
  const { mutateAsync: addToFavorites } = useMutation({
    mutationFn: favoritesServices.addToFavorites,
    onSuccess: (data) => {
      setFavArr(data.favorites.map((item) => item._id));
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Item added to favorites!");
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.response.data.message}`);
    },
  });

  // Remove from favorites mutation
  const { mutateAsync: removeFromFavorites } = useMutation({
    mutationFn: favoritesServices.removeFromFavorites,
    onSuccess: (data) => {
      setFavArr(data.favorites.map((item) => item._id));
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Item removed from favorites!");
    },
    onError: (error) => {
      toast.error(`Failed to remove: ${error.response.data.message}`);
    },
  });

  // Toggle favorites
  const toggleWishlist = (id) => {
    if (favArr.includes(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  // Handle product click
  const handleProductClick = (id, category) => {
    const categoryPath = category || "all";
    navigate(`/menu-items/${categoryPath}/${id}`);
  };

  // Main render
  return (
    <Box>
      <FilterationSideNav onFilterChange={handleFilterChange} />
      {error ? (
        isLoading ? (
          <LoadingSpinner />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              textAlign: "center",
              paddingLeft: { md: "290px" },
            }}
          >
            <Typography variant="h6" component="p">
              Error loading products. Please try again.
            </Typography>
          </Box>
        )
      ) : (
        ""
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            textAlign: "center",
            paddingLeft: { md: "290px" },
          }}
        >
          <Typography variant="h6" component="p">
            No products found matching your criteria.
          </Typography>
        </Box>
      ) : (
        <Container
          fixed
          sx={{
            paddingTop: "70px",
            paddingBottom: "70px",
            paddingLeft: { md: "290px" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", marginY: 4 }}>
            <Grid container spacing={4}>
              {products?.map((product) => (
                <Grid key={product._id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <ProductCard
                    product={product}
                    onAddToCart={() => handleAddToCart(product._id)}
                    onToggleFavorite={(id) => toggleWishlist(id)}
                    onProductClick={handleProductClick}
                    sx={{ width: "290px", aspectRatio: "2/3", height: "66%" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            handlePagination={handlePagination}
          />
        </Container>
      )}
    </Box>
  );
}

export default memo(Search);
