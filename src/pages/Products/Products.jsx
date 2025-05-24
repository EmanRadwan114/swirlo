import { useEffect, useState } from "react";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import favoritesServices from "../../services/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function handlePagination(value) {
    setCurrentPage(value);
    //handle logic api here to get data also or useEffect with setCurrentPage dependency
  }

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };
  // ^ handle add to / remove from favorites
  const queryClient = useQueryClient();

  const {
    data: { favorites = [] } = {},
    isFetched,
    error,
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

  if (error) {
    toast.error(error.message || "Failed to fetch products");
  }

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", marginY: 4 }}>
        <ProductCard
          product={{
            thumbnail: "src/assets/slider1.png",
            title: "Ice Coffee",
            avgRating: 4,
            price: 79.99,
            label: "new arrival",
            _id: "12345",
          }}
          onAddToCart={(id) => console.log("Add to cart:", id)}
          onToggleFavorite={(id) => toggleWishlist(id)}
          onProductClick={handleProductClick}
          sx={{ width: "250px", aspectRatio: "2/3", height: "66%" }}
        />
      </Box>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePagination={handlePagination}></PaginationComponent>
    </div>
  );
}
