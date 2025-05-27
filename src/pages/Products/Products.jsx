import { useCallback, useEffect, useState } from "react";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router";
import { Box, Container, Typography } from "@mui/material";
import favoritesServices from "../../services/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useProductsContext } from "../../context/ProductsContext";
import FilterationSideNav from "../../components/FilterationSideNav/FilterationSideNav";
import {
  filterProducts,
  getProductByCategory,
} from "../../services/productsApi";
import { useCart } from "../../context/CartContext";
import { useParams } from "react-router-dom";
export default function Products() {
  const { products, isLoading, isError, error, page, setPage } =
    useProductsContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToCart } = useCart();
  let { categoryName } = useParams();

  //  Handle Product Click To Show Product Details
  const handleProductClick = (id, category) => {
    const categoryPath = category || "all";
    navigate(`/menu-items/${categoryPath}/${id}`);
  };

  const limit = 8;

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

  // Handle Favourites
  const { data: { favorites = [] } = {}, isFetched } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoritesServices.fetchAllFavorites(),
    enabled: !!user,
  });

  const [favArr, setFavArr] = useState([]);

  useEffect(() => {
    if (isFetched && user) {
      setFavArr([...favorites.map((item) => item._id)]);
    }
  }, [isFetched]);

  const { mutateAsync: removeFromFavorites } = useMutation({
    mutationFn: (id) => favoritesServices.removeFromFavorites(id),
    onSuccess: (data) => {
      setFavArr([...data.favorites]);
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Item removed from favorites!");
    },
    onError: (error) => {
      toast.error(`Failed to remove: ${error.response.data.message}`);
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
      toast.error(`Failed to add: ${error.response.data.message}`);
    },
  });

  const toggleWishlist = (id) => {
    if (favArr.includes(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  function handlePagination(value) {
    setPage(value);
  }

  // *filteration

  const [filters, setFilters] = useState({
    title: "",
    price: 200,
  });

  // only runs when route has a categoryName
  const {
    data: {
      data: categoryData = [],
      totalPages: catTotalPages = 1,
      currentPage: catCurrentPage = 1,
    } = {},
    isLoading: isCatLoading,
    isError: isCatError,
    error: catError,
  } = useQuery({
    queryKey: ["productsByCategory", categoryName, page],
    queryFn: () => getProductByCategory(categoryName, page, limit),
    enabled: !!categoryName,
    keepPreviousData: true,
  });

  const {
    data: {
      data: filteredProducts = [],
      totalPages = 1,
      currentPage: favCurrentPage = 1,
    } = {},
    isLoading: isFilterLoading,
    isError: isFilterError,
  } = useQuery({
    queryKey: ["filterProducts", filters, page],
    queryFn: () => filterProducts(filters, page),
    keepPreviousData: true,
  });

  const handleFilterChange = useCallback((newFilters) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // if categoryName is in the URL, we ignore filters completely
  const displayProducts =
    filters.title || filters.price !== 200
      ? filteredProducts
      : categoryName
      ? categoryData
      : products?.data || [];

  const displayTotalPages =
    filters.title || filters.price !== 200
      ? totalPages
      : categoryName
      ? catTotalPages
      : products?.totalPages || 1;

  const loading =
    isLoading || isFilterLoading || (categoryName && isCatLoading);
  const errorState = isError || isFilterError || (categoryName && isCatError);

  // if (isError || isFilterError) {
  //   toast.error(error.response?.data?.message || "Failed to fetch products");
  if (errorState) {
    toast.error(
      error?.response?.data?.message ||
        catError?.message ||
        "Failed to fetch products"
    );
    return (
      <Container fixed>
        <FilterationSideNav onFilterChange={handleFilterChange} />
        {loading ? (
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
        )}
      </Container>
    );
  }

  return (
    <div>
      <FilterationSideNav  onFilterChange={handleFilterChange} />
      {loading ? (
        <LoadingSpinner />
      ) : displayProducts.length === 0 ? (
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
        <Box sx={{ paddingLeft: { md: "290px" } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: {
                xs: "center", // center on small screens
                 // default to left on medium and above
              },
              gap: 4,
              marginY: 4,
            }}
          >
            {displayProducts?.map((prd) => (
              <ProductCard
                key={prd._id}
                product={prd}
                onAddToCart={() => handleAddToCart(prd._id)}
                onToggleFavorite={(id) => toggleWishlist(id)}
                onProductClick={() =>
                  handleProductClick(prd._id, prd.categoryID?.name)
                }
                sx={{
                  width: { xs: "90%", sm: "290px" },
                  aspectRatio: {xs:"1.80/3",sm:"2/3"},
                  height: "66%",
                }}
              />
            ))}
          </Box>
          <PaginationComponent
            currentPage={
              filters.title || filters.price !== 200
                ? favCurrentPage
                : categoryName
                ? catCurrentPage
                : products?.currentPage
            }
            // currentPage={products.currentPage}
            handlePagination={handlePagination}
            totalPages={displayTotalPages}
          />
        </Box>
      )}
    </div>
  );
}
