import { useProductsContext } from "../../context/ProductsContext";
import { useEffect, useState } from "react";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import favoritesServices from "../../services/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Products() {
  const { products, isLoading, isError, page, setPage } = useProductsContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // function handlePagination(value) {
  //   setCurrentPage(value);
  //   //handle logic api here to get data also or useEffect with setCurrentPage dependency
  // }

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

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
      setFavArr([...favorites.map((item) => item._id), "12345"]);
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

  // if (error) {
  //   toast.error(error.message || "Failed to fetch products");
  // }

  console.log("Pagination data:", {
    currentPage: page,
    totalPages: products?.pagination?.totalPages,
    productsCount: products?.data?.length,
  });

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) return <p>Loading....</p>;
  if (isError)
    return <p>Error loading Products: {error?.message || "Unknown error"}</p>;

  return (
    <div>
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
        {products.data?.map((prd) => {
        console.log("Mapping product:", prd._id); 
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
          />;
        })}
      </Box>

      <PaginationComponent
        currentPage={page}
        totalPages={products?.totalPages}
        handlePagination={handlePagination}
      />
    </div>
  );
}
