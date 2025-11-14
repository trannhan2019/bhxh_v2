import { useDocumentTitle } from "usehooks-ts";
import { useOutletContext } from "react-router";
import type { OutletContext } from "@/types/layout";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { useCrudModal } from "@/hooks/use-crud-modal";
import { HeSoList } from "./he-so-list";
import type { THeSo } from "@/types/he-so";
import { getHeSos } from "@/apis/he-so";
import { HeSoModal } from "./he-so-modal";
import { HeSoAlert } from "./he-so-alert";

export default function PhongPage() {
  useDocumentTitle("SBA | Hệ số phụ cấp");
  const { setBreadcrumbs } = useOutletContext<OutletContext>();
  useEffect(() => {
    setBreadcrumbs([{ title: "Quản lý hệ số phụ cấp", href: "/he-so" }]);
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
  } = useCrudModal<THeSo>();

  const { data: heSos } = useQuery({
    queryKey: ["he-sos"],
    queryFn: () => getHeSos(),
  });

  return (
    <div className="flex h-full flex-col p-4">
      <div className="rounded-xl border bg-white p-3">
        <Button onClick={() => handleOpenModal(null)}>
          <Plus /> Thêm
        </Button>
      </div>
      <HeSoModal open={open} setOpen={setOpen} heSo={selectedItem} />
      <HeSoList
        heSos={heSos || []}
        handleOpenModal={handleOpenModal}
        handleOpenAlert={handleOpenAlert}
      />
      <HeSoAlert open={openAlert} setOpen={setOpenAlert} id={selectedId} />
    </div>
  );
}
