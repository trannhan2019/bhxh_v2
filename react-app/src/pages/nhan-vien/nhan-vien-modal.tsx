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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { nhanVienSchema } from "@/lib/schema";
import {
  nhanVienDefaultValues,
  type TNhanVien,
  type TNhanVienRes,
} from "@/types/nhan-vien";
import { createNhanVien, updateNhanVien } from "@/apis/nhan-vien";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getChucVus } from "@/apis/chuc-vu";
import { getPhongs } from "@/apis/phong";
import { Switch } from "@/components/ui/switch";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  nhanVien: TNhanVienRes | null;
}

export function NhanVienModal({ open, setOpen, nhanVien }: Props) {
  const queryClient = useQueryClient();

  const { data: chucVus } = useQuery({
    queryKey: ["chuc-vus"],
    queryFn: getChucVus,
  });

  const { data: phongs } = useQuery({
    queryKey: ["phongs"],
    queryFn: getPhongs,
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (nhanVien) {
      form.setValue("ten", nhanVien.ten);
      form.setValue("phongId", nhanVien.phong.id);
      form.setValue("chucVuId", nhanVien.chucVu.id);
      form.setValue("soThuTu", nhanVien.soThuTu);
      form.setValue("trangThai", nhanVien.trangThai);
      form.setValue("nhanVienVhsc", nhanVien.nhanVienVhsc);
    } else {
      form.reset();
    }
  }, [open, nhanVien]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<TNhanVien, "id">) => {
      if (nhanVien) {
        return updateNhanVien(nhanVien.id, values);
      }
      return createNhanVien(values);
    },
  });

  const form = useForm({
    resolver: zodResolver(nhanVienSchema),
    defaultValues: nhanVienDefaultValues,
  });

  const submit = (values: Omit<TNhanVien, "id">) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast.success("Cập nhật thông tin thành công");
        queryClient.invalidateQueries({
          queryKey: ["nhan-viens"],exact:false
        });
      },
      onError: () => {
        toast.error("Cập nhật thông tin thất bại");
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
                {nhanVien ? "Cập nhật nhân viên" : "Thêm nhân viên"}
              </DialogTitle>
              <DialogDescription>
                {nhanVien
                  ? "Cập nhật thông tin nhân viên."
                  : "Điền thông tin để tạo mới nhân viên."}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 grid gap-4">
              <FormField
                control={form.control}
                name="ten"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên nhân viên</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phongId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phòng</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phòng/đơn vị" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {phongs?.map((item) => (
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
                name="chucVuId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chức vụ</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn chức vụ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {chucVus?.map((item) => (
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
                name="trangThai"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel >
                      Trạng thái
                    </FormLabel>
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
                name="nhanVienVhsc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Là nhân viên VHSC tại các nhà máy
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
