import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import {
  fetchProducts,
  getProductByCategory,
  getProductByID,
} from "../services/productsApi";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  // const [page, setPage] = useState(1);
  // const limit = 12;

  // const {
  //   data: products,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["products", page],
  //   queryFn: () => fetchProducts(page, limit),
  // });

  const getProductDetails = (id) => {
    return useQuery({
      queryKey: ["product", id],
      queryFn: () => getProductByID(id),
    });
  };

  const getProductCategry = (categoryName, page, limit) => {
    return useQuery({
      queryKey: ["categoryProducts", categoryName, page],
      queryFn: () => getProductByCategory(categoryName, page, limit),
    });
  };

  const value = {
    // products: products?.data || [],
    // isLoading,
    // isError,
    // error,
    // page,
    // setPage,
    getProductDetails,
    getProductCategry,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);
