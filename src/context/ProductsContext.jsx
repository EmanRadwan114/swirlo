import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { fetchProducts } from "../services/productsApi";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  const [page, setPage] = useState(1); 
  const limit = 12;

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page, limit),
    keepPreviousData: true,
  });

  return (
    <ProductsContext.Provider
      value={{ products, isLoading, isError, error, page, setPage }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);
