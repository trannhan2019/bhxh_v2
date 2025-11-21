import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateInputPicker } from "@/components/date-input";
import { bhxhNangBacSchema } from "@/lib/schema";
import {
  nangLuongBhxhDefaultValues,
  type TBhxh,
  type TBhxhItem,
  type TBhxhNangLuong,
} from "@/types/bhxh";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nangBacBhxh } from "@/apis/bhxh";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  bhxh?: TBhxhItem | null;
}

export function BhxhNangBacModal({ open, setOpen, bhxh }: Props) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<TBhxh, "id" | "soThuTu">) =>
      nangBacBhxh(bhxh?.id!, values),
  });

  const form = useForm({
    resolver: zodResolver(bhxhNangBacSchema),
    defaultValues: nangLuongBhxhDefaultValues,
  });

  const submit = (data: TBhxhNangLuong) => {
    const values: Omit<TBhxh, "id" | "soThuTu"> = {
      ...data,
      nhanVienId: bhxh?.nhanVienId!,
      ngachLuongId: bhxh?.ngachLuongId!,
      bacLuongId: bhxh?.tinhToan.nextBac?.id!,
      heSoChucVuId: bhxh?.heSoChucVuId!,
      heSoTrachNhiemId: bhxh?.heSoTrachNhiemId!,
    };

    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast.success("Xác nhận nâng bậc lương thành công");
        queryClient.invalidateQueries({
          queryKey: ["bhxh-notifications"],
        });
        queryClient.invalidateQueries({
          queryKey: ["lich-sus"],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: ["bhxh"],
          exact: false,
        });
      },
      onError: () => {
        toast.error("Xác nhận nâng bậc lương thất bại");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <DialogHeader>
              <DialogTitle>Xác nhận nâng bậc lương</DialogTitle>
              <DialogDescription>
                Điền thông tin để nâng bậc lương.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 grid gap-4">
              <FormField
                control={form.control}
                name="ngayApDung"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày áp dụng nâng bậc lương</FormLabel>
                    <FormControl>
                      <DateInputPicker
                        value={field.value as Date | null}
                        onChange={field.onChange}
                        disabled={field.disabled}
                        placeholder="ngày/tháng/năm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ghiChu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quyết định hoặc căn cứ nâng bậc</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
