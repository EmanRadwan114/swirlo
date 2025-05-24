import api from "../utils/apiUrl";

export const fetchProducts = async (page, limit ) => {
  const response = await api.get(
    `/products?page=${page}&limit=${limit}`
  );
  console.log("Products response:", response);
  console.log("Products data:", response.data);
  return response;
}

export const getReviews = async (id, page) => {
  const response = await api.get(`/products/${id}/reviews?page=${page}`);
  console.log("", response.data);
  return response.data;
};

export const addReview = async (id, details) => {
  const response = await api.post(`/products/${id}/reviews`, details);
  return response.data;
};


export const searchProducts = async (query, page) => {
  const res = await api.get(`/products/search?q=${query}&page=${page}&limit=6`);
  return res.data;
};


export const getProductByID = async(id)=>{
  const response = await api.get(`products/${id}`)
  return response.data;
}

export const getProductByCategory = async (
  categoryName,
  page = 1,
  limit = 12
) => {
  const response = await api.get(
    `/products/category/${categoryName}?page=${page}&limit=${limit}`
  );
  return response.data;
};
