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
import { Loader, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ngachLuongDefaultValues,
  type TNgachLuong,
  type TNgachLuongReq,
} from "@/types/bac-luong";
import { createBacLuong, updateBacLuong } from "@/apis/bac-luong";
import { ngachLuongSchema } from "@/lib/schema";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  ngachLuong?: TNgachLuong | null;
}

export function BacLuongModal({ open, setOpen, ngachLuong }: Props) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  const form = useForm({
    resolver: zodResolver(ngachLuongSchema),
    defaultValues: ngachLuongDefaultValues,
  });

  const bacLuongs = form.watch("bacLuongs");

  useEffect(() => {
    if (ngachLuong) {
      form.setValue("tenNgach", ngachLuong.tenNgach);
      form.setValue("maNgach", ngachLuong.maNgach);
      form.setValue("soThuTu", ngachLuong.soThuTu);
      form.setValue("bacLuongs", ngachLuong.bacLuongs);
    } else {
      form.reset();
    }
  }, [open, ngachLuong]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: TNgachLuongReq) => {
      if (ngachLuong) {
        return updateBacLuong(ngachLuong.id, values);
      }
      return createBacLuong(values);
    },
  });

  // Thêm bậc lương
  const addBacLuong = () => {
    const newBac = {
      bac: (bacLuongs?.length ?? 0) + 1,
      heSo: 1.0,
      thoiGianNangBac: 2,
    };

    form.setValue("bacLuongs", [...(bacLuongs ?? []), newBac]);
  };

  // Xóa bậc lương
  const removeBacLuong = (index: number) => {
    const updated = (bacLuongs ?? []).filter((_, i) => i !== index);
    form.setValue("bacLuongs", updated);
  };

  const submit = (values: Omit<TNgachLuongReq, "id">) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast.success("Cập nhật bậc lương thành công");
        queryClient.invalidateQueries({
          queryKey: ["bac-luongs"],
        });
      },
      onError: () => {
        toast.error("Cập nhật bậc lương thất bại");
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
                {ngachLuong ? "Cập nhật bậc lương" : "Thêm bậc lương"}
              </DialogTitle>
              <DialogDescription>
                {ngachLuong
                  ? "Cập nhật thông tin bậc lương."
                  : "Điền thông tin để tạo mới bậc lương."}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 grid gap-4">
              <FormField
                control={form.control}
                name="tenNgach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên bậc lương</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maNgach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã bậc lương</FormLabel>
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
                        value={field.value?.toString() ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="my-5 overflow-hidden rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Bậc</th>
                      <th className="border p-2">Hệ số</th>
                      <th className="border p-2">Thời gian</th>
                      <th className="w-10 border p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bacLuongs?.map((row, index) => (
                      <tr key={index}>
                        <td className="border p-1 text-center">{row.bac}</td>
                        <td className="border p-1">
                          <Input
                            type="number"
                            value={row.heSo}
                            onChange={(e) => {
                              const newRows = [...(bacLuongs ?? [])];
                              newRows[index].heSo = parseFloat(e.target.value);
                              form.setValue("bacLuongs", newRows);
                            }}
                          />
                        </td>
                        <td className="border p-1">
                          <Input
                            type="number"
                            value={row.thoiGianNangBac}
                            onChange={(e) => {
                              const newRows = [...(bacLuongs ?? [])];
                              newRows[index].thoiGianNangBac = parseInt(
                                e.target.value
                              );
                              form.setValue("bacLuongs", newRows);
                            }}
                          />
                        </td>
                        <td className="border p-1 text-center">
                          {bacLuongs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeBacLuong(index)}
                              className="text-red-500 hover:underline"
                            >
                              X
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <DialogFooter className="mt-3">
              <div className="mr-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addBacLuong}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  <PlusIcon /> Thêm bậc
                </Button>
              </div>
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save changes
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
