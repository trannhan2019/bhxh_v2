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
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLuongToiThieuVung,
  updateLuongToiThieuVung,
} from "@/apis/luong-toi-thieu-vung";
import {
  LuongToiThieuVungDefaultValues,
  type TLuongToiThieuVung,
} from "@/types/luong-toi-thieu-vung";
import { luongToiThieuVungSchema } from "@/lib/schema";
import { DateInputPicker } from "@/components/date-input";
import { Switch } from "@/components/ui/switch";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  luongToiThieuVung?: TLuongToiThieuVung | null;
}

export function LuongToiThieuVungModal({
  open,
  setOpen,
  luongToiThieuVung,
}: Props) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (luongToiThieuVung) {
      form.setValue("mucLuong", luongToiThieuVung.mucLuong);
      form.setValue("thoiGianApDung", luongToiThieuVung.thoiGianApDung);
      form.setValue("apDung", luongToiThieuVung.apDung);
      form.setValue("canCuPhapLy", luongToiThieuVung.canCuPhapLy);
    } else {
      form.reset();
    }
  }, [open, luongToiThieuVung]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<TLuongToiThieuVung, "id">) => {
      if (luongToiThieuVung) {
        return updateLuongToiThieuVung(luongToiThieuVung.id, values);
      }
      return createLuongToiThieuVung(values);
    },
  });

  const form = useForm({
    resolver: zodResolver(luongToiThieuVungSchema),
    defaultValues: LuongToiThieuVungDefaultValues,
  });

  const submit = (values: Omit<TLuongToiThieuVung, "id">) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast.success("Cập nhật lương tối thiểu vùng thành công");
        queryClient.invalidateQueries({
          queryKey: ["luong-toi-thieu-vungs"],
        });
      },
      onError: () => {
        toast.error("Cập nhật lương tối thiểu vùng thất bại");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <DialogHeader>
              <DialogTitle>
                {luongToiThieuVung
                  ? "Cập nhật lương tối thiểu vùng"
                  : "Thêm lương tối thiểu vùng"}
              </DialogTitle>
              <DialogDescription>
                {luongToiThieuVung
                  ? "Cập nhật thông tin lương tối thiểu vùng."
                  : "Điền thông tin để tạo mới lương tối thiểu vùng."}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 grid gap-4">
              <FormField
                control={form.control}
                name="mucLuong"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mức lương</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value?.toString() ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thoiGianApDung"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời gian áp dụng</FormLabel>
                    <FormControl>
                      <DateInputPicker
                        value={field.value as Date | null}
                        onChange={field.onChange}
                        disabled={field.disabled}
                        placeholder="dd/mm/yyyy"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apDung"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="canCuPhapLy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thông tin pháp lý</FormLabel>
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
