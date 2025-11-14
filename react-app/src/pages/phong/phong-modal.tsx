import { createPhong, updatePhong } from "@/apis/phong";
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
import {  phongDefaultValues, type TPhong } from "@/types/phong";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { phongSchema } from "@/lib/schema";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  phong?: TPhong | null;
}

export function PhongModal({ open, setOpen, phong }: Props) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (phong) {
      form.setValue("ten", phong.ten);
      form.setValue("tenVietTat", phong.tenVietTat);
      form.setValue("soThuTu", phong.soThuTu);
    } else {
      form.reset();
    }
  }, [open, phong]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<TPhong,'id'>) => {
      if (phong) {
        return updatePhong(phong.id, values);
      }
      return createPhong(values);
    },
  });

  const form = useForm({
    resolver: zodResolver(phongSchema),
    defaultValues: phongDefaultValues,
  });

  const submit = (values: Omit<TPhong,'id'>) => {
    mutate(
      values,
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          toast.success("Cập nhật phòng/đơn vị thành công");
          queryClient.invalidateQueries({
            queryKey: ["phongs"],
          });
        },
        onError: () => {
          toast.error("Cập nhật phòng/đơn vị thất bại");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <DialogHeader>
              <DialogTitle>
                {phong ? "Cập nhật phòng/đơn vị" : "Thêm phòng/đơn vị"}
              </DialogTitle>
              <DialogDescription>
                {phong
                  ? "Cập nhật thông tin phòng/đơn vị."
                  : "Điền thông tin để tạo mới phòng/đơn vị."}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 grid gap-4">
              <FormField
                control={form.control}
                name="ten"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên phòng/đơn vị</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tenVietTat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên viết tắt</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soThuTu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số thứ tự</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        value={field.value?.toString() ?? ''}
                        onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
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
