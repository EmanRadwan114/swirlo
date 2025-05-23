//just a js file for storing api methods related to favorites

import api from "../utils/apiUrl";

const fetchFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data;
};

const addToFavorites = async (productId) => {
  const res = await api.put(`/favorites/${productId}`);
  return res.data;
};

const clearFavorites = async () => {
  const res = await api.delete("/favorites");
  return res.data;
};

const removeFromFavorites = async (productId) => {
  const res = await api.delete(`/favorites/${productId}`);
  return res.data;
};

const favoritesServices = {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
  clearFavorites,
};

export default favoritesServices;
