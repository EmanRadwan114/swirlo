import { useState } from "react";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  function handlePagination(value) {
    setCurrentPage(value);
    //handle logic api here to get data also or useEffect with setCurrentPage dependency
  }

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", marginY: 4 }}>
        <ProductCard
          product={{
            thumbnail: "src/assets/slider1.png",
            title: "Ice Coffee",
            avgRating: 4,
            price: 79.99,
            label: "new arrival",
            _id: "12345",
          }}
          onAddToCart={(id) => console.log("Add to cart:", id)}
          onToggleFavorite={(id) => console.log("Toggle favorite:", id)}
          onProductClick={handleProductClick}
          sx={{ width: "250px", aspectRatio: "2/3", height: "66%" }}
        />
      </Box>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePagination={handlePagination}></PaginationComponent>
    </div>
  );
}
