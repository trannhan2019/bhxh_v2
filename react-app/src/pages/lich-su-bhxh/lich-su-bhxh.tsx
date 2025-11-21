import { getLichSuBhxhByNhanVienId } from "@/apis/lich-su-bhxh";
import { useQuery } from "@tanstack/react-query";
import { LichSuBhxhList } from "./lich-su-bhxh-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { TLichSuBhxhItem } from "@/types/lich-su-bhxh";
import { useCrudModal } from "@/hooks/use-crud-modal";
import { LichSuBhxhModal } from "./lich-su-bhxh-modal";
import { LichSuBhxhAlert } from "./lich-su-bhxh-alert";

export function LichSuBhxh({ nhanVienId }: { nhanVienId: number }) {
  const {
    open,
    setOpen,
    selectedItem,
    handleOpenModal,
    openAlert,
    setOpenAlert,
    selectedId,
    handleOpenAlert,
  } = useCrudModal<TLichSuBhxhItem>();
  const { data: lichSus } = useQuery({
    queryKey: ["lich-sus", nhanVienId],
    queryFn: () => getLichSuBhxhByNhanVienId(nhanVienId),
  });

  return (
    <div className="flex h-full flex-col mt-2">
      <div className="rounded-xl border bg-white p-2">
        <Button onClick={() => handleOpenModal(null)}>
          <Plus /> Thêm
        </Button>
      </div>

      <LichSuBhxhModal
        open={open}
        setOpen={setOpen}
        lichSu={selectedItem}
        nhanVienId={nhanVienId}
      />
      <LichSuBhxhList
        data={lichSus || []}
        handleOpenModal={handleOpenModal}
        handleOpenAlert={handleOpenAlert}
      />
      <LichSuBhxhAlert open={openAlert} setOpen={setOpenAlert} id={selectedId} />
    </div>
  );
}
