import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthLayout from "@/layouts/auth/auth-layout";
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
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/schema";
import { loginDefaultValues, type TLogin } from "@/types/auth";
import { login } from "@/apis/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function LoginPage() {
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
    <AuthLayout title="Login" description="Login to your account">
      <div>
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
                      <Input {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
