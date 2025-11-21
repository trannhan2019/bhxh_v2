import { Breadcrumbs } from "@/components/breadcrumbs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { type BreadcrumbItem as BreadcrumbItemType } from "@/types/layout";
import { AppNotification } from "./app-notification";

interface AppSidebarHeaderProps {
  breadcrumbs: BreadcrumbItemType[];
}

export function AppSidebarHeader({ breadcrumbs }: AppSidebarHeaderProps) {
  return (
    <header className="flex h-16 justify-between shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <AppNotification />
    </header>
  );
}
