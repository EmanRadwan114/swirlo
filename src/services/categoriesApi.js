//just a js file for storing api methods related to categories
import api from "../utils/apiUrl"

export const fetchCategories = async () => {
  const response = await api.get("/categories");
  console.log("Categories response:", response); 
  console.log("Categories data:", response.data);
  return response.data.data; };