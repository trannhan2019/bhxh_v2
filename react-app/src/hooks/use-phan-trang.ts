import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export function usePhanTrang() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lấy page, pageSize, search từ URL
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "15", 10);
  const searchParam = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(pageParam);
  const [pageSize, setPageSize] = useState(pageSizeParam);
  const [search, setSearch] = useState(searchParam);

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  useEffect(() => {
    setPageSize(pageSizeParam);
  }, [pageSizeParam]);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

//   const totalPages = Math.ceil(total / pageSize);

  const updateParams = (page: number, size: number, search: string) => {
    const newSearch = new URLSearchParams();
    newSearch.set("page", String(page));
    newSearch.set("pageSize", String(size));
    if (search) newSearch.set("search", search);
    navigate(`?${newSearch.toString()}`);
  };

  const handlePageChange = (page: number) => {
    updateParams(page, pageSize, search);
  };

  const handlePageSizeChange = (value: string | null) => {
    const newSize = parseInt(value || "15", 10);
    updateParams(1, newSize, search); // Reset về trang 1 khi đổi size
  };

  const handleSearchSubmit = (keyword: string) => {
    updateParams(1, pageSize, keyword); // Reset về page 1 khi search
  };

  return {
    currentPage,
    pageSize,
    // totalPages,
    search,
    setSearch,
    handlePageChange,
    handlePageSizeChange,
    handleSearchSubmit,
  };
}