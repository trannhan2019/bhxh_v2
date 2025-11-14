import { useDocumentTitle } from "usehooks-ts";
import { useOutletContext } from "react-router";
import type { OutletContext } from "@/types/layout";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PhongList } from "./phong-list";
import { useQuery } from "@tanstack/react-query";
import { getPhongs } from "@/apis/phong";
import { PhongModal } from "./phong-modal";
import type { TPhong } from "@/types/phong";
import { useCrudModal } from "@/hooks/use-crud-modal";
import { PhongAlert } from "./phong-alert";

export default function PhongPage() {
  useDocumentTitle("SBA | Phòng");
  const { setBreadcrumbs } = useOutletContext<OutletContext>();
  useEffect(() => {
    setBreadcrumbs([{ title: "Quản lý Phòng/Đơn vị", href: "/phong" }]);
  }, [setBreadcrumbs]);

  const { open, setOpen, selectedItem, handleOpenModal, openAlert, setOpenAlert, selectedId, handleOpenAlert } = useCrudModal<TPhong>();

  const { data: phongs } = useQuery({
    queryKey: ["phongs"],
    queryFn: () => getPhongs(),
  });


  return (
    <div className="flex h-full flex-col p-4">
      <div className="rounded-xl border bg-white p-3">
        <Button onClick={() => handleOpenModal(null)}>
          <Plus /> Thêm
        </Button>
      </div>
      <PhongList phongs={phongs || []} handleOpenModal={handleOpenModal} handleOpenAlert={handleOpenAlert} />
      <PhongModal open={open} setOpen={setOpen} phong={selectedItem} />
      <PhongAlert open={openAlert} setOpen={setOpenAlert} id={selectedId} />
    </div>
  );
}
