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
import { useEffect,  useState } from "react";
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
import { getNgachLuong } from "@/apis/bac-luong";
import { getBacLuongByNgachLuongId } from "@/apis/bac-luong";
import { getLoaiHeSo } from "@/apis/he-so";
import { lichSuBhxhDefaultValues, type TLichSuBhxh, type TLichSuBhxhItem } from "@/types/lich-su-bhxh";
import { lichSuBhxhSchema } from "@/lib/schema";
import { createLichSuBhxh, updateLichSuBhxh } from "@/apis/lich-su-bhxh";
import { getLuongToiThieuVungs } from "@/apis/luong-toi-thieu-vung";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  lichSu: TLichSuBhxhItem | null;
  nhanVienId: number;
}

export function LichSuBhxhModal({ open, setOpen, lichSu, nhanVienId }: Props) {
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

  const { data: luongToiThieuVungs } = useQuery({
    queryKey: ["luong-toi-thieu-vungs"],
    queryFn: getLuongToiThieuVungs,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const form = useForm({
    resolver: zodResolver(lichSuBhxhSchema),
    defaultValues: lichSuBhxhDefaultValues(nhanVienId),
  });

  useEffect(() => {
    if (lichSu) {
      form.setValue("nhanVienId", lichSu.nhanVienId);
      form.setValue("ngachLuongId", lichSu.ngachLuongId);
      setNgachLuongId(lichSu.ngachLuongId);
      form.setValue("bacLuongId", lichSu.bacLuongId);
      form.setValue("heSoChucVuId", lichSu.heSoChucVuId);
      form.setValue("heSoTrachNhiemId", lichSu.heSoTrachNhiemId);
      form.setValue("ngayApDung", lichSu.ngayApDung);
      form.setValue("ghiChu", lichSu.ghiChu);
      form.setValue("luongToiThieuVungId", lichSu.luongToiThieuVungId);
    } else {
      form.reset();
      setNgachLuongId(0);
    }
  }, [open, lichSu]);

 
  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<TLichSuBhxh, "id">) => {
      if (lichSu) {
        return updateLichSuBhxh(lichSu.id, values);
      }
      return createLichSuBhxh(values);
    },
  });

  

  const submit = (values: Omit<TLichSuBhxh, "id">) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast.success("Cập nhật thông tin thành công");
        queryClient.invalidateQueries({ queryKey: ["lich-sus"], exact: false });
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
                {lichSu ? "Cập nhật thông tin lịch sử BHXH" : "Thêm thông tin lịch sử BHXH"}
              </DialogTitle>
              <DialogDescription>
                {lichSu
                  ? "Cập nhật thông tin lịch sử BHXH."
                  : "Điền thông tin để tạo mới lịch sử BHXH."}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 grid gap-4">            

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
                name="luongToiThieuVungId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mức lương tối thiểu vùng áp dụng</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mức lương" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {luongToiThieuVungs?.map((item) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.mucLuong}
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
