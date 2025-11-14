
import { AppContent } from "./app-content";
import { AppShell } from "./app-shell";
import { AppSidebar } from "./app-sidebar";
import { AppSidebarHeader } from "./app-sidebar-header";
import { Outlet } from 'react-router';
import { type BreadcrumbItem } from '@/types/layout';

interface OutletContext {
    breadcrumbs: BreadcrumbItem[];
    setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
}

export function AppSidebarLayout({ breadcrumbs, setBreadcrumbs }: OutletContext) {
  
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        <Outlet context={{ breadcrumbs, setBreadcrumbs }} />
      </AppContent>
    </AppShell>
  );
}
