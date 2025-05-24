//just a js file for storing api methods related to products
import api from "../utils/apiUrl";

// export const fetchProducts = async () => {
//   const response = await api.get("/products");
//   console.log("Products response:", response);
//   console.log("Products data:", response.data);
//   return response.data;
// };

export const fetchProducts = async (page = 1, limit = 12) => {
  const response = await api.get(
    `/products?page=${page}&limit=${limit}`
  );
  console.log("Products response:", response);
  console.log("Products data:", response.data);
  return response.data;
};

