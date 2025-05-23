import { Typography, Box } from "@mui/material";

export default function ProductDetails() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        p: { xs: 2, md: 6 },
        overflowX: "hidden",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "100%",
          height: { xs: "auto", md: "80dvh" },
        }}
      >
        <img
          src="https://i.pinimg.com/736x/a9/9b/9a/a99b9a2edc3fa6ce6052c8bb96344522.jpg"
          alt="coffee shop"
          style={{
            width: "100%",
            height: "85%",
            objectFit: "cover",
            borderRadius: "10%",
          }}
        />
      </Box>

      {/* Text Section */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          width: "100%",
          height: "100%",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 4 },
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            color: "var(--primary)",
            fontFamily: "Pacifico, cursive",
          }}
        >
          Lavender Matcha Frappe
        </Typography>

        <Box
          sx={{
            background: "var(--custom-gradient)",
            // bgcolor: "var(--gold)",
            height: "5px",
            width: { xs: "80%", md: "18rem" },
            mb: 4,
          }}
        />

        <Typography
          variant="h5"
          sx={{
            mb: 2,
            color: "var(--tertiary)",
          }}
        >
          Ingredients
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: "var(--main-text)",
          }}
        >
          Matcha, lavender, and milk of choice blended with ice and topped with
          whipped cream.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 6,
            fontWeight: "700",
            color: "var(--primary)",
            fontFamily: "Playpen Sans Hebrew",
          }}
        >
          Price: 150 LE
        </Typography>

        <Box
          sx={{
            width: { xs: "60%", sm: "80%" },
            p: 2,
            borderRadius: "20px",
            bgcolor: "var(--main-text)",
            color: "var(--main-background)",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            mx: "auto",
            textAlign: "center",
            transition: "background-color 0.3s ease",
            "&:hover": {
              bgcolor: "var(--primary)",
            },
          }}
        >
          Add To Cart
        </Box>
      </Box>
    </Box>
  );
}
