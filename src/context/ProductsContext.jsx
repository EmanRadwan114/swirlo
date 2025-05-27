import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import {
  fetchProducts,
  getProductByCategory,
  getProductByID,
} from "../services/productsApi";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const limit = 8;
  const [category, setCategory] = useState("");

  const {
    data: allProductsResponse,
    isLoading: allLoading,
    isError: allError,
    error: allErrorObj,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page, limit),
    keepPreviousData: true,
  });

  // products filtered by category
  const {
    data: categoryProductsResponse = { data: [] },
    isLoading: catLoading,
    isError: catError,
    refetch: refetchByCategory,
  } = useQuery({
    queryKey: ["productsByCategory", category, page, limit],
    queryFn: () => getProductByCategory(category, page, limit),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    enabled: !!category,
  });

  const getProductDetails = (id) => {
    return useQuery({
      queryKey: ["product", id],
      queryFn: () => getProductByID(id),
    });
  };

  const value = {
    products: allProductsResponse?.data,
    allLoading,
    allError,
    allErrorObj,

    // category-specific
    productsCat: categoryProductsResponse.data,
    catLoading,
    catError,
    refetchByCategory,

    // pagination + category controls
    page,
    setPage,
    limit,
    category,
    setCategory,
    getProductDetails,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);
