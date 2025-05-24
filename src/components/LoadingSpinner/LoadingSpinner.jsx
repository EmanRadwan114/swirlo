import { Box, CircularProgress } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0,0,0,0.05)",
      }}
    >
      <CircularProgress
        variant="indeterminate"
        thickness={3}
        size={40}
        sx={{ color: "var(--light-color)" }}
      />
    </Box>
  );
}
