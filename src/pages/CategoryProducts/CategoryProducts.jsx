import React from "react";
import { useProductsContext } from "../../context/ProductsContext";
import { useParams } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

const CategoryProducts = () => {
  const { category } = useParams();
  const { productsCategory, isError, error, isLoading } = useProductsContext();
  
  if (isLoading) return <LoadingSpinner />;
  if (isError) return toast.error(`error : ${error.message}`)
  return (
    <>
      {productsCategory?.map((product) => (
        <div key={product._id}>{product.title}</div>
      ))}
    </>
  );
};

export default CategoryProducts;
