//just a js file for storing api methods related to products
import api from "../utils/apiUrl";

export const fetchProducts = async () => {
  const response = await api.get("/products");
  console.log("Products response:", response);
  console.log("Products data:", response.data);
  return response.data;
};

export const searchProducts = async (query, page) => {
  const res = await api.get(`products/search?q=${query}&page=${page}&limit=6`);
  return res.data;
};
