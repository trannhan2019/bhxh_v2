import { Button } from "@/components/ui/button";
import { useCrudModal } from "@/hooks/use-crud-modal";
import type { TNgachLuong } from "@/types/bac-luong";
import type { OutletContext } from "@/types/layout";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useOutletContext } from "react-router";
import { useDocumentTitle } from "usehooks-ts";
import { BacLuongList } from "./bac-luong-list";
import { useQuery } from "@tanstack/react-query";
import { getBacLuongs } from "@/apis/bac-luong";
import { BacLuongModal } from "./bac-luong-modal";
import { BacLuongAlert } from "./bac-luong-alert";

export default function BacLuongPage() {
  useDocumentTitle("SBA | Bậc lương");
  const { setBreadcrumbs } = useOutletContext<OutletContext>();
  useEffect(() => {
    setBreadcrumbs([{ title: "Quản lý bậc lương", href: "/bac-luong" }]);
  }, [setBreadcrumbs]);

  const {
    open,
    setOpen,
    selectedItem,
    handleOpenModal,
    handleOpenAlert,
    openAlert,
    setOpenAlert,
    selectedId,
  } = useCrudModal<TNgachLuong>();

  const { data: ngachLuongs } = useQuery({
    queryKey: ["bac-luongs"],
    queryFn: () => getBacLuongs(),
  });

  return (
    <div className="flex h-full flex-col p-4">
      <div className="rounded-xl border bg-white p-3">
        <Button onClick={() => handleOpenModal(null)}>
          <Plus /> Thêm
        </Button>
      </div>
      <BacLuongModal open={open} setOpen={setOpen} ngachLuong={selectedItem} />
      <BacLuongList
        ngachLuongs={ngachLuongs || []}
        handleOpenModal={handleOpenModal}
        handleDelAlert={handleOpenAlert}
      />

      <BacLuongAlert open={openAlert} setOpen={setOpenAlert} id={selectedId} />
    </div>
  );
}
