import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProductsContext } from "../../context/ProductsContext";

export default function Products() {
  const { products, isLoading, isError,error, page, setPage } = useProductsContext();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error loading Products: {error?.message || "Unknown error"}</p>;


  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };
  console.log("Pagination data:", {
    currentPage: page,
    totalPages: products?.pagination?.totalPages,
    productsCount: products?.data?.length,
  });

  const handlePagination = (newPage) => {
    setPage(newPage); // ✅ Triggers re-fetch from context
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          marginY: 4,
        }}
      >
        {products?.data?.map((prd) => (
          <ProductCard
            key={prd._id}
            product={{
              thumbnail: prd.thumbnail,
              title: prd.title,
              avgRating: prd.avgRating,
              price: prd.price,
              label: prd.label || "no label",
              _id: prd._id,
            }}
            onAddToCart={(id) => console.log("Add to cart:", id)}
            onToggleFavorite={(id) => console.log("Toggle favorite:", id)}
            onProductClick={handleProductClick}
            sx={{ width: "290px", aspectRatio: "2/3", height: "66%" }}
          />
        ))}
      </Box>

      <PaginationComponent
        currentPage={page}
        totalPages={products?.totalPages || 1}
        handlePagination={handlePagination}
      />
    </div>
  );
}
