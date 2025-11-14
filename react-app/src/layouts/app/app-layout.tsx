import { AppSidebarLayout } from "@/layouts/app/app-sidebar-layout";
import { useState } from "react";
import { type BreadcrumbItem } from "@/types/layout";

export default function AppLayout() {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  return (
    <AppSidebarLayout
      breadcrumbs={breadcrumbs}
      setBreadcrumbs={setBreadcrumbs}
    />
  );
}
