import { useEffect, useState } from "react";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router";
import { Box, Container } from "@mui/material";
import favoritesServices from "../../services/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { fetchProducts } from "../../services/productsApi";
import { useProductsContext } from "../../context/ProductsContext";

export default function Products() {
  const { products, isLoading, isError,error, page, setPage } = useProductsContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleProductClick = (id) => {
    navigate(`/menu-items/${id}`);
  };

  // * get products
  // const [page, setPage] = useState(1);
  // const limit = 12;

  // const {
  //   data: {
  //     data: { data: products = [], totalPages = 1, currentPage = 1 } = {},
  //   } = {},
  //   isLoading,
  //   error: productErr,
  // } = useQuery({
  //   queryKey: ["products", page],
  //   queryFn: () => fetchProducts(page, limit),
  // });

  // Handle Favourites
  const {
    data: { favorites = [] } = {},
    isFetched,
    error: favError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoritesServices.fetchAllFavorites(),
  });

  const [favArr, setFavArr] = useState([]);

  useEffect(() => {
    if (isFetched) {
      setFavArr([...favorites.map((item) => item._id)]);
    }
  }, [isFetched, favorites]);

  const { mutateAsync: removeFromFavorites, isPending: isRemoving } =
    useMutation({
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
  const { mutateAsync: addToFavorites, isPending: isAdding } = useMutation({
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

  function handlePagination(value) {
    setPage(value);
  }

  if (isLoading) return <LoadingSpinner />;
  if (error || favError)
    return toast.error(error.message || "Failed to fetch products");

  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          marginY: 4,
        }}
      >
        {products?.data?.map((prd) => (
          <ProductCard
            key={prd._id}
            product={{
              thumbnail: prd.thumbnail,
              title: prd.title,
              avgRating: prd.avgRating,
              price: prd.price,
              label: prd.label || "no label",
              _id: prd._id,
            }}
            onAddToCart={(id) => console.log("Add to cart:", id)}
            onToggleFavorite={(id) => toggleWishlist(id)}
            onProductClick={handleProductClick}
            sx={{ width: "290px", aspectRatio: "2/3", height: "66%" }}
          />
        ))}
      </Box>

      <PaginationComponent
        currentPage={products.currentPage}
        totalPages={products.totalPages}
        handlePagination={handlePagination}
      />
    </Container>
  );
}
