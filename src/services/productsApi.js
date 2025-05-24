import api from "../utils/apiUrl";

export const fetchProducts = async (page = 1, limit = 12) => {
  const response = await api.get(
    `/products?page=${page}&limit=${limit}`
  );
  console.log("Products response:", response);
  console.log("Products data:", response.data);
  return response.data.data;}

export const getReviews = async (id, page) => {
  const response = await api.get(`/products/${id}/reviews?page=${page}`);
  console.log("", response.data);
  return response.data;
};
export const addReview = async (id, details) => {
  const response = await api.post(`/products/${id}/reviews`, details);
  return response.data;
};


