import { useDocumentTitle } from "usehooks-ts";
import { useOutletContext } from "react-router";
import type { OutletContext } from "@/types/layout";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LuongToiThieuVungList } from "./luong-toi-thieu-vung-list";
import { useQuery } from "@tanstack/react-query";
import { LuongToiThieuVungModal } from "./luong-toi-thieu-vung-modal";
import { useCrudModal } from "@/hooks/use-crud-modal";
import { getLuongToiThieuVungs } from "@/apis/luong-toi-thieu-vung";

import type { TLuongToiThieuVung } from "@/types/luong-toi-thieu-vung";
import { LuongToiThieuVungAlert } from "./luong-toi-thieu-vung-alert";

export default function LuongToiThieuVungPage() {
  useDocumentTitle("SBA | Lương tối thiểu vùng");
  const { setBreadcrumbs } = useOutletContext<OutletContext>();
  useEffect(() => {
    setBreadcrumbs([
      { title: "Quản lý Lương tối thiểu vùng", href: "/luong-toi-thieu-vung" },
    ]);
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
  } = useCrudModal<TLuongToiThieuVung>();

  const { data: luongToiThieuVungs } = useQuery({
    queryKey: ["luong-toi-thieu-vungs"],
    queryFn: () => getLuongToiThieuVungs(),
  });

  return (
    <div className="flex h-full flex-col p-4">
      <div className="rounded-xl border bg-white p-3">
        <Button onClick={() => handleOpenModal(null)}>
          <Plus /> Thêm
        </Button>
      </div>
      <LuongToiThieuVungModal
        open={open}
        setOpen={setOpen}
        luongToiThieuVung={selectedItem}
      />
      <LuongToiThieuVungList
        luongToiThieuVungs={luongToiThieuVungs || []}
        handleOpenModal={handleOpenModal}
        handleOpenAlert={handleOpenAlert}
      />
      <LuongToiThieuVungAlert
        open={openAlert}
        setOpen={setOpenAlert}
        id={selectedId}
      />
    </div>
  );
}
