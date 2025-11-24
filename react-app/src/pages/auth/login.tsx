
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/stores/auth";
import { loginSchema } from "@/lib/schema";
import { loginDefaultValues, type TLogin } from "@/types/auth";
import { login } from "@/apis/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LockIcon, MailIcon } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const { setAuth } = useAuthStore();

  const onSubmit = async (data: TLogin) => {
    try {
      const res = await login(data);
      setAuth(res.data);
      navigate("/");
      toast.success("Login successfully");
    } catch (error) {
      toast.error("Login failed");
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      type="email"
                      {...field}
                      placeholder="Enter your email"
                    />
                    <InputGroupAddon>
                      <MailIcon />
                    </InputGroupAddon>
                  </InputGroup>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      type="password"
                      {...field}
                      placeholder="Enter your password"
                    />
                    <InputGroupAddon>
                      <LockIcon />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full text-white bg-[#4c6bf2] hover:bg-[#4c6bf2]/90 hover:text-white"
            variant="outline"
          >
            Đăng nhập
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginPage;
