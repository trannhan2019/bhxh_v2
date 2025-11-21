import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { userSchema } from "@/lib/schema";
import { roleOptions, userDefaultValues, type TUser } from "@/types/user";
import { createUser, updateUser } from "@/apis/user";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: TUser | null;
}

export function UserModal({ open, setOpen, user }: Props) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

    const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: userDefaultValues,
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
      form.setValue("role", user.role);
    } else {
      form.reset();
    }
  }, [open, user]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: Omit<TUser,'id'>) => {
      if (user) {
        return updateUser(user.id, values);
      }
      return createUser(values);
    },
  });



  const submit = (values: Omit<TUser,'id'>) => {
    mutate(
      values,
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          toast.success("Cập nhật tài khoản thành công");
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        },
        onError: () => {
          toast.error("Cập nhật tài khoản thất bại");
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
                {user ? "Cập nhật tài khoản" : "Thêm tài khoản"}
              </DialogTitle>
              <DialogDescription>
                {user
                  ? "Cập nhật thông tin tài khoản."
                  : "Điền thông tin để tạo mới tài khoản."}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên tài khoản</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={!!user} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phân quyền</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(v)}
                      value={field.value ? String(field.value) : ""}
                      defaultValue={field.value ? String(field.value) : ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quyền" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleOptions?.map((item) => (
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
