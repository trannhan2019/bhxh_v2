import { useDebounceValue, useDocumentTitle } from "usehooks-ts";
import { useOutletContext } from "react-router";
import type { OutletContext } from "@/types/layout";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCrudModal } from "@/hooks/use-crud-modal";

import { usePhanTrang } from "@/hooks/use-phan-trang";
import { BhxhList } from "./bhxh-list";

import { BhxhAlert } from "./bhxh-alert";
import { getBhxhs } from "@/apis/bhxh";
import type { TBhxhItem } from "@/types/bhxh";
import { BhxhHeader } from "./bhxh-header";
import { PaginationList } from "@/components/pagination-list";
import { BhxhModal } from "./bhxh-modal";

export default function BhxhPage() {
  useDocumentTitle("SBA | BHXH");
  const { setBreadcrumbs } = useOutletContext<OutletContext>();
  useEffect(() => {
    setBreadcrumbs([{ title: "Quản lý BHXH", href: "/bhxh" }]);
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
  } = useCrudModal<TBhxhItem>();
  const {
    search,
    setSearch,
    handleSearchSubmit,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  } = usePhanTrang();
  const [debouncedSearchValue] = useDebounceValue(search, 1000);

  const { data: bhxhs } = useQuery({
    queryKey: ["bhxhs", currentPage, pageSize, debouncedSearchValue],
    queryFn: () => getBhxhs(currentPage, pageSize, debouncedSearchValue),
  });

  return (
    <div className="flex h-full flex-col p-4">
      <BhxhHeader
        search={search}
        handleSearchSubmit={handleSearchSubmit}
        setSearch={setSearch}
        handleOpenModal={handleOpenModal}
      />

      <BhxhModal open={open} setOpen={setOpen} bhxh={selectedItem} />
      
      <BhxhList
        currentPage={currentPage}
        pageSize={pageSize}
        bhxhs={bhxhs?.data || []}
        handleOpenModal={handleOpenModal}
        handleOpenAlert={handleOpenAlert}
      />
      <PaginationList
        totalCount={bhxhs?.total || 0}
        currentPage={currentPage}
        pageSize={pageSize}
        defaultValue={pageSize}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />

      <BhxhAlert open={openAlert} setOpen={setOpenAlert} id={selectedId} />
    </div>
  );
}
