import React, { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import favoritesServices from "../services/favorites";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "./AuthContext";

export const FavoritesContext = createContext();

export default function FavoritesContextProvider({ children }) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch favorites with pagination
  const { user } = useAuth();

  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", currentPage],
    queryFn: () => favoritesServices.fetchFavorites(currentPage),
    keepPreviousData: true,
    enabled: !!user,
  });

  const { favorites = [], totalPages = 1 } = data;

  // Pagination handler
  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Mutation to add to favorites
  const addFavoriteMutation = useMutation({
    mutationFn: favoritesServices.addToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Item added to favorites!");
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.response.data.message}`);
    },
  });

  // Mutation to remove from favorites
  const removeFavoriteMutation = useMutation({
    mutationFn: favoritesServices.removeFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Item removed from favorites!");
    },
    onError: (error) => {
      toast.error(`Failed to remove: ${error.response.data.message}`);
    },
  });

  // Action wrappers
  const addToFav = (productId) => addFavoriteMutation.mutate(productId);
  const removeFromFav = (productId) => removeFavoriteMutation.mutate(productId);

  // Helper to check if an item is favorited
  const isFavorited = (productId) =>
    favorites.some((fav) => fav._id === productId || fav === productId);

  if (
    isLoading ||
    addFavoriteMutation.isLoading ||
    removeFavoriteMutation.isLoading
  ) {
    return <LoadingSpinner />;
  }

  if (error) {
    toast.error(error.response.data.message || "Failed to fetch favorites");
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFav,
        removeFromFav,
        isFavorited,
        currentPage,
        totalPages,
        handlePagination,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error(
      "useFavoritesContext must be used within FavoritesContextProvider"
    );
  return context;
};
