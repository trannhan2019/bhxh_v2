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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateInputPicker } from "@/components/date-input";
import { bhxhChuyenNgachSchema } from "@/lib/schema";
import {
  chuyenNgachBhxhDefaultValues,
  type TBhxh,
  type TBhxhItem,
  type TBhxhChuyenNgach,
} from "@/types/bhxh";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chuyenNgachBhxh } from "@/apis/bhxh";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getBacLuongByNgachLuongId, getNgachLuong } from "@/apis/bac-luong";
import { getLoaiHeSo } from "@/apis/he-so";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  bhxh?: TBhxhItem | null;
}

export function BhxhChuyenNgachModal({ open, setOpen, bhxh }: Props) {
  const queryClient = useQueryClient();
  const [ngachLuongId, setNgachLuongId] = useState<number>(0);

  const { data: ngachLuongs } = useQuery({
    queryKey: ["ngach-luongs"],
    queryFn: getNgachLuong,
  });

  const { data: bacLuongs } = useQuery({
    queryKey: ["bac-luongs", ngachLuongId],
    queryFn: () => getBacLuongByNgachLuongId(ngachLuongId),
    enabled: !!ngachLuongId,
  });

  const { data: heSos } = useQuery({
    queryKey: ["he-so-loai"],
    queryFn: getLoaiHeSo,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<TBhxh, "id" | "soThuTu">) =>
      chuyenNgachBhxh(bhxh?.id!, values),
  });

  const form = useForm({
    resolver: zodResolver(bhxhChuyenNgachSchema),
    defaultValues: chuyenNgachBhxhDefaultValues,
  });

  const submit = (data: TBhxhChuyenNgach) => {
    const values: Omit<TBhxh, "id" | "soThuTu"> = {
      ...data,
      nhanVienId: bhxh?.nhanVienId!,
    };

    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast.success("Xác nhận chuyển ngạch lương thành công");
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
        toast.error("Xác nhận chuyển ngạch lương thất bại");
      },
    });
  };

  useEffect(() => {
    if (bhxh) {
      form.setValue("ngachLuongId", bhxh.ngachLuongId);
      setNgachLuongId(bhxh.ngachLuongId);
      form.setValue("bacLuongId", bhxh.bacLuongId);
      form.setValue("heSoChucVuId", bhxh.heSoChucVuId);
      form.setValue("heSoTrachNhiemId", bhxh.heSoTrachNhiemId);
      form.setValue("ngayApDung", bhxh.ngayApDung);
    } else {
      form.reset();
      setNgachLuongId(0);
    }
  }, [open, bhxh]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <DialogHeader>
              <DialogTitle>Xác nhận chuyển ngạch lương</DialogTitle>
              <DialogDescription>
                Điền thông tin để chuyển ngạch lương.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 grid gap-4">
              <FormField
                control={form.control}
                name="ngachLuongId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngạch lương</FormLabel>
                    <Select
                      onValueChange={(v) => {
                        field.onChange(Number(v));
                        setNgachLuongId(Number(v));
                      }}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn ngạch lương" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ngachLuongs?.map((item) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.tenNgach}
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
                name="bacLuongId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bậc lương</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn bậc lương" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bacLuongs?.map((item) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.bac}
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
                name="heSoChucVuId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn hệ số phụ cấp chức vụ (nếu có)</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full whitespace-normal text-justify ">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hệ số chức vụ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {heSos?.chucVu?.map((item) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.chucDanh}
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
                name="heSoTrachNhiemId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Chọn hệ số phụ cấp trách nhiệm (nếu có)
                    </FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn hệ số trách nhiệm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {heSos?.trachNhiem?.map((item) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.chucDanh}
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
                name="ngayApDung"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày áp dụng chuyển ngạch lương</FormLabel>
                    <FormDescription className="text-red-500">
                      (*) Không chọn/thay đổi nếu chỉ chuyển phụ cấp chức vụ hoặc trách nhiệm!
                    </FormDescription>
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
