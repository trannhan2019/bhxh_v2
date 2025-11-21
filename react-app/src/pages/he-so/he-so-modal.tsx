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
import { heSoSchema } from "@/lib/schema";
import { heSoDefaultValues, type THeSo, heSoLoaiOptions } from "@/types/he-so";
import { createHeSo, updateHeSo } from "@/apis/he-so";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  heSo?: THeSo | null;
}

export function HeSoModal({ open, setOpen, heSo }: Props) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (heSo) {
      form.setValue("chucDanh", heSo.chucDanh);
      form.setValue("heSo", heSo.heSo);
      form.setValue("loai", heSo.loai);
    } else {
      form.reset();
    }
  }, [open, heSo]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<THeSo, "id">) => {
      if (heSo) {
        return updateHeSo(heSo.id, values);
      }
      return createHeSo(values);
    },
  });

  const form = useForm({
    resolver: zodResolver(heSoSchema),
    defaultValues: heSoDefaultValues,
  });

  const submit = (values: Omit<THeSo, "id">) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast.success("Cập nhật hệ số thành công");
        queryClient.invalidateQueries({
          queryKey: ["he-sos"],
        });
      },
      onError: () => {
        toast.error("Cập nhật hệ số thất bại");
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
                {heSo ? "Cập nhật hệ số" : "Thêm hệ số"}
              </DialogTitle>
              <DialogDescription>
                {heSo
                  ? "Cập nhật thông tin hệ số."
                  : "Điền thông tin để tạo mới hệ số."}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 grid gap-4">
              <FormField
                control={form.control}
                name="loai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại hệ số</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(v)}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại hệ số phụ cấp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {heSoLoaiOptions?.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={String(item.value)}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chucDanh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chức danh</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heSo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hệ số</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={0.01}
                        value={field.value?.toString() ?? "0"}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
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
