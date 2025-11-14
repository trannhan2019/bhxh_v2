import { useDocumentTitle } from "usehooks-ts";
import { useOutletContext } from "react-router";
import type { OutletContext } from "@/types/layout";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ChucVuList } from "./chuc-vu-list";
import { useQuery } from "@tanstack/react-query";
import { ChucVuModal } from "./chuc-vu-modal";
import { useCrudModal } from "@/hooks/use-crud-modal";
import { getChucVus } from "@/apis/chuc-vu";
import { ChucVuAlert } from "./chuc-vu-alert";
import type { TChucVu } from "@/types/chuc-vu";

export default function ChucVuPage() {
  useDocumentTitle("SBA | Chức vụ");
  const { setBreadcrumbs } = useOutletContext<OutletContext>();
  useEffect(() => {
    setBreadcrumbs([{ title: "Quản lý Chức vụ", href: "/chuc-vu" }]);
  }, [setBreadcrumbs]);

  const { open, setOpen, selectedItem, handleOpenModal, openAlert, setOpenAlert, selectedId, handleOpenAlert } = useCrudModal<TChucVu>();

  const { data: chucVus } = useQuery({
    queryKey: ["chuc-vus"],
    queryFn: () => getChucVus(),
  });


  return (
    <div className="flex h-full flex-col p-4">
      <div className="rounded-xl border bg-white p-3">
        <Button onClick={() => handleOpenModal(null)}>
          <Plus /> Thêm
        </Button>
      </div>
      <ChucVuList chucVus={chucVus || []} handleOpenModal={handleOpenModal} handleOpenAlert={handleOpenAlert} />
      <ChucVuModal open={open} setOpen={setOpen} chucVu={selectedItem} />
      <ChucVuAlert open={openAlert} setOpen={setOpenAlert} id={selectedId} />
    </div>
  );
}
