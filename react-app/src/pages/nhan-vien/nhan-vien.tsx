import { useDebounceValue, useDocumentTitle } from "usehooks-ts";
import { useOutletContext } from "react-router";
import type { OutletContext } from "@/types/layout";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCrudModal } from "@/hooks/use-crud-modal";
import { getNhanViens } from "@/apis/nhan-vien";
import { NhanVienHeader } from "./nhan-vien-header";
import { usePhanTrang } from "@/hooks/use-phan-trang";
import type { TNhanVienRes } from "@/types/nhan-vien";
import { NhanVienList } from "./nhan-vien-list";
import { PaginationList } from "@/components/pagination-list";
import { NhanVienModal } from "./nhan-vien-modal";
import { NhanVienAlert } from "./nhan-vien-alert";

export default function NhanVienPage() {
  useDocumentTitle("SBA | CBNV");
  const { setBreadcrumbs } = useOutletContext<OutletContext>();
  useEffect(() => {
    setBreadcrumbs([{ title: "Quản lý CBNV", href: "/nhan-vien" }]);
  }, [setBreadcrumbs]);

  const {
    open,
    setOpen,
    selectedItem,
    handleOpenModal,
    openAlert,
    setOpenAlert,
    selectedId,
    handleOpenAlert,
  } = useCrudModal<TNhanVienRes>();
  const { search, setSearch, handleSearchSubmit, currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePhanTrang();
  const [debouncedSearchValue] = useDebounceValue(search, 1000);

  const { data: nhanViens } = useQuery({
    queryKey: ["nhan-viens", currentPage, pageSize, debouncedSearchValue],
    queryFn: () => getNhanViens(currentPage, pageSize, debouncedSearchValue),
  });

  return (
    <div className="flex h-full flex-col p-4">
      <NhanVienHeader
        search={search}
        handleSearchSubmit={handleSearchSubmit}
        setSearch={setSearch}
        handleOpenModal={handleOpenModal}
      />
      <NhanVienModal open={open} setOpen={setOpen} nhanVien={selectedItem} />
      <NhanVienList
        currentPage={currentPage}
        pageSize={pageSize}
        nhanViens={nhanViens?.data || []}
        handleOpenModal={handleOpenModal}
        handleOpenAlert={handleOpenAlert}
      />
      <PaginationList
        totalCount={nhanViens?.total || 0}
        currentPage={currentPage}
        pageSize={pageSize}
        defaultValue={pageSize}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
      
      <NhanVienAlert open={openAlert} setOpen={setOpenAlert} id={selectedId} />
    </div>
  );
}
