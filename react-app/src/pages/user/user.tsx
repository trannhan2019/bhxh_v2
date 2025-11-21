import { useDocumentTitle } from "usehooks-ts";
import { useOutletContext } from "react-router";
import type { OutletContext } from "@/types/layout";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useCrudModal } from "@/hooks/use-crud-modal";
import { UserList } from "./user-list";
import { getUsers } from "@/apis/user";
import type { TUser } from "@/types/user";
import { UserModal } from "./user-modal";
import { UserAlert } from "./user-alert";

export default function UserPage() {
  useDocumentTitle("SBA | Người dùng");
  const { setBreadcrumbs } = useOutletContext<OutletContext>();
  useEffect(() => {
    setBreadcrumbs([{ title: "Quản lý Người dùng", href: "/user" }]);
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
  } = useCrudModal<TUser>();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return (
    <div className="flex h-full flex-col p-4">
      <div className="rounded-xl border bg-white p-3">
        <Button onClick={() => handleOpenModal(null)}>
          <Plus /> Thêm
        </Button>
      </div>
      <UserList
        users={users || []}
        handleOpenModal={handleOpenModal}
        handleOpenAlert={handleOpenAlert}
      />
      <UserModal open={open} setOpen={setOpen} user={selectedItem} />
      <UserAlert open={openAlert} setOpen={setOpenAlert} id={selectedId} />
    </div>
  );
}
