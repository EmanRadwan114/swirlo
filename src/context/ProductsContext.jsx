import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productsApi";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <ProductsContext.Provider value={{ products, isLoading, isError, error }}>
      {children}
    </ProductsContext.Provider>
  );
}
export const useProductsContext = () => useContext(ProductsContext);
