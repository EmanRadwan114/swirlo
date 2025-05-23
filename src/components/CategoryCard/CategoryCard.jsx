import { Box, Typography } from "@mui/material";
import { Link } from "react-router";
import { useCategoriesContext } from "../../context/CategoriesContext";

export default function CategoryCard() {
  const { categories, isLoading, isError } = useCategoriesContext();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading categories</p>;


  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, sm: 6 },
          p: 4,
          background: "var( --main-background)",
          flexWrap: "wrap",
        }}
      >
        {categories?.map((cat) => (
          <Box
            key={cat._id}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginBottom: { xs: 4, sm: 0 },
            }}
          >
            <Box
              sx={{
                width: { xs: 140, sm: 170 },
                height: { xs: 140, sm: 170 },
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <img
                src={cat.thumbnail}
                alt="category"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Typography
              component={Link}
              to="/login"
              sx={{
                color: "black",
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: "700",
                color: "var(--primary)",
                fontFamily: "Playpen Sans Hebrew",
              }}
              variant="h6"
            >
              {cat.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}
