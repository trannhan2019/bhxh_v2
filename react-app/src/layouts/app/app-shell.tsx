import { SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  variant?: "header" | "sidebar";
  children: React.ReactNode;
}

export function AppShell({ children, variant = "header" }: Props) {
  return (
    <>
      {variant === "header" ? (
        <div className="flex min-h-screen w-full flex-col">{children}</div>
      ) : (
        <SidebarProvider defaultOpen>{children}</SidebarProvider>
      )}
    </>
  );
}
