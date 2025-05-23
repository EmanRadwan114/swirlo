// import { createContext } from "react";

// export const CategoriesContext = createContext();

// export default function CategoriesContextProvider({ children }) {
//   return (
//     <CategoriesContext.Provider value={{}}>
//       {children}
//     </CategoriesContext.Provider>
//   );
// }
// context/CategoriesContext.jsx
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../services/categoriesApi";

export const CategoriesContext = createContext();

export default function CategoriesContextProvider({ children }) {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <CategoriesContext.Provider
      value={{ categories, isLoading, isError, error }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategoriesContext = () => useContext(CategoriesContext);
