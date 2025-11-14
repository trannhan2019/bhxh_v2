
import { deleteHeSo } from "@/apis/he-so";
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

export function HeSoAlert({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteHeSo(id),
  });

  const queryClient = useQueryClient();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Xóa hệ số thành công");
        queryClient.invalidateQueries({ queryKey: ["he-sos"] });
      },
      onError: () => {
        toast.error("Xóa hệ số thất bại");
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa hệ số</AlertDialogTitle>
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
