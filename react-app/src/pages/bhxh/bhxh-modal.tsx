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
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getNhanVienById, getNhanVienNoBhxh } from "@/apis/nhan-vien";
import { getNgachLuong } from "@/apis/bac-luong";
import { getBacLuongByNgachLuongId } from "@/apis/bac-luong";
import { getLoaiHeSo } from "@/apis/he-so";
import { bhxhDefaultValues, type TBhxh } from "@/types/bhxh";
import { createBhxh, updateBhxh } from "@/apis/bhxh";
import { bhxhSchema } from "@/lib/schema";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  bhxh: TBhxh | null;
}

export function BhxhModal({ open, setOpen, bhxh }: Props) {
  const queryClient = useQueryClient();
  const [ngachLuongId, setNgachLuongId] = useState<number>(0);

  const { data: nhanViens } = useQuery({
    queryKey: ["nhan-vien-no-bhxh"],
    queryFn: getNhanVienNoBhxh,
  });

  const { data: nhanVienDetail } = useQuery({
    queryKey: ["nhan-vien", bhxh?.nhanVienId],
    queryFn: () => getNhanVienById(bhxh?.nhanVienId || 0),
    enabled: !!bhxh?.nhanVienId,
  });

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

  useEffect(() => {
    if (bhxh) {
      form.setValue("nhanVienId", bhxh.nhanVienId);
      form.setValue("ngachLuongId", bhxh.ngachLuongId);
      setNgachLuongId(bhxh.ngachLuongId);
      form.setValue("bacLuongId", bhxh.bacLuongId);
      form.setValue("heSoChucVuId", bhxh.heSoChucVuId);
      form.setValue("heSoTrachNhiemId", bhxh.heSoTrachNhiemId);
      form.setValue("ngayApDung", bhxh.ngayApDung);
      form.setValue("ghiChu", bhxh.ghiChu);
      form.setValue("soThuTu", bhxh.soThuTu);
    } else {
      form.reset();
      setNgachLuongId(0);
    }
  }, [open, bhxh]);

  const mergedNhanViens = useMemo(() => {
    if (!nhanViens) return nhanVienDetail ? [nhanVienDetail] : [];

    const list = [...nhanViens];

    if (
      bhxh &&
      nhanVienDetail &&
      !list.some((nv) => nv.id === nhanVienDetail.id)
    ) {
      list.push(nhanVienDetail);
    }

    return list;
  }, [nhanViens, nhanVienDetail, bhxh]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<TBhxh, "id">) => {
      if (bhxh) {
        return updateBhxh(bhxh.id, values);
      }
      return createBhxh(values);
    },
  });

  const form = useForm({
    resolver: zodResolver(bhxhSchema),
    defaultValues: bhxhDefaultValues,
  });

  const submit = (values: Omit<TBhxh, "id">) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast.success("Cập nhật thông tin thành công");
        queryClient.invalidateQueries({ queryKey: ["bhxhs"], exact: false });
        queryClient.invalidateQueries({ queryKey: ["nhan-vien-no-bhxh"] });
      },
      onError: () => {
        toast.error("Cập nhật thông tin thất bại");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <DialogHeader>
              <DialogTitle>
                {bhxh ? "Cập nhật thông tin BHXH" : "Thêm thông tin BHXH"}
              </DialogTitle>
              <DialogDescription>
                {bhxh
                  ? "Cập nhật thông tin BHXH."
                  : "Điền thông tin để tạo mới BHXH."}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 grid gap-4">
              <FormField
                control={form.control}
                name="nhanVienId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn CBNV</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn CBNV" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mergedNhanViens?.map((item) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.ten}
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

              <FormField
                control={form.control}
                name="ghiChu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thông tin pháp lý</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Điền thông tin số quyết định nâng lương"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-5">
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
