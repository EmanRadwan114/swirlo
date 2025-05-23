import { useState } from "react";
import PaginationComponent from "../../components/Pagination/PaginationComp";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  function handlePagination(value) {
    setCurrentPage(value);
    //handle logic api here to get data also or useEffect with setCurrentPage dependency
  }
  return (
    <div>
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} handlePagination={handlePagination}></PaginationComponent>
    </div>
  );
}
