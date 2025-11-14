
import { deleteLuongToiThieuVung } from "@/apis/luong-toi-thieu-vung";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function LuongToiThieuVungAlert({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteLuongToiThieuVung(id),
  });

  const queryClient = useQueryClient();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Xóa lương tối thiểu vùng thành công");
        queryClient.invalidateQueries({ queryKey: ["luong-toi-thieu-vungs"] });
      },
      onError: () => {
        toast.error("Xóa lương tối thiểu vùng thất bại");
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa lương tối thiểu vùng</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn xóa dữ liệu này không ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-500 hover:text-white"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Xóa dữ liệu
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
