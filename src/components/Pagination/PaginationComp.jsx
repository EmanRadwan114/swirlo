import Pagination from "@mui/material/Pagination";
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScrollToTop from "./../ScrollToTop/ScrollToTop";

export default function PaginationComponent({
  totalPages,
  currentPage,
  handlePagination,
}) {
  const [page, setPage] = React.useState(currentPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
    handlePagination(value);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#dc9830",
        contrastText: "#ffffff",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Pagination
          sx={{
            "& .MuiPagination-ul": {
              justifyContent: "center", // this centers the inner ul of pagination
            },
            marginBottom: 5,
          }}
          color="primary"
          count={totalPages}
          page={page}
          onChange={handleChange}></Pagination>
      </ThemeProvider>
    </>
  );
}
