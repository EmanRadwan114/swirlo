import Pagination from "@mui/material/Pagination";
import React from "react";

export default function PaginationComponent({ totalPages, currentPage, handlePagination }) {
  const [page, setPage] = React.useState(currentPage);
  const handleChange = (event, value) => {
    setPage(value);
    handlePagination(value);
  };
  return (
    <>
      <div>
        <Pagination count={totalPages} page={page} onChange={handleChange}></Pagination>
      </div>
    </>
  );
}
